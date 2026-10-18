import bcrypt from "bcryptjs";

const users = [
  {
    id: "user_customer_1",
    name: "Abel Dawit",
    email: process.env.DEMO_CUSTOMER_EMAIL,
    role: "customer",
    passwordHash: process.env.DEMO_CUSTOMER_PASSWORD_HASH,
  },
  {
    id: "user_staff_1",
    name: "Kitchen Staff",
    email: process.env.DEMO_STAFF_EMAIL,
    role: "staff",
    passwordHash: process.env.DEMO_STAFF_PASSWORD_HASH,
  },
];

export async function authenticateUser(email, password) {
  const normalizedEmail = String(email ?? "")
    .trim()
    .toLowerCase();

  const user = users.find(
    (item) => item.email?.toLowerCase() === normalizedEmail,
  );

  if (!user || !user.passwordHash) {
    return null;
  }

  const passwordIsValid = await bcrypt.compare(
    String(password ?? ""),
    user.passwordHash,
  );

  if (!passwordIsValid) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
