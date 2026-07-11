import { NavLink } from "react-router";
import CardListaClase from "./cardListaClase";

function ListaClaseProfil({data}){

  return <div className="flex flex-col md:flex-row gap-5">
      {data.length > 0 ? (
        data.map((clasa, index) => {
          if(new Date(clasa.date).setHours(...clasa.ora.split(':')) > new Date().getTime()){
            return <CardListaClase key={index} clasa={clasa}/>  
          }
      })
      ) : (
        <h1>
          Nu ai nici o clasă programată.{" "}
          <NavLink
            to="/clase/orar"
            className="text-[#3454E3] md:hover:text-[#3454E3]"
          >
            Înscrie-te aici.
          </NavLink>
        </h1>
      )}
    </div>
}
// let dateToday = new Date();
//     let classDate = new Date(clasa.data);
//     classDate.setHours(...clasa.ora.split(':'))
//     if(classDate <= dateToday){
//       setErrors(prev => ({...prev, expired: true}));
//     } else {
//       setErrors(prev => ({...prev, expired: false}));
//     }

export default ListaClaseProfil;