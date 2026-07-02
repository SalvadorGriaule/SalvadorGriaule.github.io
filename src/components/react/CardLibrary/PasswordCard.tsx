import FormEnabler from "../FormEnabler"
export default function PasswordCard() {

    return (<div className="flex flex-col items-center justify-center w-full h-[50vh]">
        <div className="bg-white flex flex-col items-center p-2 rounded-2xl drop-shadow-2xl w-full lg:w-3/4">
            <FormEnabler formEntry={new Set(["new_password"])}/>
        </div>
    </div>)
}