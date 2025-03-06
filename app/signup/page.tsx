import { Metadata } from 'next';
import Link from 'next/link';
import AuthForm from '../components/AuthForm';

export const metadata: Metadata = {
  title: 'Sign Up | Manufacturing Dashboard',
  description: 'Create your manufacturing dashboard account',
};

export default function SignupPage() {
  return (
    <div>
      <AuthForm mode="signup" />
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
} 