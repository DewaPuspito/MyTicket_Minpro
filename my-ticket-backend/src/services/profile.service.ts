import { prisma } from "../prisma/client";
import { UserProfile } from "../models/interface";

export class ProfileService {

  public async getProfile(id: number) {
    const user = await prisma.user.findUnique({ 
      where: { id },
      select: {
        name: true,
        email: true,
        profile_pic: true,
        role: true,
        refferalCode: true,
        Coupon: {
          select: {
            code: true,
          }
        }
      }
    });

    if (!user) return null;


    return {
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic,
      role: user.role,
      refferal_code_owned: user.refferalCode,
      codes: user.Coupon.map((coupon) => coupon.code),
    };
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
        name: data.name,
        profile_pic: data.profile_pic,
        updatedAt: new Date(),
      },
    });
  }
}
