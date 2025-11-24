import { Eye, Bell, Pencil, Plus, Menu } from "lucide-react";
import { SavingsCard } from "./SavingsCard";
import { GoalCard } from "./GoalCard";
import { Button } from "./ui/button";

interface HomeScreenProps {
  onAddSavings: () => void;
  onOpenMenu?: () => void;
  savingsGoals?: any[];
  onGoalClick?: (goal: any) => void;
  onNotificationClick?: () => void;
}

export function HomeScreen({ onAddSavings, onOpenMenu, savingsGoals = [], onGoalClick, onNotificationClick }: HomeScreenProps) {
  const savingsData = [
    { label: "Зорилгын дүн", value: "10,000₮" },
    { label: "Тогтмол хуримтлуулах дүн", value: "10,000₮" },
    { label: "Хугацаа", value: "25 жиил" },
    { label: "Хуримтлуулах давтамж", value: "Өдөр бүр" },
    { label: "Татаалт хийх өдөр", value: "Өдөр бүр" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 pt-12 pb-32">
      {/* Status Bar */}
      <div className="px-6 text-white flex justify-between items-center mb-8">
        <span>13:38</span>
        <div className="flex gap-2">
          <span>••••</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 mb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-white/80 text-sm mb-1">Сайн байна уу,</p>
            <h1 className="text-white">Болд Алтанзул</h1>
          </div>
          <div className="flex gap-3">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Eye className="w-5 h-5" />
            </button>
            <button
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors relative"
              onClick={onNotificationClick}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-primary"></span>
            </button>
            {onOpenMenu && (
              <button
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                onClick={onOpenMenu}
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Total Balance Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-6 border border-white/20">
          <p className="text-white/80 text-sm mb-2">Нийт хуримтлал</p>
          <h1 className="text-white mb-4">815,000₮</h1>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-white/70 text-xs mb-1">Энэ сар</p>
              <p className="text-white">+250k₮</p>
            </div>
            <div>
              <p className="text-white/70 text-xs mb-1">Зорилго</p>
              <p className="text-white">3/5</p>
            </div>
            <div>
              <p className="text-white/70 text-xs mb-1">Өсөлт</p>
              <p className="text-green-400">+44%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white">Миний зорилгууд</h2>
          <button
            onClick={onAddSavings}
            className="text-white/90 hover:text-white text-sm flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Нэмэх
          </button>
        </div>

        <div className="space-y-4">
          {savingsGoals.length > 0 ? (
            savingsGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                title={goal.title}
                current={goal.current}
                target={goal.target}
                dailyAmount={goal.dailyAmount}
                frequency={goal.frequency}
                endDate={goal.endDate}
                onClick={() => onGoalClick && onGoalClick(goal)}
              />
            ))
          ) : (
            <>
              <GoalCard
                title="Хүүхдийн боловсрол"
                current={250000}
                target={10000000}
                dailyAmount={10000}
                frequency="Өдөр бүр"
                endDate="2049-11-24"
              />

              <GoalCard
                title="Эмэргэнсийн сан"
                current={565000}
                target={5000000}
                dailyAmount={5000}
                frequency="Өдөр бүр"
                endDate="2027-11-24"
              />
            </>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6">
        <Button
          onClick={onAddSavings}
          className="w-full bg-white text-primary hover:bg-white/90 py-6 rounded-2xl shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Шинэ зорилго нэмэх
        </Button>
      </div>
    </div>
  );
}