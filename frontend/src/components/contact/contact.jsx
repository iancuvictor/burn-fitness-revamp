import BlockContact from "./blockContact/blockContact";
import ContactForm from "./contactForm";

function Contact() {

  return (
    <div className=" flex flex-col items-center pt-5 pl-5 pr-5 border-box pb-10 font-finlandica">
      {/* <h1 className="mt-[25px] mb-[25px] text-[35px] font-[700] text-white">Contact</h1> */}
      <div className="flex flex-col gap-5 md:flex md:flex-row">
        <ContactForm/>
        <div className="md:w-[70%] md:overflow-y-auto md:h-[420px] flex flex-col gap-5">
          <div className="flex flex-col gap-10 justify-center items-baseline md:flex-row md:flex-wrap p-2">
            <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
