import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Globe, Users, Star, Play, Trophy, Target, RotateCcw, Home, CheckCircle } from 'lucide-react';

interface LanguageGamesProps {
  currentLang: string;
}

// Arabic Treasure Hunt Game
interface ArabicGameState {
  currentWord: string;
  userInput: string;
  score: number;
  level: number;
  timeLeft: number;
  gameOver: boolean;
  showHint: boolean;
}

// English Bridge Builder Game
interface EnglishGameState {
  currentPhrase: string;
  words: string[];
  selectedWords: string[];
  score: number;
  level: number;
  timeLeft: number;
  gameOver: boolean;
}

// Russian Tetris Game
interface RussianGameState {
  fallingLetters: Array<{id: number, letter: string, x: number, y: number}>;
  collectedWord: string;
  targetWord: string;
  score: number;
  level: number;
  timeLeft: number;
  gameOver: boolean;
}

const LanguageGames: React.FC<LanguageGamesProps> = ({ currentLang }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [gameActive, setGameActive] = useState(false);
  
  // Game states
  const [arabicGame, setArabicGame] = useState<ArabicGameState>({
    currentWord: 'السلام',
    userInput: '',
    score: 0,
    level: 1,
    timeLeft: 60,
    gameOver: false,
    showHint: false
  });

  const [englishGame, setEnglishGame] = useState<EnglishGameState>({
    currentPhrase: 'Hello World',
    words: ['Hello', 'World', 'Good', 'Morning'],
    selectedWords: [],
    score: 0,
    level: 1,
    timeLeft: 60,
    gameOver: false
  });

  const [russianGame, setRussianGame] = useState<RussianGameState>({
    fallingLetters: [],
    collectedWord: '',
    targetWord: 'Привет',
    score: 0,
    level: 1,
    timeLeft: 60,
    gameOver: false
  });

  const content = {
    uz: {
      title: "Interaktiv Til O'rganish",
      subtitle: "Har bir til uchun maxsus o'yinlar bilan o'rganing",
      backToMenu: "Menyuga qaytish",
      score: "Ball",
      level: "Daraja",
      timeLeft: "Qolgan vaqt",
      hint: "Maslahat",
      tryAgain: "Qayta urinish",
      gameOver: "O'yin tugadi",
      languages: {
        arabic: {
          name: "Arab tili",
          description: "Islom madaniyati va arab tilining go'zalligi",
          game: "Arab Xazinasi Ovi",
          gameDesc: "Arab harflarini birlashtiring va yashirin naqshlarni oching",
          instruction: "Arab so'zini yozing",
          hint: "Bu salom berish uchun ishlatiladi"
        },
        english: {
          name: "Ingliz tili",
          description: "Dunyo tili - global aloqa vositasi",
          game: "Global Ko'prik Quruvchisi",
          gameDesc: "Ingliz so'zlari bilan mashhur iboralarni tuzing",
          instruction: "To'g'ri so'zlarni tanlang",
          selectWords: "So'zlarni tanlang"
        },
        russian: {
          name: "Rus tili",
          description: "Slavyan madaniyati va rus adabiyoti",
          game: "Kirill Kristal Kaskadi",
          gameDesc: "Kirill harflarini tartiblab so'zlar hosil qiling",
          instruction: "Harflarni ushlang",
          target: "Maqsad so'z"
        }
      }
    },
    ru: {
      title: "Интерактивное Изучение Языков",
      subtitle: "Изучайте с помощью специальных игр для каждого языка",
      backToMenu: "Вернуться в меню",
      score: "Очки",
      level: "Уровень",
      timeLeft: "Осталось времени",
      hint: "Подсказка",
      tryAgain: "Попробовать снова",
      gameOver: "Игра окончена",
      languages: {
        arabic: {
          name: "Арабский язык",
          description: "Красота исламской культуры и арабского языка",
          game: "Охота за Арабскими Сокровищами",
          gameDesc: "Соединяйте арабские буквы и открывайте скрытые узоры",
          instruction: "Напишите арабское слово",
          hint: "Это используется для приветствия"
        },
        english: {
          name: "Английский язык",
          description: "Язык мира - средство глобального общения",
          game: "Строитель Глобальных Мостов",
          gameDesc: "Создавайте знаменитые фразы английскими словами",
          instruction: "Выберите правильные слова",
          selectWords: "Выберите слова"
        },
        russian: {
          name: "Русский язык",
          description: "Славянская культура и русская литература",
          game: "Кириллический Кристальный Каскад",
          gameDesc: "Расставляйте кириллические буквы, образуя слова",
          instruction: "Ловите буквы",
          target: "Целевое слово"
        }
      }
    },
    en: {
      title: "Interactive Language Learning",
      subtitle: "Learn with special games designed for each language",
      backToMenu: "Back to Menu",
      score: "Score",
      level: "Level",
      timeLeft: "Time Left",
      hint: "Hint",
      tryAgain: "Try Again",
      gameOver: "Game Over",
      languages: {
        arabic: {
          name: "Arabic Language",
          description: "Beauty of Islamic culture and Arabic language",
          game: "Arabic Treasure Hunt",
          gameDesc: "Connect Arabic letters and reveal hidden patterns",
          instruction: "Type the Arabic word",
          hint: "This is used for greeting"
        },
        english: {
          name: "English Language",
          description: "World language - global communication tool",
          game: "Global Bridge Builder",
          gameDesc: "Create famous phrases with English words",
          instruction: "Select the correct words",
          selectWords: "Select words"
        },
        russian: {
          name: "Russian Language",
          description: "Slavic culture and Russian literature",
          game: "Cyrillic Crystal Cascade",
          gameDesc: "Arrange Cyrillic letters to form words",
          instruction: "Catch the letters",
          target: "Target word"
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

  // Arabic Game Logic
  const arabicWords = [
    { word: 'السلام', meaning: 'Peace/Greeting', hint: currentContent.languages.arabic.hint },
    { word: 'شكرا', meaning: 'Thank you', hint: 'Used to express gratitude' },
    { word: 'مرحبا', meaning: 'Welcome', hint: 'Said when greeting someone' },
    { word: 'الحمد', meaning: 'Praise', hint: 'Used in prayer' }
  ];

  // English Game Logic
  const englishPhrases = [
    { phrase: 'Hello World', words: ['Hello', 'World', 'Good', 'Morning'] },
    { phrase: 'Thank You', words: ['Thank', 'You', 'Please', 'Welcome'] },
    { phrase: 'Good Morning', words: ['Good', 'Morning', 'Night', 'Afternoon'] },
    { phrase: 'How Are You', words: ['How', 'Are', 'You', 'Fine'] }
  ];

  // Russian Game Logic
  const russianWords = ['Привет', 'Спасибо', 'Пожалуйста', 'Добро'];

  // Game timers
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && selectedLanguage) {
      timer = setInterval(() => {
        if (selectedLanguage === 'arabic') {
          setArabicGame(prev => {
            if (prev.timeLeft <= 1) {
              return { ...prev, timeLeft: 0, gameOver: true };
            }
            return { ...prev, timeLeft: prev.timeLeft - 1 };
          });
        } else if (selectedLanguage === 'english') {
          setEnglishGame(prev => {
            if (prev.timeLeft <= 1) {
              return { ...prev, timeLeft: 0, gameOver: true };
            }
            return { ...prev, timeLeft: prev.timeLeft - 1 };
          });
        } else if (selectedLanguage === 'russian') {
          setRussianGame(prev => {
            if (prev.timeLeft <= 1) {
              return { ...prev, timeLeft: 0, gameOver: true };
            }
            return { ...prev, timeLeft: prev.timeLeft - 1 };
          });
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameActive, selectedLanguage]);

  // Russian game falling letters
  useEffect(() => {
    let letterTimer: NodeJS.Timeout;
    if (gameActive && selectedLanguage === 'russian') {
      letterTimer = setInterval(() => {
        setRussianGame(prev => {
          const targetLetters = prev.targetWord.split('');
          const randomLetter = targetLetters[Math.floor(Math.random() * targetLetters.length)];
          const newLetter = {
            id: Date.now(),
            letter: randomLetter,
            x: Math.random() * 300,
            y: 0
          };
          
          // Move existing letters down and add new one
          const updatedLetters = prev.fallingLetters
            .map(letter => ({ ...letter, y: letter.y + 20 }))
            .filter(letter => letter.y < 400);
          
          return {
            ...prev,
            fallingLetters: [...updatedLetters, newLetter]
          };
        });
      }, 1500);
    }
    return () => clearInterval(letterTimer);
  }, [gameActive, selectedLanguage]);

  const startGame = (languageId: string) => {
    setSelectedLanguage(languageId);
    setGameActive(true);
    
    // Reset game states
    if (languageId === 'arabic') {
      const randomWord = arabicWords[Math.floor(Math.random() * arabicWords.length)];
      setArabicGame({
        currentWord: randomWord.word,
        userInput: '',
        score: 0,
        level: 1,
        timeLeft: 60,
        gameOver: false,
        showHint: false
      });
    } else if (languageId === 'english') {
      const randomPhrase = englishPhrases[Math.floor(Math.random() * englishPhrases.length)];
      setEnglishGame({
        currentPhrase: randomPhrase.phrase,
        words: randomPhrase.words,
        selectedWords: [],
        score: 0,
        level: 1,
        timeLeft: 60,
        gameOver: false
      });
    } else if (languageId === 'russian') {
      const randomWord = russianWords[Math.floor(Math.random() * russianWords.length)];
      setRussianGame({
        fallingLetters: [],
        collectedWord: '',
        targetWord: randomWord,
        score: 0,
        level: 1,
        timeLeft: 60,
        gameOver: false
      });
    }
  };

  const endGame = () => {
    setGameActive(false);
    setSelectedLanguage(null);
  };

  const restartGame = () => {
    if (selectedLanguage) {
      startGame(selectedLanguage);
    }
  };

  // Arabic game handlers
  const handleArabicInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setArabicGame(prev => ({ ...prev, userInput: value }));
    
    if (value === arabicGame.currentWord) {
      setArabicGame(prev => ({
        ...prev,
        score: prev.score + 100,
        level: prev.level + 1,
        userInput: ''
      }));
      
      // Next word
      setTimeout(() => {
        const randomWord = arabicWords[Math.floor(Math.random() * arabicWords.length)];
        setArabicGame(prev => ({ ...prev, currentWord: randomWord.word }));
      }, 1000);
    }
  };

  // English game handlers
  const selectEnglishWord = (word: string) => {
    setEnglishGame(prev => {
      const newSelected = [...prev.selectedWords, word];
      const targetWords = prev.currentPhrase.split(' ');
      
      if (newSelected.join(' ') === prev.currentPhrase) {
        // Correct phrase completed
        return {
          ...prev,
          selectedWords: [],
          score: prev.score + 150,
          level: prev.level + 1
        };
      }
      
      return { ...prev, selectedWords: newSelected };
    });
  };

  // Russian game handlers
  const catchRussianLetter = (letterId: number, letter: string) => {
    setRussianGame(prev => {
      const newCollectedWord = prev.collectedWord + letter;
      const updatedLetters = prev.fallingLetters.filter(l => l.id !== letterId);
      
      if (newCollectedWord === prev.targetWord) {
        // Word completed
        const newTargetWord = russianWords[Math.floor(Math.random() * russianWords.length)];
        return {
          ...prev,
          fallingLetters: updatedLetters,
          collectedWord: '',
          targetWord: newTargetWord,
          score: prev.score + 200,
          level: prev.level + 1
        };
      }
      
      return {
        ...prev,
        fallingLetters: updatedLetters,
        collectedWord: newCollectedWord
      };
    });
  };

  // Render game content
  const renderGameContent = () => {
    if (!selectedLanguage || !gameActive) return null;

    const gameCard = languageCards.find(card => card.id === selectedLanguage);
    if (!gameCard) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${gameCard.bgColor} rounded-2xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto`}>
          {/* Game Header */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={endGame}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>{currentContent.backToMenu}</span>
            </button>
            
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4" />
                <span>{currentContent.score}: {
                  selectedLanguage === 'arabic' ? arabicGame.score :
                  selectedLanguage === 'english' ? englishGame.score :
                  russianGame.score
                }</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>{currentContent.level}: {
                  selectedLanguage === 'arabic' ? arabicGame.level :
                  selectedLanguage === 'english' ? englishGame.level :
                  russianGame.level
                }</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>⏰ {currentContent.timeLeft}: {
                  selectedLanguage === 'arabic' ? arabicGame.timeLeft :
                  selectedLanguage === 'english' ? englishGame.timeLeft :
                  russianGame.timeLeft
                }</span>
              </div>
            </div>
          </div>

          {/* Arabic Game */}
          {selectedLanguage === 'arabic' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">
                {currentContent.languages.arabic.game}
              </h3>
              
              {arabicGame.gameOver ? (
                <div className="space-y-4">
                  <h4 className="text-xl text-red-600">{currentContent.gameOver}</h4>
                  <p>Final Score: {arabicGame.score}</p>
                  <button 
                    onClick={restartGame}
                    className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    {currentContent.tryAgain}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <p className="text-6xl mb-4 font-arabic" dir="rtl">{arabicGame.currentWord}</p>
                    <p className="text-sm text-gray-600 mb-4">{currentContent.languages.arabic.instruction}</p>
                    <input
                      type="text"
                      value={arabicGame.userInput}
                      onChange={handleArabicInput}
                      className="w-full p-3 border rounded-lg text-center text-xl"
                      placeholder="اكتب هنا..."
                      dir="rtl"
                    />
                  </div>
                  
                  <button
                    onClick={() => setArabicGame(prev => ({ ...prev, showHint: !prev.showHint }))}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    {currentContent.hint}
                  </button>
                  
                  {arabicGame.showHint && (
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <p className="text-yellow-800">{currentContent.languages.arabic.hint}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* English Game */}
          {selectedLanguage === 'english' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">
                {currentContent.languages.english.game}
              </h3>
              
              {englishGame.gameOver ? (
                <div className="space-y-4">
                  <h4 className="text-xl text-red-600">{currentContent.gameOver}</h4>
                  <p>Final Score: {englishGame.score}</p>
                  <button 
                    onClick={restartGame}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {currentContent.tryAgain}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <h4 className="text-xl mb-4">Target: "{englishGame.currentPhrase}"</h4>
                    <p className="text-sm text-gray-600 mb-4">{currentContent.languages.english.instruction}</p>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">{currentContent.languages.english.selectWords}:</p>
                      <p className="text-lg font-semibold">
                        {englishGame.selectedWords.join(' ') || '...'}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {englishGame.words.map((word, index) => (
                        <button
                          key={index}
                          onClick={() => selectEnglishWord(word)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded-lg transition-colors"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Russian Game */}
          {selectedLanguage === 'russian' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                {currentContent.languages.russian.game}
              </h3>
              
              {russianGame.gameOver ? (
                <div className="space-y-4">
                  <h4 className="text-xl text-red-600">{currentContent.gameOver}</h4>
                  <p>Final Score: {russianGame.score}</p>
                  <button 
                    onClick={restartGame}
                    className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    {currentContent.tryAgain}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <h4 className="text-xl mb-2">{currentContent.languages.russian.target}: {russianGame.targetWord}</h4>
                    <p className="text-sm text-gray-600 mb-4">{currentContent.languages.russian.instruction}</p>
                    
                    <div className="mb-4">
                      <p className="text-lg font-semibold">
                        Collected: {russianGame.collectedWord || '...'}
                      </p>
                    </div>
                    
                    {/* Game Area */}
                    <div className="relative bg-gradient-to-b from-blue-100 to-purple-100 rounded-lg h-64 overflow-hidden">
                      {russianGame.fallingLetters.map(letter => (
                        <button
                          key={letter.id}
                          onClick={() => catchRussianLetter(letter.id, letter.letter)}
                          className="absolute bg-white hover:bg-gray-100 text-purple-800 font-bold w-8 h-8 rounded-full shadow-lg transition-all transform hover:scale-110"
                          style={{
                            left: `${letter.x}px`,
                            top: `${letter.y}px`
                          }}
                        >
                          {letter.letter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
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
                  >
                    <Play className="w-5 h-5" />
                    <span>
                      {currentLang === 'uz' ? 'O\'yinni Boshlash' : 
                       currentLang === 'ru' ? 'Начать Игру' : 'Start Game'}
                    </span>
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

      {/* Render Game Modal */}
      {renderGameContent()}
    </section>
  );
};

export default LanguageGames;