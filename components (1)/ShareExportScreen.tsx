import { ArrowLeft, Share2, Download, Mail, MessageCircle, Copy, Check } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";

interface ShareExportScreenProps {
  goalData?: any;
  onBack: () => void;
}

export function ShareExportScreen({ goalData, onBack }: ShareExportScreenProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    totalSavings: "815,000₮",
    activeGoals: 3,
    monthlyGrowth: "+250k₮",
    growthPercentage: "+44%",
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://mandal-app.mn/share/abc123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    // Mock PDF export
    alert("PDF татагдаж байна...");
  };

  const handleShareEmail = () => {
    window.location.href = `mailto:?subject=Миний хуримтлалын статистик&body=Сайн байна уу! Би ${shareData.totalSavings} хуримтлуулсан байна.`;
  };

  const handleShareSocial = (platform: string) => {
    alert(`${platform} дээр хуваалцаж байна...`);
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
        <h1 className="text-white mb-2">Хуваалцах & Татах</h1>
        <p className="text-white/70 text-sm">Амжилтаа хуваалцаарай</p>
      </div>

      {/* Preview Card */}
      <div className="px-6 pt-6 mb-6">
        <Card className="p-6 rounded-3xl bg-gradient-to-br from-primary to-primary/90 text-white">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <p className="text-2xl">🎯</p>
            </div>
            <h2 className="mb-2">Миний хуримтлалын амжилт</h2>
            <p className="text-white/80 text-sm">Мандал Хуримтлал апп</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-white/70 text-xs mb-1">Нийт хуримтлал</p>
              <p className="text-xl">{shareData.totalSavings}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-white/70 text-xs mb-1">Идэвхтэй зорилго</p>
              <p className="text-xl">{shareData.activeGoals}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-white/70 text-xs mb-1">Энэ сар</p>
              <p className="text-xl">{shareData.monthlyGrowth}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-white/70 text-xs mb-1">Өсөлт</p>
              <p className="text-xl text-green-300">{shareData.growthPercentage}</p>
            </div>
          </div>

          <p className="text-center text-white/60 text-xs">
            2024 оны 11-р сарын 24
          </p>
        </Card>
      </div>

      {/* Share Options */}
      <div className="px-6 mb-6">
        <h3 className="mb-4">Хуваалцах</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="h-auto py-4 rounded-2xl flex flex-col items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-6 h-6 text-green-600" />
                <span className="text-xs">Хуулсан</span>
              </>
            ) : (
              <>
                <Copy className="w-6 h-6" />
                <span className="text-xs">Линк хуулах</span>
              </>
            )}
          </Button>

          <Button
            onClick={handleShareEmail}
            variant="outline"
            className="h-auto py-4 rounded-2xl flex flex-col items-center gap-2"
          >
            <Mail className="w-6 h-6" />
            <span className="text-xs">И-мэйл</span>
          </Button>

          <Button
            onClick={() => handleShareSocial("Facebook")}
            variant="outline"
            className="h-auto py-4 rounded-2xl flex flex-col items-center gap-2"
          >
            <Share2 className="w-6 h-6" />
            <span className="text-xs">Facebook</span>
          </Button>

          <Button
            onClick={() => handleShareSocial("Messenger")}
            variant="outline"
            className="h-auto py-4 rounded-2xl flex flex-col items-center gap-2"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">Messenger</span>
          </Button>
        </div>
      </div>

      {/* Export Options */}
      <div className="px-6">
        <h3 className="mb-4">Татаж авах</h3>
        <div className="space-y-3">
          <Button
            onClick={handleExportPDF}
            className="w-full bg-primary text-white py-6 rounded-2xl hover:bg-primary/90 flex items-center justify-center gap-3"
          >
            <Download className="w-5 h-5" />
            PDF татах
          </Button>

          <Button
            onClick={() => alert("Excel файл татагдаж байна...")}
            variant="outline"
            className="w-full py-6 rounded-2xl flex items-center justify-center gap-3"
          >
            <Download className="w-5 h-5" />
            Excel татах
          </Button>

          <Button
            onClick={() => alert("Зураг татагдаж байна...")}
            variant="outline"
            className="w-full py-6 rounded-2xl flex items-center justify-center gap-3"
          >
            <Download className="w-5 h-5" />
            Зураг татах
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="px-6 mt-6">
        <Card className="p-4 rounded-2xl bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-900">
            💡 Хуваалцсан мэдээлэлд таны хувийн мэдээлэл орохгүй.
          </p>
        </Card>
      </div>
    </div>
  );
}
