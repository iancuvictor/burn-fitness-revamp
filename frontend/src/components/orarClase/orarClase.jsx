import { NavLink } from "react-router";
import CardClase from "./cardClase/cardClase";

const buttonStyle = 'cursor-pointer bg-black text-white p-[10px] bg-rose-900 hover:bg-rose-500 rounded-md duration-75 ease-out';

function OrarClase() {
  return (
    <div className="flex flex-col justify-center gap-5 items-center pt-20 pb-[50px] pl-5 pr-5 font-finlandica">
      <h1 className="text-[20px] text-white md:text-[35px] font-[700] pt-[30px] text-center">Clase</h1>
      <div className="w-full grid grid-cols-3 gap-5">
        <NavLink to='/salidefitness/sala-fitness-zorilor#orar'><button className={buttonStyle}>CLASE ZORILOR</button></NavLink>
        <NavLink to='/salidefitness/sala-fitness-sigma'><button className={buttonStyle}>CLASE SIGMA</button></NavLink>
        <NavLink to='/salidefitness/sala-fitness-marasti'><button className={buttonStyle}>CLASE MĂRĂȘTI</button></NavLink>
        <NavLink to='/salidefitness/sala-fitness-manastur'><button className={buttonStyle}>CLASE MĂNĂȘTUR</button></NavLink>
        <NavLink to='/salidefitness/sala-fitness-flora'><button className={buttonStyle}>CLASE FLORA</button></NavLink>
      </div>
    <div className="w-full flex flex-row flex-wrap justify-center items-center gap-2">
      <CardClase
        title="Fitness & Bodybuilding"
        img='https://www.burncluj.ro/wp-content/uploads/2023/02/thumbnail-768x1152.jpeg'
        />

      <CardClase
        title="Cycling"
        img='https://www.burncluj.ro/wp-content/uploads/2024/03/Cycling.jpg'
        />
      <CardClase
        title="Fitball"
        img='https://www.burncluj.ro/wp-content/uploads/2024/03/Fitball.jpg'
        />
      <CardClase
        title="Interval Training"
        img='https://www.burncluj.ro/wp-content/uploads/2022/08/Interval-Trainig.jpg'
        />
      <CardClase
        title="Burn & Pump"
        img='https://www.burncluj.ro/wp-content/uploads/2024/03/Burn-Pump-2.jpg'
        />
      <CardClase
        title="Step Dance Basic"
        img='https://www.burncluj.ro/wp-content/uploads/2017/11/step-1.jpg'
        />
      <CardClase
        title="Zumba Fitness"
        img='https://www.burncluj.ro/wp-content/uploads/2024/03/Zumba-Fitness-2.jpg'
        />
      <CardClase
        title="BODYART"
        img='https://www.burncluj.ro/wp-content/uploads/2022/08/BODYART.jpg'
        />
      <CardClase
        title="Pilates"
        img='https://www.burncluj.ro/wp-content/uploads/2022/08/Pilates.jpg'
        />
      <CardClase
        title="Toning"
        img='https://www.burncluj.ro/wp-content/uploads/2024/03/TONING-2.jpg'
        />
      <CardClase
        title="Capoeira pentru Copii"
        img='https://www.burncluj.ro/wp-content/uploads/2017/11/capoeira02.jpg'
        />
      <CardClase
        title="TRX"
        img='https://www.burncluj.ro/wp-content/uploads/2017/11/trx01-1.jpg'
        />
      <CardClase
        title="Abdomen, Fese, Coapse"
        img='https://www.burncluj.ro/wp-content/uploads/2022/08/ABDOMENE.FESE_.COAPSE.jpg'
        />
    </div>
        </div>
  );
}

export default OrarClase;
