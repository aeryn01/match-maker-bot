import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Gamepad2, Coins, Clock, CheckCircle2, User, Trophy } from "lucide-react";
import type { Match } from "@shared/schema";

interface MatchCardProps {
  match: Match;
  index: number;
}

export function MatchCard({ match, index }: MatchCardProps) {
  const isAccepted = match.status === "accepted";
  
  // Animation variants
  const variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.23, 1, 0.32, 1] 
      } 
    }
  };

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, scale: 1.01 }}
      className={`
        relative rounded-2xl p-1 overflow-hidden transition-all duration-300
        ${isAccepted 
          ? 'bg-gradient-to-b from-primary/20 to-card shadow-[0_0_30px_-10px_rgba(34,197,94,0.15)]' 
          : 'bg-gradient-to-b from-[hsl(var(--status-pending))]/20 to-card shadow-[0_0_30px_-10px_rgba(245,158,11,0.1)]'
        }
      `}
    >
      <div className="absolute inset-0 bg-card m-[1px] rounded-2xl z-0" />
      
      {/* Glow effect at top */}
      <div 
        className={`absolute top-0 left-1/4 right-1/4 h-[1px] shadow-[0_0_20px_2px] z-10 ${
          isAccepted ? 'shadow-primary/50 bg-primary' : 'shadow-[hsl(var(--status-pending))]/50 bg-[hsl(var(--status-pending))]'
        }`} 
      />

      <div className="relative z-10 p-5 h-full flex flex-col">
        {/* Header: Status & Time */}
        <div className="flex justify-between items-center mb-6">
          <div className={`
            inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
            ${isAccepted 
              ? 'bg-primary/10 text-primary border border-primary/20' 
              : 'bg-[hsl(var(--status-pending))]/10 text-[hsl(var(--status-pending))] border border-[hsl(var(--status-pending))]/20 animate-pulse'
            }
          `}>
            {isAccepted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
            {isAccepted ? 'Em Andamento' : 'Aguardando'}
          </div>
          
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
            {match.createdAt && formatDistanceToNow(match.createdAt, { addSuffix: true, locale: ptBR })}
          </span>
        </div>

        {/* Content: Game & Amount */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-secondary border border-white/5 flex items-center justify-center shrink-0 shadow-inner">
            <Gamepad2 className="w-7 h-7 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground truncate" title={match.game}>
              {match.game}
            </h3>
            <div className="flex items-center gap-1.5 text-primary mt-1">
              <Coins className="w-4 h-4" />
              <span className="font-display font-bold text-xl text-glow">
                R$ {match.amount.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            {/* Creator */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground border border-white/10">
                {getInitials(match.creatorName)}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Criador</span>
                <span className="text-sm font-medium text-foreground truncate max-w-[100px]">{match.creatorName}</span>
              </div>
            </div>

            {/* VS Badge */}
            <div className="px-2 font-display text-muted-foreground/50 font-bold italic">VS</div>

            {/* Acceptor or Empty slot */}
            <div className="flex items-center gap-2 flex-row-reverse text-right">
              {isAccepted && match.acceptedByName ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary border border-primary/30">
                    {getInitials(match.acceptedByName)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-primary uppercase tracking-wider font-semibold">Aceito por</span>
                    <span className="text-sm font-medium text-foreground truncate max-w-[100px]">{match.acceptedByName}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-secondary/50 border border-dashed border-muted-foreground/30 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-muted-foreground/50" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground/50 italic">Aberto</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
