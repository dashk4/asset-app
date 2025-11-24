import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CheckCircle2, Delete, ArrowLeft } from "lucide-react";

interface PinSetupScreenProps {
  onComplete: (pin: string) => void;
  onBack?: () => void;
  mode?: "setup" | "confirm" | "login";
  title?: string;
  subtitle?: string;
}

export function PinSetupScreen({ 
  onComplete,
  onBack,
  mode = "setup",
  title,
  subtitle 
}: PinSetupScreenProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const maxLength = 4;

  useEffect(() => {
    if (pin.length === maxLength && !error) {
      setTimeout(() => {
        setSuccess(true);
        setTimeout(() => {
          onComplete(pin);
        }, 500);
      }, 200);
    }
  }, [pin, onComplete, error]);

  const handleNumberClick = (num: string) => {
    if (pin.length < maxLength) {
      setPin(pin + num);
      setError("");
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError("");
  };

  const getTitle = () => {
    if (title) return title;
    if (mode === "setup") return "ПИН код үүсгэх";
    if (mode === "confirm") return "ПИН кодоо баталгаажуулах";
    return "ПИН кодоо оруулна уу";
  };

  const getSubtitle = () => {
    if (subtitle) return subtitle;
    if (mode === "setup") return "4 оронтой ПИН код үүсгэнэ үү";
    if (mode === "confirm") return "Дээрх ПИН кодоо дахин оруулна уу";
    return "Таны данс руу нэвтрэхийн тулд ПИН кодоо оруулна уу";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 flex flex-col items-center justify-center p-6">
      {/* Back Button */}
      {onBack && (
        <div className="absolute top-6 left-6">
          <button onClick={onBack} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
      )}

      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 100 100" className="w-12 h-12">
              <circle cx="50" cy="50" r="20" fill="white" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <h2 className="text-white mb-2">{getTitle()}</h2>
          <p className="text-white/80 text-sm">{getSubtitle()}</p>
        </div>

        {/* PIN Display */}
        <div className="flex justify-center gap-4 mb-8">
          {Array.from({ length: maxLength }).map((_, index) => (
            <div
              key={index}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                index < pin.length
                  ? success
                    ? "bg-green-500 scale-110"
                    : "bg-white scale-110"
                  : "bg-white/20 backdrop-blur-sm"
              } ${error && index < pin.length ? "bg-red-500" : ""}`}
            >
              {index < pin.length && (
                <div
                  className={`w-4 h-4 rounded-full ${
                    success ? "bg-white" : error ? "bg-white" : "bg-primary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-200 text-center text-sm mb-4">{error}</p>
        )}

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              disabled={success}
              className="h-16 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-2xl transition-all active:scale-95 disabled:opacity-50"
            >
              {num}
            </button>
          ))}
          <div /> {/* Empty space */}
          <button
            onClick={() => handleNumberClick("0")}
            disabled={success}
            className="h-16 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-2xl transition-all active:scale-95 disabled:opacity-50"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            disabled={success || pin.length === 0}
            className="h-16 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-2xl transition-all active:scale-95 flex items-center justify-center disabled:opacity-50"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>

        {/* Biometric Option */}
        {mode === "login" && (
          <Button
            variant="ghost"
            className="w-full text-white hover:bg-white/10 py-6 rounded-2xl"
          >
            👤 Биометрик нэвтрэх
          </Button>
        )}
      </div>
    </div>
  );
}