import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Calendar, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface QueryTask {
  id: string;
  query: string;
  context?: string;
  interaction_history?: string[];
  reference_date?: string;
}

interface EvaluationResponse {
  is_intelligible?: boolean;
  is_info_seeking?: boolean;
  is_ambiguous?: boolean;
  is_time_sensitive?: boolean;
  is_trending?: boolean;
  has_harmful_intent?: boolean;
  comments?: string;
}

interface QueryEvaluationFormProps {
  task: QueryTask;
  onSubmit: (response: EvaluationResponse) => void;
  isSubmitting?: boolean;
  existingResponse?: EvaluationResponse;
}

const evaluationQuestions = [
  {
    key: 'is_intelligible' as keyof EvaluationResponse,
    question: 'Is the query intelligible?',
    description: 'Can the query be understood clearly?',
    icon: MessageSquare,
    positiveLabel: 'Clear & understandable',
    negativeLabel: 'Unclear or garbled'
  },
  {
    key: 'is_info_seeking' as keyof EvaluationResponse,
    question: 'Is the query info-seeking?',
    description: 'Is the user looking for information?',
    icon: CheckCircle,
    positiveLabel: 'Seeking information',
    negativeLabel: 'Not info-seeking'
  },
  {
    key: 'is_ambiguous' as keyof EvaluationResponse,
    question: 'Is the query ambiguous?',
    description: 'Does the query have multiple possible interpretations?',
    icon: AlertTriangle,
    positiveLabel: 'Multiple meanings',
    negativeLabel: 'Clear single meaning'
  },
  {
    key: 'is_time_sensitive' as keyof EvaluationResponse,
    question: 'Is the query time-sensitive?',
    description: 'Does the answer depend on current timing?',
    icon: Clock,
    positiveLabel: 'Time-dependent',
    negativeLabel: 'Time-independent'
  },
  {
    key: 'is_trending' as keyof EvaluationResponse,
    question: 'Is the query currently trending in the news?',
    description: 'Is this topic currently popular in news media?',
    icon: TrendingUp,
    positiveLabel: 'Currently trending',
    negativeLabel: 'Not trending'
  },
  {
    key: 'has_harmful_intent' as keyof EvaluationResponse,
    question: 'Does the query have harmful intent or ask about sensitive topics?',
    description: 'Could this query be harmful or inappropriate?',
    icon: AlertTriangle,
    positiveLabel: 'Potentially harmful',
    negativeLabel: 'Safe content'
  }
];

export const QueryEvaluationForm = ({ 
  task, 
  onSubmit, 
  isSubmitting = false, 
  existingResponse = {} 
}: QueryEvaluationFormProps) => {
  const [responses, setResponses] = useState<EvaluationResponse>(existingResponse);
  const [comments, setComments] = useState(existingResponse.comments || '');

  const handleResponseChange = (key: keyof EvaluationResponse, value: boolean) => {
    setResponses(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...responses,
      comments: comments.trim() || undefined
    });
  };

  const isComplete = Object.keys(responses).length === evaluationQuestions.length;
  const completionPercentage = (Object.keys(responses).length / evaluationQuestions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Query Display */}
      <Card className="p-6 bg-card border">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-semibold text-foreground">Query to Evaluate</h2>
            <Badge variant="outline" className="text-xs">
              ID: {task.id}
            </Badge>
          </div>
          
          <div className="p-4 bg-accent rounded-lg border-l-4 border-l-primary">
            <p className="text-lg font-medium text-foreground">{task.query}</p>
          </div>

          {task.context && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Context
              </h4>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                {task.context}
              </p>
            </div>
          )}

          {task.interaction_history && task.interaction_history.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Interaction History</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {task.interaction_history.map((interaction, index) => (
                  <p key={index} className="text-sm text-muted-foreground bg-muted p-2 rounded text-left">
                    {interaction}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Progress Indicator */}
      <Card className="p-4 bg-card border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Evaluation Progress</span>
          <span className="text-sm text-muted-foreground">
            {Object.keys(responses).length} of {evaluationQuestions.length} complete
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </Card>

      {/* Evaluation Questions */}
      <div className="space-y-4">
        {evaluationQuestions.map((question, index) => {
          const Icon = question.icon;
          const currentValue = responses[question.key];
          
          return (
            <Card key={question.key} className="p-6 bg-card border">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">
                      {index + 1}. {question.question}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {question.description}
                    </p>
                  </div>
                </div>

                <Separator />

                <RadioGroup
                  value={currentValue?.toString()}
                  onValueChange={(value) => handleResponseChange(question.key, value === 'true')}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id={`${question.key}-yes`} />
                    <Label htmlFor={`${question.key}-yes`} className="flex-1 cursor-pointer">
                      <span className="font-medium text-success">Yes</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {question.positiveLabel}
                      </span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id={`${question.key}-no`} />
                    <Label htmlFor={`${question.key}-no`} className="flex-1 cursor-pointer">
                      <span className="font-medium text-muted-foreground">No</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {question.negativeLabel}
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Comments Section */}
      <Card className="p-6 bg-card border">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="font-medium text-foreground">Comments</h3>
            <span className="text-sm text-muted-foreground">(Optional)</span>
          </div>
          
          <Separator />
          
          <Textarea
            placeholder="Add any additional comments or observations about this query..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </Card>

      {/* Submit Button */}
      <Card className="p-4 bg-card border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {isComplete ? (
              <span className="text-success font-medium">All questions answered</span>
            ) : (
              <span>Please answer all questions to submit</span>
            )}
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={!isComplete || isSubmitting}
            className="min-w-32"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Evaluation'}
          </Button>
        </div>
      </Card>
    </div>
  );
};