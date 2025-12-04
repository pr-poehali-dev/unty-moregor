import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onShowReviews: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onShowReviews }: ProductCardProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg animate-fade-in">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden aspect-square bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {!product.inStock && (
            <Badge variant="secondary" className="absolute top-3 right-3">
              Нет в наличии
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            {renderStars(product.rating)}
            <button
              onClick={() => onShowReviews(product)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ({product.reviewsCount})
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full gap-2"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          <Icon name="ShoppingCart" size={18} />
          {product.inStock ? 'В корзину' : 'Недоступно'}
        </Button>
      </CardFooter>
    </Card>
  );
}
