import { validationPW } from "@assets/ts/inputCheck";
import { useActiveElement } from "./module/activeElement";
import { useCallback, useContext, useRef, useEffect, useState, type ActionDispatch, useMemo } from "react";
import CheckSvg from "./SvgComponents/CheckSvg";
import Eye from "./Eye";
import anime from "animejs";
import { allCheck } from "./module/state";
import type { InputType } from "./module/type";

export default function PassWordInput({ mode, context }: {
    mode: "new" | "change" | "input", context: ActionDispatch<[target: {
        name: InputType;
        isValid: boolean;
    }]>
}) {

    const [critMsg, setCritMsg] = useState<(undefined | boolean)[]>(new Array(allCheck.length).fill(undefined))
    const [pwdValid, setPwdValid] = useState<boolean | undefined>(undefined)
    const [ifVisible, setIfVisible] = useState<boolean>(false)
    const [isUnfold, setIsUnfold] = useState<boolean>(false)
    const critDiv = useRef<HTMLDivElement | null>(null)
    const input = useRef<HTMLInputElement | null>(null)
    const wrapper = useRef<HTMLDivElement | null>(null)
    const dispatch = useContext(context)
    const active = useActiveElement()

    const animeFocus = (sens: "focus" | "blur") => {
        anime({
            targets: critDiv.current,
            duration: 400,
            height: sens == "focus" ? "120px" : "0px",
            easing: "easeOutSine",
        })
        setIsUnfold(sens == "focus");
    }

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        e.preventDefault()
        setIfVisible(!ifVisible)
    }, [ifVisible])

    const handleChange = useCallback((input: React.ChangeEvent) => {
        const valid = validationPW(allCheck, input.target.value);
        setPwdValid(input.target.value == "" ? undefined : !valid.disabled)
        setCritMsg(valid.test);
        if (dispatch) dispatch({ name: mode + "_password", isValid: valid.disabled })
    }, []);

    useEffect(() => {
        animeFocus(!wrapper.current?.contains(active ?? null) ? 'blur' : "focus")
    }, [active])

    return (
        <div ref={wrapper} className="flex flex-col w-full space-y-1.5">
            <div className={`flex overflow-hidden border rounded-xl relative ${isUnfold ? "outline-2 outline-solid outline-offset-0" : ""} ${pwdValid == undefined ? "border-zinc-600" : pwdValid ? "border-green-600 outline-green-600" : "border-red-600 outline-red-600"}`}>
                <input required ref={input} className="p-1.5 w-full placeholder:text-center" type={ifVisible ? "text" : "password"} name={mode == 'change' ? "newPassword" : "password"} placeholder={`${mode == "change" ? "Nouveau" : ""} Mot de passe`} onChange={handleChange}></input>
                <button className="absolute w-6 h-9  right-4 flex justify-center items-center" onClick={handleClick}>
                    <Eye etat={ifVisible} />
                </button>
            </div>
            <div ref={critDiv} className="overflow-hidden" style={{ height: "0px" }}>
                {
                    mode != "input" && allCheck.map((elem, i) => (
                        <div key={i} className="flex space-x-2">
                            <div className="w-4">
                                <CheckSvg check={critMsg[i]} />
                            </div>
                            <p className={`${critMsg[i] ? "text-green-600" : "text-slate-600"}`}>{elem.msg}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}