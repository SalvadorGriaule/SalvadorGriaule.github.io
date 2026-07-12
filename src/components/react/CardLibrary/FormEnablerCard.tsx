import FormEnabler from "@react/FormEnabler";

export default function FormEnablerCard() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-[50vh] relative">
            <div className=" bg-white flex flex-col items-center p-2 rounded-2xl drop-shadow-2xl w-3/4 space-y-1.5">
                <FormEnabler formEntry={new Set(["email", "new_password", "checkboxRGPD"])} />
            </div>
        </div>
    )
}