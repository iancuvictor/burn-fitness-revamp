import { NavLink } from "react-router";
import CardClase from "./cardClase/cardClase";
import { useState } from "react";

const buttonStyle = `w-full cursor-pointer bg-black text-white font-[600] p-5
bg-rose-500 hover:bg-rose-500 rounded-md duration-75 ease-out`;

function Clase() {

  return (
    <div className="flex flex-col justify-center gap-2 items-center pb-[50px] pl-5 pr-5 font-finlandica">
      <h1 className="text-[20px] text-white md:text-[35px] font-[700] pt-[30px] text-center">Clase</h1>
    <div className={`w-full md:flex flex-row flex-wrap justify-center items-center gap-2 duration-400 ease-out`}>
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

export default Clase;
