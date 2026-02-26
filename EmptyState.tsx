import { motion } from "framer-motion";
import { Ghost } from "lucide-react";

export function EmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="col-span-full py-24 flex flex-col items-center justify-center text-center"
    >
      <div className="w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center mb-6 shadow-inner border border-white/5 relative">
        <Ghost className="w-10 h-10 text-muted-foreground animate-bounce" />
        <div className="absolute inset-0 rounded-full border border-[hsl(var(--status-pending))]/20 animate-ping opacity-20" style={{ animationDuration: '3s' }}/>
      </div>
      <h3 className="text-2xl font-display font-bold text-foreground mb-2">Nenhuma partida encontrada</h3>
      <p className="text-muted-foreground max-w-sm">
        Use o comando <code className="bg-secondary px-2 py-1 rounded text-primary font-mono text-sm mx-1">/criar</code> no Discord para iniciar uma nova aposta.
      </p>
    </motion.div>
  );
}
