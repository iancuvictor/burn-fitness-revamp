import { useState } from "react";
import BlockContact from "../../contact/blockContact/blockContact";

const infoBarTextStyle =
  "text-[20px] md:text-[30px] font-[700] text-white text-nowrap";

function Locatii(){
    const [viewLocatie, setViewLocatie] = useState({
        viewLocatie: 'zorilor'
    })

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
      <div className="text-white flex flex-col md:hidden">
        <span className="font-[600]">Alege sala la care vrei să te antrenezi:</span>
        <select onChange={(e) => setViewLocatie({...viewLocatie, viewLocatie: e.target.value})} 
        className="cursor-pointer outline-none p-[10px]" name="" id="">
            <option className="bg-black text-center" value="zorilor">Zorilor</option>
            <option className="bg-black text-center" value="sigma">Sigma</option>
            <option className="bg-black text-center" value="manastur">Mănăștur</option>
            <option className="bg-black text-center" value="flora">Flora</option>
            <option className="bg-black text-center" value="marasti">Mărăști</option>
        </select>
      </div>
      <div className="flex flex-col md:grid md: grid-cols-3 gap-10 md:pt-10">
                    <div
              className={`md:block ${viewLocatie.viewLocatie === 'zorilor' ? "block" : "hidden"}`}
              id="zorilor"
            >
              <BlockContact
                locatie="Zorilor"
                nrTel="0771 511 431"
                adresa="Louis Pasteur 58, Cluj-Napoca"
                linkAdresa='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10933.941538443678!2d23.557627201080333!3d46.75532824825045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490e78b14ef555%3A0x82da4b4e100cf036!2sBurn%20Cluj!5e0!3m2!1sen!2sro!4v1780302279546!5m2!1sen!2sro"'
                programLuniVineri="06:00 - 23:00"
                programSambata="9:00 - 18:00"
                programDuminica="10:00 - 17:00"
              />
            </div>
            <div
              className={`md:block ${viewLocatie.viewLocatie === 'manastur' ? "block" : "hidden"}`}
              id="manastur"
            >
              <BlockContact
                locatie="Mănăștur"
                nrTel="0771 262 348"
                adresa="Mehedinți 82, Cluj-Napoca"
                linkAdresa="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10934.911512077115!2d23.54288358715819!3d46.75054749999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490e710ed8555d%3A0x9f7559ad01b5033d!2zQnVybiBGaXRuZXNzIE3Eg27Eg8iZdHVy!5e0!3m2!1sen!2sro!4v1780302434502!5m2!1sen!2sro"
                programLuniVineri="07:00 - 22:00"
                programSambata="9:00 - 18:00"
                programDuminica="10:00 - 17:00"
              />
            </div>
            <div
              className={`md:block ${viewLocatie.viewLocatie === 'marasti' ? "block" : "hidden"}`}
              id="marasti"
            >
              <BlockContact
                locatie="Mărăști"
                nrTel="0770 886 179"
                adresa="București 55, Cluj-Napoca"
                linkAdresa="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10928.736424217188!2d23.586169587158203!3d46.78097650000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490dd0c1753165%3A0x537832fe3ac04bd5!2sBurn%20Fitness%20Marasti!5e0!3m2!1sen!2sro!4v1780302499127!5m2!1sen!2sro"
                programLuniVineri="06:00 - 22:00"
                programSambata="9:00 - 18:00"
                programDuminica="10:00 - 17:00"
              />
            </div>
            <div
              className={`md:block ${viewLocatie.viewLocatie === 'flora' ? "block" : "hidden"}`}
              id="flora"
            >
              <BlockContact
                locatie="Flora"
                nrTel="0774 519 047"
                adresa="Aleea Padin 21, Cluj-Napoca"
                linkAdresa="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10934.911512077115!2d23.54288358715819!3d46.75054749999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490f0053b19629%3A0x2ca9d2227b941a30!2sBurn%20Fitness%20Flora!5e0!3m2!1sen!2sro!4v1780302470670!5m2!1sen!2sro"
                programLuniVineri="07:00 - 22:00"
                programSambata="9:00 - 18:00"
                programDuminica="10:00 - 17:00"
              />
            </div>
            <div
              className={`md:block ${viewLocatie.viewLocatie === 'sigma' ? "block" : "hidden"}`}
              id="sigma"
            >
              <BlockContact
                locatie="Sigma"
                nrTel="0772 269 959"
                adresa="Republici 109, Cluj-Napoca"
                linkAdresa="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10928.736424217188!2d23.586169587158203!3d46.78097650000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490d8a754ba55f%3A0x72502b8e8d4d7f18!2sBurn%20Fitness%20Sigma!5e0!3m2!1sen!2sro!4v1780302519691!5m2!1sen!2sro"
                programLuniVineri="06:00 - 23:00"
                programSambata="9:00 - 18:00"
                programDuminica="10:00 - 17:00"
              />
            </div>
      </div>
    </div>
}

export default Locatii;