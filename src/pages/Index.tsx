import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ContentSections from '@/components/ContentSections';
import GamesSection from '@/components/GamesSection';

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

      <Navigation activeSection={activeSection} onSectionClick={scrollToSection} />

      <main className="relative z-10 pt-24 pb-12">
        <ContentSections />
        
        <GamesSection
          loveClicks={loveClicks}
          lovePerClick={lovePerClick}
          autoLove={autoLove}
          upgradeCost={upgradeCost}
          autoUpgradeCost={autoUpgradeCost}
          familyLevel={familyLevel}
          familyGold={familyGold}
          buildings={buildings}
          birdLaunched={birdLaunched}
          birdPosition={birdPosition}
          targets={targets}
          score={score}
          battleUnits={battleUnits}
          enemyUnits={enemyUnits}
          battleGold={battleGold}
          memoryCards={memoryCards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          compliment={compliment}
          daysTogether={daysTogether}
          startDate={startDate}
          quizAnswer={quizAnswer}
          quizResult={quizResult}
          onLoveClick={handleLoveClick}
          onUpgradeClickPower={upgradeClickPower}
          onUpgradeAutoLove={upgradeAutoLove}
          onBuildStructure={buildStructure}
          onEarnFamilyGold={() => setFamilyGold(familyGold + 50)}
          onLaunchBird={launchBird}
          onDeployUnit={deployUnit}
          onStartBattle={startBattle}
          onEarnBattleGold={() => setBattleGold(battleGold + 20)}
          onInitMemoryGame={initMemoryGame}
          onCardClick={handleCardClick}
          onGenerateCompliment={generateCompliment}
          onCalculateDays={calculateDays}
          onStartDateChange={setStartDate}
          onQuizAnswerChange={setQuizAnswer}
          onCheckQuizAnswer={checkQuizAnswer}
        />
      </main>

      <footer className="relative z-10 py-8 text-center text-muted-foreground">
        <p className="text-lg">Создано с любовью 💕</p>
      </footer>
    </div>
  );
};

export default Index;
