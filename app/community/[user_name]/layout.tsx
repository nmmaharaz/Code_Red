import "../../globals.css"
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="dashboard-layout bg-white shadow-lg p-6">
        {children}
      </div>
    );
  }
  