import { cn } from "@/utils";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  onClick?: () => void;
}

export const Button = ({ onClick, children, ...props }: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full bg-black border border-zinc-400 text-white p-1 w-10 h-10 flex items-center justify-center hover:bg-black/60 hover:text-zinc-200 duration-100 ease-linear transition-all hover:border-zinc-700 group",
        props.className
      )}
      {...props}>
      {children}
    </button>
  );
};
