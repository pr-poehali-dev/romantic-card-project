import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionClick }: NavigationProps) => {
  return (
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
              onClick={() => onSectionClick(item.id)}
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
  );
};

export default Navigation;
