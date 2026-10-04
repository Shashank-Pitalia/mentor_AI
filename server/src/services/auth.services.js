import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { googleClient } from "../config/google.js";

// Register User
export const registerUser = async (userData) => {
  const { userName, email, password } = userData;

  // Check if username or email already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { userName },
        { email }
      ]
    }
  });

  if (existingUser) {
    throw new Error("Username or Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      userName,
      email,
      password: hashedPassword
    }
  });

  const token = generateToken(user.id, user.role);

  const { password: _, ...userWithoutPassword } = user;

  return {
    message: "User registered successfully",
    user: userWithoutPassword,
    token
  };
};

// Login User
export const loginUser = async (userData) => {
  const { identifier, password } = userData;

  // Find user by username OR email
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { userName: identifier },
        { email: identifier }
      ],
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate token
  const token = generateToken(user.id, user.role);

  const { password: _, ...userWithoutPassword } = user;

  return {
    message: "Login successful",
    user: userWithoutPassword,
    token,
  };
};

export const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  try {
    if (!user) {
      throw new Error("User not found");
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const googleLogin = async (token) => {
  // Verify token with Google
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const {
    sub: googleId,
    email,
    email_verified,
    name,
  } = payload;

  if (!email_verified) {
    throw new Error("Google email is not verified");
  }

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // New user
  if (!user) {
    const userName = await generateUniqueUsername(name);

    user = await prisma.user.create({
      data: {
        userName,
        email,
        googleId,
        password: null,
      },
    });
  }

  // Existing local account → link Google
  else if (!user.googleId) {
    user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        googleId,
      },
    });
  }

  const jwt = generateToken(user.id);

  const { password, ...userWithoutPassword } = user;

  return {
    message: "Google login successful",
    token: jwt,
    user: userWithoutPassword,
  };
};