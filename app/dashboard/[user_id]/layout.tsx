import MainNavbar from "@/components/mainNavbar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mesh border ">
      <MainNavbar/>
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
      </footer>
    </div>
  );
}
