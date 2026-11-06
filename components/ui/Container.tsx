export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1204px] px-3 ${className}`}>{children}</div>;
}
