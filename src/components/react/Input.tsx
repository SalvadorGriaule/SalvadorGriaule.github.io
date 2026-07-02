import { useCallback, useMemo, useState, useContext } from "react";
import { type InputType } from "./module/type";
import { mapOpt } from "./module/state";
import { ValidatorDispatchContext } from "./context/ContextAuth";

export default function Input({ inputType, defaultVal = "" }: { inputType: InputType, defaultVal?: string }) {
    const current = mapOpt.get(inputType);
    if (current) {
        const [entry, setEntry] = useState<string>("");
        const dispatch = useContext(ValidatorDispatchContext)
        const handleChange = useCallback((input: React.ChangeEvent) => {
            setEntry(input.target.value)
        }, [entry])

        const isValid = useMemo(
            () => {
                const test = current.fn(entry)
                if (dispatch) dispatch({ name: inputType, isValid: test == undefined ? true : !test })
                switch (test) {
                    case true:
                        return "border-green-600"
                    case false:
                        return "border-red-600"
                    default:
                        return "border-zinc-600"
                }
            }, [entry]
        )
        return (
            <input className={"border p-2 rounded-2xl w-full " + isValid} type={current.type} name={current.name} placeholder={current.placeholder} onChange={handleChange} />
        )
    }
    return (<p>
        Erreur initilization
    </p>)
}