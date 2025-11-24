import { useState } from "react";
import { TransactionItem } from "./TransactionItem";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Calendar, TrendingUp, ArrowLeft } from "lucide-react";

const transactions = [
  { id: 1, type: "deposit" as const, amount: 10000, date: "2024-11-24", description: "Өдрийн хуримтлал", balance: 250000 },
  { id: 2, type: "deposit" as const, amount: 10000, date: "2024-11-23", description: "Өдрийн хуримтлал", balance: 240000 },
  { id: 3, type: "deposit" as const, amount: 10000, date: "2024-11-22", description: "Өдрийн хуримтлал", balance: 230000 },
  { id: 4, type: "withdrawal" as const, amount: 50000, date: "2024-11-20", description: "Яаралтай зардал", balance: 220000 },
  { id: 5, type: "deposit" as const, amount: 10000, date: "2024-11-19", description: "Өдрийн хуримтлал", balance: 270000 },
  { id: 6, type: "deposit" as const, amount: 10000, date: "2024-11-18", description: "Өдрийн хуримтлал", balance: 260000 },
];

const monthlyStats = [
  { month: "2024-11", deposits: 250000, withdrawals: 0, total: 250000 },
  { month: "2024-10", deposits: 310000, withdrawals: 50000, total: 260000 },
  { month: "2024-09", deposits: 300000, withdrawals: 0, total: 300000 },
];

export function HistoryScreen() {
  const [activeTab, setActiveTab] = useState("transactions");

  return (
    <div className="min-h-screen bg-white pt-12 pb-32">
      {/* Status Bar */}
      <div className="px-6 flex justify-between items-center mb-4">
        <span>13:39</span>
        <div className="flex gap-2">
          <span>••••</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 mb-6">
        <h1 className="text-primary mb-2">Түүх</h1>
        <p className="text-sm text-muted-foreground">Хуримтлалын бүх түүхийг харах</p>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mb-6 grid grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Орлого</span>
          </div>
          <p className="text-green-600 text-xl">+250,000₮</p>
          <p className="text-xs text-green-600 opacity-75">Энэ сар</p>
        </div>

        <div className="bg-primary/10 p-4 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Нийт үлдэгдэл</span>
          </div>
          <p className="text-primary text-xl">250,000₮</p>
          <p className="text-xs text-primary opacity-75">25 өдөр</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="transactions">Гүйлгээнүүд</TabsTrigger>
            <TabsTrigger value="monthly">Сарын тайлан</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-2">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} {...transaction} />
            ))}
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="bg-secondary/30 p-6 rounded-2xl">
                <h3 className="mb-4">{stat.month}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Орлого</span>
                    <span className="text-green-600">+{stat.deposits.toLocaleString()}₮</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Зарлага</span>
                    <span className="text-red-600">-{stat.withdrawals.toLocaleString()}₮</span>
                  </div>
                  <div className="h-px bg-border my-2"></div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Нийт</span>
                    <span className="text-primary">{stat.total.toLocaleString()}₮</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}