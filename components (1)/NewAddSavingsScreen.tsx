import { useState } from "react";
import { ArrowLeft, X, GraduationCap, Home, Car, Plane, Gift, Heart, TrendingUp, CreditCard, CheckCircle2, Calendar, Coins } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { GoalTemplateCard } from "./GoalTemplateCard";
import { Slider } from "./ui/slider";

interface NewAddSavingsScreenProps {
  onClose: () => void;
  onComplete: (data: any) => void;
}

export function NewAddSavingsScreen({ onClose, onComplete }: NewAddSavingsScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    template: "",
    customName: "",
    targetAmount: 10000000,
    currentAmount: 0,
    dailyAmount: 10000,
    frequency: "daily",
    duration: 25,
    autoDeposit: false,
    bankCard: "",
  });

  const goalTemplates = [
    {
      id: "education",
      icon: GraduationCap,
      title: "Хүүхдийн боловсрол",
      description: "Хүүхдийн ирээдүйд зориулсан хуримтлал",
      color: "bg-blue-500",
      suggestedAmount: 10000000,
    },
    {
      id: "house",
      icon: Home,
      title: "Орон сууц",
      description: "Өөрийн орон сууц худалдан авах",
      color: "bg-green-500",
      suggestedAmount: 50000000,
    },
    {
      id: "car",
      icon: Car,
      title: "Автомашин",
      description: "Машин худалдан авах зорилго",
      color: "bg-red-500",
      suggestedAmount: 30000000,
    },
    {
      id: "vacation",
      icon: Plane,
      title: "Аялал",
      description: "Гадаад аялал хийх зорилго",
      color: "bg-purple-500",
      suggestedAmount: 5000000,
    },
    {
      id: "wedding",
      icon: Gift,
      title: "Хурим",
      description: "Хуримын баярын зардал",
      color: "bg-pink-500",
      suggestedAmount: 15000000,
    },
    {
      id: "emergency",
      icon: Heart,
      title: "Эмэргэнсийн сан",
      description: "Яаралтай үеийн хуримтлал",
      color: "bg-orange-500",
      suggestedAmount: 3000000,
    },
    {
      id: "investment",
      icon: TrendingUp,
      title: "Хөрөнгө оруулалт",
      description: "Хөрөнгө оруулалтын сан",
      color: "bg-indigo-500",
      suggestedAmount: 20000000,
    },
    {
      id: "custom",
      icon: Coins,
      title: "Бусад",
      description: "Өөрийн зорилго үүсгэх",
      color: "bg-gray-500",
      suggestedAmount: 5000000,
    },
  ];

  const frequencies = [
    { id: "daily", label: "Өдөр бүр", multiplier: 1 },
    { id: "weekly", label: "7 хоног бүр", multiplier: 7 },
    { id: "monthly", label: "Сар бүр", multiplier: 30 },
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = goalTemplates.find((t) => t.id === templateId);
    setFormData({
      ...formData,
      template: templateId,
      targetAmount: template?.suggestedAmount || 5000000,
    });
  };

  const calculateDuration = () => {
    const frequencyData = frequencies.find((f) => f.id === formData.frequency);
    const daysPerDeposit = frequencyData?.multiplier || 1;
    const totalDeposits = formData.targetAmount / formData.dailyAmount;
    const totalDays = totalDeposits * daysPerDeposit;
    return Math.ceil(totalDays / 365);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="mb-2">Зорилго сонгох</h2>
              <p className="text-sm text-muted-foreground">
                Та ямар зорилгоор хуримтлал үүсгэх вэ?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {goalTemplates.map((template) => (
                <GoalTemplateCard
                  key={template.id}
                  icon={template.icon}
                  title={template.title}
                  description={template.description}
                  color={template.color}
                  isSelected={formData.template === template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                />
              ))}
            </div>

            {formData.template === "custom" && (
              <div className="mt-4">
                <label className="block text-sm mb-2">Зорилгын нэр</label>
                <Input
                  placeholder="Жишээ: Гэр бүл зугаалах"
                  value={formData.customName}
                  onChange={(e) =>
                    setFormData({ ...formData, customName: e.target.value })
                  }
                  className="rounded-xl"
                />
              </div>
            )}

            <Button
              onClick={() => setStep(2)}
              disabled={!formData.template}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl"
            >
              Үргэлжлүүлэх
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="mb-2">Зорилгын дүн</h2>
              <p className="text-sm text-muted-foreground">
                Та хэдэн төгрөг хуримтлуулахыг зорьж байна?
              </p>
            </div>

            <Card className="p-6 rounded-2xl bg-primary/5 border-primary/20">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-2">Зорилгын дүн</p>
                <h1 className="text-primary mb-1">
                  {formData.targetAmount.toLocaleString()}₮
                </h1>
                <p className="text-xs text-muted-foreground">
                  {(formData.targetAmount / 1000000).toFixed(1)} сая төгрөг
                </p>
              </div>

              <Slider
                value={[formData.targetAmount]}
                onValueChange={(value) =>
                  setFormData({ ...formData, targetAmount: value[0] })
                }
                min={100000}
                max={100000000}
                step={100000}
                className="mb-6"
              />

              <div className="grid grid-cols-3 gap-2">
                {[1000000, 5000000, 10000000].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFormData({ ...formData, targetAmount: amount })
                    }
                    className="rounded-xl"
                  >
                    {amount / 1000000}M
                  </Button>
                ))}
              </div>
            </Card>

            <div>
              <label className="block text-sm mb-2">Одоогийн хуримтлал (сонголт)</label>
              <Input
                type="number"
                placeholder="0"
                value={formData.currentAmount || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentAmount: parseInt(e.target.value) || 0,
                  })
                }
                className="rounded-xl"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 py-6 rounded-2xl"
              >
                Буцах
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl"
              >
                Үргэлжлүүлэх
              </Button>
            </div>
          </div>
        );

      case 3:
        const duration = calculateDuration();
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="mb-2">Хуримтлалын төлөвлөгөө</h2>
              <p className="text-sm text-muted-foreground">
                Хэр давтамжтайгаар хэдэн төгрөг хуримтлуулах вэ?
              </p>
            </div>

            <div>
              <label className="block text-sm mb-2">Хуримтлуулах дүн</label>
              <div className="relative">
                <Input
                  type="number"
                  value={formData.dailyAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dailyAmount: parseInt(e.target.value) || 0,
                    })
                  }
                  className="rounded-xl pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₮
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-3">Давтамж</label>
              <div className="grid grid-cols-3 gap-3">
                {frequencies.map((freq) => (
                  <button
                    key={freq.id}
                    onClick={() =>
                      setFormData({ ...formData, frequency: freq.id })
                    }
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.frequency === freq.id
                        ? "bg-primary text-white border-primary"
                        : "bg-white border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="text-sm">{freq.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <Card className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Таамаглаж буй хугацаа</p>
                  <h3 className="text-primary">{duration} жил</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/20">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Нийт төлөлт</p>
                  <p className="text-sm">
                    {Math.ceil(formData.targetAmount / formData.dailyAmount)} удаа
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Сарын дундаж</p>
                  <p className="text-sm">
                    {(
                      (formData.dailyAmount *
                        30) /
                      (frequencies.find((f) => f.id === formData.frequency)
                        ?.multiplier || 1)
                    ).toLocaleString()}₮
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1 py-6 rounded-2xl"
              >
                Буцах
              </Button>
              <Button
                onClick={() => setStep(4)}
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl"
              >
                Үргэлжлүүлэх
              </Button>
            </div>
          </div>
        );

      case 4:
        const selectedTemplate = goalTemplates.find(
          (t) => t.id === formData.template
        );
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="mb-2">Баталгаажуулалт</h2>
              <p className="text-sm text-muted-foreground">
                Таны хуримтлалын мэдээллийг шалгана уу
              </p>
            </div>

            <Card className="p-6 rounded-2xl bg-gradient-to-br from-primary to-primary/90 text-white">
              <div className="flex items-center gap-4 mb-6">
                {selectedTemplate && (
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <selectedTemplate.icon className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-white mb-1">
                    {formData.template === "custom"
                      ? formData.customName
                      : selectedTemplate?.title}
                  </h3>
                  <p className="text-white/80 text-sm">Хуримтлалын зорилго</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span className="text-white/80">Зорилгын дүн</span>
                  <span className="text-white">
                    {formData.targetAmount.toLocaleString()}₮
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span className="text-white/80">Одоогийн дүн</span>
                  <span className="text-white">
                    {formData.currentAmount.toLocaleString()}₮
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span className="text-white/80">Хуримтлуулах дүн</span>
                  <span className="text-white">
                    {formData.dailyAmount.toLocaleString()}₮
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span className="text-white/80">Давтамж</span>
                  <span className="text-white">
                    {frequencies.find((f) => f.id === formData.frequency)?.label}
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-white/80">Хугацаа</span>
                  <span className="text-white">{calculateDuration()} жил</span>
                </div>
              </div>
            </Card>

            <Card className="p-5 rounded-2xl border-2 border-dashed border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm mb-1">Банкны карт холбох</h3>
                  <p className="text-xs text-muted-foreground">
                    Автомат төлөлт хийх (Дараа нэмэх боломжтой)
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(3)}
                variant="outline"
                className="flex-1 py-6 rounded-2xl"
              >
                Буцах
              </Button>
              <Button
                onClick={() => {
                  onComplete(formData);
                  onClose();
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl"
              >
                Хуримтлал эхлүүлэх
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
        <button onClick={onClose} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2>Хуримтлал үүсгэх</h2>
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Steps */}
      <div className="px-6 py-6 bg-secondary/30">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((s, index) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step >= s
                      ? "bg-primary text-white scale-110"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step > s ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span>{s}</span>
                  )}
                </div>
              </div>
              {index < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-all rounded-full ${
                    step > s ? "bg-primary" : "bg-secondary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">Зорилго</span>
          <span className="text-xs text-muted-foreground">Дүн</span>
          <span className="text-xs text-muted-foreground">Төлөвлөгөө</span>
          <span className="text-xs text-muted-foreground">Баталгаа</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 pb-32">{renderStep()}</div>
    </div>
  );
}
