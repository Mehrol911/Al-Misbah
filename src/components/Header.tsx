import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentLang, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = {
    uz: 'O\'zbek',
    ru: 'Русский',
    en: 'English'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Al-Misbah</h1>
              <p className="text-sm text-gray-600">المصباح</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors">
              {currentLang === 'uz' ? 'Bosh sahifa' : currentLang === 'ru' ? 'Главная' : 'Home'}
            </a>
            <a href="#languages" className="text-gray-700 hover:text-amber-600 transition-colors">
              {currentLang === 'uz' ? 'Tillar' : currentLang === 'ru' ? 'Языки' : 'Languages'}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors">
              {currentLang === 'uz' ? 'Aloqa' : currentLang === 'ru' ? 'Контакты' : 'Contact'}
            </a>
          </nav>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors"
            >
              <Globe className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">{languages[currentLang as keyof typeof languages]}</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[120px]">
                {Object.entries(languages).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => {
                      onLanguageChange(code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-amber-50 transition-colors ${
                      currentLang === code ? 'text-amber-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors">
                {currentLang === 'uz' ? 'Bosh sahifa' : currentLang === 'ru' ? 'Главная' : 'Home'}
              </a>
              <a href="#languages" className="text-gray-700 hover:text-amber-600 transition-colors">
                {currentLang === 'uz' ? 'Tillar' : currentLang === 'ru' ? 'Языки' : 'Languages'}
              </a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors">
                {currentLang === 'uz' ? 'Aloqa' : currentLang === 'ru' ? 'Контакты' : 'Contact'}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;