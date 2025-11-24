import { ArrowLeft, Camera, User, Mail, Phone, Calendar, MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

interface ProfileEditScreenProps {
  onBack: () => void;
  onSave: (profile: any) => void;
}

export function ProfileEditScreen({ onBack, onSave }: ProfileEditScreenProps) {
  const [profile, setProfile] = useState({
    firstName: "Алтанзул",
    lastName: "Болд",
    email: "bold.altanzul@gmail.com",
    phone: "99001122",
    birthDate: "1995-05-15",
    address: "Улаанбаатар, Сүхбаатар дүүрэг",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
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
        </div>
        <h1 className="text-white mb-2">Профайл засах</h1>
        <p className="text-white/70 text-sm">Өөрийн мэдээллээ шинэчлэх</p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pt-6">
        {/* Profile Photo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl">
              БА
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-secondary/50 transition-colors"
            >
              <Camera className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <Card className="p-4 rounded-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastName" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Овог
                </Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="border-0 bg-secondary/50 focus-visible:ring-primary"
                />
              </div>
              <div>
                <Label htmlFor="firstName" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  Нэр
                </Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="border-0 bg-secondary/50 focus-visible:ring-primary"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl">
            <Label htmlFor="email" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              И-мэйл
            </Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="border-0 bg-secondary/50 focus-visible:ring-primary"
            />
          </Card>

          <Card className="p-4 rounded-2xl">
            <Label htmlFor="phone" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Утасны дугаар
            </Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="border-0 bg-secondary/50 focus-visible:ring-primary"
            />
          </Card>

          <Card className="p-4 rounded-2xl">
            <Label htmlFor="birthDate" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Төрсөн өдөр
            </Label>
            <Input
              id="birthDate"
              type="date"
              value={profile.birthDate}
              onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
              className="border-0 bg-secondary/50 focus-visible:ring-primary"
            />
          </Card>

          <Card className="p-4 rounded-2xl">
            <Label htmlFor="address" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Хаяг
            </Label>
            <Input
              id="address"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="border-0 bg-secondary/50 focus-visible:ring-primary"
            />
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
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
