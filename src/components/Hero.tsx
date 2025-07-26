import React, { useEffect, useState } from 'react';
import { Sparkles, Play, ArrowRight } from 'lucide-react';

interface HeroProps {
  currentLang: string;
}

const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const [animatedText, setAnimatedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const content = {
    uz: {
      title: "Bilim Nuri",
      subtitle: "Al-Misbah Ta'lim Markazi",
      description: "Arab, ingliz va rus tillarini o'rganish uchun zamonaviy va interaktiv ta'lim markazi",
      cta: "Sayohatni Boshlang",
      tagline: "نور المعرفة - Bilim Nuri"
    },
    ru: {
      title: "Свет Знаний",
      subtitle: "Учебный Центр Аль-Мисбах",
      description: "Современный интерактивный центр изучения арабского, английского и русского языков",
      cta: "Начать Путешествие",
      tagline: "نور المعرفة - Свет Знаний"
    },
    en: {
      title: "Light of Knowledge",
      subtitle: "Al-Misbah Learning Centre",
      description: "Modern interactive center for learning Arabic, English, and Russian languages",
      cta: "Start Your Journey",
      tagline: "نور المعرفة - Light of Knowledge"
    }
  };

  const currentContent = content[currentLang as keyof typeof content];

  useEffect(() => {
    const text = currentContent.tagline;
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setAnimatedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentContent.tagline]);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-teal-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo Animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-20 animate-ping"></div>
            </div>
          </div>

          {/* Animated Tagline */}
          <div className="mb-6">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 min-h-[2rem]">
              {animatedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-teal-600">
              {currentContent.title}
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            {currentContent.subtitle}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {currentContent.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>{currentContent.cta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="group flex items-center space-x-2 px-6 py-3 border-2 border-amber-600 text-amber-600 font-semibold rounded-full hover:bg-amber-600 hover:text-white transition-all duration-300">
              <Play className="w-5 h-5" />
              <span>
                {currentLang === 'uz' ? 'Video ko\'rish' : currentLang === 'ru' ? 'Смотреть видео' : 'Watch Video'}
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">3</div>
              <div className="text-gray-600">
                {currentLang === 'uz' ? 'Tillar' : currentLang === 'ru' ? 'Языка' : 'Languages'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">
                {currentLang === 'uz' ? 'O\'quvchilar' : currentLang === 'ru' ? 'Студентов' : 'Students'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">5+</div>
              <div className="text-gray-600">
                {currentLang === 'uz' ? 'Yillik tajriba' : currentLang === 'ru' ? 'Лет опыта' : 'Years Experience'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;