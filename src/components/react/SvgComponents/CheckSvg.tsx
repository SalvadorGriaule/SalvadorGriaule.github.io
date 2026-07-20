import { useEffect, useRef } from "react"
import { fillSVG } from "@assets/ts/svgFunc"

export default function CheckSvg({ check }:{check:boolean|undefined}) {
    const svgRef = useRef<SVGSVGElement>(null)
    
    useEffect(() => {
    check ? fillSVG(svgRef.current,'#16a34a') : fillSVG(svgRef.current, "#71717a")
   },[check])
    return (
    <svg
    ref={svgRef}
    className="h-full w-full"
    viewBox="0 0 19.999999 19.999999"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M 8.2405323e-8,10.0492 C 8.2405323e-8,4.5263506 4.4771501,0.04920056 10.000001,0.04920056 c 5.5228,0 10,4.47715004 10,9.99999944 0,5.5228 -4.4772,10 -10,10 C 4.4771501,20.0492 8.2405323e-8,15.572 8.2405323e-8,10.0492 Z M 13.707101,7.3420906 c 0.3905,0.39053 0.3905,1.02371 0,1.41421 l -3.6828,3.6827994 c -0.5657005,0.5657 -1.4829005,0.5657 -2.0486205,0 L 6.2928901,10.7563 c -0.39052,-0.3905 -0.39052,-1.0236994 0,-1.4141994 0.39053,-0.3905 1.02369,-0.3905 1.41422,0 L 9.0000005,10.635 12.292901,7.3420906 c 0.3905,-0.39052 1.0237,-0.39052 1.4142,0 z"
    fill="#323232"
    />
    </svg>
    )
}
