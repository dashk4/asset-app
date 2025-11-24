import { ArrowLeft, Trophy, Target, Zap, Star, Lock, TrendingUp, Calendar, Award } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface AchievementsScreenProps {
  onBack: () => void;
}

export function AchievementsScreen({ onBack }: AchievementsScreenProps) {
  const achievements = [
    {
      id: 1,
      icon: Star,
      title: "Эхний алхам",
      description: "Анхны зорилго үүсгэх",
      unlocked: true,
      unlockedDate: "2024-11-17",
      color: "bg-yellow-500",
      points: 10,
    },
    {
      id: 2,
      icon: Zap,
      title: "7 өдрийн streak",
      description: "7 хоног дараалан хуримтлуулах",
      unlocked: true,
      unlockedDate: "2024-11-24",
      color: "bg-orange-500",
      points: 25,
    },
    {
      id: 3,
      icon: Target,
      title: "Анхны зорилго",
      description: "Анхны зорилгоо биелүүлэх",
      unlocked: false,
      progress: 81.5,
      color: "bg-green-500",
      points: 50,
    },
    {
      id: 4,
      icon: TrendingUp,
      title: "500k клуб",
      description: "Нийт 500,000₮ хуримтлуулах",
      unlocked: true,
      unlockedDate: "2024-11-22",
      color: "bg-blue-500",
      points: 30,
    },
    {
      id: 5,
      icon: Calendar,
      title: "30 өдрийн streak",
      description: "30 хоног дараалан хуримтлуулах",
      unlocked: false,
      progress: 23,
      color: "bg-purple-500",
      points: 75,
    },
    {
      id: 6,
      icon: Award,
      title: "Таван зорилго",
      description: "5 зорилгыг зэрэг явуулах",
      unlocked: false,
      progress: 60,
      color: "bg-pink-500",
      points: 40,
    },
    {
      id: 7,
      icon: Trophy,
      title: "Миллионер",
      description: "Нийт 1,000,000₮ хуримтлуулах",
      unlocked: false,
      progress: 81.5,
      color: "bg-amber-500",
      points: 100,
    },
    {
      id: 8,
      icon: Star,
      title: "100 өдрийн streak",
      description: "100 хоног дараалан хуримтлуулах",
      unlocked: false,
      progress: 7,
      color: "bg-indigo-500",
      points: 150,
    },
  ];

  const totalPoints = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen bg-secondary/30 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-primary/90 px-6 pt-12 pb-6">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        <h1 className="text-white mb-2">Амжилтууд</h1>
        <p className="text-white/70 text-sm">
          {unlockedCount}/{achievements.length} амжилт түгжээ тайлсан
        </p>

        {/* Stats Card */}
        <Card className="mt-6 p-6 rounded-2xl bg-white/95 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Нийт оноо</p>
              <h2 className="text-primary">{totalPoints} pts</h2>
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
          </div>
          <Progress value={(unlockedCount / achievements.length) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Нийт {((unlockedCount / achievements.length) * 100).toFixed(0)}% бүрэн биелсэн
          </p>
        </Card>
      </div>

      {/* Achievements Grid */}
      <div className="px-6 pt-4">
        <div className="grid grid-cols-1 gap-3">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`p-4 rounded-2xl transition-all ${
                achievement.unlocked
                  ? "bg-white"
                  : "bg-secondary/50 opacity-75"
              }`}
            >
              <div className="flex gap-4">
                <div
                  className={`w-14 h-14 ${achievement.color} rounded-2xl flex items-center justify-center flex-shrink-0 relative`}
                >
                  {achievement.unlocked ? (
                    <achievement.icon className="w-7 h-7 text-white" />
                  ) : (
                    <Lock className="w-7 h-7 text-white/70" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm">{achievement.title}</h3>
                    <Badge
                      variant={achievement.unlocked ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {achievement.points} pts
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {achievement.description}
                  </p>

                  {achievement.unlocked ? (
                    <p className="text-xs text-green-600">
                      ✓ {achievement.unlockedDate} -д түгжээ тайлсан
                    </p>
                  ) : achievement.progress !== undefined ? (
                    <>
                      <Progress value={achievement.progress} className="h-1.5 mb-1" />
                      <p className="text-xs text-muted-foreground">
                        {achievement.progress.toFixed(0)}% бүрэн биелсэн
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Түгжээтэй
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Motivational Section */}
      <div className="px-6 mt-6">
        <Card className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="mb-2">Та маш сайн явж байна!</h3>
            <p className="text-sm text-muted-foreground">
              Хуримтлалаа үргэлжлүүлж, илүү олон амжилт түгжээ тайлаарай
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
