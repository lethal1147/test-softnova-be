import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

export const hashPassword = async (plainPW: string) =>
  bcrypt.hash(plainPW, process.env.HASH_SALT as string);

const prisma = new PrismaClient();

async function initialMockDatabase() {
  try {
    await prisma.$transaction(async (prisma) => {
      const hashedPassword = await hashPassword("123456aA*");

      await prisma.user.create({
        data: {
          email: "test@gmail.com",
          password: hashedPassword,
          role: "admin",
        },
      });
    });
    console.log("Database seeded successfully.");
  } catch (err) {
    console.error(err);
  }
}

initialMockDatabase();
