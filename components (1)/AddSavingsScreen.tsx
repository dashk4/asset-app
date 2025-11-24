import { ArrowLeft, X, CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface AddSavingsScreenProps {
  onClose: () => void;
}

export function AddSavingsScreen({ onClose }: AddSavingsScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <button onClick={onClose} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2>Хуримтлал нэзэх</h2>
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <div className="mb-6">
          <label className="block text-sm text-muted-foreground mb-2">
            Хуримтлалын нэр
          </label>
          <Input
            type="text"
            value="Хүүхэд"
            className="text-xl text-primary border-0 border-b rounded-none px-0 focus-visible:ring-0"
          />
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Сар бүр татаалт хийгдэх банкны картаа оруулна уу
        </p>

        {/* Bank Card Option */}
        <button className="w-full border-2 border-dashed border-border rounded-2xl p-6 flex items-center gap-4 hover:bg-secondary/50 transition-colors">
          <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-primary" />
          </div>
          <span className="text-foreground">+ Банкны карт холбох</span>
        </button>
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-8 bg-white">
        <Button className="w-full bg-secondary text-foreground hover:bg-secondary/80 py-6 rounded-full mb-4">
          Үргэлжлүүлэх
        </Button>
        <Button
          variant="ghost"
          onClick={onClose}
          className="w-full py-6 rounded-full"
        >
          Дараа болъё
        </Button>
      </div>
    </div>
  );
}
