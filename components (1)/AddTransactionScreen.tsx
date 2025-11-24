import { ArrowLeft, Plus, Minus, Calendar } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface AddTransactionScreenProps {
  goalTitle: string;
  onBack: () => void;
  onSave: (transaction: any) => void;
}

export function AddTransactionScreen({ goalTitle, onBack, onSave }: AddTransactionScreenProps) {
  const [transactionType, setTransactionType] = useState<"add" | "withdraw">("add");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      alert("Дүн оруулна уу");
      return;
    }

    onSave({
      type: transactionType,
      amount: parseFloat(amount),
      date,
      description: description || (transactionType === "add" ? "Гар аар нэмсэн" : "Татан авсан"),
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-primary/90 px-6 pt-12 pb-6">
        <div className="flex items-center mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        <h1 className="text-white mb-2">Гүйлгээ нэмэх</h1>
        <p className="text-white/70 text-sm">{goalTitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pt-6">
        {/* Transaction Type */}
        <div className="mb-6">
          <Label className="text-sm text-muted-foreground mb-3 block">Гүйлгээний төрөл</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTransactionType("add")}
              className={`p-4 rounded-2xl border-2 transition-all ${
                transactionType === "add"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-white"
              }`}
            >
              <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                transactionType === "add" ? "bg-green-500" : "bg-secondary"
              }`}>
                <Plus className={`w-6 h-6 ${transactionType === "add" ? "text-white" : "text-muted-foreground"}`} />
              </div>
              <p className="text-sm">Нэмэх</p>
            </button>

            <button
              type="button"
              onClick={() => setTransactionType("withdraw")}
              className={`p-4 rounded-2xl border-2 transition-all ${
                transactionType === "withdraw"
                  ? "border-red-500 bg-red-50"
                  : "border-border bg-white"
              }`}
            >
              <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                transactionType === "withdraw" ? "bg-red-500" : "bg-secondary"
              }`}>
                <Minus className={`w-6 h-6 ${transactionType === "withdraw" ? "text-white" : "text-muted-foreground"}`} />
              </div>
              <p className="text-sm">Татах</p>
            </button>
          </div>
        </div>

        {/* Amount */}
        <Card className="p-4 rounded-2xl mb-4">
          <Label htmlFor="amount" className="text-sm text-muted-foreground mb-2 block">
            Дүн (₮)
          </Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="border-0 bg-secondary/50 text-2xl h-14 focus-visible:ring-primary"
          />
        </Card>

        {/* Date */}
        <Card className="p-4 rounded-2xl mb-4">
          <Label htmlFor="date" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Огноо
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-0 bg-secondary/50 focus-visible:ring-primary"
          />
        </Card>

        {/* Description */}
        <Card className="p-4 rounded-2xl mb-6">
          <Label htmlFor="description" className="text-sm text-muted-foreground mb-2 block">
            Тайлбар (заавал биш)
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Тайлбар оруулах..."
            className="border-0 bg-secondary/50 focus-visible:ring-primary min-h-[100px]"
          />
        </Card>

        {/* Preview */}
        {amount && (
          <Card className="p-4 rounded-2xl mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <p className="text-sm text-muted-foreground mb-2">Урьдчилан харах</p>
            <div className="flex items-center justify-between">
              <p className="text-sm">
                {transactionType === "add" ? "Нэмэх дүн:" : "Татах дүн:"}
              </p>
              <p className={`text-xl ${transactionType === "add" ? "text-green-600" : "text-red-600"}`}>
                {transactionType === "add" ? "+" : "-"}{parseFloat(amount).toLocaleString()}₮
              </p>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 py-6 rounded-2xl"
          >
            Болих
          </Button>
          <Button
            type="submit"
            className={`flex-1 py-6 rounded-2xl text-white ${
              transactionType === "add"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {transactionType === "add" ? "Нэмэх" : "Татах"}
          </Button>
        </div>
      </form>
    </div>
  );
}
