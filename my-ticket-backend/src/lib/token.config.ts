import jwt from 'jsonwebtoken'  
import dotenv from 'dotenv'
import {UserPayload} from '../models/interface'

dotenv.config()

export class JwtUtils {
    private static secret: string = process.env.JWT_SECRET || 'default-secret-key';
    private static expiration: `${number}d` = '7d';

    static generateToken(payload: UserPayload) {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiration
        })
    }
    static verifyToken(token: string) {
        return jwt.verify(token, this.secret) as UserPayload
    }
}