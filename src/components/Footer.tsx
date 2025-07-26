import React from 'react';
import { Heart, Phone, MessageCircle, MapPin, Youtube } from 'lucide-react';

interface FooterProps {
  currentLang: string;
}

const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const content = {
    uz: {
      description: "Al-Misbah Ta'lim Markazi - Arab, ingliz va rus tillarini o'rganish uchun zamonaviy ta'lim markazi",
      quickLinks: "Tezkor havolalar",
      contact: "Aloqa",
      followUs: "Bizni kuzatib boring",
      rights: "Barcha huquqlar himoyalangan",
      madeWith: "Muhabbat bilan yaratildi",
      links: {
        home: "Bosh sahifa",
        languages: "Tillar",
        about: "Biz haqimizda",
        contact: "Aloqa"
      }
    },
    ru: {
      description: "Учебный центр Аль-Мисбах - современный центр изучения арабского, английского и русского языков",
      quickLinks: "Быстрые ссылки",
      contact: "Контакты",
      followUs: "Следите за нами",
      rights: "Все права защищены",
      madeWith: "Сделано с любовью",
      links: {
        home: "Главная",
        languages: "Языки",
        about: "О нас",
        contact: "Контакты"
      }
    },
    en: {
      description: "Al-Misbah Learning Centre - Modern center for learning Arabic, English, and Russian languages",
      quickLinks: "Quick Links",
      contact: "Contact",
      followUs: "Follow Us",
      rights: "All rights reserved",
      madeWith: "Made with love",
      links: {
        home: "Home",
        languages: "Languages",
        about: "About",
        contact: "Contact"
      }
    }
  };

  const currentContent = content[currentLang as keyof typeof content];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Al-Misbah</h3>
                <p className="text-amber-400">المصباح</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              {currentContent.description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://t.me/Almisbah_admin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">{currentContent.quickLinks}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {currentContent.links.home}
                </a>
              </li>
              <li>
                <a href="#languages" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {currentContent.links.languages}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {currentContent.links.about}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {currentContent.links.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">{currentContent.contact}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <div>+998 88 330 95 25</div>
                  <div>+998 55 520 95 25</div>
                  <div>+998 71 220 95 25</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <a href="https://t.me/Almisbah_admin" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    @Almisbah_admin
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  {currentLang === 'uz' ? 'Toshkent viloyati, Choshtepa' : 
                   currentLang === 'ru' ? 'Ташкентская область, Чуштепа' : 'Tashkent Region, Choshtepa'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Al-Misbah Learning Centre. {currentContent.rights}
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <span>{currentContent.madeWith}</span>
              <Heart className="w-4 h-4 text-red-500 mx-2" />
              <span>
                {currentLang === 'uz' ? 'Toshkentda' : 
                 currentLang === 'ru' ? 'в Ташкенте' : 'in Tashkent'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-teal-600"></div>
    </footer>
  );
};

export default Footer;