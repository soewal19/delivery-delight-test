import React from 'react';
import { useSocketStore } from '@/store/socketStore';
import { Badge } from '@/components/ui/badge';
import { Database, Zap, ZapOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const ConnectionStatus: React.FC = () => {
  const isSocketConnected = useSocketStore((s) => s.isSocketConnected);
  const isDbConnected = useSocketStore((s) => s.isDbConnected);

  const StatusDot = ({ active }: { active: boolean }) => (
    <div 
      className={`w-2 h-2 rounded-full ${active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'} animate-pulse`} 
    />
  );

  return (
    <div className="flex items-center gap-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 cursor-help">
              <StatusDot active={isSocketConnected} />
              <Zap className={`h-4 w-4 ${isSocketConnected ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Socket</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isSocketConnected ? 'Socket connected' : 'Socket disconnected'}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 cursor-help">
              <StatusDot active={isDbConnected} />
              <Database className={`h-4 w-4 ${isDbConnected ? 'text-blue-500 fill-blue-500/20' : 'text-muted-foreground'}`} />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">DB</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isDbConnected ? 'Database connected' : 'Database disconnected'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
