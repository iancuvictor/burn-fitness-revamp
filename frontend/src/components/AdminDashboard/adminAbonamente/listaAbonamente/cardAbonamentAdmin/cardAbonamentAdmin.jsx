function CardAbonamentAdmin({ data }) {
  return <div className="p-[20px] shadow-md">
      <div className="flex gap-2">
        <span>Tier</span>
        <input type="text" value={data.tier} />
      </div>
      <div className="flex gap-2">
        <span>Titlu</span>
        <input type="text" value={data.titlu} />
      </div>
      <div className="flex gap-2">
        <span>Descriere</span>
        <input type="text" value={data.desc} />
      </div>
      <div className="flex gap-2">
        <span>Prețuri</span>
        {data.preturi.map((pret) => {
          return (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <span>Preț</span>
                <input type="text" value={pret.pret} />
              </div>
              <div className="flex gap-2">
                <span>Durație</span>
                <input type="text" value={pret.duratie} />
              </div>
            </div>
          );
        })}
      </div>
      <img className="w-50"
      src={`http://localhost:3000/uploads/${data.imagine}`} alt="" />
    </div>
}

export default CardAbonamentAdmin;
