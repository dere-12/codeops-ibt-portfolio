import { create } from "zustand";
import { persist } from "zustand/middleware";

function normalizePhone(value) {
  const digits = String(value ?? "").replace(/\D/g, "");

  if (digits.startsWith("251")) {
    return `0${digits.slice(3)}`;
  }

  if (digits.startsWith("0")) {
    return digits;
  }

  if (
    digits.length === 9 &&
    (digits.startsWith("9") || digits.startsWith("7"))
  ) {
    return `0${digits}`;
  }

  return digits;
}

function normalizeEmail(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

const useAuthStore = create(
  persist(
    (set, get) => ({
      account: null,
      isAuthenticated: false,

      registerUser: ({ fullName, phone, email }) => {
        const account = {
          fullName: fullName.trim(),
          phone: normalizePhone(phone),
          email: normalizeEmail(email),
        };

        set({
          account,
          isAuthenticated: true,
        });

        return account;
      },

      signIn: ({ loginMethod, identifier }) => {
        const account = get().account;

        if (!account) {
          return {
            success: false,
            reason: "NO_ACCOUNT",
          };
        }

        const normalizedIdentifier =
          loginMethod === "phone"
            ? normalizePhone(identifier)
            : normalizeEmail(identifier);

        const storedIdentifier =
          loginMethod === "phone"
            ? account.phone
            : normalizeEmail(account.email);

        if (normalizedIdentifier !== storedIdentifier) {
          return {
            success: false,
            reason: "IDENTIFIER_MISMATCH",
          };
        }

        set({ isAuthenticated: true });

        return {
          success: true,
          account,
        };
      },

      signOut: () =>
        set({
          isAuthenticated: false,
        }),
    }),
    {
      name: "mesob-house-auth",
    },
  ),
);

export default useAuthStore;
