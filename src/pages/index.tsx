import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { AiOutlineGithub } from "react-icons/ai";
import Timer from "../components/Timer";

function App() {
  const [modal, setModal] = useState(false);

  return (
    <div className="bg-zinc-900 h-screen mx-auto flex flex-col items-center backdrop-blur-md">
      <div className="flex relative w-full h-20">
        <a
          className="text-zinc-400 absolute top-5 left-5 hover:bg-zinc-400/20 rounded-md hover:ring transition-all duration-150 hover:ring-zinc-400 z-30 animate-pulse"
          href="https://github.com/terrnit"
          target="_blank"
        >
          <AiOutlineGithub size={35} />
        </a>
        <button
          className="text-zinc-400 absolute top-5 right-5 hover:bg-zinc-400/20 rounded-md hover:ring transition-all duration-150 hover:ring-zinc-400 z-30"
          onClick={() => setModal((prev) => !prev)}
        >
          <CgMenuRight size={35} />
        </button>
      </div>
      <Timer modal={modal} handleModal={setModal} />
      <div className="bg-blue-500/20 absolute top-32 animate-blob h-32 z-10 rounded-full w-32  blur-2xl  transition-all duration-150"></div>
      <div className="bg-cyan-400/10 absolute top-20 h-32 animate-blob z-10 animation-delay-2000 rounded-full w-32 blur-2xl"></div>
      <div className="bg-cyan-800/20 absolute top-12 h-32 animate-blob z-10 animation-delay-4000 rounded-full w-32 blur-2xl"></div>
    </div>
  );
}
export default App;
