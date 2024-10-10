import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiMinus as MinusIcon, FiPlus as PlusIcon } from "react-icons/fi";

interface Props {
  title: string;
  value: number;
  isDuration: boolean;
  setValue: (value: number) => void;
  onClose: () => void;
}

export const SettingsDrawerDialog = ({
  title,
  value,
  isDuration,
  setValue,
  onClose,
}: Props) => {
  const [inputValue, setInputValue] = useState(isDuration ? value / 60 : value); // if this duration than convert to minutes

  function onSave() {
    setValue(isDuration ? inputValue * 60 : inputValue);
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="p-6 rounded shadow-md text-center">
        <div className="p-4 pb-0">
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => setInputValue(inputValue - 1)}
              disabled={inputValue <= 2}
            >
              <MinusIcon className="h-4 w-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <div className="flex-1 text-center">
              <div className="text-7xl font-bold tracking-tighter">
                {inputValue}
              </div>
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                {title}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => setInputValue(inputValue + 1)}
              disabled={inputValue >= 600}
            >
              <PlusIcon className="h-4 w-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-y-1 items-center mt-3">
          <Button
            onClick={onSave}
            variant="default"
            size="sm"
            className="w-full"
          >
            Save
          </Button>
          <Button
            onClick={onClose}
            variant="secondary"
            size="sm"
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
