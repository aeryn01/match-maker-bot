import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: "primary" | "accent" | "pending" | "default";
  delay?: number;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp,
  color = "default",
  delay = 0 
}: StatCardProps) {
  
  const colorStyles = {
    primary: "text-primary bg-primary/10 border-primary/20",
    accent: "text-accent bg-accent/10 border-accent/20",
    pending: "text-[hsl(var(--status-pending))] bg-[hsl(var(--status-pending))]/10 border-[hsl(var(--status-pending))]/20",
    default: "text-muted-foreground bg-secondary border-border"
  };

  const iconStyle = colorStyles[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-colors"
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
      
      <div className="flex justify-between items-start mb-4">
        <p className="text-muted-foreground font-medium text-sm tracking-wider uppercase">{title}</p>
        <div className={`p-2.5 rounded-xl border ${iconStyle} transition-colors duration-300`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-baseline gap-3">
        <h3 className="text-4xl font-display font-bold text-foreground tracking-tight">
          {value}
        </h3>
        
        {trend && (
          <span className={`text-sm font-medium ${trendUp ? 'text-primary' : 'text-destructive'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}
