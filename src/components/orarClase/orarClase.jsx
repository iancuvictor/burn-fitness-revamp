import CardClase from "./cardClase/cardClase";

function OrarClase() {
  return (
    <div className="flex flex-col justify-center items-center pb-[50px]">
      <h1 className="text-[20px] md:text-[35px] font-[700] pb-[30px] pt-[30px] text-center">Orar Clase</h1>
    <div className="flex flex-row flex-wrap justify-center items-center gap-2">
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
