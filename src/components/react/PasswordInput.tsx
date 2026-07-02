import { validationPW } from "@assets/ts/inputCheck";
import { useCallback, useContext, useEffect, useRef, useState, type ActionDispatch } from "react";
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

    const critDiv = useRef<HTMLDivElement | null>(null)
    const input = useRef<HTMLInputElement | null>(null)

    const dispatch = useContext(context)

    const animeFocus = (sens: "focus" | "blur") => {
        console.log(sens == "focus", critDiv.current?.style.height);
        anime({
            targets: critDiv.current,
            duration: 400,
            height: sens == "focus" ? "120px" : "0px",
            easing: "easeOutSine",
        })
    }

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        e.preventDefault()
        setIfVisible(!ifVisible)
    }, [ifVisible])

    const handleFocus = useCallback(() => {
        animeFocus("focus")
    }, [])

    const handleBlur = useCallback(() => {
        animeFocus("blur")
    }, [])

    const handleChange = useCallback((input: React.ChangeEvent) => {
        const valid = validationPW(allCheck, input.target.value);
        setPwdValid(input.target.value == "" ? undefined : !valid.disabled)
        setCritMsg(valid.test);
        if (dispatch) dispatch({ name: mode + "_password", isValid: valid.disabled })
    }, []);

    useEffect(() => {
        console.log(critMsg);
    })

    return (
        <div className="flex flex-col w-full space-y-1.5">
            <div className={`flex overflow-hidden border rounded-xl relative ${pwdValid == undefined ? "border-zinc-600" : pwdValid ? "border-green-600" : "border-red-600"}`}>
                <input required ref={input} onBlur={() => handleBlur()} onFocus={() => handleFocus()} className="p-1.5 w-full placeholder:text-center" type={ifVisible ? "text" : "password"} name={mode == 'change' ? "newPassword" : "password"} placeholder={`${mode == "change" ? "Nouveau" : ""} Mot de passe`} onChange={handleChange}></input>
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