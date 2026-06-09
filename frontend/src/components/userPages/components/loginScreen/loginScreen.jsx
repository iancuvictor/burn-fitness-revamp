import axios from "axios";
import { useState } from "react";

function LoginScreen() {
  const loginObj = {
    username: "",
    password: ""
  };
  const [loginForm, setLoginForm] = useState(loginObj);

  const updateForm = (field, data, formState, setFormState) => {
    setFormState({ ...formState, [field]: data });
  };

  const login = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:3000/api/users/login", loginForm)
    .then(() => console.log('logged in')).catch((err) => console.log(err))
  };

  return (
    <div className="w-full h-full flex justify-center items-center gap-10 rounded-xl">
      <div className="h-60 w-60 shadow-xl p-[20px] flex flex-col">
        <h1>Conectează-te</h1>
        <form action="" className="flex flex-col">
          <input
            onChange={(e) =>
              updateForm(
                "username",
                e.target.value,
                loginForm,
                setLoginForm,
              )
            }
            type="text"
            name=""
            id=""
            placeholder="Nume utilizator sau email"
          />
          <input
            onChange={(e) =>
              updateForm(
                "password",
                e.target.value,
                loginForm,
                setLoginForm,
              )
            }
            type="text"
            name=""
            id=""
            placeholder="Parolă"
          />
          <button onClick={(e) => login(e)} className="cursor-pointer">
            Conectează-te
          </button>
        </form>
      </div>

      <div className="h-60 w-60 shadow-xl p-[20px] flex flex-col rounded-xl">
        <h1>Creează cont</h1>
        <form action="" className="flex flex-col">
          <input type="text" name="" id="" placeholder="Nume utilizator" />
          <input type="text" name="" id="" placeholder="Email" />
          <input type="text" name="" id="" placeholder="Nr. telefon" />
          <input type="text" name="" id="" placeholder="Parolă" />
          <input type="text" name="" id="" placeholder="Rescrie parola" />
          <button className="cursor-pointer">Înregistrează-te</button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
