import CardAbonament from "./cardAbonament/cardAbonament";

function Abonamente() {
  return (
    <div className="flex flex-col justify-center items-center w-full box-border pt-[50px]">
      <div
        id="listaAbonamente"
        className="relative w-full flex flex-row flex-wrap items-center justify-center gap-5"
      >
        <CardAbonament
          tier='premium'
          type='GOLD'
          titlu="FITNESS+AEROBIC"
          desc='Acces în toate locațiile BURN Fitness/Aerobic'
          optUnu="Lună"
          pretUnu="225 Lei"
          imagine="https://www.burncluj.ro/wp-content/uploads/2026/03/Burn-16.jpg"
        />
        <CardAbonament
          titlu="FITNESS FULL"
          optUnu="1 Lună"
          pretUnu="178 Lei"
          optDoi="3 Luni"
          pretDoi="445 Lei"
          optTrei="6 Lună"
          pretTrei="850 Lei"
          optPatru="12 Luni"
          pretPatru="1450 Lei"
          imagine="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltJTIwd2VpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D"
        />
        <CardAbonament
          titlu="AEROBIC FULL"
          optUnu="1 Lună"
          pretUnu="178 Lei"
          optDoi="3 Luni"
          pretDoi="445 Lei"
          optTrei="6 Lună"
          pretTrei="850 Lei"
          optPatru="12 Luni"
          pretPatru="1450 Lei"
          imagine="https://www.burncluj.ro/wp-content/uploads/2023/02/bc3.jpeg"
        />
        <CardAbonament
          titlu="FITNESS+AEROBIC FULL"
          optUnu="1 Lună"
          pretUnu="205 Lei"
          optDoi="3 Luni"
          pretDoi="525 Lei"
          optTrei="6 Lună"
          pretTrei="950 Lei"
          optPatru="12 Luni"
          pretPatru="1740 Lei"
          imagine="https://www.burncluj.ro/wp-content/uploads/2026/03/Burn-16.jpg"
        />
        <CardAbonament
        tier='premium'
        type='SILVER'
          titlu="FITNESS+AEROBIC"
          desc='Acces în toate locațiile BURN Fitness+Aerobic'
          optUnu="Lună"
          pretUnu="195 Lei"
          imagine="https://www.burncluj.ro/wp-content/uploads/2026/03/Burn-16.jpg"
        />
        <CardAbonament
          titlu="FITNESS MATINAL"
          optUnu="1 Lună"
          pretUnu="145 Lei"
          optDoi="3 Luni"
          pretDoi="360 Lei"
          optTrei="6 Lună"
          pretTrei="660 Lei"
          optPatru="12 Luni"
          pretPatru="1200 Lei"
          imagine="https://www.burncluj.ro/wp-content/uploads/2025/01/Sala-Fitness-Flora-13.jpg"
        />
        <CardAbonament
          titlu="PERSONAL TRAINER"
          optUnu="1 Lună"
          pretUnu="60 Lei"
          optDoi="3 Luni"
          pretDoi="430 Lei"
          optTrei="6 Lună"
          pretTrei="580 Lei"
          imagine="https://www.burncluj.ro/wp-content/uploads/2023/02/bc8.jpeg"
        />
        <CardAbonament
          titlu="ONE BURN DAY"
          optUnu="1 Lună"
          pretUnu="30 Lei"
          imagine="https://www.burncluj.ro/wp-content/uploads/2026/03/Burn-11-1.jpg"
        />
      </div>
    </div>
  );
}

export default Abonamente;
