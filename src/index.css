@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --color-design-purple: #7c52a5;
  --color-design-light-purple: #f3e8ff;
  --color-design-sos: #ff5c5c;
  --color-design-bg: #fdfaff;
  --color-design-blue: #3b82f6;
  --color-design-green: #22c55e;

  --animate-pulse-slow: pulse-slow 2s infinite;

  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
    50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  }
}

:root {
  --bg: var(--color-design-bg);
  --foreground: #1a1a1a;
}

body {
  background-color: var(--bg);
  color: var(--foreground);
  font-family: var(--font-sans);
}

.design-card {
  @apply bg-white rounded-3xl shadow-sm border border-purple-100 p-4 transition-all active:scale-[0.98];
}

.action-circle {
  @apply flex flex-col items-center gap-2 cursor-pointer;
}

.action-icon-wrapper {
  @apply w-20 h-20 rounded-full flex items-center justify-center border-4 border-purple-200 bg-purple-100 transition-transform active:scale-95;
}

.sos-circle {
  @apply w-24 h-24 rounded-full bg-design-sos text-white font-bold text-2xl flex items-center justify-center shadow-lg shadow-red-200 transition-transform active:scale-95 cursor-pointer select-none;
}

.nav-bar {
  @apply fixed bottom-0 left-0 right-0 max-w-6xl mx-auto bg-design-purple h-20 flex items-center justify-around px-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)];
}

.nav-icon {
  @apply flex flex-col items-center justify-center gap-1 w-16 h-full transition-all active:scale-90 text-white/60;
}

.nav-icon.active {
  @apply text-white;
}

.nav-icon-sos {
  @apply w-14 h-14 bg-white rounded-full flex items-center justify-center text-design-sos font-black text-sm transition-all active:scale-90 shadow-lg shadow-black/10 animate-pulse-slow -mt-8 border-4 border-design-purple;
}

.search-bar {
  @apply w-full bg-purple-100 rounded-full h-10 px-4 flex items-center gap-2 text-purple-400;
}

.btn-primary {
  @apply w-full bg-design-purple text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2;
}

.btn-secondary {
  @apply w-full bg-purple-50 text-design-purple font-bold py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 border border-purple-100;
}
