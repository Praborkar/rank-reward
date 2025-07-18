import { useEffect, useState } from "react";

interface PointsAnimationProps {
  points: number;
  onComplete: () => void;
}

export function PointsAnimation({ points, onComplete }: PointsAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade out
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="animate-bounce-in">
        <div className="bg-gradient-primary rounded-full p-8 shadow-glow animate-pulse-glow">
          <div className="text-center">
            <div className="text-6xl mb-2">🎉</div>
            <div className="text-3xl font-bold text-primary-foreground">
              +{points}
            </div>
            <div className="text-lg text-primary-foreground/80">
              Points Claimed!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}