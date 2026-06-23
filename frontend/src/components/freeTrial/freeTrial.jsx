import { useState } from 'react';
import Input from './input.jsx';
import axios from 'axios';
import { NavLink } from 'react-router';

const API_URL = import.meta.env.VITE_BACKEND_URL;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function FreeTrial(){
    const [error, setError] = useState({
        notAnEmail: false,
        status: 0
    })
    const [form, setForm] = useState({
        email: '',
    });

    const submitForm = async (data) => {
        if(emailRegex.test(data.email)){

            try{
                let response = await axios.post(`${API_URL}/abonamente/ziGratis`, form);
                setError({...error, status: response.status});
            } catch(err) {
                setError({...error, status: err.response.status});
            }
        } else {
            setError({...error, notAnEmail: true})
        }
    }

    return <div className="flex flex-col gap-2 justify-center items-center
    h-160 w-full bg-black font-finlandica text-white pt-15 md:pt-20">
        <div className={`${error.status === 200 ? 'hidden' : 'flex'} flex flex-col shadow-xl p-5 shadow-redishPinkDark/40 ring-white ring-1 rounded-md gap-5`}>
            <div>
            <h1 className='font-[600] text-[30px] text-center'>ȘEDINȚA <span className='italic'>GRATUITĂ</span></h1>
            <Input title='Email' setForm={setForm} form={form} setError={setError} error={error}/>
            </div>

        <button onClick={() => submitForm(form)} className='cursor-pointer bg-redishPinkDark p-2'>Revendică ziua de probă gratuită</button>
        {/* <h1 className={`${status === 404 ? 'flex' : 'hidden'} font-[400] text-[16px] text-red-500`}>Email-ul este asociat unui cont deja!</h1> */}
        </div>

        <div className={`${error.status === 200 ? 'flex' : 'hidden'} flex flex-col shadow-xl p-5 shadow-redishPinkDark/40 ring-white ring-1 rounded-md gap-5`}>
            <h1 className='font-[600] text-[25px]'>Email-ul a fost trimis! <br /> Verifică-ți inbox-ul.</h1>
            <NavLink to='/' className='text-center cursor-pointer bg-redishPinkDark p-2'>Înapoi la pagina principală</NavLink>
        </div>
    </div>
}

export default FreeTrial;