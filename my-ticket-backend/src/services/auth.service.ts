import { prisma } from "../prisma/client";
import { Prisma } from "@prisma/client";
import { JwtUtils } from "../lib/token.config";
import bcrypt, { hash } from "bcrypt";
import { UserRegister } from "../models/interface";
import { EmailService } from "./email.service";

export class AuthService {

  private generateReferralCode(userId: number, name: string): string {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${name.substring(0, 3).toUpperCase()}${userId}${randomNum}`;
  }

  public async register(data: UserRegister) {
    const { name, email, password, role = 'CUSTOMER', refferalCode } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (role === 'CUSTOMER') {
      if (refferalCode && refferalCode.split(',').length > 3) {
        throw new Error("Maximum 3 referral codes allowed");
      }
    } else if (refferalCode) {
      throw new Error("Referral code only available for CUSTOMER role");
    }

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await hash(password, 10);
    
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          profile_pic:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        },
      });

      let referralCode = null;
      let totalPoints = 0;
      let validReferralCount = 0;

      if (role === 'CUSTOMER') {
        referralCode = this.generateReferralCode(user.id, user.name);

        await tx.user.update({
          where: { id: user.id },
          data: { refferalCode: referralCode },
        });

        if (refferalCode) {
          const referralCodesArray = refferalCode.split(',').map(code => code.trim());
          const results = await this.processReferralCodesWithTx(user.id, referralCodesArray, tx);
          totalPoints = results.totalPoints;
          validReferralCount = results.validReferralCount;

          if (results.usedCodes.length > 0) {
            console.warn("Referral codes already used:", results.usedCodes);
          }

          referralCode = results.usedCodes;
        }
      }

      return {
        user,
        referralCode,
        totalPoints,
        validReferralCount,
      };
    });

    const token = JwtUtils.generateToken({
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
    });

    return {
      id: result.user.id,
      name: result.user.name,
      role: result.user.role,
      access_token: token,
      ...(role === 'CUSTOMER' && {
        refferalCode: result.referralCode,
        totalPoints: result.totalPoints,
        validReferralCount: result.validReferralCount,
      }),
    };
  }

  private async processReferralCodesWithTx(
    newUserId: number,
    referralCodes: string[],
    tx: Prisma.TransactionClient
  ) {
    const uniqueCodes = [...new Set(referralCodes)];
    let totalPoints = 0;
    let validReferralCount = 0;
    const POINTS_PER_REFERRAL = 10000;
    const MAX_REFERRALS = 3;
    const usedCodes: string[] = [];

    for (const code of uniqueCodes) {
      if (validReferralCount >= MAX_REFERRALS) break;

      const referringUser = await tx.user.findFirst({
        where: { refferalCode: code },
      });

      if (referringUser && referringUser.id !== newUserId) {
        await tx.coupon.create({
          data: {
            userId: newUserId,
            code: `CREDIT-${referringUser.refferalCode}`,
            points: POINTS_PER_REFERRAL,
          },
        });

        const alreadyUsed = await tx.coupon.findFirst({
          where: {
            userId: newUserId,
            code: code,
          },
        });

        if (alreadyUsed) {
          usedCodes.push(code);
          continue;
        }

        totalPoints += POINTS_PER_REFERRAL;
        validReferralCount++;
      }
    }

    return { totalPoints, validReferralCount, usedCodes };
  }

  public async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return "Invalid email or password";
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return "Invalid credentials";
    }

    const token = JwtUtils.generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return {
      id: user.id,
      name: user.name,
      role: user.role,
      access_token: token,
    };
  }

public async verifyResetToken(token: string) {
    try {
        const decoded = JwtUtils.verifyToken(token);
        return decoded.email;
    } catch (error) {
        throw new Error("Token invalid or expired");
    }
}

  public async resetPassword(email: string, newPassword: string) {
    if (!email || !newPassword) {
      throw new Error("Email and new password are required");
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Email not found");
    }

    const hashedPassword = await hash(newPassword, 10);

    try {
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
      return { message: "Password reset successful" };
      
    } catch (error) {
      throw new Error("Failed to update password");
    }
  }
}
