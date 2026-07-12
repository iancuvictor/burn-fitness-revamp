function CardListaClase({clasa}) {
  return <div
    className="flex flex-col gap-2 w-full md:w-fit
    shadow-md p-5 rounded-md font-finlandica ring-2"
  >
    <div className="flex flex-col items-baseline justify-between">
      <div className="flex flex-col items-baseline justify-between gap-1">
        <h1 className="font-[700] text-[18px] flex flex-col">
          <span className="font-[700] text-[18px]">[{clasa.locatie.toUpperCase()}]</span>
          <span className="font-[700] text-[16px]">{clasa.className}<span className="font-[500] text-[14px]"> cu {clasa.antrenor}</span></span>
        </h1>
        <span>
          {clasa.zi}: {clasa.ora} [{new Date(clasa.date).toLocaleDateString()}]
        </span>
      </div>
      <span className="text-[14px]"></span>
    </div>
  </div>;
}

export default CardListaClase;
