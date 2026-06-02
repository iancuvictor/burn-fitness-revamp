function CardSala(props){
    return <div className='relative w-[100%] bg-black font-finlandica cursor-pointer rounded-xl overflow-hidden relative flex flex-col justify-center items-center'>
        <div className=" z-1 absolute top-0 w-full h-full md:opacity-40 md:bg-black hover:opacity-0 duration-150"></div>
        <div className='relative w-full'>
        <img src={props.img} alt="Imagine sală"  className='w-full h-60 object-cover object-top select-none'/>
        <div class="absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-70% to-transparent"></div>
        </div>
        <h1 className='flex items-center justify-center font-[600] h-20 text-[30px] text-white'>Fitness Burn {props.nume}</h1>
    </div>
}

export default CardSala;