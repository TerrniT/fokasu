import { cn } from "@/utils";

interface Props {
  children: any;
  position: "top" | "bottom";
  className?: string;
}

export const Toolbar = ({ children, position, className }: Props) => {
  return (
    <div
      className={cn(
        "absolute w-full flex justify-between items-center px-3",
        position === "top" ? "top-0 pt-3" : "bottom-0 pb-3", className
      )}>
      {children}
    </div>
  );
};
