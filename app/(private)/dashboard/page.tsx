import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard | Manufacturing Dashboard',
  description: 'Your manufacturing dashboard',
};

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session.user.name}!
          </h1>
          <div className="mt-4">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Your Dashboard
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                This is your protected dashboard page. Only authenticated users can see this.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 