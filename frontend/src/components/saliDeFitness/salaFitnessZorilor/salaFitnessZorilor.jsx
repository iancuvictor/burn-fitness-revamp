import CalendarOrar from "../orar/calendarOrar";
import BlockContact from "../../contact/blockContact/blockContact";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import ZonaAntrenori from "../zonaAntrenori/zonaAntrenori";
import { useLocation } from "react-router";
import MDEditor from "@uiw/react-md-editor";

import videoBanner from "../../../media/BurnClujZorilor1080p.mp4";
import Markdown from "react-markdown";
import axios from "axios";
import { toast } from "sonner";
import Review from "../review";
import { ContentContext } from "../../../context/contentContext";

const API_URL = import.meta.env.VITE_BACKEND_URL;


function SalaFitnessZorilor() {
  let location = useLocation()
  const { isAdmin } = useContext(AuthContext);
  const { reviews } = useContext(ContentContext);

  console.log(reviews);

  const [dataSala, setDataSala] = useState();

  const updatePage = async () => {
    try {
      await axios.put(`${API_URL}/publicPages/paginaSala?locatie=zorilor`, dataSala, { withCredentials: true })
      toast.success(`Pagina a fost actualizată`);
    } catch (err) {
      toast.success(`A apărut o eroare`);
    }
    // await axios.post(`${API_URL}/publicPages/paginaSala?locatie=${locatieSala}`, dataSala, {withCredentials: true})
  }

  useEffect(() => {
    if (location.hash !== '') {
      setTimeout(() => {
        document.querySelector(location.hash).scrollIntoView({ behavior: 'smooth' })
      }, 50);
    }

    async function getDateSala() {
      let response = await axios.get(`${API_URL}/publicPages/paginaSala?locatie=zorilor`)
      setDataSala(response.data);
    }

    getDateSala()
  }, [])


  return (
    <div className="h-fit flex flex-col items-center font-finlandica pb-[50px] gap-10">
      <div className="relative h-40 w-full z-0 top-0 overflow-hidden flex items-center justify-center">
        <div className="z-1 absolute inset-0 bg-gradient-to-r from-black from-0% via-transparent via-20% to-transparent"></div>
        <div className="z-1 absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-50% to-transparent"></div>
        <video
          src={videoBanner}
          autoPlay={true}
          muted={true}
          loop={true}
          controls={false}
          className="object-cover w-full h-full z-0 opacity-40 select-none"
        ></video>
        <h1 className="absolute text-[24px] md:text-[40px] font-[700] text-center text-white justify-self-center">
          Sala fitness ZORILOR
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-5 pl-10 pr-10">
        <div className="flex flex-col gap-3 text-white w-full md:w-xl">
          <h1 className="text-[24px] font-[700]">Ce oferim la Burn Fitness Zorilor?</h1>{isAdmin && <button onClick={() => updatePage()}
            className="cursor-pointer text-white text-[14px] bg-rose-500 p-2">Salvează modificările</button>}
          {isAdmin ? <MDEditor
            value={dataSala?.descriere}
            onChange={(value) => setDataSala({ ...dataSala, descriere: value })}
            height={400}
          />
            : <div className="text-justify [&_p]:mb-4 w-md">
              <Markdown>{dataSala?.descriere}</Markdown>
            </div>}
        </div>
        <BlockContact
          locatie="Zorilor"
          nrTel="0771 511 431"
          adresa="Louis Pasteur 58, Cluj-Napoca"
          linkAdresa='https://maps.app.goo.gl/omhVE5AFo7XVtFRK8'
          programLuniVineri="06:00 - 23:00"
          programSambata="9:00 - 18:00"
          programDuminica="10:00 - 17:00"
        />
      </div>
      <div className="pl-1 pr-1">
        <ZonaAntrenori locatie='ZORILOR' />
      </div>
      <div id='orar' className="w-full md:pl-10 md:pr-10">
        <CalendarOrar locatie='zorilor' />
      </div>
      <div id='reviewuri' className="flex flex-col items-center gap-10">
        <h1 className="text-white text-[30px] font-[700]">Părerea clienților noștrii!</h1>
        <div className="flex flex-col md:flex-row gap-10">

          {reviews?.filter((review) => review.sala === 'zorilor').map((review, index) => {
            return <Review review={review} key={index} />
          })}
        </div>
      </div>
    </div>
  );
}

export default SalaFitnessZorilor;
