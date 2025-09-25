import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Package, 
  Plus, 
  Edit, 
  AlertTriangle,
  Search,
  Filter
} from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  lastUpdated: string;
}

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const inventoryItems: InventoryItem[] = [
    { id: "1", name: "Nasi Gudeg Jogja", category: "main", stock: 15, minStock: 10, price: 25000, lastUpdated: "2024-01-15" },
    { id: "2", name: "Ayam Bakar Madu", category: "main", stock: 8, minStock: 10, price: 35000, lastUpdated: "2024-01-15" },
    { id: "3", name: "Soto Ayam Lamongan", category: "main", stock: 12, minStock: 8, price: 20000, lastUpdated: "2024-01-15" },
    { id: "4", name: "Rendang Daging", category: "main", stock: 6, minStock: 8, price: 45000, lastUpdated: "2024-01-15" },
    { id: "5", name: "Keripik Tempe", category: "appetizer", stock: 20, minStock: 15, price: 8000, lastUpdated: "2024-01-15" },
    { id: "6", name: "Tahu Crispy", category: "appetizer", stock: 15, minStock: 12, price: 12000, lastUpdated: "2024-01-15" },
    { id: "7", name: "Lumpia Semarang", category: "appetizer", stock: 10, minStock: 8, price: 15000, lastUpdated: "2024-01-15" },
    { id: "8", name: "Es Teh Manis", category: "beverage", stock: 25, minStock: 20, price: 5000, lastUpdated: "2024-01-15" },
    { id: "9", name: "Es Jeruk Nipis", category: "beverage", stock: 18, minStock: 15, price: 8000, lastUpdated: "2024-01-15" },
    { id: "10", name: "Jus Alpukat", category: "beverage", stock: 12, minStock: 10, price: 12000, lastUpdated: "2024-01-15" }
  ];

  const categories = [
    { id: "all", name: "Semua Kategori" },
    { id: "main", name: "Makanan Utama" },
    { id: "appetizer", name: "Appetizer" },
    { id: "beverage", name: "Minuman" }
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventoryItems.filter(item => item.stock <= item.minStock);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStockStatus = (current: number, minimum: number) => {
    if (current <= minimum) return "critical";
    if (current <= minimum * 1.5) return "warning";
    return "good";
  };

  const getStockBadge = (current: number, minimum: number) => {
    const status = getStockStatus(current, minimum);
    if (status === "critical") return <Badge variant="destructive">Stok Habis</Badge>;
    if (status === "warning") return <Badge variant="outline" className="border-warning text-warning">Stok Rendah</Badge>;
    return <Badge variant="secondary" className="bg-success/10 text-success">Stok Aman</Badge>;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Manajemen Inventori</h1>
            <p className="text-muted-foreground">Kelola stok makanan dan minuman</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-primary-light">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Item Baru
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{inventoryItems.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Stok Rendah</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{lowStockItems.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Kategori Aktif</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">3</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Nilai Inventori</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-success">
                {formatCurrency(inventoryItems.reduce((sum, item) => sum + (item.stock * item.price), 0))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama makanan atau minuman..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-48">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="mb-6 border-warning">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Peringatan Stok Rendah
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3">
              {lowStockItems.length} item memerlukan penambahan stok:
            </p>
            <div className="flex flex-wrap gap-2">
              {lowStockItems.map(item => (
                <Badge key={item.id} variant="outline" className="border-warning text-warning">
                  {item.name} ({item.stock} tersisa)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Daftar Inventori
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>Harga: {formatCurrency(item.price)}</span>
                    <span>Min. Stok: {item.minStock}</span>
                    <span>Update: {new Date(item.lastUpdated).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold">{item.stock}</div>
                    {getStockBadge(item.stock, item.minStock)}
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;