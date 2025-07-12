import {signal} from "@preact/signals-react";
import type {User} from "../schemas/UserSchema.ts";

const userSignal = signal<User | null>(null);
export default userSignal;