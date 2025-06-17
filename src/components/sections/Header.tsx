"use client";

import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    setIsMenuOpen(false);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md fixed top-0 w-full z-50">
      <nav className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <p className="text-green-800">Фінансовий тренер</p>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-green-800">
          <li>
            <a href="#about" onClick={(e) => handleSmoothScroll(e, "about")}>
              Про мене
            </a>
          </li>
          <li>
            <a
              href="#tariffs"
              onClick={(e) => handleSmoothScroll(e, "tariffs")}
            >
              Тарифи
            </a>
          </li>
          <li>
            <a
              href="#reviews"
              onClick={(e) => handleSmoothScroll(e, "reviews")}
            >
              Відгуки
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "contact")}
            >
              Контакти
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-green-800 focus:outline-none transition-transform duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${
              isMenuOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-md md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col py-4 text-green-800">
            <li>
              <a
                href="#about"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                onClick={(e) => handleSmoothScroll(e, "about")}
              >
                Про мене
              </a>
            </li>
            <li>
              <a
                href="#tariffs"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                onClick={(e) => handleSmoothScroll(e, "tariffs")}
              >
                Тарифи
              </a>
            </li>
            <li>
              <a
                href="#reviews"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                onClick={(e) => handleSmoothScroll(e, "reviews")}
              >
                Відгуки
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                onClick={(e) => handleSmoothScroll(e, "contact")}
              >
                Контакти
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
