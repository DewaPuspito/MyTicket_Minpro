import { prisma } from "../prisma/client";
import { UserProfile } from "../models/interface";

export class ProfileService {

  public async getProfile(id: number) {
    return prisma.user.findUnique({ 
      where: { id },
      select: {
        name: true,
        email: true,
        profile_pic: true
      }
    });
  }
  
  public async updateProfile(id: number, data: Partial<UserProfile>) {
    if (data.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new Error("Email already registered by another user");
      }
    }

    return prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }
}
