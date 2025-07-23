import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, SkipForward, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TaskStatus {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'reviewed';
  timeSpent?: number;
}

interface TaskNavigationProps {
  currentTaskIndex: number;
  totalTasks: number;
  taskStatuses: TaskStatus[];
  onNavigate: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
}

export const TaskNavigation = ({
  currentTaskIndex,
  totalTasks,
  taskStatuses,
  onNavigate,
  onNext,
  onPrevious,
  canNavigateNext,
  canNavigatePrevious
}: TaskNavigationProps) => {
  const completedTasks = taskStatuses.filter(task => task.status === 'completed').length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const getStatusIcon = (status: TaskStatus['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 w-3 text-success" />;
      case 'in_progress':
        return <Clock className="h-3 w-3 text-warning" />;
      case 'reviewed':
        return <CheckCircle className="h-3 w-3 text-primary" />;
      default:
        return <AlertCircle className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: TaskStatus['status'], isActive: boolean) => {
    if (isActive) return 'bg-primary text-primary-foreground';
    
    switch (status) {
      case 'completed':
        return 'bg-success-muted text-success border-success';
      case 'in_progress':
        return 'bg-warning-muted text-warning border-warning';
      case 'reviewed':
        return 'bg-primary-muted text-primary border-primary';
      default:
        return 'bg-status-pending text-muted-foreground border-border';
    }
  };

  return (
    <Card className="p-4 bg-card border">
      <div className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedTasks} of {totalTasks} completed
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Current Task Info */}
        <div className="flex items-center justify-between py-2 border-y">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Current Task:</span>
            <Badge variant="outline">
              {currentTaskIndex + 1} of {totalTasks}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            {getStatusIcon(taskStatuses[currentTaskIndex]?.status || 'pending')}
            <span className="text-sm capitalize text-muted-foreground">
              {taskStatuses[currentTaskIndex]?.status || 'pending'}
            </span>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={!canNavigatePrevious}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1 max-w-xs overflow-x-auto">
            {taskStatuses.map((task, index) => (
              <button
                key={task.id}
                onClick={() => onNavigate(index)}
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full border text-xs font-medium
                  transition-all duration-200 hover:scale-105 flex-shrink-0
                  ${getStatusColor(task.status, index === currentTaskIndex)}
                `}
                title={`Task ${index + 1} - ${task.status}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={!canNavigateNext}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const nextIncomplete = taskStatuses.findIndex(
                (task, index) => index > currentTaskIndex && task.status === 'pending'
              );
              if (nextIncomplete !== -1) {
                onNavigate(nextIncomplete);
              }
            }}
            className="text-xs flex items-center gap-1"
          >
            <SkipForward className="h-3 w-3" />
            Next Incomplete
          </Button>
        </div>
      </div>
    </Card>
  );
};