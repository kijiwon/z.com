export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      루트 레이아웃
      {children}
    </div>
  );
}
