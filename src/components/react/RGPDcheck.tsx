import { useState, useCallback, useContext, type SetStateAction, type JSX } from "react";
import CloseSvg from "./SvgComponents/CloseSvg";
import { ValidatorDispatchContext } from "./context/ContextAuth";
import { testList } from "@assets/ts/inputCheck";

function RGPDCheck({ RGPDText }: { RGPDText: () => JSX.Element }) {
    const [switcher, setSwitcher] = useState(false);
    const [entry, setEntry] = useState<string>("");
    const handleSelect = useCallback((input: SetStateAction<boolean>) => {
        setSwitcher(input)
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
            {switcher && (
                <div className="flex justify-center absolute z-100 left-0 top-0 w-full h-screen bg-[rgba(0,0,0,0.55)]">
                    <div className="bg-white mt-28 w-[92.5%] h-[66vh] ml-[2.5%] p-2 py-1 overflow-hidden rounded-md shadow-lg shadow-zinc-700 lg:h-[70vh] lg:w-[70%] xl:w-1/2">
                        <div className="w-full px-.5 flex justify-end">
                            <button
                                onClick={() => handleSelect(false)} className="flex justify-end w-6 h-6 pt-1 pr-1">
                                <CloseSvg />
                            </button>
                        </div>
                        <div className="h-[60vh] overflow-y-scroll lg:h-[65vh] xl:text-lg border-cyan-600 border-2 p-2 m-2 overflow-hidden rounded">
                            <RGPDText />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default RGPDCheck