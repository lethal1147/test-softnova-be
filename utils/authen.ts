import * as bcrypt from "bcrypt";

export const hashPassword = async (plainPw: string): Promise<string> => {
  return bcrypt.hash(plainPw, process.env.HASH_SALT as string);
};

export const comparePassword = async (
  plainPw: string,
  hashedPw: string,
): Promise<boolean> => {
  return bcrypt.compare(plainPw, hashedPw);
};
