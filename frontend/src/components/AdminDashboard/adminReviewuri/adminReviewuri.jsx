const inputStyle = `border rounded-xs gap-2 pl-1 pr-1`

export default function AdminReviewuri() {
    return <div className="min-h-[calc(100vh-5rem)] bg-white font-finlandica flex flex-col items-center pt-5">
        <h1 className="text-[20px] font-[700]">Administrează recenziile</h1>
        <div className="shadow-md/20 p-5 rounded-md flex flex-col gap-2 w-100">
            <span className="text-[18px] font-[600]">Adaugă recenzie</span>
            <div className="flex flex-col gap-2">
                <span className="flex flex-col">
                    <span>Sala:</span>
                    <input type="text" name="" id="" className={inputStyle} />
                </span>
                <span className="flex flex-col">
                    <span>Numele persoanei:</span>
                    <input type="text" name="" id="" className={inputStyle} />
                </span>
                <span className="flex flex-col">
                    <span>Comentariu:</span>
                    <textarea type="text" name="" id="" className={inputStyle} />
                </span>
                <span className="flex flex-col">
                    <span>Număr de stele:</span>
                    <input type="number" min='0' max='5' name="" id="" className={inputStyle} />
                </span>
            </div>
            <button className="cursor-pointer bg-rose-500 p-2 text-white w-full rounded-md">Postează recenzia</button>
        </div>
    </div>
}