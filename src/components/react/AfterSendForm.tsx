function AfterSendForm({ succes, error }: { succes?: string, error?: string }) {
    console.log(succes, error);
    if (succes != "") {
        return (
            <div className="p-2 m-1 bg-green-600 rounded-lg text-white text-center">
                <p>{succes}</p>
            </div>)
    } else if (error != "") {
        return (
            <div className="p-2 m-1 bg-red-600 rounded-lg text-white text-center">
                <p>{error}</p>
            </div>
        )
    }
}

export default AfterSendForm