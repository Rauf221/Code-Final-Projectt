import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface Language {
  code: string;
  name: string;
  flagUrl: string;
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    flagUrl: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
  },
  {
    code: "ar",
    name: "العربية",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg",
  },
  {
    code: "it",
    name: "Italiano",
    flagUrl: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
  },
  {
    code: "el",
    name: "Ελληνικά",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg",
  },
  {
    code: "de",
    name: "Deutsch",
    flagUrl: "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg",
  },
  {
    code: "fr",
    name: "Français",
    flagUrl: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
  },
];

const LanguageDropdown: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]); // Default language
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility state

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative  z-10 block">
      {/* Dropdown Toggle Button */}
      <button
        onClick={toggleDropdown} // Toggle dropdown on button click
        className="flex items-center space-x-2  bg-[#263c97] text-white  pr-4 border-r border-r-[#354bba]  "
      >
        
        <img src={selectedLanguage.flagUrl} alt={`${selectedLanguage.name} Flag`} className="w-5 h-5" />
        <span>{selectedLanguage.name}</span> {/* Display selected language name */}
        <MdOutlineKeyboardArrowDown />
      </button>
     

      {/* Dropdown Menu (toggles on button click) */}
      {isDropdownOpen && (
        <ul className="absolute pt-2 mt-1 left-0 w-40 bg-white border border-gray-300 shadow-lg rounded-md text-sm">
          {languages.map((language) => (
            <li
              key={language.code}
              className={`flex items-center px-3 py-2 text-black hover:bg-gray-100 cursor-pointer ${
                language.code === selectedLanguage.code ? "text-blue-500" : ""
              }`}
              onClick={() => {
                setSelectedLanguage(language); // Update selected language on click
                setIsDropdownOpen(false); // Close the dropdown after selection
              }}
            >
              <img src={language.flagUrl} alt={`${language.name} Flag`} className="w-5 h-5 mr-2" />
              <span>{language.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;
