import mongoose, { Document, Schema, Model } from "mongoose"

export interface IUser extends Document {
    name: string
    email: string
    password: string
}

const userSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

export interface IUserModel extends Model<IUser> {
    login(email: string, password: string): Promise<IUser>
    register(name: string, email: string, password: string): Promise<IUser>
}

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("Nem adta meg az emailt és a jelszót!")
    }

    const user = await User.findOne({ email: email })

    if (!user) {
        throw Error("A megadott email címmel nincs regisztrálva felhasználó!")
    }

    const match = await Bun.password.verify(password, user.password)

    if (!match) {
        throw Error("A megadott jelszó helytelen!")
    }

    return user
}

userSchema.statics.register = async function(name, email, password) {
    if (!name || !email || !password) {
        throw Error("Nem adott meg nevet, email-t, vagy jelszót!")
    }

    const emailExists = await User.findOne({ email: email })

    if (emailExists) {
        throw Error("A megadott email címmel már van regisztrálva felhasználó!")
    }

    const userNameExists = await User.findOne({ name: name })

    if (userNameExists) {
        throw Error("A megadott felhasználónévvel már regisztráltak!")
    }

    const hashedPassword = await Bun.password.hash(password)

    const newUser = await User.create({ name, email, password: hashedPassword })

    if (!newUser) {
        throw Error("Sikertelen regisztrálás!")
    }

    return newUser
}

export const User: IUserModel = mongoose.model<IUser, IUserModel>("User", userSchema)
