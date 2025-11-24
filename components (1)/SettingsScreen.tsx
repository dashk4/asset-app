import { User, Bell, Lock, CreditCard, HelpCircle, LogOut, ChevronRight, ArrowLeft, Trophy, Share2, Moon } from "lucide-react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";

interface SettingsScreenProps {
  onLogout: () => void;
  onProfileEdit?: () => void;
  onCardManagement?: () => void;
  onAchievements?: () => void;
  onShareExport?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function SettingsScreen({ onLogout, onProfileEdit, onCardManagement, onAchievements, onShareExport, darkMode, onToggleDarkMode }: SettingsScreenProps) {
  const settingsGroups = [
    {
      title: "Хувийн мэдээлэл",
      items: [
        { icon: User, label: "Профайл", hasArrow: true, action: "profile" },
        { icon: CreditCard, label: "Банкны карт", hasArrow: true, badge: "2", action: "cards" },
      ],
    },
    {
      title: "Мэдэгдэл",
      items: [
        { icon: Bell, label: "Хуримтлалын сануулга", hasSwitch: true },
        { icon: Bell, label: "Зорилго биелэх үед", hasSwitch: true },
      ],
    },
    {
      title: "Харагдац",
      items: [
        { icon: Moon, label: "Хар горим", hasSwitch: true, action: "darkmode" },
      ],
    },
    {
      title: "Амжилт & Хуваалцах",
      items: [
        { icon: Trophy, label: "Амжилтууд", hasArrow: true, action: "achievements" },
        { icon: Share2, label: "Хуваалцах & Татах", hasArrow: true, action: "share" },
      ],
    },
    {
      title: "Нууцлал ба аюулгүй байдал",
      items: [
        { icon: Lock, label: "Нууц үг солих", hasArrow: true },
        { icon: Lock, label: "Биометрик нэвтрэх", hasSwitch: true },
      ],
    },
    {
      title: "Бусад",
      items: [
        { icon: HelpCircle, label: "Тусламж ба дэмжлэг", hasArrow: true },
        { icon: LogOut, label: "Гарах", hasArrow: true, isDestructive: true, action: "logout" },
      ],
    },
  ];

  const handleItemClick = (item: any) => {
    if (item.action === "logout") {
      if (confirm("Та гарахдаа итгэлтэй байна уу?")) {
        onLogout();
      }
    } else if (item.action === "profile") {
      onProfileEdit && onProfileEdit();
    } else if (item.action === "cards") {
      onCardManagement && onCardManagement();
    } else if (item.action === "achievements") {
      onAchievements && onAchievements();
    } else if (item.action === "share") {
      onShareExport && onShareExport();
    }
  };

  const handleSwitchChange = (item: any, checked: boolean) => {
    if (item.action === "darkmode") {
      onToggleDarkMode && onToggleDarkMode();
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 pt-12 pb-32">
      {/* Status Bar */}
      <div className="px-6 flex justify-between items-center mb-4">
        <span>13:39</span>
        <div className="flex gap-2">
          <span>••••</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Profile Header */}
      <div className="px-6 mb-8">
        <Card className="p-6 rounded-3xl flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow" onClick={onProfileEdit}>
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl">
            БА
          </div>
          <div className="flex-1">
            <h3 className="mb-1">Болд Алтанзул</h3>
            <p className="text-sm text-muted-foreground">bold.altanzul@gmail.com</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </Card>
      </div>

      {/* Settings Groups */}
      <div className="px-6 space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="mb-3 text-sm text-muted-foreground px-2">{group.title}</h3>
            <Card className="rounded-2xl overflow-hidden">
              {group.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors ${
                    itemIndex !== group.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${item.isDestructive ? "text-red-600" : "text-primary"}`} />
                  <span className={`flex-1 text-left ${item.isDestructive ? "text-red-600" : ""}`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.hasSwitch && (
                    <Switch 
                      checked={item.action === "darkmode" ? darkMode : false}
                      onCheckedChange={(checked) => handleSwitchChange(item, checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                  {item.hasArrow && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
                </button>
              ))}
            </Card>
          </div>
        ))}
      </div>

      {/* App Version */}
      <div className="px-6 mt-8 text-center text-sm text-muted-foreground">
        Мандал Хуримтлал v1.0.0
      </div>
    </div>
  );
}