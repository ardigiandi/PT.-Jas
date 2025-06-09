import { useTheme } from "@/components/fragments/theme-provider";
// import { Sun, Moon } from "lucide-react";
import { Button } from "../../ui/button";
import {
  HammerIcon,
  HomeIcon,
  SquareLibrary,
  MenuIcon,
  CircleCheck,
  CircleHelp,
} from "lucide-react";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function MobileNavbar() {
  const { theme, setTheme } = useTheme();
  const themes = ["light", "dark"];

  // const handleThemeChange = () => {
  //   const newTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
  //   setTheme(newTheme);
  // };

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setShowMobileMenu(false); // Tutup menu setelah klik
    }
  };

  const navbarItems = [
    { name: "Home", id: "hero", icon: <HomeIcon className="w-4 h-4" /> },
    { name: "Services", id: "services", icon: <HammerIcon className="w-4 h-4" /> },
    { name: "Feature", id: "feature", icon: <SquareLibrary className="w-4 h-4" /> },
    { name: "Portofolio", id: "portofolio", icon: <CircleCheck className="w-4 h-4" /> },
    { name: "FAQ", id: "faq", icon: <CircleHelp className="w-4 h-4" /> },
  ];

  return (
    <div className="flex lg:hidden">
      {/* <button onClick={handleThemeChange}>
        {theme === "dark" ? <Moon /> : <Sun />}
      </button> */}

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            {/* <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Choose an option</SheetDescription> */}
          </SheetHeader>

          <nav className="flex flex-col gap-4 mt-6 mx-2">
            {navbarItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex items-center gap-3 justify-start"
                onClick={() => scrollToSection(item.id)}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
