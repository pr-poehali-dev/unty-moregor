import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FiltersProps {
  priceRange: [number, number];
  onPriceChange: (value: [number, number]) => void;
  inStockOnly: boolean;
  onInStockChange: (checked: boolean) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  onReset: () => void;
}

export default function Filters({
  priceRange,
  onPriceChange,
  inStockOnly,
  onInStockChange,
  minRating,
  onRatingChange,
  onReset,
}: FiltersProps) {
  const renderStars = (rating: number, onClick?: (r: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onClick?.(star)}
            className="transition-colors"
          >
            <Icon
              name="Star"
              size={20}
              className={
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 hover:text-yellow-200'
              }
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Icon name="SlidersHorizontal" size={20} />
            Фильтры
          </span>
          <Button variant="ghost" size="sm" onClick={onReset}>
            Сбросить
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Цена, ₽</Label>
          <div className="px-2 pt-2">
            <Slider
              value={priceRange}
              onValueChange={onPriceChange}
              min={0}
              max={25000}
              step={500}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{priceRange[0].toLocaleString('ru-RU')}</span>
            <span>{priceRange[1].toLocaleString('ru-RU')}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Наличие</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={inStockOnly}
              onCheckedChange={(checked) => onInStockChange(checked as boolean)}
            />
            <label
              htmlFor="inStock"
              className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Только в наличии
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Минимальный рейтинг</Label>
          <div className="flex items-center justify-between">
            {renderStars(minRating, onRatingChange)}
          </div>
          {minRating > 0 && (
            <p className="text-xs text-muted-foreground">
              От {minRating} {minRating === 1 ? 'звезды' : 'звезд'}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
