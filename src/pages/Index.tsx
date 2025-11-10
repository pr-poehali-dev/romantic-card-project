import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${6 + Math.random() * 4}s`,
  }));

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
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { id: 'home', label: 'Главная', icon: 'Heart' },
              { id: 'poems', label: 'Стихи', icon: 'BookHeart' },
              { id: 'gallery', label: 'Фотогалерея', icon: 'Images' },
              { id: 'memories', label: 'Воспоминания', icon: 'Sparkles' },
              { id: 'confessions', label: 'Признания', icon: 'MessageHeart' },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                onClick={() => scrollToSection(item.id)}
                className="gap-2"
              >
                <Icon name={item.icon} size={18} />
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
