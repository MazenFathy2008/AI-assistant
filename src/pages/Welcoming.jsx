import {useNavigate} from "react-router-dom"
export default function Welcoming() {
  const Navigate = useNavigate()
  return (
    <>
      <header className="w-full flex items-center justify-center py-2">
        <div
          className="w-90/100 flex items-center justify-center gap-10
        px-5
        py-2
        box-border
      rounded-2xl "
        >
          <img className="w-25" src="/logo.png"></img>
          <p className=" font-bold text-5xl">chatEgy </p>
        </div>
      </header>
      <main className="w-full  h-157 relative flex flex-col items-center justify-start gap-40 p-20">
        <div
          className="
          opacity-20
          blur-sm
      absolute inset-0
      bg-[url('/background.png')]
      bg-center
      bg-no-repeat
    bg-cover
      z-0
    "
        />
        <section className="w-full flex flex-col justify-center items-center gap-3 ">
          <p className=" z-100 text-7xl opacity-100 text-[#242424] font-bold">
            Welcome to Chat Egy
          </p>
          <p className="text-3xl text-[#000000]">Learn.Ask.Achieve</p>
        </section>
        <button className="w-100 h-20 bg-white 
        z-100 cursor-pointer 
        shadow-[1px_1px_10px_black] 
        rounded-2xl 
        hover:scale-95  
        active:scale-90
        transition-all duration-200
        flex items-center justify-center gap-10
        text-2xl font-bold  
        "
        onClick={()=>{
          Navigate('/homepage')
        }}
        >
          Continue with google
          <img src="/google.png" className="w-10 "/>
        </button>
      </main>
    </>
  );
}
