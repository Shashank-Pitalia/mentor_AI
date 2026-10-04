import { registerSchema } from "../validators/auth.validator.js";
import { registerUser } from "../services/auth.services.js";
import { loginSchema } from "../validators/auth.validator.js";
import { loginUser } from "../services/auth.services.js";
import { getUserById } from "../services/auth.services.js";
import {googleLogin} from "../services/auth.services.js";
import { googleLoginSchema } from "../validators/auth.validator.js";


export const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const result = await registerUser(validatedData);

    return res.status(201).json(result);

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await loginUser(validatedData);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};


export const getMe = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const googleLoginController = async (req, res) => {
  try {
    const { token } = googleLoginSchema.parse(req.body);

    const result = await googleLogin(token);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};