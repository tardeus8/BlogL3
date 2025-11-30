import User from "../schemas/userSchema";
import { v7 as uuidv7 } from "uuid";
import argon2 from "argon2";
import sanitize from "sanitize-html";
import { modelResult } from "../types/modelResult";
import { resultStatus } from "../types/statusEnum";

interface UserLogin {
  uuid: string;
  passwordHash: string;
}

export async function createUser(username: string, password: string): Promise<modelResult> {
    const uuid = uuidv7();
    const passwordHash = await argon2.hash(password);
    username = sanitize(username);

    const user = new User({ uuid, username, passwordHash });
    try {
        await user.save();
        return { modelResult: resultStatus.Success, payload: "User created" };
    } catch (err: any) {
        if (err.code === 11000) return { modelResult: resultStatus.BadUserInput, payload: "Username already used" };
        return { modelResult: resultStatus.Error, payload: err.message || "Unknown error" };
    }
}

export async function login(username: string, password: string): Promise<modelResult> {
    try {
        const user = await User.findOne({ username }, { passwordHash: 1, uuid: 1, _id: 0 }).lean<UserLogin>();
        if (!user || !(await argon2.verify(user.passwordHash, password))) {
            return { modelResult: resultStatus.BadUserInput, payload: "Invalid credentials" };
        }
        return { modelResult: resultStatus.Success, payload: user.uuid };
    } catch (err: any) {
        return { modelResult: resultStatus.Error, payload: err.message || "Unknown error" };
    }
}
