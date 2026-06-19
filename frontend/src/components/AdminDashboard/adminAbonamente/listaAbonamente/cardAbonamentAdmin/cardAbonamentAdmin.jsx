import PopUp from "../../../../popUps/popUp";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClone,
  faSquarePlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function CardAbonamentAdmin({ data, getData }) {
  const [subscriptionData, setSubscriptionData] = useState({
    highlighted: data.highlighted,
    _id: data._id,
    tier: data.tier,
    titlu: data.titlu,
    desc: data.desc,
    preturi: data.preturi,
  });
  const [alert, setAlert] = useState({
    duplicate: false,
    update: false,
  });

  const duplicateSubscription = async (data) => {
    await axios.post(`${API_URL}/abonamente/adaugaAbonament`, data);
    setAlert({ ...alert, duplicate: false });
    getData();
  };

  const updateSubscriptionData = (field, value) => {
    setSubscriptionData({ ...subscriptionData, [field]: value });
  };

  const removePret = (id) => {
    setSubscriptionData({
      ...subscriptionData,
      preturi: subscriptionData.preturi.filter((item, index) => index !== id),
    });
  };

  const adaugaPret = () => {
    const newPreturi = [...subscriptionData.preturi, { pret: "", duratie: "" }];
    setSubscriptionData({ ...subscriptionData, preturi: newPreturi });
  };

  const updatePret = (field, index, value) => {
    setSubscriptionData({
      ...subscriptionData,
      preturi: subscriptionData.preturi.map((pret, i) => {
        return i === index ? { ...pret, [field]: Number(value) } : pret;
      }),
    });
  };

  const updateAbonament = async () => {
    await axios.put(`${API_URL}/abonamente/updateAbonament`, subscriptionData);
    setAlert({ ...alert, update: false });
    getData();
  };

  const deleteAbonament = async () => {
    await axios.delete(`${API_URL}/abonamente/stergeAbonament`, {
      data: { _id: subscriptionData._id },
    });
    getData();
  };

  return (
    <div className="w-100 font-finlandica p-[20px] shadow-md bg-white">
      <div
        className={`${alert.duplicate ? "z-4 fixed top-0 left-0" : "hidden"}`}
      >
        <PopUp
          type="alert"
          message="Ești sigur că vrei să creezi o clonă a acestui abonament?"
          ifYes={() => duplicateSubscription(data)}
          ifNo={() => setAlert({ ...alert, duplicate: false })}
        />
      </div>
      <div className={`${alert.update ? "z-4 fixed top-0 left-0" : "hidden"}`}>
        <PopUp
          type="alert"
          message="Ești sigur că vrei să actualizezi acest abonament?"
          ifYes={() => updateAbonament()}
          ifNo={() => setAlert({ ...alert, update: false })}
        />
      </div>
      <div className="flex gap-5 items-center justify-center">
        <div className="flex gap-2">
          <span>Highlighted</span>
          <input
            onChange={(e) =>
              updateSubscriptionData("highlighted", e.target.checked)
            }
            checked={subscriptionData.highlighted}
            type="checkbox"
          />
        </div>
        <div className="flex">
          <span>Tier:</span>
          <select
            onChange={(e) => updateSubscriptionData("tier", e.target.value)}
            name=""
            id=""
            value={subscriptionData.tier}
          >
            <option value="regular">Regular</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <button
          onClick={() => deleteAbonament()}
          className="h-fit w-[30px] shadow-md hover:shadow-xl cursor-pointer bg-[#F06E87]
                hover:bg-[#DE264B] md:hover:text-white pt-[2px] pb-[2px] rounded-md duration-150 ease-out"
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
      <div className="flex gap-2">
        <span>Titlu:</span>
        <input
          onChange={(e) => updateSubscriptionData("titlu", e.target.value)}
          type="text"
          value={subscriptionData.titlu}
        />
      </div>
      <div className="flex gap-2">
        <span>Descriere:</span>
        <textarea
          className="h-fit pl-[10px] pr-[10px]"
          onChange={(e) => updateSubscriptionData("desc", e.target.value)}
          type="text"
          value={subscriptionData.desc}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-5">
          <span>Prețuri</span>
          <button className="cursor-pointer" onClick={() => adaugaPret()}>
            <FontAwesomeIcon icon={faSquarePlus} />
          </button>
        </div>
        {subscriptionData.preturi.map((pret, index) => {
          return (
            <div
              className="relative w-full flex items-center justify-between gap-1"
              key={index}
            >
              <div className="flex gap-3">
                <div className="flex gap-0">
                  <span>Preț:</span>
                  <input
                    type="text"
                    onChange={(e) => updatePret("pret", index, e.target.value)}
                    value={pret.pret}
                    className="w-20 pl-[5px] pr-[5px]"
                  />
                  <span>Lei</span>
                </div>
                <div className="flex gap-2">
                  <span>Durație:</span>
                  <input
                    type="text"
                    onChange={(e) =>
                      updatePret("duratie", index, e.target.value)
                    }
                    value={pret.duratie}
                    className="w-20 pl-[5px] pr-[10px]"
                  />
                </div>
              </div>
              <button
                onClick={() => removePret(index)}
                className="h-fit w-[30px] shadow-md hover:shadow-xl cursor-pointer bg-[#F06E87]
                hover:bg-[#DE264B] md:hover:text-white pt-[2px] pb-[2px] rounded-md duration-150 ease-out"
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setAlert({ ...alert, duplicate: true })}
          className="cursor-pointer p-[10px] bg-indigo-500 rounded-md "
        >
          <FontAwesomeIcon icon={faClone} />
          Clone
        </button>
        <button
          onClick={() => setAlert({ ...alert, update: true })}
          className="cursor-pointer p-[10px] bg-indigo-500 rounded-md "
          disabled={
            data.tier === subscriptionData.tier &&
            data.titlu === subscriptionData.titlu &&
            data.desc === subscriptionData.desc &&
            data.preturi === subscriptionData.preturi &&
            data.highlighted === subscriptionData.highlighted
              ? true
              : false
          }
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default CardAbonamentAdmin;
