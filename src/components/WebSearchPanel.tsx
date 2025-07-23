import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ExternalLink, AlertCircle } from 'lucide-react';

export const WebSearchPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Open search in new tab/window
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
    
    setTimeout(() => setIsSearching(false), 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="p-4 bg-card border">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          <h3 className="font-medium text-foreground">Web Search</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Search for clarification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isSearching}
              size="sm"
              className="gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              {isSearching ? 'Opening...' : 'Search'}
            </Button>
          </div>
          
          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-md border">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Use this to search for context or clarification. 
              <strong className="text-foreground"> Do not copy-paste queries verbatim.</strong>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};