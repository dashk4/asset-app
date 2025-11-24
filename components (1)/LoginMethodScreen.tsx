import { Button } from "./ui/button";
import { Hash, Grid3x3, Fingerprint, ArrowLeft } from "lucide-react";

interface LoginMethodScreenProps {
  onSelectMethod: (method: "pin" | "pattern" | "biometric") => void;
  onBack: () => void;
}

export function LoginMethodScreen({ onSelectMethod, onBack }: LoginMethodScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center mb-8 pt-4">
        <button onClick={onBack} className="text-white p-2 -ml-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 100 100" className="w-12 h-12">
              <circle cx="50" cy="50" r="20" fill="white" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          <h2 className="text-white text-center mb-2">Нэвтрэх арга сонгох</h2>
          <p className="text-white/80 text-center mb-12">
            Та дараах аргуудын аль нэгээр нэвтэрч болно
          </p>

          {/* Method Cards */}
          <div className="space-y-4">
            <button
              onClick={() => onSelectMethod("pin")}
              className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 p-6 rounded-2xl transition-all active:scale-95 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <Hash className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1">ПИН код</h3>
                  <p className="text-white/70 text-sm">4 оронтой тоон код ашиглах</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onSelectMethod("pattern")}
              className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 p-6 rounded-2xl transition-all active:scale-95 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <Grid3x3 className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1">Дан</h3>
                  <p className="text-white/70 text-sm">Цэг холбох дан ашиглах</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onSelectMethod("biometric")}
              className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 p-6 rounded-2xl transition-all active:scale-95 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <Fingerprint className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1">Биометрик</h3>
                  <p className="text-white/70 text-sm">Хуруугийн хээ / Нүүр таних</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
