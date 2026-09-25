import { z } from "zod";

const ethiopianPhoneRegex = /^(?:\+251|251|0)(?:9|7)\d{8}$/;

const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters."),

  phone: z
    .string()
    .trim()
    .regex(ethiopianPhoneRegex, "Enter a valid Ethiopian phone number."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .or(z.literal("")),

  subCity: z.string().trim().min(2, "Enter your sub-city or neighborhood."),

  street: z.string().trim().min(3, "Enter your house number or street."),

  landmark: z.string().trim().min(3, "Enter a landmark or gate instruction."),

  dispatchType: z.enum(["immediate", "dinner"], {
    error: "Select a dispatch time.",
  }),

  paymentMethod: z.enum(["telebirr", "cbe-birr", "cash-pos", "amole-awash"], {
    error: "Select a payment method.",
  }),
});

export default checkoutSchema;
