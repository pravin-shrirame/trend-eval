import { useState, useEffect } from 'react';
import { Timer } from '@/components/Timer';
import { QueryEvaluationForm } from '@/components/QueryEvaluationForm';
import { TaskNavigation } from '@/components/TaskNavigation';
import { WebSearchPanel } from '@/components/WebSearchPanel';
import { GuidelinesModal } from '@/components/GuidelinesModal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sampleTasks, QueryTask } from '@/data/sampleTasks';
import { useToast } from '@/hooks/use-toast';
import { Search, User, Settings, FileText } from 'lucide-react';

interface EvaluationResponse {
  is_intelligible?: boolean;
  is_info_seeking?: boolean;
  is_ambiguous?: boolean;
  is_time_sensitive?: boolean;
  is_trending?: boolean;
  has_harmful_intent?: boolean;
  comments?: string;
}

interface TaskStatus {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'reviewed';
  timeSpent?: number;
  response?: EvaluationResponse;
}

const Annotation = () => {
  const [tasks] = useState<QueryTask[]>(sampleTasks);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>(
    sampleTasks.map(task => ({
      id: task.id,
      status: 'pending' as const,
      timeSpent: 0
    }))
  );
  const [sessionStartTime] = useState(Date.now());
  const [currentTaskStartTime, setCurrentTaskStartTime] = useState(Date.now());
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Update task status to in_progress when starting a task
  useEffect(() => {
    setTaskStatuses(prev => prev.map((status, index) => 
      index === currentTaskIndex && status.status === 'pending'
        ? { ...status, status: 'in_progress' }
        : status
    ));
    setCurrentTaskStartTime(Date.now());
  }, [currentTaskIndex]);

  const handleSubmitEvaluation = async (response: EvaluationResponse) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const timeSpent = Math.floor((Date.now() - currentTaskStartTime) / 1000);
      
      setTaskStatuses(prev => prev.map((status, index) => 
        index === currentTaskIndex
          ? { 
              ...status, 
              status: 'completed' as const,
              timeSpent,
              response 
            }
          : status
      ));

      toast({
        title: "Evaluation Submitted",
        description: `Task ${currentTaskIndex + 1} completed successfully.`,
      });

      // Auto-navigate to next task if available
      if (currentTaskIndex < tasks.length - 1) {
        setTimeout(() => {
          setCurrentTaskIndex(prev => prev + 1);
        }, 500);
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigate = (index: number) => {
    if (index >= 0 && index < tasks.length) {
      setCurrentTaskIndex(index);
    }
  };

  const handleNext = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(prev => prev - 1);
    }
  };

  const currentTask = tasks[currentTaskIndex];
  const currentStatus = taskStatuses[currentTaskIndex];
  const completedTasks = taskStatuses.filter(status => status.status === 'completed').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">
                  Query Evaluation Tool
                </h1>
              </div>
              
              <Badge variant="outline" className="text-xs">
                Trending News Analysis
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <GuidelinesModal />
              
              <Button variant="outline" size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                Web Search
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Annotator</span>
              </div>
              
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Side - Query & Questions */}
          <div className="col-span-12 lg:col-span-8">
            <QueryEvaluationForm
              key={currentTask.id} // Force re-render on task change
              task={currentTask}
              onSubmit={handleSubmitEvaluation}
              isSubmitting={isSubmitting}
              existingResponse={currentStatus.response}
            />
          </div>

          {/* Right Sidebar - Search & Stats */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {/* Web Search Panel */}
            <WebSearchPanel />
            
            {/* Session Timer */}
            <Timer 
              isActive={isTimerActive} 
              showControls={true}
            />
            
            {/* Task Navigation */}
            <TaskNavigation
              currentTaskIndex={currentTaskIndex}
              totalTasks={tasks.length}
              taskStatuses={taskStatuses}
              onNavigate={handleNavigate}
              onNext={handleNext}
              onPrevious={handlePrevious}
              canNavigateNext={currentTaskIndex < tasks.length - 1}
              canNavigatePrevious={currentTaskIndex > 0}
            />

            {/* Session Stats */}
            <Card className="p-4 bg-card border">
              <h3 className="font-medium mb-3">Session Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed:</span>
                  <span className="font-medium">{completedTasks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining:</span>
                  <span className="font-medium">{tasks.length - completedTasks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg. Time:</span>
                  <span className="font-medium">
                    {completedTasks > 0 
                      ? `${Math.round(taskStatuses.reduce((sum, task) => sum + (task.timeSpent || 0), 0) / completedTasks)}s`
                      : '—'
                    }
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Annotation;