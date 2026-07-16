import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const inputStyle = `ring-2 ring-gray-300 rounded-xs p-2 outline-none`

export default function ContactForm() {

    const obj = {
        nume: "",
        email: "",
        telefon: "",
        mesaj: "",
    };
    const [form, setForm] = useState(obj);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{1,4}?[-.\s]?\(?[0-9]{1,3}?\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;

    const sendEmail = async () => {
        if (emailRegex.test(form.email) && phoneRegex.test(form.telefon) && form.mesaj.length >= 50) {
            try {
                await axios.post(`${API_URL}/publicPages/contact`, form)
                toast.success(`Emailul a fost trimis!`)
                setForm(obj);
            } catch (err) {
                toast.error(`A intervenit o eroare. Ne pare rău!`)
            }
        } else {
            if (!emailRegex.test(form.email)) {
                toast.error(`Email invalid!`);
            } else if (!phoneRegex.test(form.telefon)) {
                toast.error(`Telefon invalid!`);
            } else if (form.mesaj.length < 50) {
                toast.error(`Mesajul trebuie să fie mai lung de 50 de caractere.`)
            }
        }
    };

    return <div
        id="sendEmail"
        className="flex flex-col shadow-xl overflow-hidden h-fit md:w-150 bg-white content-box rounded-xl gap-2 p-5"
    >
        <h1 className="font-[500] pl-[20px]">
            Trimite un email{" "}
            <span className="font-[700]">(burnclujfake@gmail.com)</span>
        </h1>
        <form
            action=""
            className="flex flex-col gap-2"
        >
            <span>Nume:</span>
            <input
                onChange={(e) => setForm({...form, nume: e.target.value})}
                type="text"
                name="nume"
                required
                value={form.nume}
                className={inputStyle}
            />
            <span>Email:</span>
            <input
                onChange={(e) => setForm({...form, email: e.target.value})}
                type="text"
                name="email"
                required
                value={form.email}
                className={inputStyle}
            />
            <span>Telefon:</span>
            <input
                onChange={(e) => setForm({...form, telefon: e.target.value})}
                type="text"
                name="telefon"
                required
                value={form.telefon}
                className={inputStyle}
            />
            <span>Mesajul:</span>
            <textarea
                onChange={(e) => setForm({...form, mesaj: e.target.value})}
                name="mesaj"
                required
                value={form.mesaj}
                className={`${inputStyle} min-h-30`}
            ></textarea>
        </form>
        <button
            type="button"
            onClick={() => sendEmail()}
            className="cursor-pointer bg-rose-500 active:bg-rose-500 text-white
            hover:bg-[#DE264B] duration-150 ease-out rounded-md p-[10px]"
        >
            Trimite Email
        </button>
    </div>
}