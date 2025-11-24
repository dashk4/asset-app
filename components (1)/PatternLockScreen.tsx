import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface PatternLockScreenProps {
  onComplete: (pattern: number[]) => void;
  onBack?: () => void;
  mode?: "setup" | "confirm" | "login";
  title?: string;
  subtitle?: string;
}

export function PatternLockScreen({
  onComplete,
  onBack,
  mode = "setup",
  title,
  subtitle,
}: PatternLockScreenProps) {
  const [pattern, setPattern] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLDivElement>(null);

  const gridSize = 3;
  const dots = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  useEffect(() => {
    if (pattern.length >= 4 && !isDrawing) {
      setTimeout(() => {
        onComplete(pattern);
      }, 300);
    }
  }, [pattern, isDrawing, onComplete]);

  const handleTouchStart = (index: number) => {
    setIsDrawing(true);
    setError("");
    if (!pattern.includes(index)) {
      setPattern([index]);
    }
  };

  const handleTouchMove = (index: number) => {
    if (isDrawing && !pattern.includes(index)) {
      setPattern([...pattern, index]);
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
    if (pattern.length < 4) {
      setError("Хамгийн багадаа 4 цэг холбоно уу");
      setTimeout(() => {
        setPattern([]);
        setError("");
      }, 1000);
    }
  };

  const handleReset = () => {
    setPattern([]);
    setError("");
  };

  const getTitle = () => {
    if (title) return title;
    if (mode === "setup") return "Дан үүсгэх";
    if (mode === "confirm") return "Даныг баталгаажуулах";
    return "Даныг оруулна уу";
  };

  const getSubtitle = () => {
    if (subtitle) return subtitle;
    if (mode === "setup") return "Хамгийн багадаа 4 цэг холбож дан үүсгэнэ үү";
    if (mode === "confirm") return "Дээрх даныг дахин оруулна уу";
    return "Таны данс руу нэвтрэхийн тулд даныг оруулна уу";
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
              <circle cx="30" cy="30" r="4" fill="white" />
              <circle cx="50" cy="30" r="4" fill="white" />
              <circle cx="70" cy="30" r="4" fill="white" />
              <circle cx="30" cy="50" r="4" fill="white" />
              <circle cx="50" cy="50" r="4" fill="white" />
              <circle cx="70" cy="50" r="4" fill="white" />
              <circle cx="30" cy="70" r="4" fill="white" />
              <circle cx="50" cy="70" r="4" fill="white" />
              <circle cx="70" cy="70" r="4" fill="white" />
              <path
                d="M 30 30 L 50 30 L 70 50 L 50 70"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-white mb-2">{getTitle()}</h2>
          <p className="text-white/80 text-sm">{getSubtitle()}</p>
        </div>

        {/* Pattern Grid */}
        <div
          ref={canvasRef}
          className="relative mx-auto mb-8"
          style={{ width: 300, height: 300 }}
          onMouseUp={handleTouchEnd}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-3 gap-12 w-full h-full">
            {dots.map((index) => {
              const isActive = pattern.includes(index);
              const orderIndex = pattern.indexOf(index);

              return (
                <div
                  key={index}
                  className="relative flex items-center justify-center"
                  onMouseDown={() => handleTouchStart(index)}
                  onMouseEnter={() => isDrawing && handleTouchMove(index)}
                  onTouchStart={() => handleTouchStart(index)}
                  onTouchMove={(e) => {
                    const touch = e.touches[0];
                    const element = document.elementFromPoint(
                      touch.clientX,
                      touch.clientY
                    );
                    const dotIndex = element?.getAttribute("data-dot-index");
                    if (dotIndex !== null) {
                      handleTouchMove(parseInt(dotIndex));
                    }
                  }}
                  data-dot-index={index}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-4 transition-all duration-200 ${
                      isActive
                        ? error
                          ? "bg-red-500 border-red-300 scale-150"
                          : "bg-white border-white/50 scale-150"
                        : "bg-white/20 border-white/40"
                    }`}
                  />
                  {isActive && orderIndex !== -1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-sm">
                        {orderIndex + 1}
                      </span>
                    </div>
                  )}
                  
                  {/* Draw lines between connected dots */}
                  {isActive && orderIndex > 0 && pattern[orderIndex - 1] !== undefined && (
                    <svg
                      className="absolute inset-0 pointer-events-none"
                      style={{ overflow: "visible" }}
                    >
                      <line
                        x1="50%"
                        y1="50%"
                        x2={`${((pattern[orderIndex - 1] % 3) - (index % 3)) * 100 + 50}%`}
                        y2={`${(Math.floor(pattern[orderIndex - 1] / 3) - Math.floor(index / 3)) * 100 + 50}%`}
                        stroke={error ? "#ef4444" : "white"}
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {error && (
          <p className="text-red-200 text-center text-sm mb-4">{error}</p>
        )}

        <p className="text-white/70 text-center text-sm mb-6">
          {pattern.length > 0 ? `${pattern.length} цэг сонгогдсон` : "Цэгүүдийг холбож дан үүсгэнэ үү"}
        </p>

        {/* Reset Button */}
        <Button
          onClick={handleReset}
          variant="ghost"
          className="w-full text-white hover:bg-white/10 py-6 rounded-2xl"
        >
          Дахин эхлэх
        </Button>

        {/* Biometric Option */}
        {mode === "login" && (
          <Button
            variant="ghost"
            className="w-full text-white hover:bg-white/10 py-6 rounded-2xl mt-2"
          >
            👤 Биометрик нэвтрэх
          </Button>
        )}
      </div>
    </div>
  );
}