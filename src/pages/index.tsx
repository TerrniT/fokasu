import { useEffect, useState } from "react";
import { ask } from "@tauri-apps/api/dialog";
import { CgMenuRight } from "react-icons/cg";
import { AiOutlineGithub } from "react-icons/ai";
import Timer from "../components/Timer";

function App() {
  const [modal, setModal] = useState(false);

  return (
    <div className="bg-zinc-900 h-screen mx-auto flex flex-col items-center justify-center backdrop-blur-md">
      <div className="bg-blue-400/20 absolute top-20 h-32 rounded-full w-32  blur-2xl"></div>
      <a
        className="text-zinc-400 absolute top-5 left-5 hover:bg-zinc-400/20 rounded-md hover:ring transition-all duration-150 hover:ring-zinc-400 z-30"
        href="https:/github/terrnit"
      >
        <AiOutlineGithub size={35} />
      </a>
      <button
        className="text-zinc-400 absolute top-5 right-5 hover:bg-zinc-400/20 rounded-md hover:ring transition-all duration-150 hover:ring-zinc-400 z-30"
        onClick={() => setModal((prev) => !prev)}
      >
        <CgMenuRight size={35} />
      </button>
      <Timer modal={modal} handleModal={setModal} />
    </div>
  );
}
export default App;
