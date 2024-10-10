import { useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Typography } from "@/components/ui/typography";

import { HiOutlineCog6Tooth as SettingsCogIcon } from "react-icons/hi2";

import { IoCloseOutline as CloseIcon } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import { usePomodoroStore } from "@/store";

import { SettingsDrawerDialog } from "@/components/settings-drawer-dialog";
import { SettingsDrawerItem } from "@/components/settings-drawer-item";

export const SettingsDrawer = () => {
  const {
    workDuration,
    breakDuration,
    cycles,
    setWorkDuration,
    setBreakDuration,
    setCycles,
  } = usePomodoroStore();

  // State to manage which dialog to show
  const [showDialog, setShowDialog] = useState({
    open: false,
    type: "",
    value: 0,
  });

  const openDialog = (type, value) => {
    setShowDialog({ open: true, type, value });
  };

  const closeDialog = () => {
    setShowDialog({ open: false, type: "", value: 0 });
  };

  // Handle dialog setting value based on type
  const handleSetValue = (value) => {
    if (showDialog.type === "work") {
      setWorkDuration(value);
    } else if (showDialog.type === "break") {
      setBreakDuration(value);
    } else if (showDialog.type === "cycles") {
      setCycles(value);
    }
  };
  return (
    <Drawer snapPoints={["320px"]}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsCogIcon
            size={22}
            className="group-hover:scale-105 transition-all duration-75 ease-linear"
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm min-h-[200px] ">
          <DrawerHeader>
            <DrawerTitle>
              <Typography>Settings</Typography>
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0 ">
            <div className="flex items-center flex-col justify-start">
              <SettingsDrawerItem
                title="Focus session"
                value={workDuration / 60}
                prefix="min"
                onClick={() => openDialog("work", workDuration)}
              />
              <SettingsDrawerItem
                title="Break session"
                value={breakDuration / 60}
                prefix="min"
                onClick={() => openDialog("break", breakDuration)}
              />
              <SettingsDrawerItem
                title="Pomodoro cycles"
                value={cycles}
                onClick={() => openDialog("cycles", cycles)}
              />
            </div>
          </div>
          {showDialog.open && (
            <SettingsDrawerDialog
              title={`${
                showDialog.type === "work"
                  ? "Work Duration"
                  : showDialog.type === "break"
                    ? "Break Duration"
                    : "Number of Cycles"
              }`}
              isDuration={
                showDialog.type === "work"
                  ? true
                  : showDialog.type === "break"
                    ? true
                    : false
              }
              value={showDialog.value} // Pass the current value
              setValue={handleSetValue} // Callback to set the value in your store
              onClose={closeDialog} // Close handler
            />
          )}
          <DrawerFooter className="flex items-end">
            <DrawerClose asChild>
              <Button size="icon" variant="outline">
                <CloseIcon
                  size={22}
                  className="group-hover:scale-105 transition-all duration-75 ease-linear"
                />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
