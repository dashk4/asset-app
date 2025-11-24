import { ArrowLeft, CreditCard, Calendar, Lock, User } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";

interface AddCardScreenProps {
  onBack: () => void;
  onSave: (card: any) => void;
}

export function AddCardScreen({ onBack, onSave }: AddCardScreenProps) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    bank: "",
  });

  const banks = [
    "Хаан Банк",
    "Голомт Банк",
    "Төрийн Банк",
    "Худалдаа Хөгжлийн Банк",
    "Хас Банк",
    "Ариг Банк",
  ];

  const handleCardNumberChange = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Add space every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    setFormData({ ...formData, cardNumber: formatted.slice(0, 19) }); // Max 16 digits + 3 spaces
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cardNumber || !formData.cardHolder || !formData.expiryMonth || !formData.expiryYear || !formData.cvv || !formData.bank) {
      alert("Бүх талбарыг бөглөнө үү");
      return;
    }

    onSave({
      cardNumber: formData.cardNumber,
      cardHolder: formData.cardHolder.toUpperCase(),
      expiryDate: `${formData.expiryMonth}/${formData.expiryYear}`,
      bank: formData.bank,
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
        <h1 className="text-white mb-2">Карт нэмэх</h1>
        <p className="text-white/70 text-sm">Банкны картын мэдээлэл оруулах</p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pt-6">
        {/* Card Preview */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-sm opacity-90 mb-1">{formData.bank || "Банк сонгох"}</p>
              </div>
              <CreditCard className="w-10 h-10 opacity-50" />
            </div>
            
            <p className="text-xl tracking-wider mb-6">
              {formData.cardNumber || "**** **** **** ****"}
            </p>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-70 mb-1">Картын эзэн</p>
                <p className="text-sm">{formData.cardHolder.toUpperCase() || "CARD HOLDER"}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-70 mb-1">Дуусах хугацаа</p>
                <p className="text-sm">
                  {formData.expiryMonth && formData.expiryYear
                    ? `${formData.expiryMonth}/${formData.expiryYear}`
                    : "MM/YY"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Bank Selection */}
        <Card className="p-4 rounded-2xl mb-4">
          <Label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Банк сонгох
          </Label>
          <Select value={formData.bank} onValueChange={(value) => setFormData({ ...formData, bank: value })}>
            <SelectTrigger className="border-0 bg-secondary/50 focus:ring-primary">
              <SelectValue placeholder="Банкаа сонгох" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank} value={bank}>
                  {bank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Card Number */}
        <Card className="p-4 rounded-2xl mb-4">
          <Label htmlFor="cardNumber" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Картын дугаар
          </Label>
          <Input
            id="cardNumber"
            value={formData.cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="border-0 bg-secondary/50 focus-visible:ring-primary"
            maxLength={19}
          />
        </Card>

        {/* Card Holder */}
        <Card className="p-4 rounded-2xl mb-4">
          <Label htmlFor="cardHolder" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Картын эзэн
          </Label>
          <Input
            id="cardHolder"
            value={formData.cardHolder}
            onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
            placeholder="BOLD ALTANZUL"
            className="border-0 bg-secondary/50 focus-visible:ring-primary uppercase"
          />
        </Card>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 rounded-2xl col-span-2">
            <Label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Дуусах огноо
            </Label>
            <div className="flex gap-2">
              <Input
                value={formData.expiryMonth}
                onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
                placeholder="MM"
                className="border-0 bg-secondary/50 focus-visible:ring-primary"
                maxLength={2}
              />
              <Input
                value={formData.expiryYear}
                onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
                placeholder="YY"
                className="border-0 bg-secondary/50 focus-visible:ring-primary"
                maxLength={2}
              />
            </div>
          </Card>

          <Card className="p-4 rounded-2xl">
            <Label htmlFor="cvv" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              CVV
            </Label>
            <Input
              id="cvv"
              type="password"
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value.slice(0, 3) })}
              placeholder="***"
              className="border-0 bg-secondary/50 focus-visible:ring-primary"
              maxLength={3}
            />
          </Card>
        </div>

        {/* Security Notice */}
        <Card className="p-4 rounded-2xl mb-6 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-blue-900 mb-1">Таны мэдээлэл аюулгүй</p>
              <p className="text-blue-700 text-xs">
                Бид таны картын мэдээллийг шифрлэлттэй хадгалж, найдвартай хамгаална.
              </p>
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
            Карт нэмэх
          </Button>
        </div>
      </form>
    </div>
  );
}
