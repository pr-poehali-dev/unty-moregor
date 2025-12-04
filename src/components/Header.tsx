import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export default function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'catalog', label: 'Каталог', icon: 'Store' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck' },
    { id: 'about', label: 'О магазине', icon: 'Info' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Mountain" size={28} className="text-primary" />
          <h1 className="text-xl font-bold">Унты Морегор</h1>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(item.id)}
              className="gap-2"
            >
              <Icon name={item.icon as any} size={18} />
              {item.label}
            </Button>
          ))}
        </nav>

        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={onCartClick}
        >
          <Icon name="ShoppingCart" size={20} />
          {cartItemsCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {cartItemsCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}
