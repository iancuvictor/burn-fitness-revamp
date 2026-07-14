function CardSala(props){
    return <div className='relative w-[100%] bg-black font-finlandica cursor-pointer rounded-xl overflow-hidden 
        flex flex-col justify-center items-center ring-1 ring-white'>
            {props.status === 'dezafectata' && 
            <div className="absolute w-full h-full bg-black/80 z-2 text-white text-[20px] font-[700]
            flex items-center justify-center">PAGINA NU ARE CONȚINUT</div>}
        <div className=" z-1 absolute top-0 w-full h-full md:opacity-20 md:bg-black hover:opacity-0 duration-150"></div>
        <div className='relative w-full'>
        <img src={props.img} alt="Imagine sală"  className='w-full h-60 object-cover object-top select-none'/>
        <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-20% to-transparent"></div>
        </div>
        <h1 className='flex items-center justify-center font-[600] h-20 text-[30px] text-white'>Fitness Burn {props.nume}</h1>
    </div>
}

export default CardSala;