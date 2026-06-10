import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InputLogin({updateForm, error, setError, loginForm, setLoginForm, icon, inputType, fieldType, placeholder}) {
  return (
    <div className="flex justify-center items-center relative w-full shadow-md pl-[10px] pr-[10px]">
      <FontAwesomeIcon icon={icon} className="text-[30px]" />
      <div className="h-15 w-100 relative duration-150 ease-out flex m-0 p-0 overflow-hidden">
        <input
          onChange={(e) => {
            updateForm(
              inputType,
              e.target.value,
              loginForm,
              setLoginForm,
              setError({ ...error, [inputType]: false }),
            );
          }}
          type={fieldType}
          name=""
          id=""
          placeholder=""
          className={`z-1 h-full w-full peer outline-none pl-[10px] pt-[20px] pb-[5px] pr-[10px] `}
          autoComplete="new-password"
        />
        <span id='inputSpan'
          className={`${loginForm[inputType] !== "" ? "text-[12px] top-0 translate-y-0 pt-[10px] pl-[10px]" : "text-[16px] top-1/2 -translate-y-1/2"}
                ${error[inputType] ? "!text-red-500" : "text-black"}     
                absolute z-0
                pl-[5%]
                peer-hover:top-0 peer-hover:translate-y-0 peer-hover:pt-[10px] peer-hover:pl-[10px] peer-hover:text-[12px] 
                peer-focus:top-0 peer-focus:translate-y-0 peer-focus:pt-[10px] peer-focus:pl-[10px] peer-focus:text-[12px] 
                duration-150 ease-out`}
        >
          {placeholder}
        </span>
      </div>
    </div>
  );
}
export default InputLogin;
