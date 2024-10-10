import { cn } from "@/utils";

interface Props {
  color: string;
  percentage?: number;
}

export const Circle = ({ color, percentage }: Props) => {
  const radius = 80;
  const circ = 2 * Math.PI * radius;
  const strokePct = ((100 - percentage) * circ) / 100;

  return (
    <circle
      r={radius}
      cx={100}
      cy={100}
      fill="transparent"
	  className={cn(strokePct !== circ ? color : "stroke-zinc-800")}
      strokeWidth={"1rem"}
      strokeDasharray={circ}
      strokeLinecap="round"
      strokeDashoffset={percentage ? strokePct : 0}
    />
  );
};