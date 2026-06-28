import axios from "axios";
import { useState } from "react";
import {
  faAt,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import InputLogin from "./input";

const API_URL = import.meta.env.VITE_BACKEND_URL

function LoginScreen() {
  const loginObj = {
    username: "",
    password: "",
  };

  const signUpObj = {
    username: "",
    email: "",
    nrTel: "",
    password: "",
    passwordConfirm: "",
  };
  const [loginForm, setLoginForm] = useState(loginObj);
  const [signUpForm, setSignUpForm] = useState(signUpObj);
  const [userExists, setUserExists] = useState(true);
  const [error, setError] = useState({
    username: false,
    password: false,
    passwordConfirm: false
  });

  const updateForm = (field, data, formState, setFormState) => {
    setFormState({ ...formState, [field]: data });
  };

  const login = async (e) => {
    e.preventDefault();
    if (loginForm.username !== "" && loginForm.password !== "") {
      try {
        let response = await axios.post(`${API_URL}/users/login`, loginForm)
        if(response.data.message !== 'wrongPass'){
          window.location.reload();
        } else if(response.data.message === 'wrongPass') {
          setError({...error, password: true});
        }
        // window.location.reload();
      } catch (err) {
        if (err.response.status) {
          setError({ ...error, username: true });
        }
      }
    } else if (loginForm.username === "") {
      setError({ ...error, username: true });
    } else if (loginForm.password === "") {
      setError({ ...error, password: true });
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      if(signUpForm.password === signUpForm.passwordConfirm){
        await axios.post(`${API_URL}/users/register`, signUpForm)
        await axios.post(`${API_URL}/users/login`, {username: signUpForm.username,password: signUpForm.password});
        window.location.reload();
      } else {
        setError({...error, passwordConfirm: true});
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative h-150 min-h-150 flex justify-center items-center gap-10 font-finlandica">
      <div
        className={`${userExists ? "flex" : "hidden"} h-full w-full md:w-fit shadow-xl flex flex-col gap-6 bg-white 
        rounded-xl p-4`}
      >
        <h1 className="text-[20px] font-[700]">Conectează-te</h1>
        <form action="" className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-3">
            <InputLogin
              updateForm={updateForm}
              loginForm={loginForm}
              setLoginForm={setLoginForm}
              error={error}
              setError={setError}
              icon={faUser}
              inputType="username"
              fieldType="text"
              placeholder="Nume utilizator sau email"
            />
            <InputLogin
              updateForm={updateForm}
              loginForm={loginForm}
              setLoginForm={setLoginForm}
              error={error}
              setError={setError}
              icon={faLock}
              inputType="password"
              fieldType="password"
              placeholder="Parola"
            />
          </div>
          <button
            onClick={(e) => login(e)}
            className="cursor-pointer bg-[#F06E87] active:bg-[#DE264B] active:text-white
            md:hover:bg-[#DE264B] md:hover:text-white 
            pl-[10px] pt-[10px] pb-[10px] pr-[10px] 
            duration-150 ease-out rounded-md"
          >
            Conectează-te
          </button>
        </form>
        <button
          className="cursor-pointer md:hover:text-[#3454E3] duration-150 ease-out text-left w-fit text-[16px]"
          onClick={() => setUserExists(false)}
        >
          Nu ai cont? Creează unul
        </button>
      </div>

      <div
        className={`${userExists ? "hidden" : "flex"} h-full w-full md:w-fit shadow-xl flex flex-col gap-6 bg-white 
        rounded-xl p-4`}
      >
        <h1 className="text-[20px] font-[700]">Creează cont</h1>
        <form action="" className="flex flex-col gap-2 w-full">
          <InputLogin
            updateForm={updateForm}
            loginForm={signUpForm}
            setLoginForm={setSignUpForm}
            error={error}
            setError={setError}
            icon={faUser}
            inputType="username"
            fieldType="text"
            placeholder="Nume utilizator"
          />
          <InputLogin
            updateForm={updateForm}
            loginForm={signUpForm}
            setLoginForm={setSignUpForm}
            error={error}
            setError={setError}
            icon={faAt}
            inputType="email"
            fieldType="text"
            placeholder="Email"
          />
          <InputLogin
            updateForm={updateForm}
            loginForm={signUpForm}
            setLoginForm={setSignUpForm}
            error={error}
            setError={setError}
            icon={faPhone}
            inputType="nrTel"
            fieldType="text"
            placeholder="Număr de telefon"
          />
          <InputLogin
            updateForm={updateForm}
            loginForm={signUpForm}
            setLoginForm={setSignUpForm}
            error={error}
            setError={setError}
            icon={faLock}
            inputType="password"
            fieldType="password"
            placeholder="Parolă"
          />
          <InputLogin
            updateForm={updateForm}
            loginForm={signUpForm}
            setLoginForm={setSignUpForm}
            error={error}
            setError={setError}
            icon={faLock}
            inputType="passwordConfirm"
            fieldType="password"
            placeholder="Rescrie parola"
          />
          <button
            onClick={(e) => signUp(e)}
            className="cursor-pointer bg-[#F06E87] active:bg-[#DE264B] active:text-white
            md:hover:bg-[#DE264B] md:hover:text-white 
            pl-[10px] pt-[10px] pb-[10px] pr-[10px] 
            duration-150 ease-out rounded-md"
          >
            Înregistrează-te
          </button>
        </form>
        <button
          className="cursor-pointer md:hover:text-[#3454E3] duration-150 ease-out text-left w-fit text-[16px]"
          onClick={() => setUserExists(true)}
        >
          Ai cont deja? Conectează-te
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
