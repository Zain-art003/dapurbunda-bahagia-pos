import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag,
  Calendar,
  Download,
  Eye
} from "lucide-react";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  
  const periods = [
    { id: "today", label: "Hari Ini" },
    { id: "week", label: "Minggu Ini" },
    { id: "month", label: "Bulan Ini" },
    { id: "quarter", label: "Kuartal" }
  ];

  // Mock data for reports
  const salesData = {
    today: { revenue: 1250000, orders: 45, items: 125 },
    week: { revenue: 8750000, orders: 315, items: 875 },
    month: { revenue: 35000000, orders: 1260, items: 3500 },
    quarter: { revenue: 105000000, orders: 3780, items: 10500 }
  };

  const topProducts = [
    { name: "Nasi Gudeg Jogja", sold: 85, revenue: 2125000, category: "main" },
    { name: "Ayam Bakar Madu", sold: 65, revenue: 2275000, category: "main" },
    { name: "Es Teh Manis", sold: 120, revenue: 600000, category: "beverage" },
    { name: "Soto Ayam Lamongan", sold: 55, revenue: 1100000, category: "main" },
    { name: "Jus Alpukat", sold: 45, revenue: 540000, category: "beverage" }
  ];

  const dailySales = [
    { day: "Senin", revenue: 1200000, orders: 42 },
    { day: "Selasa", revenue: 1350000, orders: 48 },
    { day: "Rabu", revenue: 1180000, orders: 41 },
    { day: "Kamis", revenue: 1420000, orders: 51 },
    { day: "Jumat", revenue: 1680000, orders: 58 },
    { day: "Sabtu", revenue: 1920000, orders: 75 },
    { day: "Minggu", revenue: 2000000, orders: 82 }
  ];

  const currentData = salesData[selectedPeriod as keyof typeof salesData];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      main: "bg-primary/10 text-primary",
      appetizer: "bg-accent/10 text-accent", 
      beverage: "bg-success/10 text-success"
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Laporan Penjualan</h1>
            <p className="text-muted-foreground">Analisis performa bisnis restoran</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Unduh Laporan
            </Button>
            <Button className="bg-gradient-to-r from-primary to-primary-light">
              <Eye className="h-4 w-4 mr-2" />
              Lihat Detail
            </Button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-6">
          {periods.map((period) => (
            <Button
              key={period.id}
              variant={selectedPeriod === period.id ? "default" : "outline"}
              onClick={() => setSelectedPeriod(period.id)}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-2 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Total Pendapatan</span>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(currentData.revenue)}
            </div>
            <div className="flex items-center mt-2 text-sm text-success">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12.5% dari periode sebelumnya
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Total Pesanan</span>
              <ShoppingBag className="h-4 w-4 text-accent" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{currentData.orders}</div>
            <div className="flex items-center mt-2 text-sm text-success">
              <TrendingUp className="h-4 w-4 mr-1" />
              +8.3% dari periode sebelumnya
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Item Terjual</span>
              <BarChart3 className="h-4 w-4 text-warning" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{currentData.items}</div>
            <div className="flex items-center mt-2 text-sm text-success">
              <TrendingUp className="h-4 w-4 mr-1" />
              +15.2% dari periode sebelumnya
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Produk Terlaris
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryBadge(product.category)} variant="outline">
                          {product.category === 'main' ? 'Makanan Utama' : 
                           product.category === 'appetizer' ? 'Appetizer' : 'Minuman'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {product.sold} terjual
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">
                      {formatCurrency(product.revenue)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Penjualan Harian (Minggu Ini)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailySales.map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-sm font-medium">{day.day}</div>
                    <div className="text-sm text-muted-foreground">
                      {day.orders} pesanan
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full"
                        style={{
                          width: `${(day.revenue / Math.max(...dailySales.map(d => d.revenue))) * 100}%`
                        }}
                      />
                    </div>
                    <div className="w-28 text-right font-semibold text-primary">
                      {formatCurrency(day.revenue)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Download className="h-5 w-5" />
              <span>Unduh Laporan Bulanan</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <BarChart3 className="h-5 w-5" />
              <span>Analisis Trend Penjualan</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Calendar className="h-5 w-5" />
              <span>Jadwalkan Laporan Otomatis</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;