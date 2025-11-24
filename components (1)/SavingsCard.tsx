import { Card } from "./ui/card";

interface SavingsCardProps {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
}

export function SavingsCard({ title, items }: SavingsCardProps) {
  return (
    <Card className="p-6 bg-white rounded-3xl shadow-sm">
      <h3 className="mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
