import React, { useState } from 'react';
import { BookOpen, Globe, Users, Star, Play, Trophy, Target } from 'lucide-react';

interface LanguageGamesProps {
  currentLang: string;
}

const LanguageGames: React.FC<LanguageGamesProps> = ({ currentLang }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [gameActive, setGameActive] = useState(false);

  const content = {
    uz: {
      title: "Interaktiv Til O'rganish",
      subtitle: "Har bir til uchun maxsus o'yinlar bilan o'rganing",
      languages: {
        arabic: {
          name: "Arab tili",
          description: "Islom madaniyati va arab tilining go'zalligi",
          game: "Arab Xazinasi Ovi",
          gameDesc: "Arab harflarini birlashtiring va yashirin naqshlarni oching"
        },
        english: {
          name: "Ingliz tili",
          description: "Dunyo tili - global aloqa vositasi",
          game: "Global Ko'prik Quruvchisi",
          gameDesc: "Ingliz so'zlari bilan mashhur iboralarni tuzing"
        },
        russian: {
          name: "Rus tili",
          description: "Slavyan madaniyati va rus adabiyoti",
          game: "Kirill Kristal Kaskadi",
          gameDesc: "Kirill harflarini tartiblab so'zlar hosil qiling"
        }
      }
    },
    ru: {
      title: "Интерактивное Изучение Языков",
      subtitle: "Изучайте с помощью специальных игр для каждого языка",
      languages: {
        arabic: {
          name: "Арабский язык",
          description: "Красота исламской культуры и арабского языка",
          game: "Охота за Арабскими Сокровищами",
          gameDesc: "Соединяйте арабские буквы и открывайте скрытые узоры"
        },
        english: {
          name: "Английский язык",
          description: "Язык мира - средство глобального общения",
          game: "Строитель Глобальных Мостов",
          gameDesc: "Создавайте знаменитые фразы английскими словами"
        },
        russian: {
          name: "Русский язык",
          description: "Славянская культура и русская литература",
          game: "Кириллический Кристальный Каскад",
          gameDesc: "Расставляйте кириллические буквы, образуя слова"
        }
      }
    },
    en: {
      title: "Interactive Language Learning",
      subtitle: "Learn with special games designed for each language",
      languages: {
        arabic: {
          name: "Arabic Language",
          description: "Beauty of Islamic culture and Arabic language",
          game: "Arabic Treasure Hunt",
          gameDesc: "Connect Arabic letters and reveal hidden patterns"
        },
        english: {
          name: "English Language",
          description: "World language - global communication tool",
          game: "Global Bridge Builder",
          gameDesc: "Create famous phrases with English words"
        },
        russian: {
          name: "Russian Language",
          description: "Slavic culture and Russian literature",
          game: "Cyrillic Crystal Cascade",
          gameDesc: "Arrange Cyrillic letters to form words"
        }
      }
    }
  };

  const currentContent = content[currentLang as keyof typeof content];

  const languageCards = [
    {
      id: 'arabic',
      icon: '🕌',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-800'
    },
    {
      id: 'english',
      icon: '🌍',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800'
    },
    {
      id: 'russian',
      icon: '❄️',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-100',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800'
    }
  ];

  const startGame = (languageId: string) => {
    setSelectedLanguage(languageId);
    setGameActive(true);
    // Game logic would be implemented here
    setTimeout(() => {
      setGameActive(false);
      setSelectedLanguage(null);
    }, 3000);
  };

  return (
    <section id="languages" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {currentContent.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {languageCards.map((card) => {
            const langData = currentContent.languages[card.id as keyof typeof currentContent.languages];
            const isSelected = selectedLanguage === card.id;
            
            return (
              <div
                key={card.id}
                className={`group relative overflow-hidden rounded-2xl border-2 ${card.borderColor} ${card.bgColor} p-8 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  isSelected ? 'scale-105 shadow-2xl' : ''
                }`}
                onClick={() => !gameActive && startGame(card.id)}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-transparent via-white to-transparent"></div>
                </div>

                {/* Card Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-6xl mb-6 text-center transform group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>

                  {/* Language Name */}
                  <h3 className={`text-2xl font-bold ${card.textColor} mb-4 text-center`}>
                    {langData.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-center mb-6 leading-relaxed">
                    {langData.description}
                  </p>

                  {/* Game Info */}
                  <div className="bg-white/50 rounded-lg p-4 mb-6">
                    <h4 className={`font-semibold ${card.textColor} mb-2 flex items-center`}>
                      <Trophy className="w-4 h-4 mr-2" />
                      {langData.game}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {langData.gameDesc}
                    </p>
                  </div>

                  {/* Play Button */}
                  <button
                    className={`w-full py-3 px-6 bg-gradient-to-r ${card.color} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2`}
                    disabled={gameActive}
                  >
                    {gameActive && selectedLanguage === card.id ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>
                          {currentLang === 'uz' ? 'O\'yin boshlanmoqda...' : 
                           currentLang === 'ru' ? 'Игра начинается...' : 'Starting Game...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        <span>
                          {currentLang === 'uz' ? 'O\'yinni Boshlash' : 
                           currentLang === 'ru' ? 'Начать Игру' : 'Start Game'}
                        </span>
                      </>
                    )}
                  </button>

                  {/* Stats */}
                  <div className="mt-6 flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>150+</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      <span>4.9</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      <span>95%</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            );
          })}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {currentLang === 'uz' ? 'Interaktiv Darslar' : 
               currentLang === 'ru' ? 'Интерактивные Уроки' : 'Interactive Lessons'}
            </h3>
            <p className="text-gray-600">
              {currentLang === 'uz' ? 'Zamonaviy texnologiyalar yordamida samarali o\'rganish' : 
               currentLang === 'ru' ? 'Эффективное обучение с помощью современных технологий' : 'Effective learning with modern technology'}
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {currentLang === 'uz' ? 'Global Sertifikatlar' : 
               currentLang === 'ru' ? 'Глобальные Сертификаты' : 'Global Certificates'}
            </h3>
            <p className="text-gray-600">
              {currentLang === 'uz' ? 'Xalqaro tan olingan sertifikatlar olish imkoniyati' : 
               currentLang === 'ru' ? 'Возможность получения международно признанных сертификатов' : 'Opportunity to earn internationally recognized certificates'}
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {currentLang === 'uz' ? 'Tajribali O\'qituvchilar' : 
               currentLang === 'ru' ? 'Опытные Преподаватели' : 'Experienced Teachers'}
            </h3>
            <p className="text-gray-600">
              {currentLang === 'uz' ? 'Malakali va tajribali o\'qituvchilar jamoasi' : 
               currentLang === 'ru' ? 'Команда квалифицированных и опытных преподавателей' : 'Team of qualified and experienced teachers'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageGames;