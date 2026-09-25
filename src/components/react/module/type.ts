export type InputType = "email" | "prenom" | "nom" | "tel" | "change_password" | "new_password" | "input_password" | "checkboxRGPD"
export type MethodType = "POST" | "GET" | "DELETE" | "PUT" | "PATCH"

export interface PassCheck {
    fn: (input: string) => boolean | undefined;
    msg: string;
}

export interface TypeOpt {
    name: InputType
    type: "email" | "text" | "checkbox"
    fn: (input: string) => boolean | undefined
    placeholder?: string
}
