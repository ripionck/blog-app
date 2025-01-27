import { useContext } from "react";
import { ThemeContext } from "../contexts/AuthContext";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
