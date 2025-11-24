import { Card } from "./ui/card";
import { ProgressCircle } from "./ProgressCircle";
import { TrendingUp, Calendar, Coins } from "lucide-react";

interface GoalCardProps {
  title: string;
  current: number;
  target: number;
  dailyAmount: number;
  frequency: string;
  endDate: string;
  color?: string;
  onClick?: () => void;
}

export function GoalCard({
  title,
  current,
  target,
  dailyAmount,
  frequency,
  endDate,
  color = "bg-primary",
  onClick
}: GoalCardProps) {
  const progress = (current / target) * 100;

  return (
    <Card 
      className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{frequency}</p>
        </div>
        <ProgressCircle progress={progress} size={80} strokeWidth={6} />
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Одоогийн дүн</span>
          </div>
          <span className="text-primary">{current.toLocaleString()}₮</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Зорилгын дүн</span>
          </div>
          <span className="text-foreground">{target.toLocaleString()}₮</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Дуусах хугацаа</span>
          </div>
          <span className="text-foreground">{endDate}</span>
        </div>
      </div>

      <div className={`${color} text-white p-4 rounded-2xl text-center`}>
        <p className="text-sm opacity-90">Өдөр бүр</p>
        <p className="text-2xl">{dailyAmount.toLocaleString()}₮</p>
      </div>
    </Card>
  );
}