export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#08080c]">
      {/* Radial gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.12), transparent), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(124,58,237,0.08), transparent), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(6,182,212,0.06), transparent)",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[130px] animate-float" />
      <div className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-indigo-500/12 blur-[110px] animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-cyan-500/8 blur-[100px] animate-float" style={{ animationDelay: "4s" }} />
      <div className="absolute top-2/3 right-1/4 h-[250px] w-[250px] rounded-full bg-emerald-500/6 blur-[90px] animate-float" style={{ animationDelay: "6s" }} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
