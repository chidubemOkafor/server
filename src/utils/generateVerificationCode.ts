import randomstring from 'randomstring';
import { Token } from '../schema/userSchema';
import { IToken } from '../interface/User';

export const generateVerificationCodeAndSaveToDatabase = async(_to: string, _encriptedToken: string, duration: number): Promise<string> => {
    const verificationCode = randomstring.generate(6);

    await Token.deleteMany({email: _to})

    const storeToken: IToken = new Token({
        token: verificationCode,
        encryptedToken: _encriptedToken,
        email: _to,
        duration: new Date(Date.now() + duration),
    })

    const storedToken = await storeToken.save()

    return storedToken.token
}