import { useState, useCallback, useContext, type SetStateAction } from "react";
import { ValidatorDispatchContext, RGPDisVisible } from "./context/ContextAuth";
import { testList } from "@assets/ts/inputCheck";

function RGPDCheck() {
    const [entry, setEntry] = useState<string>("");

    const switcher = useContext(RGPDisVisible)
    const handleSelect = useCallback((input: SetStateAction<boolean>) => {
        if (switcher) switcher(true)
    }, [])

    const dispatch = useContext(ValidatorDispatchContext)
    const handleChange = useCallback((input: React.ChangeEvent) => {
        setEntry(input.target.checked)
        if (dispatch) dispatch({ name: "checkboxRGPD", isValid: !testList.check(input.target.checked) })
    }, [entry])
    return (
        <>
            <div className="flex items-center space-x-2">
                <input onChange={(e) => handleChange(e)} type="checkbox" name="RGPD" />
                <p>
                    En cochant cette case vous accepter notre <a className="text-sky-700 underline" onClick={() => handleSelect(true)}> politique de confidentialité</a>
                </p>
            </div>

        </>
    )
}

export default RGPDCheck