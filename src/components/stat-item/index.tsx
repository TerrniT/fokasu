import { cn } from "../../utils/cn";

interface Props {
  title: string | number;
  description: string | number;
  variant: "primary" | "secondary";
  className?: string;
}

export const StatItem: React.FC<Props> = ({ variant, title, description, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col col-span-2 row-span-1 rounded-xl p-2 items-baseline",
        variant === "primary"
          ? "bg-orange-600 items-baseline text-[#1a1a1a] "
          : "bg-[#1a1a1a] text-white",
		className
      )}>
      <div className="flex gap-x-2 flex-col">
        <h3 className="font-bold text-4xl">{title}</h3>
        <span
          className={cn(
			"text-sm",
            variant === "primary" ? "text-[#1a1a1a]/60" : "text-white/40"
          )}>
          {description}
        </span>
      </div>
    </div>
  );
};
