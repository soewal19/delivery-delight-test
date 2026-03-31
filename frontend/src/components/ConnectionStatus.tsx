import React from 'react';
import { useSocketStore } from '@/store/socketStore';
import { Badge } from '@/components/ui/badge';
import { Database, Zap, ZapOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const ConnectionStatus: React.FC = () => {
  const isSocketConnected = useSocketStore((s) => s.isSocketConnected);
  const isDbConnected = useSocketStore((s) => s.isDbConnected);

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant={isSocketConnected ? "outline" : "destructive"} className="gap-1.5 px-2 py-1">
              {isSocketConnected ? (
                <Zap className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              ) : (
                <ZapOff className="h-3 w-3" />
              )}
              <span className="text-[10px] font-medium uppercase tracking-wider">Socket</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isSocketConnected ? 'Real-time connection active' : 'Real-time connection lost'}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant={isDbConnected ? "outline" : "destructive"} className="gap-1.5 px-2 py-1">
              <Database className={`h-3 w-3 ${isDbConnected ? 'text-blue-500' : ''}`} />
              <span className="text-[10px] font-medium uppercase tracking-wider">DB</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isDbConnected ? 'Database connected' : 'Database connection error'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
