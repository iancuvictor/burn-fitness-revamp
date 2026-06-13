import { useState } from "react";

const inputStyle = "pt-[5px] pb-[5px] pl-[10px] pr-[10px] border-1";

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

  const adaugaPret = () => {
    const newPreturi = [...formData.preturi, {pret: '', duratie: ''}]
    setFormData({...formData, preturi: newPreturi})
  }

  const updateForm = (field, value) => {
    setFormData({...formData, [field]: value});
    console.log(formData)
  }

  const updatePret = (field, index, value) => {
    setFormData({...formData, preturi: formData.preturi.map((pret, i) => {
        if(i === index){
            return {...pret, [field]: value};
        } else {
            return pret;
        }
    })})
  }

  return (
    <div className="bg-black/80 z-3 fixed top-0 left-0 h-full w-full flex justify-center items-center font-finlandica">
      <div className="flex flex-col w-150 h-fit bg-white p-[20px] rounded-md gap-5">
        <h1 className="font-[600]">Adaugă abonament</h1>
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <span>Tier: </span>
            <select onChange={(e) => updateForm('tier', e.target.value)} name="" id="">
                <option value="premium">Premium</option>
                <option value="regular">Regular</option>
            </select>
            </div>
            <input className={inputStyle}
            onChange={(e) => updateForm('titlu', e.target.value)} type="text" name="" id="" placeholder="titlu"/>
            <input className={inputStyle} onChange={(e) => updateForm('desc', e.target.value)} type="text" name="" id="" placeholder="descriere (opțională)"/>
            <button className="cursor-pointer" onClick={() => adaugaPret()}>Adaugă prețuri</button>
            <div className="flex flex-col gap-2">
                {formData.preturi.map((pret, index) => {
                    return <div className="flex gap-2" key={index}>
            <input onChange={(e) => updatePret('pret', index, e.target.value)} className={inputStyle} type="text" name="" id="" value={pret.pret} placeholder="preț"/>
            <input onChange={(e) => updatePret('duratie', index, e.target.value)} className={inputStyle} type="text" name="" id="" value={pret.duratie} placeholder="durație"/>
            </div>
                })}
            </div>
            <input className={inputStyle} onChange={(e) => updateForm('imagine', e.target.value)} type="text" name="" id="" placeholder="imagine"/>
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
