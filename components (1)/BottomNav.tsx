import { BarChart3, Home, Settings } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        <button
          onClick={() => onTabChange("history")}
          className={`flex flex-col items-center gap-1 px-6 py-2 ${
            activeTab === "history" ? "text-muted-foreground" : "text-muted-foreground"
          }`}
        >
          <BarChart3 className="w-6 h-6" />
          <span className="text-xs">Хуримтлалын түүхэй</span>
        </button>
        
        <button
          onClick={() => onTabChange("home")}
          className={`flex flex-col items-center relative ${
            activeTab === "home" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div className="absolute -top-6 w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <Home className="w-8 h-8 text-white" />
          </div>
          <div className="mt-12"></div>
        </button>
        
        <button
          onClick={() => onTabChange("settings")}
          className={`flex flex-col items-center gap-1 px-6 py-2 ${
            activeTab === "settings" ? "text-muted-foreground" : "text-muted-foreground"
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs">Тохиргоо</span>
        </button>
      </div>
      <div className="h-6 bg-white"></div>
    </div>
  );
}
