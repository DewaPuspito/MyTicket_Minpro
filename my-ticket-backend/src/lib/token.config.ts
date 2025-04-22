import jwt from 'jsonwebtoken'  
import dotenv from 'dotenv'
import {UserPayload} from '../models/interface'

dotenv.config()

export class JwtUtils {
    private static secret = process.env.JWT_SECRET as any;
    private static expiration = '7d' as any

    static generateToken(payload: UserPayload) {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiration
        })
    }
    static verifyToken(token: string) {
        return jwt.verify(token, this.secret) as UserPayload
    }
}