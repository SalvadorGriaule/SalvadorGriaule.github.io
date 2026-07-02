import { createContext } from "react";
import { type InputType } from "../module/type"

export const PasswordContext = createContext<boolean>(false);
export const ValidatorContext = createContext<Map<InputType, boolean>>(new Map())
export const ValidatorDispatchContext = createContext<null | React.ActionDispatch<[target: {
    name: InputType;
    isValid: boolean;
}]>>(null)