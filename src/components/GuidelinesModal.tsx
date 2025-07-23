import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, AlertTriangle, Clock, TrendingUp, MessageSquare, Shield } from 'lucide-react';

export const GuidelinesModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          Guidelines
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Query Evaluation Guidelines
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Overview */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Overview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You are evaluating user queries to assess their quality and characteristics. 
                Each query should be evaluated across six dimensions. Use the web search panel 
                to gather context when needed, but do not copy-paste queries verbatim.
              </p>
            </section>

            <Separator />

            {/* Evaluation Criteria */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Evaluation Criteria</h3>
              <div className="space-y-4">
                
                {/* Intelligible */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium">Is the query intelligible?</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2">Yes Examples</Badge>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• "What time is the Grammy Awards?"</li>
                          <li>• "How to cook pasta?"</li>
                          <li>• "Weather in New York today"</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">No Examples</Badge>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• "asdkjf grammy when???"</li>
                          <li>• Random characters or garbled text</li>
                          <li>• Incomplete fragments</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info-seeking */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h4 className="font-medium">Is the query info-seeking?</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2">Yes Examples</Badge>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• "What is the capital of France?"</li>
                          <li>• "How to change a tire?"</li>
                          <li>• "Latest news about AI"</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">No Examples</Badge>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• "Hello" (greeting)</li>
                          <li>• "Play music" (command)</li>
                          <li>• "I'm feeling sad" (expression)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ambiguous */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <h4 className="font-medium">Is the query ambiguous?</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2">Yes Examples</Badge>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• "Apple" (fruit or company?)</li>
                          <li>• "How to get there?" (where?)</li>
                          <li>• "The game" (which game?)</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">No Examples</Badge>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• "iPhone 15 price"</li>
                          <li>• "Recipe for chocolate cake"</li>
                          <li>• "Paris weather forecast"</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time-sensitive */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-purple-500" />
                    <h4 className="font-medium">Is the query time-sensitive?</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2">Yes Examples</Badge>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• "Current time in Tokyo"</li>
                          <li>• "Today's weather"</li>
                          <li>• "Live stock prices"</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">No Examples</Badge>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• "History of World War II"</li>
                          <li>• "How to tie a tie"</li>
                          <li>• "Recipe for pizza"</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trending */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <h4 className="font-medium">Is the query currently trending?</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      Consider if the topic is currently popular in news media, social platforms, 
                      or search trends. Use the web search panel to verify current trends.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2">Likely Yes</Badge>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Recent celebrity news</li>
                          <li>• Breaking news events</li>
                          <li>• Viral social media topics</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">Likely No</Badge>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Historical information</li>
                          <li>• General how-to queries</li>
                          <li>• Academic topics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Harmful Intent */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-red-500" />
                    <h4 className="font-medium">Does the query have harmful intent?</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Badge variant="destructive" className="mb-2 text-white">Yes Examples</Badge>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Requests for illegal activities</li>
                          <li>• Violence or harm instructions</li>
                          <li>• Hate speech or discrimination</li>
                          <li>• Privacy violations</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">No Examples</Badge>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Educational content</li>
                          <li>• General information requests</li>
                          <li>• Entertainment queries</li>
                          <li>• Legitimate help requests</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Best Practices */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Best Practices</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• <strong>Use web search</strong> to verify trending status and gather context</p>
                <p>• <strong>Consider context</strong> provided with each query</p>
                <p>• <strong>Be consistent</strong> in your evaluation criteria</p>
                <p>• <strong>Add comments</strong> for borderline cases or additional insights</p>
                <p>• <strong>Take breaks</strong> to maintain focus and accuracy</p>
                <p>• <strong>Ask for clarification</strong> if evaluation criteria are unclear</p>
              </div>
            </section>

            <Separator />

            {/* Contact */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Questions?</h3>
              <p className="text-sm text-muted-foreground">
                If you have questions about these guidelines or encounter edge cases, 
                please reach out to the project team for clarification.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};