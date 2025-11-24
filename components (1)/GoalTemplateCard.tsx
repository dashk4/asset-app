import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

interface GoalTemplateCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export function GoalTemplateCard({
  icon: Icon,
  title,
  description,
  color,
  isSelected,
  onClick,
}: GoalTemplateCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`p-5 rounded-2xl cursor-pointer transition-all ${
        isSelected
          ? `${color} border-2 border-primary shadow-lg scale-105`
          : "bg-white border-2 border-transparent hover:border-primary/20 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isSelected ? "bg-white/90" : color
        }`}>
          <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : "text-white"}`} />
        </div>
        <div className="flex-1">
          <h3 className={`mb-1 text-sm ${isSelected ? "text-white" : "text-foreground"}`}>
            {title}
          </h3>
          <p className={`text-xs ${isSelected ? "text-white/90" : "text-muted-foreground"}`}>
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
