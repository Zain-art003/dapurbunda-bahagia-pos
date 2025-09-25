import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Package, 
  BarChart3, 
  Users, 
  Clock,
  Plus,
  Minus,
  Receipt,
  CreditCard,
  Banknote
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

const Dashboard = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "Semua", icon: Package },
    { id: "main", name: "Makanan Utama", icon: Package },
    { id: "appetizer", name: "Appetizer", icon: Package },
    { id: "beverage", name: "Minuman", icon: Package }
  ];

  const menuItems = [
    // Makanan Utama
    { id: "1", name: "Nasi Gudeg Jogja", price: 25000, category: "main", stock: 15 },
    { id: "2", name: "Ayam Bakar Madu", price: 35000, category: "main", stock: 8 },
    { id: "3", name: "Soto Ayam Lamongan", price: 20000, category: "main", stock: 12 },
    { id: "4", name: "Rendang Daging", price: 45000, category: "main", stock: 6 },
    // Appetizer
    { id: "5", name: "Keripik Tempe", price: 8000, category: "appetizer", stock: 20 },
    { id: "6", name: "Tahu Crispy", price: 12000, category: "appetizer", stock: 15 },
    { id: "7", name: "Lumpia Semarang", price: 15000, category: "appetizer", stock: 10 },
    // Minuman
    { id: "8", name: "Es Teh Manis", price: 5000, category: "beverage", stock: 25 },
    { id: "9", name: "Es Jeruk Nipis", price: 8000, category: "beverage", stock: 18 },
    { id: "10", name: "Jus Alpukat", price: 12000, category: "beverage", stock: 12 }
  ];

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity <= 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Sistem Kasir POS</h1>
            <p className="text-muted-foreground">Dapur Bunda Bahagia</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleString('id-ID')}
              </span>
            </div>
            <Badge variant="secondary" className="bg-success text-success-foreground">
              <Users className="h-3 w-3 mr-1" />
              Kasir: Admin
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Menu Section */}
        <div className="flex-1 p-4">
          {/* Category Tabs */}
          <div className="flex gap-2 mb-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
                onClick={() => addToCart(item)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(item.price)}
                    </span>
                    <Badge variant={item.stock > 5 ? "secondary" : "destructive"}>
                      Stok: {item.stock}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="w-96 bg-card border-l border-border p-4">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Pesanan</h2>
          </div>

          <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Keranjang masih kosong
              </p>
            ) : (
              cart.map((item) => (
                <Card key={item.id} className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <span className="text-sm font-semibold text-primary">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, -1);
                        }}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, 1);
                        }}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="font-bold text-primary">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </Card>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <>
              <Separator className="my-4" />
              
              {/* Total */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              {/* Payment Buttons */}
              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary" size="lg">
                  <Banknote className="h-4 w-4 mr-2" />
                  Bayar Tunai
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Bayar Non-Tunai
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;