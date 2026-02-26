## Packages
framer-motion | Page transitions, staggered list animations, and micro-interactions for the gaming dashboard feel
date-fns | Formatting timestamps for match creation times
lucide-react | Already installed, but explicitly noting usage for dashboard icons

## Notes
- App is designed primarily for dark mode to fit the "sleek gaming dashboard" aesthetic.
- The useMatches hook implements polling (refetchInterval: 3000ms) to automatically reflect changes made by the Discord bot.
- Tailwind config should support the CSS variables defined in index.css.
