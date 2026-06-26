function TemporaryPopUp({title, message}){
    return <div className="bg-lime-400 p-5 rounded-xl shadow-xl w-fit">
        <h1>{title}</h1> 
        <span>{message}</span>
        </div>

}

export default TemporaryPopUp;