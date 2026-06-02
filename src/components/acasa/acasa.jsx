function Acasa() {
  return (
    <div className="flex flex-col h-full w-full bg-black">
      <iframe
        src="https://www.youtube.com/embed/n2-5mMBF9Lw?si=LpbV9-Q-pcdtNxHw&controls=0&autoplay=1&mute=1&loop=1"
        title="YouTube video player"
        frameBorder="0"
        className="w-full h-full pointer-events-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h1>ACASA</h1>
    </div>
  );
}

export default Acasa;
