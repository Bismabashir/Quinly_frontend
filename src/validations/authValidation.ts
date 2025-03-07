import { z } from "zod";

const requiredString = z.string().trim().min(1, "Field required");

export const loginSchema = z.object({
  email: requiredString.email("Invalid email format"),
  password: requiredString,
});

export type loginValues = z.infer<typeof loginSchema>;

export const registerUserSchema = z
  .object({
    email: requiredString.email("Invalid email format"),
    password: z
      .string()
      .trim()
      .min(6, "Password must be atleast 6 characters long"),
    confirmPassword: requiredString,
    full_name: requiredString,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type registerUserValues = z.infer<typeof registerUserSchema>;

export const forgotPasswordSchema = z.object({
  email: requiredString.email("Invalid email format"),
});

export type forgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    new_password: z
      .string()
      .trim()
      .min(6, "Password must be atleast 6 characters long"),
    confirm_password: requiredString,
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type resetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const changeProfilePasswordSchema = z
  .object({
    oldPassword: requiredString,
    newPassword: z
      .string()
      .trim()
      .min(6, "Password must be atleast 6 characters long"),
    confirmPassword: requiredString,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type changeProfilePasswordValues = z.infer<
  typeof changeProfilePasswordSchema
>;

export const tokenVerificationSchema = z.object({
  token: z
    .string()
    .length(5, { message: "Your token must be exactly 5 digits." })
    .regex(/^\d{5}$/, {
      message: "Your token must contain digits only.",
    }),
});

export type tokenVerificationValues = z.infer<typeof tokenVerificationSchema>;
