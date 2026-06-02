import { NavLink } from "react-router";
import CardSala from "./cardSala/cardSala";

const data = [
    {nume: 'Zorilor',
        img: 'https://www.burncluj.ro/wp-content/uploads/2022/10/Burn-Zorilor.jpg',
    },
    
    {nume: 'Sigma',
        img: 'https://www.burncluj.ro/wp-content/uploads/2026/01/Fitness-Sigma-Cluj-Napoca.jpg',
    },

    {nume: 'Mănăștur',
        img: 'https://www.burncluj.ro/wp-content/uploads/2022/10/MRS03579-HDR.jpg',
    },

    {nume: 'Flora',
        img: 'https://www.burncluj.ro/wp-content/uploads/2025/01/Sala-Fitness-Flora-20.jpg',
    },

    {nume: 'Mărăști',
        img: 'https://www.burncluj.ro/wp-content/uploads/2023/02/bc5.jpeg',
    },
]

function SaliDeFitness(){
    return <div className='font-finlandica flex flex-col justify-center items-center'>
        <h1 className='text-[20px] text-center md:text-[35px] font-[700] pb-[50px] pt-[50px]'>DESCOPERĂ LOCAȚIILE FITNESS <span className='underline underline-offset-5'>BURN CLUJ-NAPOCA</span></h1>
        <div className='relative flex flex-wrap gap-10 justify-center items-center pl-[20px] pr-[20px]'>
        {data.map((sala) => {
            return <NavLink className='w-full md:w-[30%]' to={'sala-fitness-' + sala.nume.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "").toLowerCase()}><CardSala nume={sala.nume} img={sala.img}/></NavLink>
        })}
        </div>
    </div>
}

export default SaliDeFitness;