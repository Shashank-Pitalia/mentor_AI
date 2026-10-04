import prisma from "../config/db.js";

export const updateUserProfile = async (userId, updateData) => {
  const { userName, email } = updateData;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  // Check if username or email is already taken by another user
  if (userName || email) {
    const duplicateUser = await prisma.user.findFirst({
      where: {
        OR: [
          ...(userName ? [{ userName }] : []),
          ...(email ? [{ email }] : []),
        ],
        NOT: {
          id: userId,
        },
      },
    });

    if (duplicateUser) {
      throw new Error("Username or Email already exists");
    }
  }

  // Update profile
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...(userName && { userName }),
      ...(email && { email }),
    },
  });

  // Remove password before returning
  const { password, ...userWithoutPassword } = updatedUser;

  return {
    message: "Profile updated successfully",
    user: userWithoutPassword,
  };
};

export const changeUserPassword = async (userId, passwordData) => {
    const {oldPassword, newPassword} = passwordData;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: {
        id: userId,
    }
    });

    if (!existingUser) {
        throw new Error("User not found");
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, existingUser.password);

    if (!isPasswordValid) {
        throw new Error("Old password is incorrect");
    }

    const isSamePassword = await bcrypt.compare(newPassword, existingUser.password);

    if (isSamePassword) {
        throw new Error("New password cannot be the same as the old password");
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            password: hashedNewPassword,
        },
    });

    return {
        message: "Password changed successfully",
    };
}

export const deleteUserProfile = async (userId) => {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

    if (!existingUser) {
        throw new Error("User not found");
    }

    // Delete user profile
    await prisma.user.delete({
        where: {
            id: userId,
        },
    });

    return {
        message: "User profile deleted successfully",
    };
}