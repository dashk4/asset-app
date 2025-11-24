import { ArrowLeft, Pencil, Trash2, Plus, TrendingUp, Calendar, Target } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface GoalDetailScreenProps {
  goal: any;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAddTransaction: () => void;
}

export function GoalDetailScreen({ goal, onBack, onEdit, onDelete, onAddTransaction }: GoalDetailScreenProps) {
  const progress = (goal.current / goal.target) * 100;
  
  // Mock chart data
  const chartData = [
    { month: "1-р сар", amount: 50000 },
    { month: "2-р сар", amount: 80000 },
    { month: "3-р сар", amount: 120000 },
    { month: "4-р сар", amount: 180000 },
    { month: "5-р сар", amount: goal.current },
  ];

  // Mock transactions
  const transactions = [
    { id: 1, date: "2024-11-24", amount: 10000, type: "auto", description: "Автомат хуримтлал" },
    { id: 2, date: "2024-11-23", amount: 10000, type: "auto", description: "Автомат хуримтлал" },
    { id: 3, date: "2024-11-22", amount: 15000, type: "manual", description: "Гар аар нэмсэн" },
    { id: 4, date: "2024-11-21", amount: 10000, type: "auto", description: "Автомат хуримтлал" },
  ];

  const daysLeft = Math.floor((new Date(goal.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const monthsLeft = Math.floor(daysLeft / 30);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 pb-8">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                if (confirm("Энэ зорилгыг устгахдаа итгэлтэй байна уу?")) {
                  onDelete();
                }
              }}
              className="w-10 h-10 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Goal Title */}
        <h1 className="text-white mb-2">{goal.title}</h1>
        <p className="text-white/70 text-sm">
          {daysLeft > 30 ? `${monthsLeft} сар үлдсэн` : `${daysLeft} өдөр үлдсэн`}
        </p>
      </div>

      {/* Progress Card */}
      <div className="px-6 mb-6">
        <Card className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border-white/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Одоогийн хуримтлал</p>
              <h2 className="text-primary">{goal.current.toLocaleString()}₮</h2>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm mb-1">Зорилтот дүн</p>
              <h2 className="text-muted-foreground">{goal.target.toLocaleString()}₮</h2>
            </div>
          </div>
          
          <Progress value={progress} className="h-3 mb-2" />
          <p className="text-sm text-center text-muted-foreground">{progress.toFixed(1)}% биелсэн</p>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="px-6 mb-6 grid grid-cols-2 gap-4">
        <Card className="p-4 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Өдрийн дүн</p>
          </div>
          <p className="text-xl">{goal.dailyAmount.toLocaleString()}₮</p>
          <p className="text-xs text-muted-foreground mt-1">{goal.frequency}</p>
        </Card>

        <Card className="p-4 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground">Нийт өсөлт</p>
          </div>
          <p className="text-xl text-green-600">+{progress.toFixed(0)}%</p>
          <p className="text-xs text-muted-foreground mt-1">Сүүлийн 5 сар</p>
        </Card>
      </div>

      {/* Chart */}
      <div className="px-6 mb-6">
        <Card className="p-4 rounded-2xl">
          <h3 className="mb-4">Хуримтлалын график</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#744c34" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Transactions */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white">Сүүлийн гүйлгээнүүд</h3>
          <Button
            onClick={onAddTransaction}
            size="sm"
            className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Нэмэх
          </Button>
        </div>
        
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === "auto" ? "bg-primary/10" : "bg-green-500/10"
                }`}>
                  <Plus className={`w-5 h-5 ${
                    transaction.type === "auto" ? "text-primary" : "text-green-600"
                  }`} />
                </div>
                <div>
                  <p className="text-sm">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <p className="text-green-600">+{transaction.amount.toLocaleString()}₮</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
