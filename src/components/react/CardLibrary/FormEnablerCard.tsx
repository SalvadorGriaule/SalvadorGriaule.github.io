import FormEnabler from "@react/FormEnabler";
import { RGPDisVisible } from "@react/context/ContextAuth";
import RGPD from "@react/RGPDFenetre"
import { useState } from "react";

export default function FormEnablerCard() {
    const [affRGPD, setAffRGPD] = useState(false)
    return (
        <RGPDisVisible value={setAffRGPD}>
            <div className="flex flex-col items-center justify-center w-full h-[50vh]">
                <div className=" bg-white flex flex-col items-center p-2 rounded-2xl drop-shadow-2xl w-3/4 space-y-1.5">
                    <FormEnabler formEntry={new Set(['nom',"prenom",'tel',"email", "new_password", "checkboxRGPD"])} />
                </div>
            </div>
            {affRGPD && (<RGPD/>)}
        </RGPDisVisible>
    )
}