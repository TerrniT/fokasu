import { Fragment } from "react";

export const BlurAnimation = () => {
  return (
    <Fragment>
      <div className="bg-orange-500/20 absolute top-32 animate-blob h-32 z-10 rounded-full w-32  blur-2xl  transition-all duration-150"></div>
      <div className="bg-green-400/10 absolute top-20 h-32 animate-blob z-10 animation-delay-2000 rounded-full w-32 blur-2xl"></div>
      <div className="bg-yellow-800/10 absolute top-12 h-32 animate-blob z-10 animation-delay-4000 rounded-full w-32 blur-2xl"></div>
    </Fragment>
  );
};
