export async function hashPassword(password: string) {
  if (typeof Bun !== "undefined") {
    return Bun.password.hashSync(password, "bcrypt");
  }

  const bcrypt = await import("bcrypt");
  return bcrypt.hash(password, 10);
}
