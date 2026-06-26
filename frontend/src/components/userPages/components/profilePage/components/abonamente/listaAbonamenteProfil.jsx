//import { useState } from "react";
import { NavLink } from "react-router";
import CardListaAbonamente from "./cardListaAbonamente";

function ListaAbonamenteProfil({ data }) {

  return <div className="flex flex-col md:flex-row gap-5 w-full">
        {data.length > 0 ? (
            data.map((abonament, index) => {
                return <CardListaAbonamente key={index} dataAbonament={abonament}/>
            })
        ) : (
            <h1>
          Nu ai nici un abonament activ.{" "}
          <NavLink
            to="/abonamente"
            className="text-[#3454E3] md:hover:text-[#3454E3]"
          >
            Cumpără unul aici
          </NavLink>
        </h1>
        )}
    </div>
}

export default ListaAbonamenteProfil;
