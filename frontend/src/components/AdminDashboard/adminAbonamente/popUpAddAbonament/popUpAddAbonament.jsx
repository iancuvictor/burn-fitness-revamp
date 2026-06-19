import { useState } from "react";
import axios from "axios";

const inputStyle = "pt-[5px] pb-[5px] pl-[10px] pr-[10px] border-1";
const API_URL = import.meta.env.VITE_BACKEND_URL;

function PopUpAddAbonament({ displayedMenus, setDisplayedMenus }) {
  const defaultFormData = {
    highlighted: '',
    tier: "regular",
    titlu: "",
    desc: "",
    preturi: [],
  };
  const [formData, setFormData] = useState(defaultFormData);
  // const [imageFile, setImageFile] = useState(null);

  const adaugaAbonament = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/abonamente/adaugaAbonament`, formData);
    console.log(formData);
    setDisplayedMenus({ ...displayedMenus, popUpAddAbonament: false });
  };

  const adaugaPret = () => {
    const newPreturi = [...formData.preturi, { pret: "", duratie: "" }];
    setFormData({ ...formData, preturi: newPreturi });
  };

  const updateForm = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const updatePret = (field, index, value) => {
    setFormData({
      ...formData,
      preturi: formData.preturi.map((pret, i) => {
        return i === index ? { ...pret, [field]: Number(value) } : pret;
      }),
    });
  };

  return (
    <div className="bg-black/80 z-1 fixed top-0 left-0 h-full w-full flex justify-center items-center font-finlandica">
      <div className="relative z-5 flex flex-col w-150 h-fit bg-white p-[20px] rounded-md gap-5">
        <h1 className="font-[600]">Adaugă abonament</h1>
        <div className="flex flex-col gap-2">
          <div className="flex gap-5">
            <span>Highlighted:</span>
            <input onChange={(e) => updateForm('highlighted', e.target.value)} type="checkbox" />
          </div>
          <div className="flex gap-2">
            <span>Tier: </span>
            <select onChange={(e) => updateForm("tier", e.target.value)}>
              <option value="regular">Regular</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div className="flex w-full gap-10">
            <div className="flex flex-col gap-2 w-[70%]">
              <input
                className={inputStyle}
                onChange={(e) => updateForm("titlu", e.target.value)}
                type="text"
                name=""
                id=""
                placeholder="titlu"
              />
              <input
                className={inputStyle}
                onChange={(e) => updateForm("desc", e.target.value)}
                type="text"
                name=""
                id=""
                placeholder="descriere (opțională)"
              />
              <input
                className={inputStyle}
                onChange={(e) => updateForm("imagine", e.target.value)}
                type="text"
                name=""
                id=""
                placeholder="imagine"
              />
            </div>
            {/* <div className="w-[30%]">
              <div className="relative w-full overflow-hidden">
                <input onChange={(e) => {
                    setImageFile(e.target.files[0])
                }} className='w-full' type="file" placeholder="Adaugă banner" />
              </div>
            </div> */}
          </div>
          <button className="cursor-pointer" onClick={() => adaugaPret()}>
            Adaugă prețuri
          </button>
          <div className="flex flex-col gap-2">
            {formData.preturi.map((pret, index) => {
              return (
                <div className="flex gap-2" key={index}>
                  <input
                    onChange={(e) => updatePret("pret", index, e.target.value)}
                    className={inputStyle}
                    type="text"
                    value={pret.pret}
                    placeholder="preț"
                  />
                  <input
                    onChange={(e) =>
                      updatePret("duratie", index, e.target.value)
                    }
                    className={inputStyle}
                    type="text"
                    value={pret.duratie}
                    placeholder="durație"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={(e) => adaugaAbonament(e)}
            className={`flex justify-center items-center cursor-pointer p-[10px] rounded-md 
                bg-[#6E7DFF] hover:bg-[#6E7DFF] hover:text-white 
                duration-150 ease-out bg-[#57596E]`}
          >
            Adaugă abonamentul
          </button>
          <button
            onClick={() =>
              setDisplayedMenus({ ...displayedMenus, popUpAddAbonament: false })
            }
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
