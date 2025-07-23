import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Play, Pause } from 'lucide-react';

interface TimerProps {
  isActive: boolean;
  onTimeUpdate?: (time: number) => void;
  showControls?: boolean;
}

export const Timer = ({ isActive, onTimeUpdate, showControls = false }: TimerProps) => {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          onTimeUpdate?.(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, onTimeUpdate]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = (): string => {
    if (time < 300) return 'text-timer-active'; // < 5 minutes - green
    if (time < 600) return 'text-timer-warning'; // < 10 minutes - orange
    return 'text-timer-critical'; // > 10 minutes - red
  };

  return (
    <Card className="p-4 bg-card border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Session Time</span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`text-lg font-mono font-bold ${getTimerColor()}`}>
            {formatTime(time)}
          </span>
          
          {showControls && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 hover:bg-accent rounded text-muted-foreground hover:text-foreground transition-colors"
              disabled={!isActive}
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
      
      {isActive && (
        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              time < 300 ? 'bg-timer-active' : 
              time < 600 ? 'bg-timer-warning' : 'bg-timer-critical'
            }`}
            style={{ 
              width: `${Math.min(100, (time / 600) * 100)}%` 
            }}
          />
        </div>
      )}
    </Card>
  );
};