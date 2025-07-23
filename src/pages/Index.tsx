import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, Users, TrendingUp, CheckCircle, BarChart3 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: 'Query Evaluation',
      description: 'Evaluate queries across 6 key dimensions with structured forms'
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description: 'Built-in timer with session tracking and performance analytics'
    },
    {
      icon: Users,
      title: 'Multi-Annotator',
      description: 'Support for multiple annotators with reviewer workflows'
    },
    {
      icon: TrendingUp,
      title: 'Trending Analysis',
      description: 'Identify trending news topics and time-sensitive queries'
    },
    {
      icon: CheckCircle,
      title: 'Quality Control',
      description: 'Comprehensive validation and quality assurance features'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Detailed reporting and performance metrics dashboard'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <Badge variant="outline" className="text-sm">
                Professional Annotation Platform
              </Badge>
            </div>
            
            <h1 className="text-5xl font-bold text-foreground tracking-tight">
              Query Evaluation with{' '}
              <span className="text-primary">Trending News</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive web-based annotation tool designed for evaluating user queries 
              across multiple quality dimensions based on trending news and context analysis.
            </p>

            <div className="flex items-center justify-center gap-4 pt-6">
              <Button 
                size="lg" 
                onClick={() => navigate('/annotation')}
                className="px-8 py-4 text-lg"
              >
                Start Annotation Session
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Powerful Annotation Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for professional query evaluation and trending news analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-muted rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-accent/50 border-y">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">Evaluation Dimensions</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">Real-time</div>
              <div className="text-sm text-muted-foreground">Progress Tracking</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">Multi-user</div>
              <div className="text-sm text-muted-foreground">Collaboration</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">JSON</div>
              <div className="text-sm text-muted-foreground">Data Format</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Query Evaluation Tool</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Professional annotation platform for trending news analysis
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
