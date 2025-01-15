export default function ResourcesLayout({
  children,
  access,
}: {
  children: React.ReactNode;
  access: React.ReactNode;
}) {
  return (
    <>
      {children}
      {access}
    </>
  );
}
