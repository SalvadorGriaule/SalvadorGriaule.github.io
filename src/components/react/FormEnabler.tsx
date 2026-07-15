import { type InputType } from "./module/type";
import Input from "./Input";
import { useMemo, useCallback, useState } from "react";
import { ValidatorContext, ValidatorDispatchContext } from "./context/ContextAuth";
import PassWordInput from "./PasswordInput";
import RGPDCheck from "./RGPDcheck";

export default function FormEnabler({ formEntry, nameSubmit = "" }: { formEntry: Set<InputType>, nameSubmit?: string }) {
    const [validationMap, setValidationMap] = useState(() => {
        const map = new Map<InputType, boolean>();
        formEntry.forEach(elem => map.set(elem, true));
        return map;
    });

    const dispatch = useCallback((action: { name: InputType, isValid: boolean }) => {
        setValidationMap(prev => {
            if (prev.get(action.name) === action.isValid) return prev;
            const next = new Map(prev);
            next.set(action.name, action.isValid);
            return next;
        });
    }, []);

    const isEnable = useMemo(
        () => ![...validationMap.values()].every((elem) => elem === false),
        [validationMap]
    );

    return (
        <ValidatorContext value={validationMap}>
            <ValidatorDispatchContext value={dispatch} >
                {[...formEntry].map((elem, i) => {
                    if (elem.includes("password")) return (
                        <PassWordInput key={i} mode={elem.split("_")[0]} context={ValidatorDispatchContext} />
                    )
                    if (elem == "checkboxRGPD") return (
                        <RGPDCheck key={i} />
                    )
                    return (< Input key={i} inputType={elem} />)
                })}
                <input type="submit" name={nameSubmit} value="Envoyer" disabled={isEnable} className="p-2 bg-green-600 disabled:bg-slate-400 disabled:text-black duration-150 rounded-2xl text-white" />
            </ValidatorDispatchContext>
        </ValidatorContext>
    )
}