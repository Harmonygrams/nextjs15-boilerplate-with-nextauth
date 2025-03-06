import { Metadata } from 'next';
import Link from 'next/link';
import AuthForm from '../components/AuthForm';

export const metadata: Metadata = {
  title: 'Login | Manufacturing Dashboard',
  description: 'Login to access your manufacturing dashboard',
};

export default function LoginPage() {
  return (
    <div>
      <AuthForm mode="login" />
      <p className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
} 