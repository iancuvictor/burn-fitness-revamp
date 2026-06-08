function LoginScreen() {

  const login = () => {

  }

  return (
    <div className="w-full h-full flex justify-center items-center gap-10 rounded-xl">
      <div className="h-60 w-60 shadow-xl p-[20px] flex flex-col">
        <h1>Conectează-te</h1>
        <form action="" className="flex flex-col">
          <input
            type="text"
            name=""
            id=""
            placeholder="Nume utilizator sau email"
          />
          <input type="text" name="" id="" placeholder="Email" />
          <input type="text" name="" id="" placeholder="Nr. telefon" />
          <input type="text" name="" id="" placeholder="Parolă" />
          <input type="text" name="" id="" placeholder="Rescrie parola" />
          <button onClick={() => login()} className="cursor-pointer">Conectează-te</button>
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
          <button className="cursor-pointer">Conectează-te</button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
