import { useState } from "react";
import BlockContact from "./blockContact/blockContact";

function Contact() {
  let [searchWord, setSearchWord] = useState("");
  let [results, setResults] = useState([]);

  const searchGym = (word) => {
    word = word
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    setSearchWord(word);
    let arr = [
      { locatie: "zorilor", adresa: "louis pasteur 58" },
      { locatie: "manastur", adresa: "mehedinti 82" },
      { locatie: "marasti", adresa: "bucuresti 55" },
      { locatie: "flora", adresa: "aleea padin 21" },
      { locatie: "sigma", adresa: "republicii 109" },
    ];
    let newArr = arr.filter(
      (locatie) =>
        locatie.locatie.startsWith(word) ||
        locatie.adresa.split(" ").some((cuvant) => cuvant.startsWith(word)),
    );
    setResults(newArr);
    console.log(results);
  };

  const checkSearch = (word) => {
    let result =
      results.some((item) => item.locatie.includes(word)) || searchWord === "";
    return result;
  };

  return (
    <>
      <div className="flex flex-col items-center pl-[20px] pr-[20px] border-box">
        <h1 className="mt-[25px] mb-[25px] text-[35px] font-[700] font-finlandica">
          Contact
        </h1>
        <div className="flex">
          <div id="sendEmail" className="shadow-xl h-auto">
            <h1>
              Trimite un email (office@burncluj.ro)
              <form action="">
                <input type="text" name="" id="" required placeholder="nume" />
                <input type="text" name="" id="" required placeholder="email" />
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  placeholder="telefon"
                />
                <textarea name="" id="" required placeholder="mesaj"></textarea>
                <button className="cursor-pointer">Trimite Email</button>
              </form>
            </h1>
          </div>
          <div>
            <input
              onChange={(e) => searchGym(e.target.value)}
              type="text"
              className="xs:hidden w-full border-box pl-[20px] pb-[10px] pr-[20px] pt-[10px] rounded-xl shadow-lg"
              id=""
              placeholder="Caută sala după locație"
            />
            <div className="flex flex-col gap-10 justify-center items-baseline md:flex-row md:flex-wrap">
              <div
                className={checkSearch("zorilor") ? "block" : "hidden"}
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
                className={checkSearch("manastur") ? "block" : "hidden"}
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
                className={checkSearch("marasti") ? "block" : "hidden"}
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
                className={checkSearch("flora") ? "block" : "hidden"}
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
                className={checkSearch("sigma") ? "block" : "hidden"}
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
        </div>
      </div>
    </>
  );
}

export default Contact;
