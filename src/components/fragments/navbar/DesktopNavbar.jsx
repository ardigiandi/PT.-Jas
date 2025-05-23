import { useTheme } from "@/components/fragments/theme-provider";
import { Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function DesktopNavbar() {
  const { theme, setTheme } = useTheme();
  const pathname = useLocation().pathname;
  const themes = ["light", "dark"];

  const handleThemeChange = () => {
    const newTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(newTheme);
  };

  const navbarItems = [
    { name: "Home", path: "/" },
    { name: "Service", path: "/service" },
    { name: "Feature", path: "/feature" },
    { name: "Portofolio", path: "/portofolio" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <div className="hidden md:flex gap-14">
      <ul className="flex gap-14 items-center">
        {navbarItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`text-base ${
                pathname === item.path ? "text-oren" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-5">
        <button onClick={handleThemeChange} aria-label="Toggle theme">
          {theme === "dark" ? <Moon /> : <Sun />}
        </button>
      </div>
    </div>
  );
}

export default DesktopNavbar;
