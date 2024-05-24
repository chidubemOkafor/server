import randomstring from 'randomstring';
import { Types } from 'mongoose';
import { Token } from '../schema/userSchema';

export const generateVerificationCodeAndSaveToDatabase = async(_id: Types.ObjectId, duration: number): Promise<string> => {
    const verificationCode = randomstring.generate(8);

    const storeToken = new Token({
        userId: _id,
        token: verificationCode,
        duration: new Date(Date.now() + 300000)
    })

    const storedToken = await storeToken.save()

    return storedToken.token
}