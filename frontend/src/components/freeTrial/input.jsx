function Input({title, setForm, form, setError, error}){
    return <div className="relative flex items-center pt-5">
        <input className={`w-full z-1 peer outline-none pb-1 pl-1 pr-1`} type="text" name="" id=""
        onChange={(e) => {
            setForm({...form, email: e.target.value})
            setError({...error, notAnEmail: false, status: 0})
        }} />
        <span className={`${form.email !== "" ? "text-[14px] top-0 translate-y-0 pt-0 pl-1" : "text-[16px] top-1/2 -translate-y-1/2 pl-1 pt-5"} 
        ${error.notAnEmail === true || error.status === 404 ? 'text-red-500' : 'text-white'} absolute z-0
        peer-hover:top-0 peer-hover:translate-y-0 peer-hover:pt-0 peer-hover:pl-1 peer-hover:text-[14px] 
        peer-focus:top-0 peer-focus:translate-y-0 peer-focus:pt-0 peer-focus:pl-1 peer-focus:text-[14px] duration-75 ease-out`}>{error.status === 404 ? 'Email-ul este deja asociat cu un cont' : `${title} ${error.notAnEmail ? `(introdu o adresă validă de email)` : ``}`}</span>
    </div>
}

export default Input;