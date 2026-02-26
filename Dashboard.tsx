import { useMemo } from "react";
import { useMatches } from "@/hooks/use-matches";
import { MatchCard } from "@/components/MatchCard";
import { StatCard } from "@/components/StatCard";
import { EmptyState } from "@/components/EmptyState";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import { Trophy, Swords, Coins, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: matches, isLoading, isError } = useMatches();

  const stats = useMemo(() => {
    if (!matches) return { total: 0, pending: 0, accepted: 0, volume: 0 };
    
    return matches.reduce((acc, match) => {
      acc.total += 1;
      if (match.status === 'pending') acc.pending += 1;
      if (match.status === 'accepted') {
        acc.accepted += 1;
        // Count volume for accepted matches (both sides paid)
        acc.volume += (match.amount * 2); 
      }
      return acc;
    }, { total: 0, pending: 0, accepted: 0, volume: 0 });
  }, [matches]);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Area */}
      <header className="mb-10 pt-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-2"
            >
              Live Arena
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground flex items-center gap-2"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Monitoramento em tempo real do Discord
            </motion.p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard 
            title="Total de Partidas" 
            value={stats.total} 
            icon={Activity} 
            color="accent"
            delay={0.1}
          />
          <StatCard 
            title="Aguardando Oponente" 
            value={stats.pending} 
            icon={Swords} 
            color="pending"
            delay={0.2}
          />
          <StatCard 
            title="Em Andamento" 
            value={stats.accepted} 
            icon={Trophy} 
            color="primary"
            delay={0.3}
          />
          <StatCard 
            title="Volume Apostado" 
            value={`R$ ${stats.volume.toLocaleString('pt-BR')}`} 
            icon={Coins} 
            color="primary"
            delay={0.4}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-semibold text-foreground/90">Feed de Partidas</h2>
          <div className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-lg border border-white/5">
            Atualizado via Bot
          </div>
        </div>

        {isError ? (
          <div className="glass-panel p-8 rounded-2xl border-destructive/20 text-center">
            <h3 className="text-xl font-bold text-destructive mb-2">Erro de Conexão</h3>
            <p className="text-muted-foreground">Não foi possível carregar as partidas no momento.</p>
          </div>
        ) : isLoading ? (
          <DashboardSkeleton />
        ) : matches && matches.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {matches.map((match, index) => (
              <MatchCard key={match.id} match={match} index={index} />
            ))}
          </motion.div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}
