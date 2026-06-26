function CardListaClase({clasa}) {
  return <div
    className="flex flex-col gap-2 w-full md:w-fit
    shadow-md p-5 rounded-md font-finlandica ring-2"
  >
    <div className="flex flex-col items-baseline justify-between">
      <div className="flex flex-col items-baseline justify-between gap-1">
        <h1 className="font-[700] text-[18px]">
          <span className="font-[700] text-[18px]">[{clasa.locatie.toUpperCase()}]</span> {clasa.className}{" "}
          <span className="text-[14px] font-[500]">cu {clasa.antrenor}</span>
        </h1>
        <span>
          {clasa.zi}: {clasa.ora}
        </span>
        <h2>
          Clasă programată în: {new Date(clasa.date).toLocaleDateString()}
        </h2>
      </div>
      <span className="text-[14px]"></span>
    </div>
  </div>;
}

export default CardListaClase;
