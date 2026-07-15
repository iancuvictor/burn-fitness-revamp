import { useState } from "react";
import BlockContact from "./blockContact/blockContact";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const inputStyle = `ring-2 ring-gray-300 rounded-xs p-2 outline-none`

function Contact() {
  const obj = {
    nume: "",
    email: "",
    telefon: "",
    mesaj: "",
  };
  const [formContent, setFormContent] = useState(obj);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{1,4}?[-.\s]?\(?[0-9]{1,3}?\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;

  const setFormData = (field, data) => {
    setFormContent({ ...formContent, [field]: data });
  };

  const sendEmail = async () => {
    if(emailRegex.test(formContent.email) && phoneRegex.test(formContent.telefon) && formContent.mesaj.length >= 50){
      try{
        await axios.post(`${API_URL}/publicPages/contact`, formContent)
        toast.success(`Emailul a fost trimis!`)
        setFormContent(obj);
      } catch(err) {
        toast.error(`A intervenit o eroare. Ne pare rău!`)
      }
    } else {
      if(!emailRegex.test(formContent.email)){
        toast.error(`Email invalid!`);
      } else if(!phoneRegex.test(formContent.telefon)){
        toast.error(`Telefon invalid!`);
      } else if(formContent.mesaj.length < 50){
        toast.error(`Mesajul trebuie să fie mai lung de 50 de caractere.`)
      }
    } 
  };

  return (
    <div className=" flex flex-col items-center pl-[20px] pr-[20px] border-box pb-10 font-finlandica">
      <h1 className="mt-[25px] mb-[25px] text-[35px] font-[700] text-white">Contact</h1>
      <div className="flex flex-col gap-5 md:flex md:flex-row">
        <div
          id="sendEmail"
          className="flex flex-col shadow-xl overflow-hidden h-fit md:w-150 bg-white content-box rounded-xl gap-2"
        >
          <h1 className="font-[500] pl-[20px] pt-[20px] pb-[20px]">
            Trimite un email{" "}
            <span className="font-[700]">(burnclujfake@gmail.com)</span>
          </h1>
          <form
            action=""
            className="flex flex-col gap-2 pl-[20px] pr-[20px] pb-[20px]"
          >
            <span>Nume:</span>
            <input
              onChange={(e) => setFormData("nume", e.target.value)}
              type="text"
              name="nume"
              required
              value={formContent.nume}
              className={inputStyle}
            />
            <span>Email:</span>
            <input
              onChange={(e) => setFormData("email", e.target.value)}
              type="text"
              name="email"
              required
              value={formContent.email}
              className={inputStyle}
            />
            <span>Telefon:</span>
            <input
              onChange={(e) => setFormData("telefon", e.target.value)}
              type="text"
              name="telefon"
              required
              value={formContent.telefon}
              className={inputStyle}
            />
            <span>Mesajul:</span>
            <textarea
              onChange={(e) => setFormData("mesaj", e.target.value)}
              name="mesaj"
              required
              value={formContent.mesaj}
              className={`${inputStyle} min-h-30`}
            ></textarea>
          </form>
          <button
            type="button"
            onClick={() => sendEmail()}
            className="cursor-pointer active:bg-[#DE264B] active:text-white hover:bg-[#DE264B] hover:text-white duration-150 ease-out rounded-md p-[10px]"
          >
            Trimite Email
          </button>
        </div>
        <div className="md:w-[70%] md:overflow-y-auto md:h-[420px] flex flex-col gap-5">
          <div className="flex flex-col gap-10 justify-center items-baseline md:flex-row md:flex-wrap p-2">
            <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
