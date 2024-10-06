import { Token } from '../schema/userSchema';
import { IToken } from '../interface/User';

const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate random 6-digit code
  };

export async function generateVerificationCodeAndSaveToDatabase (_to: string, _encriptedToken: string, duration: number): Promise<string> {

    await Token.deleteMany({email: _to})

    const storeToken = new Token({
        token: generateOTP(),
        encryptedToken: _encriptedToken,
        email: _to,
        duration: new Date(Date.now() + duration),
    })

    const storedToken = await storeToken.save()

    return storedToken.token
}