import React, { useState, useEffect } from "react";
import navItems from "@data/navItems.json";

const NavLink = ({ title, url, isLast, isActive }) => (
  <li className={isLast ? "" : "mr-8"}>
    <a
      className={`inline-block font-bold text-white hover:text-gray-200 transition-colors duration-200
                  ${isActive
                    ? "underline decoration-red-500 underline-offset-4"
                    : "no-underline"
                  }`}
      href={url}
    >
      {title}
    </a>
  </li>
);


function GlobalNavigation({ logo, currentPath = "/" }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };


  // Close menu on escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleEsc);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleCloseClick = () => {
    closeMenu();
  };

  return (
    <React.Fragment>
      <>
        <section className="sticky top-0 left-0 right-0 w-full z-50">
          <nav className="py-6 bg-black">
            <div className="container px-4 mx-auto">
              <div className="flex items-center justify-between relative">
                <a className="inline-block" href="/">
                  <img
                    src={logo.src}
                    alt='LEDPac Logo'
                    width={logo.width}
                    height={logo.height}
                    format={logo.format}
                    loading="eager"
                    
                  />
                </a>
                <button
                  className="lg:hidden text-white"
                  onClick={toggleMenu} // Added onClick handler
                  aria-label="Toggle menu" // Added aria-label
                  //aria-expanded={isOpen} // Indicate state for accessibility
                  //aria-controls="mobile-menu" // Link button to the menu it controls
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.5 7C3.22386 7 3 6.77614 3 6.5C3 6.22386 3.22386 6 3.5 6H20.5C20.7761 6 21 6.22386 21 6.5C21 6.77614 20.7761 7 20.5 7H3.5ZM3.5 12C3.22386 12 3 11.7761 3 11.5C3 11.2239 3.22386 11 3.5 11H20.5C20.7761 11 21 11.2239 21 11.5C21 11.7761 20.7761 12 20.5 12H3.5ZM3 16.5C3 16.7761 3.22386 17 3.5 17H20.5C20.7761 17 21 16.7761 21 16.5C21 16.2239 20.7761 16 20.5 16H3.5C3.22386 16 3 16.2239 3 16.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <div className="hidden lg:block ml-auto mr-14">
                  <ul className="inline-flex">
                    {navItems.main_menu
                      .filter(item => !item.button)
                      .map((item, index ) => (
                        <NavLink
                          key={index}
                          title={item.title}
                          url={item.url}
                          isLast={index === navItems.main_menu.length - 1}
                          isActive={currentPath === item.url}
                        />
                      ))}
                  </ul>
                </div>
                {navItems.main_menu
                  .filter(item => item.button)
                  .map((buttonItem, index) => (
                    <div key={`button-${index}`} className="hidden lg:block">
                      <a
                        className="inline-block px-8 py-3 text-black font-bold bg-gray-100 hover:bg-gray-200 rounded-md"
                        href={buttonItem.url}
                      >
                        {buttonItem.title}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </nav>
          <div
            className={`fixed top-0 left-0 bottom-0 w-3/4 max-w-xs z-50 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
            <nav className="relative flex flex-col h-full p-8 bg-opacity-80 bg-black text-white">
              <div className="flex items-center justify-between mb-12">
                <a className="items-center" href="/" aria-label="LEDPac Logo">
                  <img
                    src={logo.src}
                    alt="LEDPac Logo"
                    width={logo.width}
                    height={logo.height}
                    format={logo.format}
                    loading="eager"
                  />
                </a>
                <button
                  className="inline-block focus:outline-none"
                  type="button"
                  aria-label="Close"
                  onClick={handleCloseClick} // Added onClick handler
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <ul>
                  {navItems.main_menu
                    .filter(item => !item.button)
                    .map((item, index) => (
                      <li key={index} className="py-3">
                        <a
                          className="inline-block font-bold hover:text-gray-300 text-white text-lg"
                          href={item.url}
                         
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                </ul>
                {navItems.main_menu
                  .filter(item => item.button)
                  .map((buttonItem, index) => (
                    <div key={`mobile-button-${index}`}>
                      <a
                        className="block px-8 py-3 mt-4 text-center text-white font-bold bg-red-700 hover:bg-red-800 rounded-lg"
                        href={buttonItem.url}
                        
                      >
                        {buttonItem.title}
                      </a>
                    </div>
                  ))}
              </div>
            </nav>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}

export default GlobalNavigation;
