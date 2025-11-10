import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [memoryCards, setMemoryCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [compliment, setCompliment] = useState('');
  const [daysTogether, setDaysTogether] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizResult, setQuizResult] = useState('');

  const [loveClicks, setLoveClicks] = useState(0);
  const [lovePerClick, setLovePerClick] = useState(1);
  const [autoLove, setAutoLove] = useState(0);
  const [upgradeCost, setUpgradeCost] = useState(10);
  const [autoUpgradeCost, setAutoUpgradeCost] = useState(50);

  const [familyLevel, setFamilyLevel] = useState(1);
  const [familyGold, setFamilyGold] = useState(100);
  const [buildings, setBuildings] = useState({
    house: 0,
    garden: 0,
    pool: 0,
    playground: 0,
  });

  const [birdLaunched, setBirdLaunched] = useState(false);
  const [birdPosition, setBirdPosition] = useState({ x: 10, y: 50 });
  const [targets, setTargets] = useState([
    { id: 1, x: 70, y: 60, hit: false },
    { id: 2, x: 80, y: 50, hit: false },
    { id: 3, x: 75, y: 40, hit: false },
  ]);
  const [score, setScore] = useState(0);

  const [battleUnits, setBattleUnits] = useState(0);
  const [enemyUnits, setEnemyUnits] = useState(5);
  const [battleGold, setBattleGold] = useState(50);

  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${6 + Math.random() * 4}s`,
  }));

  const compliments = [
    'Ты освещаешь мою жизнь словно солнце! ☀️',
    'С тобой каждый день - праздник! 🎉',
    'Ты самая красивая на свете! 🌹',
    'Твоя улыбка делает мир лучше! 😊',
    'Ты мое вдохновение и счастье! 💫',
    'С тобой я чувствую себя цельным! 💖',
    'Ты делаешь меня лучше! ✨',
    'Твои глаза - две звезды! ⭐',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoLove > 0) {
        setLoveClicks((prev) => prev + autoLove);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [autoLove]);

  const initMemoryGame = () => {
    const cards = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    setMemoryCards(cards.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return;
    
    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryCards[first] === memoryCards[second]) {
        setMatchedCards([...matchedCards, first, second]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const generateCompliment = () => {
    const random = compliments[Math.floor(Math.random() * compliments.length)];
    setCompliment(random);
  };

  const calculateDays = () => {
    if (startDate) {
      const start = new Date(startDate);
      const today = new Date();
      const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setDaysTogether(diff);
    }
  };

  const checkQuizAnswer = () => {
    const correctAnswer = 'любовь';
    if (quizAnswer.toLowerCase().includes(correctAnswer)) {
      setQuizResult('Правильно! Ты знаешь меня лучше всех! 💖');
    } else {
      setQuizResult('Попробуй еще раз! Подсказка: самое главное чувство 💕');
    }
  };

  const handleLoveClick = () => {
    setLoveClicks(loveClicks + lovePerClick);
  };

  const upgradeClickPower = () => {
    if (loveClicks >= upgradeCost) {
      setLoveClicks(loveClicks - upgradeCost);
      setLovePerClick(lovePerClick + 1);
      setUpgradeCost(Math.floor(upgradeCost * 1.5));
    }
  };

  const upgradeAutoLove = () => {
    if (loveClicks >= autoUpgradeCost) {
      setLoveClicks(loveClicks - autoUpgradeCost);
      setAutoLove(autoLove + 1);
      setAutoUpgradeCost(Math.floor(autoUpgradeCost * 2));
    }
  };

  const buildStructure = (type: keyof typeof buildings, cost: number) => {
    if (familyGold >= cost) {
      setFamilyGold(familyGold - cost);
      setBuildings({ ...buildings, [type]: buildings[type] + 1 });
      if ((buildings.house + buildings.garden + buildings.pool + buildings.playground) % 5 === 4) {
        setFamilyLevel(familyLevel + 1);
        setFamilyGold(familyGold + 50);
      }
    }
  };

  const launchBird = () => {
    if (!birdLaunched) {
      setBirdLaunched(true);
      let x = 10;
      let y = 50;
      const interval = setInterval(() => {
        x += 5;
        y = 50 - Math.sin((x - 10) * 0.05) * 30;
        
        setBirdPosition({ x, y });

        targets.forEach((target) => {
          if (!target.hit && Math.abs(x - target.x) < 5 && Math.abs(y - target.y) < 8) {
            target.hit = true;
            setScore(score + 10);
            setTargets([...targets]);
          }
        });

        if (x > 100) {
          clearInterval(interval);
          setBirdLaunched(false);
          setBirdPosition({ x: 10, y: 50 });
          
          const allHit = targets.every((t) => t.hit);
          if (allHit) {
            setTargets([
              { id: 1, x: 70, y: 60, hit: false },
              { id: 2, x: 80, y: 50, hit: false },
              { id: 3, x: 75, y: 40, hit: false },
            ]);
          }
        }
      }, 50);
    }
  };

  const deployUnit = () => {
    if (battleGold >= 10) {
      setBattleGold(battleGold - 10);
      setBattleUnits(battleUnits + 1);
    }
  };

  const startBattle = () => {
    if (battleUnits > enemyUnits) {
      setBattleGold(battleGold + 30);
      setEnemyUnits(enemyUnits + 2);
      setBattleUnits(0);
      alert('Победа! Наша семья становится сильнее! 💪');
    } else if (battleUnits === enemyUnits) {
      setBattleUnits(0);
      alert('Ничья! Попробуй добавить больше юнитов! 🤝');
    } else {
      setBattleUnits(0);
      alert('Поражение! Нужно больше сил! 💔');
    }
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-4xl opacity-20 animate-float"
            style={{
              left: heart.left,
              top: `${Math.random() * 100}%`,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
            }}
          >
            💕
          </div>
        ))}
      </div>

      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center gap-4 flex-wrap text-sm">
            {[
              { id: 'home', label: 'Главная', icon: 'Heart' },
              { id: 'poems', label: 'Стихи', icon: 'BookHeart' },
              { id: 'gallery', label: 'Фото', icon: 'Images' },
              { id: 'memories', label: 'Воспоминания', icon: 'Sparkles' },
              { id: 'games', label: 'Игры', icon: 'Gamepad2' },
              { id: 'confessions', label: 'Признания', icon: 'MessageHeart' },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                onClick={() => scrollToSection(item.id)}
                className="gap-2 text-xs md:text-sm"
                size="sm"
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-12">
        <section id="home" className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-3xl">
            <div className="text-8xl mb-8 animate-pulse-heart">💖</div>
            <h1 className="text-6xl md:text-7xl font-bold text-primary mb-6">
              Моя Любовь
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light">
              Страницы нашей истории
            </p>
          </div>
        </section>

        <section id="poems" className="min-h-screen py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-5xl font-bold text-center text-primary mb-12">
              Стихи для тебя
            </h2>
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-8 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl">🌹</div>
                    <Textarea
                      placeholder="Напиши здесь своё стихотворение..."
                      className="min-h-[200px] text-lg border-pink-200 focus:border-primary"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="min-h-screen py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-5xl font-bold text-center text-primary mb-12">
              Наши моменты
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-square bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                    📷
                  </div>
                  <div className="p-4 bg-white/90">
                    <Textarea
                      placeholder="Добавь описание к фото..."
                      className="min-h-[60px] border-pink-200 focus:border-primary"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="memories" className="min-h-screen py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-5xl font-bold text-center text-primary mb-12">
              Наши воспоминания
            </h2>
            <div className="space-y-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-8 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-3xl">
                        ✨
                      </div>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Дата или событие..."
                        className="w-full text-xl font-semibold text-primary mb-3 bg-transparent border-b-2 border-pink-200 focus:border-primary outline-none pb-2"
                      />
                      <Textarea
                        placeholder="Опиши это особенное воспоминание..."
                        className="min-h-[120px] border-pink-200 focus:border-primary"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="games" className="min-h-screen py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-5xl font-bold text-center text-primary mb-12">
              Игры для нас 🎮
            </h2>
            
            <div className="grid gap-8">
              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span>💕</span> Кликер любви
                </h3>
                <div className="text-center space-y-6">
                  <div className="text-6xl font-bold text-primary">{loveClicks} 💖</div>
                  <Button 
                    onClick={handleLoveClick} 
                    size="lg" 
                    className="text-4xl w-32 h-32 rounded-full"
                  >
                    💗
                  </Button>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <p className="mb-2">Сила клика: {lovePerClick} 💪</p>
                      <Button onClick={upgradeClickPower} disabled={loveClicks < upgradeCost}>
                        Улучшить ({upgradeCost} 💖)
                      </Button>
                    </Card>
                    <Card className="p-4">
                      <p className="mb-2">Авто-любовь: {autoLove}/сек ⚡</p>
                      <Button onClick={upgradeAutoLove} disabled={loveClicks < autoUpgradeCost}>
                        Улучшить ({autoUpgradeCost} 💖)
                      </Button>
                    </Card>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span>🏰</span> Строим семью (как Clash of Clans)
                </h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-2xl mb-2">Уровень семьи: {familyLevel}</p>
                    <p className="text-xl">Золото: {familyGold} 🪙</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="text-4xl mb-2">🏠</div>
                      <p className="mb-2">Дом: {buildings.house}</p>
                      <Button onClick={() => buildStructure('house', 20)} disabled={familyGold < 20}>
                        Построить (20 🪙)
                      </Button>
                    </Card>
                    <Card className="p-4">
                      <div className="text-4xl mb-2">🌳</div>
                      <p className="mb-2">Сад: {buildings.garden}</p>
                      <Button onClick={() => buildStructure('garden', 30)} disabled={familyGold < 30}>
                        Построить (30 🪙)
                      </Button>
                    </Card>
                    <Card className="p-4">
                      <div className="text-4xl mb-2">🏊</div>
                      <p className="mb-2">Бассейн: {buildings.pool}</p>
                      <Button onClick={() => buildStructure('pool', 50)} disabled={familyGold < 50}>
                        Построить (50 🪙)
                      </Button>
                    </Card>
                    <Card className="p-4">
                      <div className="text-4xl mb-2">🎠</div>
                      <p className="mb-2">Площадка: {buildings.playground}</p>
                      <Button onClick={() => buildStructure('playground', 40)} disabled={familyGold < 40}>
                        Построить (40 🪙)
                      </Button>
                    </Card>
                  </div>
                  <Button onClick={() => setFamilyGold(familyGold + 50)} variant="outline">
                    Заработать золото 💰
                  </Button>
                </div>
              </Card>

              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span>🐦</span> Птички любви (как Angry Birds)
                </h3>
                <p className="mb-4 text-xl">Очки: {score}</p>
                <div className="relative h-64 bg-gradient-to-b from-blue-200 to-green-200 rounded-lg overflow-hidden">
                  <div
                    className="absolute text-4xl transition-all duration-100"
                    style={{ left: `${birdPosition.x}%`, top: `${birdPosition.y}%` }}
                  >
                    🐦
                  </div>
                  {targets.map((target) => (
                    !target.hit && (
                      <div
                        key={target.id}
                        className="absolute text-3xl"
                        style={{ left: `${target.x}%`, top: `${target.y}%` }}
                      >
                        🎯
                      </div>
                    )
                  ))}
                  <div className="absolute left-4 top-1/2 text-2xl">🎯</div>
                </div>
                <Button onClick={launchBird} disabled={birdLaunched} className="mt-4">
                  {birdLaunched ? 'Летит...' : 'Запустить птичку! 💕'}
                </Button>
              </Card>

              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span>⚔️</span> Битва за семью (как Clash Royale)
                </h3>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 text-center">
                    <Card className="p-4 bg-pink-100">
                      <p className="text-xl mb-2">Наши силы 💖</p>
                      <p className="text-4xl font-bold">{battleUnits}</p>
                    </Card>
                    <Card className="p-4 bg-red-100">
                      <p className="text-xl mb-2">Проблемы 💢</p>
                      <p className="text-4xl font-bold">{enemyUnits}</p>
                    </Card>
                  </div>
                  <div className="text-center">
                    <p className="text-xl mb-4">Золото: {battleGold} 🪙</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                      <Button onClick={deployUnit} disabled={battleGold < 10}>
                        Добавить силу (10 🪙)
                      </Button>
                      <Button onClick={startBattle} variant="destructive" disabled={battleUnits === 0}>
                        Начать битву! ⚔️
                      </Button>
                      <Button onClick={() => setBattleGold(battleGold + 20)} variant="outline">
                        Заработать 💰
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span>🎴</span> Игра в память
                </h3>
                <Button onClick={initMemoryGame} className="mb-6">
                  Начать новую игру
                </Button>
                {memoryCards.length > 0 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                    {memoryCards.map((card, index) => (
                      <div
                        key={index}
                        onClick={() => handleCardClick(index)}
                        className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center text-4xl ${
                          flippedCards.includes(index) || matchedCards.includes(index)
                            ? 'bg-gradient-to-br from-pink-300 to-pink-400'
                            : 'bg-gradient-to-br from-pink-100 to-pink-200 hover:scale-105'
                        }`}
                      >
                        {(flippedCards.includes(index) || matchedCards.includes(index)) && ['💕', '💖', '💗', '💓', '💝', '💘'][card - 1]}
                      </div>
                    ))}
                  </div>
                )}
                {matchedCards.length === 12 && (
                  <p className="text-2xl text-center mt-6 font-bold text-primary">
                    Победа! Наша память о любви крепка! 🎉
                  </p>
                )}
              </Card>

              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span>💬</span> Генератор комплиментов
                </h3>
                <Button onClick={generateCompliment} className="mb-4">
                  Получить комплимент
                </Button>
                {compliment && (
                  <p className="text-2xl text-center p-6 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg animate-fade-in">
                    {compliment}
                  </p>
                )}
              </Card>

              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span>📅</span> Счётчик дней вместе
                </h3>
                <div className="space-y-4">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border-pink-200 focus:border-primary"
                  />
                  <Button onClick={calculateDays}>
                    Посчитать
                  </Button>
                  {daysTogether > 0 && (
                    <div className="text-center p-8 bg-gradient-to-r from-pink-200 to-pink-300 rounded-lg">
                      <p className="text-6xl font-bold text-primary mb-2">{daysTogether}</p>
                      <p className="text-2xl">дней вместе! 💕</p>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span>❓</span> Викторина о нас
                </h3>
                <p className="text-xl mb-4">Что самое главное в наших отношениях?</p>
                <div className="space-y-4">
                  <Input
                    type="text"
                    value={quizAnswer}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    placeholder="Твой ответ..."
                    className="border-pink-200 focus:border-primary"
                  />
                  <Button onClick={checkQuizAnswer}>
                    Проверить ответ
                  </Button>
                  {quizResult && (
                    <p className="text-xl text-center p-4 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg animate-fade-in">
                      {quizResult}
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="confessions" className="min-h-screen py-20 px-4 flex items-center">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-5xl font-bold text-center text-primary mb-12">
              Мои признания
            </h2>
            <Card className="p-12 bg-white/95 backdrop-blur-sm shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-7xl mb-4 animate-pulse-heart inline-block">
                  💝
                </div>
              </div>
              <Textarea
                placeholder="Напиши здесь свои самые важные слова..."
                className="min-h-[300px] text-xl border-pink-200 focus:border-primary text-center"
              />
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <div className="text-2xl animate-pulse-heart" style={{ animationDelay: '0s' }}>💕</div>
                <div className="text-2xl animate-pulse-heart" style={{ animationDelay: '0.2s' }}>💖</div>
                <div className="text-2xl animate-pulse-heart" style={{ animationDelay: '0.4s' }}>💗</div>
                <div className="text-2xl animate-pulse-heart" style={{ animationDelay: '0.6s' }}>💓</div>
                <div className="text-2xl animate-pulse-heart" style={{ animationDelay: '0.8s' }}>💝</div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-8 text-center text-muted-foreground">
        <p className="text-lg">Создано с любовью 💕</p>
      </footer>
    </div>
  );
};

export default Index;
