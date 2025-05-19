import mongoose, { Schema, Document } from 'mongoose';
import { string } from 'zod';

interface IUser extends Document {
    uuid: string;
    email: string;
    password: string
    name: {
        first: string,
        last: string
    }
}

const UserSchema: Schema = new Schema<IUser>(
    {
        uuid: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            first: {
                type: String,
                required: true
            },
            last: {
                type: String
            }
        }
    }
)

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
