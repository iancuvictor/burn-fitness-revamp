import { useState } from "react";

function PopUpAddAbonament({displayedMenus, setDisplayedMenus}) {
    const defaultFormData = {
        tier: '',
        titlu: '',
        desc: '',
        preturi: [],
        imagine: ''
    }
    const [formData, setFormData] = useState(defaultFormData)

  const adaugaAbonament = (e) => {
    e.preventDefault();
    setDisplayedMenus({...displayedMenus, popUpAddAbonament: false})
  };

  const updateForm = (field, value) => {
    setFormData({...formData, [field]: value});
    console.log(formData)
  }

  return (
    <div className="bg-black/80 z-3 fixed top-0 left-0 h-full w-full flex justify-center items-center">
      <div className="flex flex-col bg-white p-[20px] rounded-md">
        <div className="flex flex-col">
            <select onChange={(e) => updateForm('tier', e.target.value)} name="" id="">
                <option value="premium">premium</option>
                <option value="regular">regular</option>
            </select>
            <input onChange={(e) => updateForm('titlu', e.target.value)} type="text" name="" id="" placeholder="titlu"/>
            <input onChange={(e) => updateForm('desc', e.target.value)} type="text" name="" id="" placeholder="descriere (opțională)"/>
            <button>Adaugă prețuri</button>
            <input type="text" name="" id="" placeholder="preț"/>
            <input type="text" name="" id="" placeholder="durație"/>
            <input onChange={(e) => updateForm('imagine', e.target.value)} type="text" name="" id="" placeholder="imagine"/>
        </div>
          <div className="flex justify-between">
            <button
              onClick={(e) => adaugaAbonament(e)}
              className={`flex justify-center items-center cursor-pointer p-[10px] rounded-md 
                bg-[#6E7DFF] hover:bg-[#6E7DFF] hover:text-white 
                duration-150 ease-out bg-[#57596E] p-[10px] rounded-md`}
            >
              Adaugă abonamentul
            </button>
            <button onClick={() => setDisplayedMenus({...displayedMenus, popUpAddAbonament: false})}
              className="cursor-pointer p-[10px] rounded-md
            shadow-md hover:shadow-xl duration-150 ease-out bg-white"
            >
              Anulează
            </button>
          </div>
      </div>
    </div>
  );
}

export default PopUpAddAbonament;
