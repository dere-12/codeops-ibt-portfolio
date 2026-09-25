import { z } from "zod";

const ethiopianPhoneRegex = /^(?:\+251|251|0)(?:9|7)\d{8}$/;

const loginSchema = z
  .object({
    loginMethod: z.enum(["phone", "email"], {
      error: "Select a login method.",
    }),

    phone: z.string().trim(),

    email: z.string().trim(),

    password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "Password must be at least 8 characters."),
  })
  .superRefine((data, context) => {
    if (data.loginMethod === "phone") {
      if (!ethiopianPhoneRegex.test(data.phone)) {
        context.addIssue({
          code: "custom",
          path: ["phone"],
          message: "Enter a valid Ethiopian phone number.",
        });
      }
    }

    if (data.loginMethod === "email") {
      const result = z
        .string()
        .email("Enter a valid email address.")
        .safeParse(data.email);

      if (!result.success) {
        context.addIssue({
          code: "custom",
          path: ["email"],
          message: "Enter a valid email address.",
        });
      }
    }
  });

export default loginSchema;
