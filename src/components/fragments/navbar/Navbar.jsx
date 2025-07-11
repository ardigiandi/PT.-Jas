import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
// import { useTheme } from "@/components/fragments/theme-provider";

function Navbar() {
  // const { theme } = useTheme(); // Get the current theme
  // const isDarkMode = theme === "dark"; // Determine if dark mode is active

  // const logoSrc = isDarkMode
  //   ? "/assets/logo-black.png"
  //   : "/assets/logo-white.png";

  return (
    <nav className="px-4 md:px-10 flex z-20 justify-between bg-white dark:bg-black fixed top-0 w-full items-center shadow-2xl">
      <img src="/assets/logo-white.png" alt="Logo" className="w-28" />
      <DesktopNavbar />
      <MobileNavbar />
    </nav>
  );
}

export default Navbar;
