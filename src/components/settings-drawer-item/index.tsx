import { IoIosArrowForward as ChevronRightIcon } from "react-icons/io";

interface Props {
  title: string;
  value?: number;
  prefix?: string;
  onClick?: () => void;
}

export const SettingsDrawerItem = ({
  title,
  value,
  prefix,
  onClick,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-between w-full bg-background hover:bg-secondary px-1 py-0.5 transition-all duration-75 ease-linear rounded-sm cursor-pointer "
    >
      <div className="text-md text-foreground">{title}</div>
      <div className="flex gap-x-2 items-center">
        {value && (
          <span className="text-xl font-semibold text-foreground">{value}</span>
        )}
        {prefix && (
          <span className="text-sm italic text-muted-foreground font-medium">
            {prefix}
          </span>
        )}
        <ChevronRightIcon size={22} />
      </div>
    </div>
  );
};
