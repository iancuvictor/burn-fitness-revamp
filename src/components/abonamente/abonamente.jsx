import CardAbonament from "./cardAbonament/cardAbonament";

function Abonamente() {
  return (
    <div className="w-full box-border p-[20px]">
      <h1>ABONAMENTE</h1>
      <div id="listaAbonamente" className="w-full flex flex-col items-center gap-5">
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
        />
        <CardAbonament
          titlu="PERSONAL TRAINER"
          optUnu="1 Lună"
          pretUnu="60 Lei"
          optDoi="3 Luni"
          pretDoi="430 Lei"
          optTrei="6 Lună"
          pretTrei="580 Lei"
        />
        <CardAbonament titlu="ONE BURN DAY" optUnu="1 Lună" pretUnu="30 Lei" />
      </div>
    </div>
  );
}

export default Abonamente;
