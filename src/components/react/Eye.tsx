import EyeSvg from "./SvgComponents/EyeSvg"
import ClosedEyeSvg from "./SvgComponents/ClosedEye"

export default function Eye({ etat }: { etat: boolean }) {
    return (
        <div className="h-full w-full">
            {etat && (
                <EyeSvg />
            )}
            {!etat && (
                <ClosedEyeSvg />
            )}
        </div>
    )
}