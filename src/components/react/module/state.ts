import { testList } from "@assets/ts/inputCheck";
import type { PassCheck, TypeOpt } from "./type";

export const mapOpt: Map<string, TypeOpt> = new Map([
    ["email", { name: "email", type: "email", fn: testList.email, placeholder: "E-mail" }],
    ["checkboxRGPD", { name: "checkboxRGPD", type: "checkbox", fn: testList.check }]
])

export const allCheck: PassCheck[] = [
    { fn: testList.minL, msg: "Plus de 11 caractére" },
    { fn: testList.numCheck, msg: "Au moins un nombre" },
    { fn: testList.oneUpper, msg: "Au moins une Majuscule" },
    { fn: testList.oneLower, msg: "Au moins une Minuscule" },
    {
        fn: testList.specChar,
        msg: "Au moins un caractere special (#|~!?,.§€$£%:*())",
    },
];
