import { ArrowLeft, Bell, CheckCircle2, TrendingUp, AlertCircle, Gift } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface NotificationScreenProps {
  onBack: () => void;
}

export function NotificationScreen({ onBack }: NotificationScreenProps) {
  const notifications = [
    {
      id: 1,
      type: "achievement",
      icon: Gift,
      title: "Шинэ амжилт!",
      message: "Та 7 хоног дараалан хуримтлуулж амжилт олж авлаа! 🎉",
      time: "5 минутын өмнө",
      unread: true,
      color: "bg-yellow-500"
    },
    {
      id: 2,
      type: "goal",
      icon: CheckCircle2,
      title: "Зорилго биелэх дөхсөн",
      message: "Эмэргэнсийн сан 80% хүрлээ. Та маш сайн явж байна!",
      time: "2 цагийн өмнө",
      unread: true,
      color: "bg-green-500"
    },
    {
      id: 3,
      type: "reminder",
      icon: Bell,
      title: "Хуримтлалын сануулга",
      message: "Өнөөдрийн 10,000₮ хуримтлал хийгдлээ.",
      time: "Өчигдөр",
      unread: false,
      color: "bg-primary"
    },
    {
      id: 4,
      type: "milestone",
      icon: TrendingUp,
      title: "Шинэ milestone!",
      message: "Нийт хуримтлал 500,000₮ давлаа!",
      time: "2 өдрийн өмнө",
      unread: false,
      color: "bg-blue-500"
    },
    {
      id: 5,
      type: "alert",
      icon: AlertCircle,
      title: "Анхааруулга",
      message: "Хүүхдийн боловсролын зорилго сүүлийн 3 өдөр шинэчлэгдээгүй байна.",
      time: "3 өдрийн өмнө",
      unread: false,
      color: "bg-orange-500"
    },
    {
      id: 6,
      type: "achievement",
      icon: Gift,
      title: "Анхны зорилго",
      message: "Та анхны хуримтлалын зорилгоо үүсгэлээ!",
      time: "1 долоо хоногийн өмнө",
      unread: false,
      color: "bg-purple-500"
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-secondary/30 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-primary/90 px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            Бүгдийг уншсан
          </Button>
        </div>
        <h1 className="text-white mb-2">Мэдэгдлүүд</h1>
        <p className="text-white/70 text-sm">
          {unreadCount > 0 ? `${unreadCount} шинэ мэдэгдэл` : "Шинэ мэдэгдэл байхгүй"}
        </p>
      </div>

      {/* Notifications List */}
      <div className="px-6 pt-4 space-y-3">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 rounded-2xl transition-all hover:shadow-md ${
              notification.unread ? "bg-primary/5 border-primary/20" : ""
            }`}
          >
            <div className="flex gap-4">
              <div className={`w-12 h-12 ${notification.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                <notification.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm">{notification.title}</h3>
                  {notification.unread && (
                    <Badge className="bg-primary text-white px-2 py-0 text-xs">Шинэ</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State (if needed) */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
            <Bell className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="mb-2">Мэдэгдэл байхгүй</h3>
          <p className="text-sm text-muted-foreground text-center px-8">
            Одоогоор танд ямар ч мэдэгдэл байхгүй байна
          </p>
        </div>
      )}
    </div>
  );
}
