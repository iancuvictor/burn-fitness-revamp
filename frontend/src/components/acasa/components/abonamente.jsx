const infoBarTextStyle = 'text-[20px] md:text-[30px] font-[700] text-white text-nowrap'

function Abonamente() {
  return (
    <div className="relative h-200 w-full flex flex-col items-center overflow-hidden">

      <div className="absolute top-0 flex w-full justify-around gap-4
            animate-[infoBar_8s_linear_infinite_reverse]
            md:animate-[infoBar_20s_linear_infinite_reverse]">
        <h1 className={infoBarTextStyle}>
          ABONAMENTELE<span className="text-redishPinkDark italic"> BURN FITNESS CLUJ-NAPOCA</span>
        </h1>
        <h1 className={infoBarTextStyle}>
          ABONAMENTELE<span className="text-redishPinkDark italic"> BURN FITNESS CLUJ-NAPOCA</span>
        </h1>
        <h1 className={infoBarTextStyle}>
          ABONAMENTELE<span className="text-redishPinkDark italic"> BURN FITNESS CLUJ-NAPOCA</span>
        </h1>
        <h1 className={infoBarTextStyle}>
          ABONAMENTELE<span className="text-redishPinkDark italic"> BURN FITNESS CLUJ-NAPOCA</span>
        </h1>
        <h1 className={infoBarTextStyle}>
          ABONAMENTELE<span className="text-redishPinkDark italic"> BURN FITNESS CLUJ-NAPOCA</span>
        </h1>
      </div>
        </div>
  );
}

export default Abonamente;
