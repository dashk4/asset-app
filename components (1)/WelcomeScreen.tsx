import { Button } from "./ui/button";

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function WelcomeScreen({ onGetStarted, onLogin }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 flex flex-col items-center justify-between p-6 pt-20 pb-12">
      {/* Logo */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-40 h-40 mb-8">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="40" fill="white" stroke="white" strokeWidth="8" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="white" strokeWidth="4" />
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 22.5 * Math.PI) / 180;
              const x1 = 100 + 70 * Math.cos(angle);
              const y1 = 100 + 70 * Math.sin(angle);
              const x2 = 100 + 90 * Math.cos(angle);
              const y2 = 100 + 90 * Math.sin(angle);
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} Q ${100 + 85 * Math.cos(angle)} ${100 + 85 * Math.sin(angle)} ${x2} ${y2}`}
                  fill="none"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        </div>

        <h1 className="text-white text-center mb-4">Мандал Хуримтлал</h1>
        <p className="text-white/80 text-center max-w-sm">
          Хуримтлалын хүчийг мэдэр. Таны санхүүгийн зорилгод хүрэх аяллыг эхлүүлцгээе.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-2">
              <span className="text-3xl">💰</span>
            </div>
            <span className="text-white/80 text-sm">Хуримтлал</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-2">
              <span className="text-3xl">📊</span>
            </div>
            <span className="text-white/80 text-sm">Статистик</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-2">
              <span className="text-3xl">🎯</span>
            </div>
            <span className="text-white/80 text-sm">Зорилго</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full space-y-4">
        <Button
          onClick={onGetStarted}
          className="w-full bg-white text-primary hover:bg-white/90 py-6 rounded-2xl shadow-lg"
        >
          Эхлэх
        </Button>
        <Button
          onClick={onLogin}
          variant="ghost"
          className="w-full text-white hover:bg-white/10 py-6 rounded-2xl"
        >
          Нэвтрэх
        </Button>
      </div>
    </div>
  );
}
