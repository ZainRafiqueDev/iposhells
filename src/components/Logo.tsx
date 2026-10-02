import Image from "next/image";

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/brand/logo.png"
      alt="iposhells logo"
      width={size}
      height={size}
      className="rounded-full"
      style={{ width: size, height: size }}
      priority
    />
  );
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={40} />
      <span className={`font-heading text-xl font-bold tracking-tight ${light ? "text-white" : "text-navy"}`}>
        ipo<span className="text-cyan">shells</span>
      </span>
    </span>
  );
}
