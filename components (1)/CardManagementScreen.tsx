import { ArrowLeft, Plus, CreditCard, MoreVertical, Eye, EyeOff } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface CardManagementScreenProps {
  onBack: () => void;
  onAddCard: () => void;
}

export function CardManagementScreen({ onBack, onAddCard }: CardManagementScreenProps) {
  const [cards, setCards] = useState([
    {
      id: 1,
      bankName: "Хаан Банк",
      cardNumber: "**** **** **** 4532",
      cardType: "Visa",
      holderName: "BOLD ALTANZUL",
      expiryDate: "12/25",
      isActive: true,
      isPrimary: true,
      color: "from-blue-600 to-blue-400",
    },
    {
      id: 2,
      bankName: "Голомт Банк",
      cardNumber: "**** **** **** 8821",
      cardType: "Mastercard",
      holderName: "BOLD ALTANZUL",
      expiryDate: "08/26",
      isActive: true,
      isPrimary: false,
      color: "from-purple-600 to-purple-400",
    },
    {
      id: 3,
      bankName: "Төрийн Банк",
      cardNumber: "**** **** **** 1234",
      cardType: "Visa",
      holderName: "BOLD ALTANZUL",
      expiryDate: "03/24",
      isActive: false,
      isPrimary: false,
      color: "from-gray-600 to-gray-400",
    },
  ]);

  const [showCardNumbers, setShowCardNumbers] = useState<{ [key: number]: boolean }>({});

  const toggleCardVisibility = (cardId: number) => {
    setShowCardNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const toggleCardStatus = (cardId: number) => {
    setCards(prev =>
      prev.map(card =>
        card.id === cardId ? { ...card, isActive: !card.isActive } : card
      )
    );
  };

  const setPrimaryCard = (cardId: number) => {
    setCards(prev =>
      prev.map(card => ({
        ...card,
        isPrimary: card.id === cardId,
      }))
    );
  };

  const deleteCard = (cardId: number) => {
    if (confirm("Энэ картыг устгахдаа итгэлтэй байна уу?")) {
      setCards(prev => prev.filter(card => card.id !== cardId));
    }
  };

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
            onClick={onAddCard}
            size="sm"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Plus className="w-4 h-4 mr-1" />
            Карт нэмэх
          </Button>
        </div>
        <h1 className="text-white mb-2">Банкны картууд</h1>
        <p className="text-white/70 text-sm">{cards.filter(c => c.isActive).length} идэвхтэй карт</p>
      </div>

      {/* Cards List */}
      <div className="px-6 pt-4 space-y-4">
        {cards.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            {/* Card Visual */}
            <div className={`bg-gradient-to-br ${card.color} p-6 text-white relative`}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm opacity-90 mb-1">{card.bankName}</p>
                  {card.isPrimary && (
                    <Badge className="bg-white/20 text-white text-xs">Үндсэн</Badge>
                  )}
                </div>
                <button
                  onClick={() => toggleCardVisibility(card.id)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {showCardNumbers[card.id] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <p className="text-xl tracking-wider mb-4">
                {showCardNumbers[card.id] ? "4532 8821 1234 5678" : card.cardNumber}
              </p>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-70 mb-1">Картын эзэн</p>
                  <p className="text-sm">{card.holderName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-70 mb-1">Дуусах хугацаа</p>
                  <p className="text-sm">{card.expiryDate}</p>
                </div>
              </div>
              
              <div className="absolute top-6 right-6">
                <p className="text-lg">{card.cardType}</p>
              </div>
            </div>

            {/* Card Controls */}
            <div className="p-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={card.isActive}
                    onCheckedChange={() => toggleCardStatus(card.id)}
                  />
                  <span className="text-sm">
                    {card.isActive ? "Идэвхтэй" : "Идэвхгүй"}
                  </span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setPrimaryCard(card.id)}>
                      Үндсэн болгох
                    </DropdownMenuItem>
                    <DropdownMenuItem>Дэлгэрэнгүй харах</DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => deleteCard(card.id)}
                    >
                      Устгах
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Card Prompt */}
      <div className="px-6 mt-6">
        <Card className="p-6 rounded-2xl border-dashed border-2 bg-secondary/50">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-primary" />
            </div>
            <h3 className="mb-2">Шинэ карт нэмэх</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Автомат хуримтлалын төлөө банкны карт холбоно уу
            </p>
            <Button onClick={onAddCard} className="bg-primary text-white">
              <Plus className="w-4 h-4 mr-2" />
              Карт нэмэх
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
