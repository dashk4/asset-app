import { ArrowLeft, Target, Calendar, DollarSign, Repeat } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";

interface EditGoalScreenProps {
  goal: any;
  onBack: () => void;
  onSave: (updatedGoal: any) => void;
}

export function EditGoalScreen({ goal, onBack, onSave }: EditGoalScreenProps) {
  const [formData, setFormData] = useState({
    title: goal.title,
    targetAmount: goal.target.toString(),
    dailyAmount: goal.dailyAmount.toString(),
    frequency: goal.frequency === "Өдөр бүр" ? "daily" : goal.frequency === "7 хоног бүр" ? "weekly" : "monthly",
    endDate: goal.endDate,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.targetAmount || !formData.dailyAmount) {
      alert("Бүх талбарыг бөглөнө үү");
      return;
    }

    onSave({
      ...goal,
      title: formData.title,
      target: parseFloat(formData.targetAmount),
      dailyAmount: parseFloat(formData.dailyAmount),
      frequency: formData.frequency === "daily" ? "Өдөр бүр" : formData.frequency === "weekly" ? "7 хоног бүр" : "Сар бүр",
      endDate: formData.endDate,
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
        <h1 className="text-white mb-2">Зорилго засах</h1>
        <p className="text-white/70 text-sm">Зорилгынхоо мэдээллийг шинэчлэх</p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pt-6">
        {/* Goal Title */}
        <Card className="p-4 rounded-2xl mb-4">
          <Label htmlFor="title" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Зорилгын нэр
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Жишээ: Хүүхдийн боловсрол"
            className="border-0 bg-secondary/50 focus-visible:ring-primary"
          />
        </Card>

        {/* Target Amount */}
        <Card className="p-4 rounded-2xl mb-4">
          <Label htmlFor="targetAmount" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Зорилтот дүн (₮)
          </Label>
          <Input
            id="targetAmount"
            type="number"
            value={formData.targetAmount}
            onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
            placeholder="0"
            className="border-0 bg-secondary/50 focus-visible:ring-primary"
          />
        </Card>

        {/* Daily Amount */}
        <Card className="p-4 rounded-2xl mb-4">
          <Label htmlFor="dailyAmount" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <Repeat className="w-4 h-4" />
            Хуримтлуулах дүн (₮)
          </Label>
          <Input
            id="dailyAmount"
            type="number"
            value={formData.dailyAmount}
            onChange={(e) => setFormData({ ...formData, dailyAmount: e.target.value })}
            placeholder="0"
            className="border-0 bg-secondary/50 focus-visible:ring-primary"
          />
        </Card>

        {/* Frequency */}
        <Card className="p-4 rounded-2xl mb-4">
          <Label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <Repeat className="w-4 h-4" />
            Хуримтлалын давтамж
          </Label>
          <Select value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })}>
            <SelectTrigger className="border-0 bg-secondary/50 focus:ring-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Өдөр бүр</SelectItem>
              <SelectItem value="weekly">7 хоног бүр</SelectItem>
              <SelectItem value="monthly">Сар бүр</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* End Date */}
        <Card className="p-4 rounded-2xl mb-6">
          <Label htmlFor="endDate" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Дуусах огноо
          </Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="border-0 bg-secondary/50 focus-visible:ring-primary"
          />
        </Card>

        {/* Preview */}
        <Card className="p-4 rounded-2xl mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <p className="text-sm text-muted-foreground mb-3">Урьдчилан харах</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Зорилго:</span>
              <span>{formData.title || "—"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Зорилтот дүн:</span>
              <span>{formData.targetAmount ? `${parseFloat(formData.targetAmount).toLocaleString()}₮` : "—"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Хуримтлуулах дүн:</span>
              <span>{formData.dailyAmount ? `${parseFloat(formData.dailyAmount).toLocaleString()}₮` : "—"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Давтамж:</span>
              <span>
                {formData.frequency === "daily" ? "Өдөр бүр" : formData.frequency === "weekly" ? "7 хоног бүр" : "Сар бүр"}
              </span>
            </div>
          </div>
        </Card>

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
            className="flex-1 bg-primary text-white py-6 rounded-2xl hover:bg-primary/90"
          >
            Хадгалах
          </Button>
        </div>
      </form>
    </div>
  );
}
