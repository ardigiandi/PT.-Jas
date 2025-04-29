import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useTheme } from "@/components/fragments/theme-provider";

function Navbar() {
  const { theme } = useTheme(); // Get the current theme
  const isDarkMode = theme === "dark"; // Determine if dark mode is active

  const logoSrc = isDarkMode
    ? "/assets/logo-black.png"
    : "/assets/logo-white.png";

  return (
    <nav className="max-w-6xl mx-auto px-4 md:px-0 flex justify-between items-center my-2">
      <img src={logoSrc} alt="Logo" className="w-28" />
      <DesktopNavbar isDarkMode={isDarkMode} />
      <MobileNavbar isDarkMode={isDarkMode} />
    </nav>
  );
}

export default Navbar;
