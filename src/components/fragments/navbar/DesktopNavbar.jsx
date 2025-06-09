import { useTheme } from "@/components/fragments/theme-provider";
// import { Sun, Moon } from "lucide-react";

function DesktopNavbar() {
  const { theme, setTheme } = useTheme();
  const themes = ["light", "dark"];

  // const handleThemeChange = () => {
  //   const newTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
  //   setTheme(newTheme);
  // };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navbarItems = [
    { name: "Home", id: "hero" },
    // { name: "Clients", id: "clients" },
    { name: "About", id: "about" },
    // { name: "Vision", id: "vision" },
    { name: "Services", id: "services" },
    { name: "Portofolio", id: "portofolio" },
  ];

  return (
    <div className="hidden md:flex gap-14">
      <ul className="flex gap-14 items-center">
        {navbarItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => scrollToSection(item.id)}
              className="text-base hover:text-orange-500 transition"
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>

      {/* <div className="flex gap-5">
        <button onClick={handleThemeChange} aria-label="Toggle theme">
          {theme === "dark" ? <Moon /> : <Sun />}
        </button>
      </div> */}
    </div>
  );
}

export default DesktopNavbar;
