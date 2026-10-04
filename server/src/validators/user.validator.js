import { z } from "zod";

export const updateProfileSchema = z
  .object({
    userName: z.string().min(3).optional(),
    email: z.email().optional(),
  })
  .refine(
    (data) => data.userName || data.email,
    {
      message: "At least one field (userName or email) is required.",
    }
  );

  export const changePasswordSchema = z.object({
    oldPassword: z.string().min(8, "Old password must be at least 8 characters"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
  }); 

  export const deleteProfileSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
  