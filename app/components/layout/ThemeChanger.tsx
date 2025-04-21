"use client";

import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEffect, useRef, useState } from "react";

// Type for Theme Options
type ThemeOption = "light" | "dark" | "system";

// Theme Configuration
const THEME_OPTIONS: {
  value: ThemeOption;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
  },
];

const ThemeChanger: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change theme">
          {theme === "light" ? <Sun /> : <Moon />}
          <VisuallyHidden>Toggle Theme</VisuallyHidden>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-32 p-1 space-y-1" align="end">
        {THEME_OPTIONS.map((themeOption) => {
          const Icon = themeOption.icon;
          const isActive = theme === themeOption.value;

          return (
            <Button
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              variant={isActive ? "default" : "ghost"}
              className="justify-start"
              aria-pressed={isActive}
            >
              <Icon className="mr-2 h-4 w-4" />
              {themeOption.label}
            </Button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default ThemeChanger;
