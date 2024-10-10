import { Fragment } from "react";

export const BlurAnimation = () => {
  return (
    <Fragment>
      <div className="bg-primary/10 absolute top-32 animate-blob h-32 z-10 rounded-full animation-delay-1000 w-16 blur-2xl"></div>
      <div className="bg-primary/5 absolute top-22 animate-blob h-32 z-10 rounded-full animation-delay-1000 w-44 blur-2xl"></div>
      <div className="bg-primary/30 absolute top-12 h-32 animate-blob z-10 animation-delay-4000 rounded-full w-24 blur-2xl"></div>
    </Fragment>
  );
};
