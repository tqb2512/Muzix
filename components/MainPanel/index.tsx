export default function MainPanel({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="rounded-lg bg-dark-background h-full w-full p-4">
      {children}
    </div>
  );
}