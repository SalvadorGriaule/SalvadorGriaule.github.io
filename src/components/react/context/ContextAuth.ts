import { createContext, type Dispatch, type SetStateAction } from "react";
import { type InputType } from "../module/type"

export const ValidatorContext = createContext<Map<InputType, boolean>>(new Map())
export const RGPDisVisible = createContext<null | Dispatch<SetStateAction<boolean>>>(null);
export const ValidatorDispatchContext = createContext<null | React.ActionDispatch<[target: {
    name: InputType;
    isValid: boolean;
}]>>(null)