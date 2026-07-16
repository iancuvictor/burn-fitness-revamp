function PopUp({ type, message, ifYes, ifNo }) {
  let styleObj = {
    alert: "bg-white text-[18px]",
  };

  return (
    <div className="z-4 p-0 m-0 fixed top-0 left-0 bg-[#050505]/90 min-h-screen min-w-screen 
    flex items-center justify-center font-finlandica">
      <div className={`${styleObj[type]} p-[25px] flex flex-col gap-5 rounded-md`}>
        <span>{message}</span>
        <div className="flex justify-evenly">
          <button
            onClick={() => ifYes()}
            className="shadow-md md:hover:shadow-xl cursor-pointer md:bg-rose-400 bg-[#DE264B] text-white
            md:hover:bg-[#DE264B] md:hover:text-white p-[10px] rounded-md w-[40%] duration-150 ease-out"
          >
            Confirm
          </button>
          <button
            onClick={ifNo}
            className="shadow-md md:hover:shadow-xl cursor-pointer text-gray-800 md:hover:text-black p-[10px] rounded-md w-[40%] duration-150 ease-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
