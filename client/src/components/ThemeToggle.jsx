import { Moon } from "lucide-react";

const ThemeToggle = () => (
  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
    <Moon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
  </button>
);

export default ThemeToggle;
