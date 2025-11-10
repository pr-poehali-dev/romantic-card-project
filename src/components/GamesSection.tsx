import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GamesSectionProps {
  loveClicks: number;
  lovePerClick: number;
  autoLove: number;
  upgradeCost: number;
  autoUpgradeCost: number;
  familyLevel: number;
  familyGold: number;
  buildings: {
    house: number;
    garden: number;
    pool: number;
    playground: number;
  };
  birdLaunched: boolean;
  birdPosition: { x: number; y: number };
  targets: Array<{ id: number; x: number; y: number; hit: boolean }>;
  score: number;
  battleUnits: number;
  enemyUnits: number;
  battleGold: number;
  memoryCards: number[];
  flippedCards: number[];
  matchedCards: number[];
  compliment: string;
  daysTogether: number;
  startDate: string;
  quizAnswer: string;
  quizResult: string;
  onLoveClick: () => void;
  onUpgradeClickPower: () => void;
  onUpgradeAutoLove: () => void;
  onBuildStructure: (type: keyof typeof buildings, cost: number) => void;
  onEarnFamilyGold: () => void;
  onLaunchBird: () => void;
  onDeployUnit: () => void;
  onStartBattle: () => void;
  onEarnBattleGold: () => void;
  onInitMemoryGame: () => void;
  onCardClick: (index: number) => void;
  onGenerateCompliment: () => void;
  onCalculateDays: () => void;
  onStartDateChange: (date: string) => void;
  onQuizAnswerChange: (answer: string) => void;
  onCheckQuizAnswer: () => void;
}

const GamesSection = ({
  loveClicks,
  lovePerClick,
  autoLove,
  upgradeCost,
  autoUpgradeCost,
  familyLevel,
  familyGold,
  buildings,
  birdLaunched,
  birdPosition,
  targets,
  score,
  battleUnits,
  enemyUnits,
  battleGold,
  memoryCards,
  flippedCards,
  matchedCards,
  compliment,
  daysTogether,
  startDate,
  quizAnswer,
  quizResult,
  onLoveClick,
  onUpgradeClickPower,
  onUpgradeAutoLove,
  onBuildStructure,
  onEarnFamilyGold,
  onLaunchBird,
  onDeployUnit,
  onStartBattle,
  onEarnBattleGold,
  onInitMemoryGame,
  onCardClick,
  onGenerateCompliment,
  onCalculateDays,
  onStartDateChange,
  onQuizAnswerChange,
  onCheckQuizAnswer,
}: GamesSectionProps) => {
  return (
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
                onClick={onLoveClick} 
                size="lg" 
                className="text-4xl w-32 h-32 rounded-full"
              >
                💗
              </Button>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <p className="mb-2">Сила клика: {lovePerClick} 💪</p>
                  <Button onClick={onUpgradeClickPower} disabled={loveClicks < upgradeCost}>
                    Улучшить ({upgradeCost} 💖)
                  </Button>
                </Card>
                <Card className="p-4">
                  <p className="mb-2">Авто-любовь: {autoLove}/сек ⚡</p>
                  <Button onClick={onUpgradeAutoLove} disabled={loveClicks < autoUpgradeCost}>
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
                  <Button onClick={() => onBuildStructure('house', 20)} disabled={familyGold < 20}>
                    Построить (20 🪙)
                  </Button>
                </Card>
                <Card className="p-4">
                  <div className="text-4xl mb-2">🌳</div>
                  <p className="mb-2">Сад: {buildings.garden}</p>
                  <Button onClick={() => onBuildStructure('garden', 30)} disabled={familyGold < 30}>
                    Построить (30 🪙)
                  </Button>
                </Card>
                <Card className="p-4">
                  <div className="text-4xl mb-2">🏊</div>
                  <p className="mb-2">Бассейн: {buildings.pool}</p>
                  <Button onClick={() => onBuildStructure('pool', 50)} disabled={familyGold < 50}>
                    Построить (50 🪙)
                  </Button>
                </Card>
                <Card className="p-4">
                  <div className="text-4xl mb-2">🎠</div>
                  <p className="mb-2">Площадка: {buildings.playground}</p>
                  <Button onClick={() => onBuildStructure('playground', 40)} disabled={familyGold < 40}>
                    Построить (40 🪙)
                  </Button>
                </Card>
              </div>
              <Button onClick={onEarnFamilyGold} variant="outline">
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
            <Button onClick={onLaunchBird} disabled={birdLaunched} className="mt-4">
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
                  <Button onClick={onDeployUnit} disabled={battleGold < 10}>
                    Добавить силу (10 🪙)
                  </Button>
                  <Button onClick={onStartBattle} variant="destructive" disabled={battleUnits === 0}>
                    Начать битву! ⚔️
                  </Button>
                  <Button onClick={onEarnBattleGold} variant="outline">
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
            <Button onClick={onInitMemoryGame} className="mb-6">
              Начать новую игру
            </Button>
            {memoryCards.length > 0 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {memoryCards.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => onCardClick(index)}
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
            <Button onClick={onGenerateCompliment} className="mb-4">
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
                onChange={(e) => onStartDateChange(e.target.value)}
                className="border-pink-200 focus:border-primary"
              />
              <Button onClick={onCalculateDays}>
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
                onChange={(e) => onQuizAnswerChange(e.target.value)}
                placeholder="Твой ответ..."
                className="border-pink-200 focus:border-primary"
              />
              <Button onClick={onCheckQuizAnswer}>
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
  );
};

export default GamesSection;
