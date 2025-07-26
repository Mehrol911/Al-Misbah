import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Globe, Users, Star, Play, Trophy, Target, RotateCcw, Home, CheckCircle, Volume2, Heart } from 'lucide-react';

interface LanguageGamesProps {
  currentLang: string;
}

const LanguageGames: React.FC<LanguageGamesProps> = ({ currentLang }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);

  // Arabic Memory Matching Game
  const [arabicCards, setArabicCards] = useState<Array<{id: number, emoji: string, arabic: string, meaning: string, flipped: boolean, matched: boolean}>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  // English Sound Match Game
  const [englishGame, setEnglishGame] = useState({
    currentWord: '',
    options: [] as string[],
    showingImage: true,
    streak: 0
  });

  // Russian Color Reaction Game
  const [russianGame, setRussianGame] = useState({
    currentColor: '',
    russianName: '',
    targetColor: '',
    colors: [] as Array<{color: string, russian: string, name: string}>,
    showInstruction: true,
    reactionTime: 0,
    startTime: 0
  });

  const content = {
    uz: {
      title: "Interaktiv Til O'rganish",
      subtitle: "7 yoshdan 70 yoshgacha - hamma uchun qiziqarli o'yinlar!",
      backToMenu: "Menyuga qaytish",
      score: "Ball",
      level: "Daraja", 
      timeLeft: "Qolgan vaqt",
      lives: "Jonlar",
      tryAgain: "Qayta urinish",
      gameOver: "O'yin tugadi",
      excellent: "Zo'r!",
      good: "Yaxshi!",
      clickToPlay: "Boshlash uchun bosing",
      languages: {
        arabic: {
          name: "Arab tili",
          description: "Xotira o'yini - rasmlar va ma'nolarni eslang",
          game: "Arab Xotira Dueli",
          gameDesc: "Emoji va arab so'zlarini juftlang. Xotira va madaniyatni birlashtiring!",
          instruction: "Kartalarni bosib juftlarni toping",
          pairsLeft: "Qolgan juftlar"
        },
        english: {
          name: "Ingliz tili", 
          description: "Tovush va rasm o'yini - tez va aniq javob bering",
          game: "Ingliz Tovush Safari",
          gameDesc: "Hayvonlarning tovushini eshiting va to'g'ri rasmni tanlang!",
          instruction: "Tovushni eshiting va rasmni tanlang",
          streak: "Ketma-ket to'g'ri"
        },
        russian: {
          name: "Rus tili",
          description: "Rang va tezlik o'yini - reflekslaringizni sinang",
          game: "Rus Rang Reaktsiyasi", 
          gameDesc: "Ranglarni tez tanib, rus nomlarini bosing!",
          instruction: "Ko'rsatilgan rangni toping",
          reactionTime: "Reaktsiya vaqti"
        }
      }
    },
    ru: {
      title: "Интерактивное Изучение Языков",
      subtitle: "Увлекательные игры для всех от 7 до 70 лет!",
      backToMenu: "Назад в меню",
      score: "Очки",
      level: "Уровень",
      timeLeft: "Время",
      lives: "Жизни", 
      tryAgain: "Попробовать снова",
      gameOver: "Игра окончена",
      excellent: "Отлично!",
      good: "Хорошо!",
      clickToPlay: "Нажмите для игры",
      languages: {
        arabic: {
          name: "Арабский язык",
          description: "Игра на память - запоминайте картинки и значения",
          game: "Арабская Дуэль Памяти",
          gameDesc: "Сопоставьте эмодзи с арабскими словами. Память + культура!",
          instruction: "Нажимайте карты, чтобы найти пары",
          pairsLeft: "Осталось пар"
        },
        english: {
          name: "Английский язык",
          description: "Игра звуков и картинок - отвечайте быстро и точно",
          game: "Английское Звуковое Сафари", 
          gameDesc: "Слушайте звуки животных и выбирайте правильную картинку!",
          instruction: "Слушайте звук и выбирайте картинку",
          streak: "Подряд правильно"
        },
        russian: {
          name: "Русский язык",
          description: "Игра цветов и скорости - проверьте свои рефлексы",
          game: "Русская Цветовая Реакция",
          gameDesc: "Быстро распознавайте цвета и нажимайте русские названия!",
          instruction: "Найдите показанный цвет",
          reactionTime: "Время реакции"
        }
      }
    },
    en: {
      title: "Interactive Language Learning",
      subtitle: "Fun games for everyone from 7 to 70 years old!",
      backToMenu: "Back to Menu",
      score: "Score",
      level: "Level", 
      timeLeft: "Time Left",
      lives: "Lives",
      tryAgain: "Try Again",
      gameOver: "Game Over",
      excellent: "Excellent!",
      good: "Good!",
      clickToPlay: "Click to Play",
      languages: {
        arabic: {
          name: "Arabic Language",
          description: "Memory game - remember pictures and meanings",
          game: "Arabic Memory Duel",
          gameDesc: "Match emojis with Arabic words. Memory meets culture!",
          instruction: "Click cards to find pairs",
          pairsLeft: "Pairs left"
        },
        english: {
          name: "English Language", 
          description: "Sound and picture game - answer fast and accurate",
          game: "English Sound Safari",
          gameDesc: "Listen to animal sounds and choose the right picture!",
          instruction: "Listen to sound and pick the image",
          streak: "Correct streak"
        },
        russian: {
          name: "Russian Language",
          description: "Color and speed game - test your reflexes",
          game: "Russian Color Reaction",
          gameDesc: "Quickly recognize colors and tap Russian names!",
          instruction: "Find the shown color",
          reactionTime: "Reaction time"
        }
      }
    }
  };

  const currentContent = content[currentLang as keyof typeof content];

  const languageCards = [
    {
      id: 'arabic',
      icon: '🧠',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-800'
    },
    {
      id: 'english',
      icon: '🎵',
      color: 'from-blue-500 to-indigo-600', 
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800'
    },
    {
      id: 'russian',
      icon: '⚡',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-100', 
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800'
    }
  ];

  // Game Data
  const arabicWords = [
    { emoji: '☮️', arabic: 'سلام', meaning: 'Peace' },
    { emoji: '🙏', arabic: 'شكرا', meaning: 'Thanks' },
    { emoji: '👋', arabic: 'مرحبا', meaning: 'Hello' },
    { emoji: '❤️', arabic: 'حب', meaning: 'Love' },
    { emoji: '🏠', arabic: 'بيت', meaning: 'House' },
    { emoji: '💧', arabic: 'ماء', meaning: 'Water' },
    { emoji: '☀️', arabic: 'شمس', meaning: 'Sun' },
    { emoji: '🌙', arabic: 'قمر', meaning: 'Moon' }
  ];

  const animalSounds = [
    { animal: 'cat', emoji: '🐱', sound: 'meow' },
    { animal: 'dog', emoji: '🐶', sound: 'woof' },
    { animal: 'cow', emoji: '🐄', sound: 'moo' },
    { animal: 'duck', emoji: '🦆', sound: 'quack' },
    { animal: 'lion', emoji: '🦁', sound: 'roar' },
    { animal: 'bird', emoji: '🐦', sound: 'tweet' },
    { animal: 'pig', emoji: '🐷', sound: 'oink' },
    { animal: 'horse', emoji: '🐎', sound: 'neigh' }
  ];

  const colors = [
    { color: '#FF0000', russian: 'красный', name: 'Red' },
    { color: '#0000FF', russian: 'синий', name: 'Blue' },
    { color: '#00FF00', russian: 'зелёный', name: 'Green' },
    { color: '#FFFF00', russian: 'жёлтый', name: 'Yellow' },
    { color: '#FF69B4', russian: 'розовый', name: 'Pink' },
    { color: '#800080', russian: 'фиолетовый', name: 'Purple' },
    { color: '#FFA500', russian: 'оранжевый', name: 'Orange' },
    { color: '#000000', russian: 'чёрный', name: 'Black' }
  ];

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0 && !gameOver) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft, gameOver]);

  // Initialize Arabic Memory Game
  const initArabicGame = () => {
    const gameWords = arabicWords.slice(0, 6); // 6 pairs = 12 cards
    const cards = [];
    let id = 0;
    
    gameWords.forEach(word => {
      // Add emoji card
      cards.push({
        id: id++,
        emoji: word.emoji,
        arabic: word.arabic,
        meaning: word.meaning,
        flipped: false,
        matched: false
      });
      // Add arabic card
      cards.push({
        id: id++,
        emoji: word.emoji,
        arabic: word.arabic,
        meaning: word.meaning,
        flipped: false,
        matched: false
      });
    });
    
    // Shuffle cards
    setArabicCards(cards.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
  };

  // Initialize English Sound Game
  const initEnglishGame = () => {
    const randomAnimal = animalSounds[Math.floor(Math.random() * animalSounds.length)];
    const wrongOptions = animalSounds
      .filter(a => a.animal !== randomAnimal.animal)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [randomAnimal, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    setEnglishGame({
      currentWord: randomAnimal.animal,
      options: allOptions.map(a => a.emoji),
      showingImage: false,
      streak: 0
    });
  };

  // Initialize Russian Color Game
  const initRussianGame = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    
    setRussianGame({
      currentColor: randomColor.color,
      russianName: randomColor.russian,
      targetColor: randomColor.name,
      colors: shuffledColors,
      showInstruction: true,
      reactionTime: 0,
      startTime: Date.now()
    });
  };

  const startGame = (languageId: string) => {
    setSelectedLanguage(languageId);
    setGameActive(true);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setLives(3);
    
    if (languageId === 'arabic') initArabicGame();
    else if (languageId === 'english') initEnglishGame();
    else if (languageId === 'russian') initRussianGame();
  };

  const endGame = () => {
    setGameActive(false);
    setSelectedLanguage(null);
  };

  const restartGame = () => {
    if (selectedLanguage) startGame(selectedLanguage);
  };

  // Arabic game handlers
  const flipCard = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    
    setArabicCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, flipped: true } : card
    ));

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = arabicCards.find(c => c.id === first);
      const secondCard = arabicCards.find(c => c.id === second);
      
      if (firstCard && secondCard && firstCard.arabic === secondCard.arabic) {
        // Match found!
        setTimeout(() => {
          setArabicCards(prev => prev.map(card => 
            card.arabic === firstCard.arabic ? { ...card, matched: true } : card
          ));
          setScore(prev => prev + 100);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setArabicCards(prev => prev.map(card => 
            newFlipped.includes(card.id) ? { ...card, flipped: false } : card
          ));
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  // English game handlers
  const selectAnimal = (emoji: string) => {
    const correctAnimal = animalSounds.find(a => a.animal === englishGame.currentWord);
    if (correctAnimal && emoji === correctAnimal.emoji) {
      setScore(prev => prev + 150);
      setEnglishGame(prev => ({ ...prev, streak: prev.streak + 1 }));
      setTimeout(initEnglishGame, 1000);
    } else {
      setLives(prev => prev - 1);
      if (lives <= 1) setGameOver(true);
      setTimeout(initEnglishGame, 1000);
    }
  };

  // Russian game handlers
  const selectColor = (colorName: string) => {
    const reactionTime = Date.now() - russianGame.startTime;
    if (colorName === russianGame.russianName) {
      const timeBonus = Math.max(0, 200 - Math.floor(reactionTime / 10));
      setScore(prev => prev + 100 + timeBonus);
      setRussianGame(prev => ({ ...prev, reactionTime }));
      setTimeout(initRussianGame, 1000);
    } else {
      setLives(prev => prev - 1);
      if (lives <= 1) setGameOver(true);
      setTimeout(initRussianGame, 1000);
    }
  };

  // Render game content
  const renderGameContent = () => {
    if (!selectedLanguage || !gameActive) return null;

    const gameCard = languageCards.find(card => card.id === selectedLanguage);
    if (!gameCard) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${gameCard.bgColor} rounded-2xl p-6 max-w-4xl w-full max-h-screen overflow-y-auto`}>
          {/* Game Header */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={endGame}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>{currentContent.backToMenu}</span>
            </button>
            
            <div className="flex space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>{currentContent.score}: {score}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-blue-500" />
                <span>{currentContent.level}: {level}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>⏰ {timeLeft}s</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{lives}</span>
              </div>
            </div>
          </div>

          {/* Game Title */}
          <h3 className={`text-3xl font-bold ${gameCard.textColor} mb-6 text-center`}>
            {currentContent.languages[selectedLanguage as keyof typeof currentContent.languages].game}
          </h3>

          {gameOver ? (
            <div className="text-center space-y-6">
              <div className="text-6xl">🎯</div>
              <h4 className="text-2xl font-bold text-gray-800">{currentContent.gameOver}</h4>
              <p className="text-xl">Final Score: {score}</p>
              <button 
                onClick={restartGame}
                className={`bg-gradient-to-r ${gameCard.color} text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105`}
              >
                {currentContent.tryAgain}
              </button>
            </div>
          ) : (
            <>
              {/* Arabic Memory Game */}
              {selectedLanguage === 'arabic' && (
                <div className="space-y-6">
                  <p className="text-center text-gray-700 mb-4">
                    {currentContent.languages.arabic.instruction}
                  </p>
                  
                  <div className="grid grid-cols-4 gap-4">
                    {arabicCards.map(card => (
                      <div
                        key={card.id}
                        onClick={() => !card.flipped && !card.matched && flipCard(card.id)}
                        className={`aspect-square rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center text-4xl font-bold ${
                          card.matched 
                            ? 'bg-green-200 border-green-400' 
                            : card.flipped 
                              ? 'bg-white border-amber-400' 
                              : 'bg-amber-100 border-amber-300 hover:bg-amber-200'
                        }`}
                      >
                        {card.matched || card.flipped ? (
                          <div className="text-center">
                            <div className="text-3xl mb-1">
                              {card.id % 2 === 0 ? card.emoji : card.arabic}
                            </div>
                            <div className="text-xs text-gray-600">
                              {card.meaning}
                            </div>
                          </div>
                        ) : (
                          '🎴'
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* English Sound Game */}
              {selectedLanguage === 'english' && (
                <div className="space-y-6 text-center">
                  <div className="bg-white rounded-xl p-8 shadow-lg">
                    <div className="text-6xl mb-4">🔊</div>
                    <p className="text-lg text-gray-700 mb-4">
                      {currentContent.languages.english.instruction}
                    </p>
                    <div className="text-4xl mb-6 p-4 bg-blue-100 rounded-lg">
                      Animal Sound: "{animalSounds.find(a => a.animal === englishGame.currentWord)?.sound}"
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {englishGame.options.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => selectAnimal(emoji)}
                          className="text-6xl p-6 bg-blue-50 hover:bg-blue-100 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all transform hover:scale-105"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-600">
                      {currentContent.languages.english.streak}: {englishGame.streak}
                    </div>
                  </div>
                </div>
              )}

              {/* Russian Color Game */}
              {selectedLanguage === 'russian' && (
                <div className="space-y-6 text-center">
                  <div className="bg-white rounded-xl p-8 shadow-lg">
                    <p className="text-lg text-gray-700 mb-6">
                      {currentContent.languages.russian.instruction}
                    </p>
                    
                    <div 
                      className="w-32 h-32 mx-auto rounded-full mb-6 border-4 border-gray-300 shadow-lg"
                      style={{ backgroundColor: russianGame.currentColor }}
                    ></div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {russianGame.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => selectColor(color.russian)}
                          className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all transform hover:scale-105"
                        >
                          <div className="text-lg font-bold text-purple-800">
                            {color.russian}
                          </div>
                          <div className="text-sm text-gray-600">
                            ({color.name})
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {russianGame.reactionTime > 0 && (
                      <div className="mt-4 text-sm text-gray-600">
                        {currentContent.languages.russian.reactionTime}: {russianGame.reactionTime}ms
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
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
            
            return (
              <div
                key={card.id}
                className={`group relative overflow-hidden rounded-2xl border-2 ${card.borderColor} ${card.bgColor} p-8 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
                onClick={() => startGame(card.id)}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-br from-transparent via-white to-transparent animate-pulse"></div>
                </div>

                {/* Card Content */}
                <div className="relative z-10">
                  {/* Icon with Bounce Animation */}
                  <div className="text-6xl mb-6 text-center transform group-hover:scale-110 group-hover:animate-bounce transition-transform duration-300">
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
                  <div className="bg-white/60 rounded-lg p-4 mb-6 backdrop-blur-sm">
                    <h4 className={`font-semibold ${card.textColor} mb-2 flex items-center justify-center`}>
                      <Trophy className="w-4 h-4 mr-2" />
                      {langData.game}
                    </h4>
                    <p className="text-sm text-gray-600 text-center">
                      {langData.gameDesc}
                    </p>
                  </div>

                  {/* Play Button */}
                  <button
                    className={`w-full py-4 px-6 bg-gradient-to-r ${card.color} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:animate-pulse`}
                  >
                    <Play className="w-5 h-5" />
                    <span>
                      {currentLang === 'uz' ? 'O\'yinni Boshlash' : 
                       currentLang === 'ru' ? 'Начать Игру' : 'Start Game'}
                    </span>
                  </button>

                  {/* Age Range */}
                  <div className="mt-4 text-center">
                    <span className="text-xs bg-white/50 px-3 py-1 rounded-full">
                      👶 7-70 📱 {currentContent.clickToPlay}
                    </span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
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

      {/* Render Game Modal */}
      {renderGameContent()}
    </section>
  );
};

export default LanguageGames;