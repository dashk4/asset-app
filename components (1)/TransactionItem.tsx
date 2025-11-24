import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface TransactionItemProps {
  type: "deposit" | "withdrawal";
  amount: number;
  date: string;
  description: string;
  balance: number;
}

export function TransactionItem({ type, amount, date, description, balance }: TransactionItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-secondary/50 rounded-xl transition-colors">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        type === "deposit" ? "bg-green-100" : "bg-red-100"
      }`}>
        {type === "deposit" ? (
          <ArrowDownRight className="w-6 h-6 text-green-600" />
        ) : (
          <ArrowUpRight className="w-6 h-6 text-red-600" />
        )}
      </div>
      
      <div className="flex-1">
        <p className="text-foreground">{description}</p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
      
      <div className="text-right">
        <p className={`${type === "deposit" ? "text-green-600" : "text-red-600"}`}>
          {type === "deposit" ? "+" : "-"}{amount.toLocaleString()}₮
        </p>
        <p className="text-sm text-muted-foreground">{balance.toLocaleString()}₮</p>
      </div>
    </div>
  );
}
