import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import ReviewsDialog from '@/components/ReviewsDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Унты классические из оленя',
    price: 15900,
    image: 'https://cdn.poehali.dev/projects/9e60444e-d85c-46b7-8589-458c8a04c9ea/files/72d931c3-3dad-4d1b-8208-a8974ef4b53a.jpg',
    rating: 5,
    reviewsCount: 12,
    inStock: true,
    reviews: [
      {
        author: 'Анна Петрова',
        rating: 5,
        text: 'Отличные унты! Очень теплые и удобные. Носила всю зиму в Сибири - ноги всегда в тепле.',
        date: '15 января 2024',
      },
      {
        author: 'Дмитрий Соколов',
        rating: 5,
        text: 'Качество на высоте. Ручная работа чувствуется в каждой детали.',
        date: '22 декабря 2023',
      },
    ],
  },
  {
    id: 2,
    name: 'Унты женские с вышивкой',
    price: 18500,
    image: 'https://cdn.poehali.dev/projects/9e60444e-d85c-46b7-8589-458c8a04c9ea/files/72d931c3-3dad-4d1b-8208-a8974ef4b53a.jpg',
    rating: 5,
    reviewsCount: 8,
    inStock: true,
    reviews: [
      {
        author: 'Мария Иванова',
        rating: 5,
        text: 'Очень красивые! Вышивка выполнена аккуратно, унты легкие и теплые.',
        date: '3 февраля 2024',
      },
    ],
  },
  {
    id: 3,
    name: 'Унты мужские высокие',
    price: 17200,
    image: 'https://cdn.poehali.dev/projects/9e60444e-d85c-46b7-8589-458c8a04c9ea/files/72d931c3-3dad-4d1b-8208-a8974ef4b53a.jpg',
    rating: 4,
    reviewsCount: 6,
    inStock: true,
    reviews: [
      {
        author: 'Сергей Волков',
        rating: 4,
        text: 'Хорошие унты, но размер маломерит. Рекомендую брать на размер больше.',
        date: '10 января 2024',
      },
    ],
  },
  {
    id: 4,
    name: 'Унты детские',
    price: 9900,
    image: 'https://cdn.poehali.dev/projects/9e60444e-d85c-46b7-8589-458c8a04c9ea/files/72d931c3-3dad-4d1b-8208-a8974ef4b53a.jpg',
    rating: 5,
    reviewsCount: 15,
    inStock: false,
    reviews: [
      {
        author: 'Елена Смирнова',
        rating: 5,
        text: 'Купила ребенку - в восторге! Легко надевать, ножка не потеет.',
        date: '28 декабря 2023',
      },
    ],
  },
];

export default function Index() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleShowReviews = (product: Product) => {
    setSelectedProduct(product);
    setReviewsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />

      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/projects/9e60444e-d85c-46b7-8589-458c8a04c9ea/files/01a031e5-edd1-4d9e-ac27-084ed083f976.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white space-y-6 px-4 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold">Тепло Севера</h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Традиционные унты ручной работы из натуральных материалов
          </p>
          <Button size="lg" className="mt-4">
            Смотреть каталог
          </Button>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <h2 className="text-3xl font-bold">Каталог товаров</h2>
          <div className="flex gap-2 w-full md:w-auto">
            <Input placeholder="Поиск..." className="md:w-64" />
            <Button variant="outline" size="icon">
              <Icon name="Search" size={20} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onShowReviews={handleShowReviews}
            />
          ))}
        </div>
      </section>

      <section className="bg-secondary/30 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Доставка и оплата</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="animate-fade-in">
              <CardContent className="p-6 text-center">
                <Icon name="Truck" size={48} className="mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Доставка по России</h3>
                <p className="text-sm text-muted-foreground">
                  Отправляем в любой регион транспортными компаниями
                </p>
              </CardContent>
            </Card>
            <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6 text-center">
                <Icon name="CreditCard" size={48} className="mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Удобная оплата</h3>
                <p className="text-sm text-muted-foreground">
                  Наличные, карты, онлайн-переводы
                </p>
              </CardContent>
            </Card>
            <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6 text-center">
                <Icon name="Shield" size={48} className="mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Гарантия качества</h3>
                <p className="text-sm text-muted-foreground">
                  Ручная работа, натуральные материалы
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">О магазине</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg">
            Мы создаем традиционные унты ручной работы из натуральных материалов.
            Каждая пара уникальна и изготовлена с соблюдением вековых традиций народов Севера.
          </p>
          <p className="text-muted-foreground">
            Наши унты согреют вас в самые морозные дни и прослужат многие годы.
            Мы используем только качественную оленью кожу, натуральный мех и прочную фурнитуру.
          </p>
        </div>
      </section>

      <footer className="bg-muted py-12 mt-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Mountain" size={24} className="text-primary" />
                Унты Морегор
              </h3>
              <p className="text-sm text-muted-foreground">
                Традиционная обувь ручной работы
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@moregor.ru
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                <Button variant="outline" size="icon">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="mb-8" />
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Унты Морегор. Все права защищены.
          </p>
        </div>
      </footer>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />

      {selectedProduct && (
        <ReviewsDialog
          isOpen={reviewsOpen}
          onClose={() => setReviewsOpen(false)}
          productName={selectedProduct.name}
          reviews={selectedProduct.reviews}
        />
      )}
    </div>
  );
}
