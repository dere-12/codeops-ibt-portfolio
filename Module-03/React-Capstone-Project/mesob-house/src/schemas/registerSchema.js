import { z } from "zod";

const ethiopianPhoneRegex = /^(?:(?:\+251|251|0)(?:9|7)\d{8}|(?:9|7)\d{8})$/;

const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters."),

    phone: z
      .string()
      .trim()
      .regex(ethiopianPhoneRegex, "Enter a valid Ethiopian phone number."),

    email: z.string().trim().email("Enter a valid email address."),

    password: z.string().min(8, "Password must be at least 8 characters."),

    confirmPassword: z.string().min(1, "Please confirm your password."),

    termsAccepted: z.boolean().refine((value) => value === true, {
      message: "You must agree to the Terms and Privacy Guidelines.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default registerSchema;
