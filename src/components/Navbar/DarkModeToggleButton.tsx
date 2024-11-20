'use client'
import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react';
import { Switch } from '../ui/switch';

export default function DarkModeToggleButton() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className="flex items-center ml-4">
    <Switch
      checked={darkMode}
      onCheckedChange={toggleDarkMode}
      className="data-[state=checked]:bg-primary"
    />
    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:hidden transition-all dark:-rotate-90 dark:scale-0 ml-2" />
    <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:block transition-all dark:rotate-0 dark:scale-100 ml-2" />
  </div>
  )
}
