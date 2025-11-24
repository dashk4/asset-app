import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Camera, Upload, CheckCircle2, User, Phone, Mail, MapPin, ArrowLeft } from "lucide-react";

interface KYCScreenProps {
  onComplete: () => void;
  onSkip: () => void;
  onBack?: () => void;
}

export function KYCScreen({ onComplete, onSkip, onBack }: KYCScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    registerNumber: "",
    address: "",
  });

  const steps = [
    { number: 1, title: "Танилцуулга", completed: step > 1 },
    { number: 2, title: "Хувийн мэдээлэл", completed: step > 2 },
    { number: 3, title: "Баримт бичиг", completed: step > 3 },
    { number: 4, title: "Дуусгах", completed: step > 4 },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-primary" />
              </div>
              <h2 className="mb-2">Тавтай морилно уу!</h2>
              <p className="text-muted-foreground">
                Та өөрийн хувийн мэдээллээ баталгаажуулснаар илүү олон үйлчилгээг ашиглах боломжтой болно.
              </p>
            </div>

            <Card className="p-6 rounded-2xl bg-secondary/30">
              <h3 className="mb-4">Яагаад KYC шаардлагатай вэ?</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm">Аюулгүй байдал</p>
                    <p className="text-xs text-muted-foreground">Таны данс болон мөнгийг хамгаална</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm">Илүү их лимит</p>
                    <p className="text-xs text-muted-foreground">Гүйлгээний лимитийг нэмэгдүүлнэ</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm">Хууль эрх зүй</p>
                    <p className="text-xs text-muted-foreground">Санхүүгийн зохицуулалтын шаардлага</p>
                  </div>
                </div>
              </div>
            </Card>

            <Button
              onClick={() => setStep(2)}
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
              <h2 className="mb-2">Хувийн мэдээлэл</h2>
              <p className="text-sm text-muted-foreground">
                Таны хувийн мэдээллийг оруулна уу
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Овог</label>
                <Input
                  placeholder="Болд"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Нэр</label>
                <Input
                  placeholder="Алтанзул"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Утасны дугаар
                </label>
                <Input
                  type="tel"
                  placeholder="9999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  И-мэйл
                </label>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Регистрийн дугаар</label>
                <Input
                  placeholder="АА12345678"
                  value={formData.registerNumber}
                  onChange={(e) => setFormData({ ...formData, registerNumber: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Хаяг
                </label>
                <Input
                  placeholder="Улаанбаатар хот"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <Button
              onClick={() => setStep(3)}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl"
            >
              Үргэлжлүүлэх
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="mb-2">Баримт бичиг</h2>
              <p className="text-sm text-muted-foreground">
                Иргэний үнэмлэхний зургийг оруулна уу
              </p>
            </div>

            <Card className="p-8 rounded-2xl border-2 border-dashed border-border text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-primary" />
              </div>
              <h3 className="mb-2">Урд тал</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Иргэний үнэмлэхний урд талын зураг
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl">
                  <Camera className="w-4 h-4 mr-2" />
                  Зураг авах
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl">
                  <Upload className="w-4 h-4 mr-2" />
                  Оруулах
                </Button>
              </div>
            </Card>

            <Card className="p-8 rounded-2xl border-2 border-dashed border-border text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-primary" />
              </div>
              <h3 className="mb-2">Ар тал</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Иргэний үнэмлэхний ар талын зураг
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl">
                  <Camera className="w-4 h-4 mr-2" />
                  Зураг авах
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl">
                  <Upload className="w-4 h-4 mr-2" />
                  Оруулах
                </Button>
              </div>
            </Card>

            <Button
              onClick={() => setStep(4)}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl"
            >
              Үргэлжлүүлэх
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>

            <h2 className="mb-2">Баталгаажуулалт илгээгдлээ!</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Таны мэдээллийг хянаж байна. Энэ нь 1-2 хоног орчим үргэлжилнэ. Баталгаажсаны дараа мэдэгдэл ирнэ.
            </p>

            <Card className="p-6 rounded-2xl bg-secondary/30">
              <h3 className="mb-4">Таны оруулсан мэдээлэл</h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Нэр:</span>
                  <span>{formData.lastName} {formData.firstName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Утас:</span>
                  <span>{formData.phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">И-мэйл:</span>
                  <span>{formData.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Регистр:</span>
                  <span>{formData.registerNumber}</span>
                </div>
              </div>
            </Card>

            <Button
              onClick={onComplete}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl"
            >
              Дуусгах
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-secondary/30 px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    step >= s.number
                      ? "bg-primary text-white"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {s.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span>{s.number}</span>
                  )}
                </div>
                <span className="text-xs mt-1 text-center">{s.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 transition-colors ${
                    step > s.number ? "bg-primary" : "bg-secondary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {renderStep()}
        
        {step === 1 && (
          <Button
            onClick={onSkip}
            variant="ghost"
            className="w-full mt-4 py-6 rounded-2xl"
          >
            Дараа болъё
          </Button>
        )}
        
        {step > 1 && (
          <Button
            onClick={() => setStep(step - 1)}
            variant="ghost"
            className="w-full mt-4 py-6 rounded-2xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Буцах
          </Button>
        )}
      </div>
    </div>
  );
}