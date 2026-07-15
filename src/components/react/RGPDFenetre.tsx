import { useCallback, useContext } from "react"
import CloseSvg from "./SvgComponents/CloseSvg"
import { RGPDisVisible } from "./context/ContextAuth"

function FalseRGPD() {
    return (
        <div className="p-1">
            <h2 className="mb-2 text-center text-cyan-600 italic text-xl">
                Réglement général sur la protection des données
            </h2>
            <p
                className=" overflow-y-scroll h-80 xl:text-lg border-cyan-600 border-2 p-2 overflow-hidden rounded"
            >
                Les informations recueillies sur ce formulaire sont enregistrées
                dans un fichier informatisé par <span className="text-cyan-600"
                >Quentin Morales</span>
                pour
                <span className="text-cyan-600"
                >pouvoir prendre contact avec les pesonnes intérresé par nos
                    services</span>
                .<br className="mb-2" /> La base légale du traitement est [base
                légale du traitement]. Les données collectées seront
                communiquées aux seuls destinataires suivants :
                <span className="text-cyan-600">Yzel Conseils</span>. Les données
                sont conservées
                <span className="text-cyan-600">pendant 3 mois</span>.<br
                    className="mb-2"
                />
                Vous pouvez accéder aux données vous concernant, les rectifier, demander
                leur effacement ou exercer votre droit à la limitation du traitement
                de vos données. (en fonction de la base légale du traitement, mentionner
                également : Vous pouvez retirer à tout moment votre consentement
                au traitement de vos données ; Vous pouvez également vous opposer
                au traitement de vos données ; Vous pouvez également exercer votre
                droit à la portabilité de vos données)
                <br className="mb-2" />Consultez le site cnil.fr pour plus
                d’informations sur vos droits. Pour exercer ces droits ou pour
                toute question sur le traitement de vos données dans ce
                dispositif, vous pouvez contacter (le cas échéant, notre délégué
                à la protection des données ou le service chargé de l’exercice
                de ces droits) : [adresse électronique, postale, coordonnées
                téléphoniques, etc.]<br className="mb-2" /> Si vous estimez, après nous
                avoir contactés, que vos droits « Informatique et Libertés » ne sont
                pas respectés, vous pouvez adresser une réclamation à la CNIL.
            </p>
        </div>
    )
}

export default function RGPDFenetre() {
    const switcher = useContext(RGPDisVisible)

    const handleSelect = useCallback(() => {

        if (switcher) switcher(false)
    }, [])
    return (
        <div className="flex justify-center absolute z-100 left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.55)] backdrop-blur-sm">
            <div className="bg-white mt-28 w-[92.5%] h-2/3 ml-[2.5%] px-2 py-1 overflow-hidden rounded-md shadow-lg shadow-zinc-700 lg:w-3/4">
                <button
                    onClick={() => handleSelect()} className="flex justify-end h-6 w-full pt-1 pr-1">
                    <div className="w-6">
                        <CloseSvg />
                    </div>
                </button>
                <div className="p-1">
                    <FalseRGPD />
                </div>
            </div>
        </div>
    )
}