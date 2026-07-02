import { useState } from "react";
import BlockContact from "../../contact/blockContact/blockContact";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import '../../../../node_modules/leaflet/dist/leaflet.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";

const infoBarTextStyle =
  "text-[20px] md:text-[30px] font-[700] text-white text-nowrap";

const location = [46.771, 23.595]
const markerZorilor = [46.75531797859378, 23.57667856847701]
const markerSigma = [46.75627672733558, 23.594621777605642]
const markerMarasti = [46.78096875329758, 23.605233918287105]
const markerManastur = [46.750543550941025, 23.56193257366642]
const markerFlora = [46.75786392779408, 23.550294338922825]

const position = [51.505, -0.09]
function Locatii() {
  const [viewLocatie, setViewLocatie] = useState('zorilor');
  const [map, setMap] = useState(false);
  console.log(viewLocatie);


  return <div className="relative flex flex-col items-center w-full overflow-hidden gap-5 pl-[20px] pr-[20px] font-finlandica pb-10">
    <div
      className="flex w-full justify-around gap-4
            animate-[infoBar_8s_linear_infinite_reverse]
            md:animate-[infoBar_25s_linear_infinite_reverse]"
    >
      <h1 className={infoBarTextStyle}>
        LOCAȚIILE
        <span className="text-lime-400 italic">
          {" "}
          BURN FITNESS CLUJ-NAPOCA
        </span>
      </h1>
      <h1 className={infoBarTextStyle}>
        LOCAȚIILE
        <span className="text-lime-400 italic">
          {" "}
          BURN FITNESS CLUJ-NAPOCA
        </span>
      </h1>
      <h1 className={infoBarTextStyle}>
        LOCAȚIILE
        <span className="text-lime-400 italic">
          {" "}
          BURN FITNESS CLUJ-NAPOCA
        </span>
      </h1>
      <h1 className={infoBarTextStyle}>
        LOCAȚIILE
        <span className="text-lime-400 italic">
          {" "}
          BURN FITNESS CLUJ-NAPOCA
        </span>
      </h1>
      <h1 className={infoBarTextStyle}>
        LOCAȚIILE
        <span className="text-lime-400 italic">
          {" "}
          BURN FITNESS CLUJ-NAPOCA
        </span>
      </h1>
      <h1 className={infoBarTextStyle}>
        LOCAȚIILE
        <span className="text-lime-400 italic">
          {" "}
          BURN FITNESS CLUJ-NAPOCA
        </span>
      </h1>
    </div>
    <h1 className="text-white font-[700] text-[30px]">Selectează o locație BURN Fitness!</h1>
    <div className="flex flex-col md:flex-row gap-5 items-center justify-center w-full">
      <button onClick={() => setMap(!map)} 
      className="block md:hidden active:bg-rose-400 text-white bg-rose-500 p-3 w-full rounded-md duration-75 ease-out">
        <FontAwesomeIcon icon={faCompass}/>  {map ? 'ÎNCHIDE HARTA' : 'SELECTEAZĂ O SALĂ'}
      </button>
      <div className="flex">
        <div
          className={`${viewLocatie === 'zorilor' ? "block" : "hidden"}`}
          id="zorilor"
        >
          <BlockContact
            locatie="Zorilor"
            nrTel="0771 511 431"
            adresa="Louis Pasteur 58, Cluj-Napoca"
            linkAdresa='https://maps.app.goo.gl/CWpT3mchqSxTFtUs9'
            programLuniVineri="06:00 - 23:00"
            programSambata="9:00 - 18:00"
            programDuminica="10:00 - 17:00"
          />
        </div>
        <div
          className={`${viewLocatie === 'manastur' ? "block" : "hidden"}`}
          id="manastur"
        >
          <BlockContact
            locatie="Mănăștur"
            nrTel="0771 262 348"
            adresa="Mehedinți 82, Cluj-Napoca"
            linkAdresa="https://maps.app.goo.gl/RGKPkNX5SQUrQkUV6"
            programLuniVineri="07:00 - 22:00"
            programSambata="9:00 - 18:00"
            programDuminica="10:00 - 17:00"
          />
        </div>
        <div
          className={`${viewLocatie === 'marasti' ? "block" : "hidden"}`}
          id="marasti"
        >
          <BlockContact
            locatie="Mărăști"
            nrTel="0770 886 179"
            adresa="București 55, Cluj-Napoca"
            linkAdresa="https://maps.app.goo.gl/axVxQmcjqXbPW9cL7"
            programLuniVineri="06:00 - 22:00"
            programSambata="9:00 - 18:00"
            programDuminica="10:00 - 17:00"
          />
        </div>
        <div
          className={`${viewLocatie === 'flora' ? "block" : "hidden"}`}
          id="flora"
        >
          <BlockContact
            locatie="Flora"
            nrTel="0774 519 047"
            adresa="Aleea Padin 21, Cluj-Napoca"
            linkAdresa="https://maps.app.goo.gl/R8bf2PTXGnaMPwJE8"
            programLuniVineri="07:00 - 22:00"
            programSambata="9:00 - 18:00"
            programDuminica="10:00 - 17:00"
          />
        </div>
        <div
          className={`${viewLocatie === 'sigma' ? "block" : "hidden"}`}
          id="sigma"
        >
          <BlockContact
            locatie="Sigma"
            nrTel="0772 269 959"
            adresa="Republici 109, Cluj-Napoca"
            linkAdresa="https://maps.app.goo.gl/7XkkeyycY7Xagew79"
            programLuniVineri="06:00 - 23:00"
            programSambata="9:00 - 18:00"
            programDuminica="10:00 - 17:00"
          />
        </div>
      </div>
      <div className={`${map ? 'h-75 ring-3' : 'h-0 ring-0'} overflow-hidden w-full md:h-75 md:w-150 ring-rose-500 rounded-xl duration-200 ease-out`}>

        <MapContainer center={location} zoom={13} scrollWheelZoom={true} className="h-full w-full rounded-xl">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker eventHandlers={{
            click: () => setViewLocatie('zorilor'),
          }}
            position={markerZorilor}>
            <Popup>
              <h1>Sală fitness ZORILOR</h1>
            </Popup>
          </Marker>
          <Marker eventHandlers={{
            click: () => setViewLocatie('sigma'),
          }} position={markerSigma}>
            <Popup>
              <h1>Sală fitness SIGMA</h1>
            </Popup>
          </Marker>
          <Marker eventHandlers={{
            click: () => setViewLocatie('manastur'),
          }} position={markerManastur}>
            <Popup>
              <h1>Sală fitness MĂNĂȘTUR</h1>
            </Popup>
          </Marker>
          <Marker eventHandlers={{
            click: () => setViewLocatie('flora'),
          }} position={markerFlora}>
            <Popup>
              <h1>Sală fitness FLORA</h1>
            </Popup>
          </Marker>
          <Marker eventHandlers={{
            click: () => setViewLocatie('marasti'),
          }} position={markerMarasti}>
            <Popup>
              <h1>Sală fitness MĂRĂȘTI</h1>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  </div>
}

export default Locatii;