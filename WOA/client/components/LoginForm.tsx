import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import getGoogleOauthURL from '@/utils/getGoogleUrl';
import Image from 'next/image';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

const createSessionSchema = object({
  email: string()
    .nonempty({
      message: 'Email is required',
    })
    .email('Invalid email or password'),
  password: string()
    .nonempty({
      message: 'Password is required',
    })
    .min(8, 'Invalid email or password'),
});

// Create custom type to satisfy TypeScript
type CreateSessionInput = TypeOf<typeof createSessionSchema>;

interface LoginFormProps {
  fallbackData: User | undefined;
}

const LoginForm: React.FC<LoginFormProps> = ({ fallbackData }) => {
  const router = useRouter();

  const [loginError, setLoginError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  async function onSubmit(values: CreateSessionInput) {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/auth/sessions/create`,
        values,
        { withCredentials: true }
      );

      router.reload();
    } catch (e: any) {
      setLoginError(e.message);
    }
  }

  return (
    <div className="bg-white shadow-2xl rounded px-8 py-6">
      <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
      {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="email@example.com"
            {...register('email')}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password:
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register('password')}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>
        <div>
          <a href={getGoogleOauthURL()}>
            <div className="py-2 flex items-center text-blue-500 hover:underline">
              <div className="mr-2">
                <Image
                  src="/google-logo.png"
                  alt="Google"
                  height={24}
                  width={24}
                />
              </div>
              Sign up with Google
            </div>
          </a>
        </div>
        <div>
          <div className="py-2 flex items-center">
            <p>
              Dont have an account?{' '}
              <a className="text-blue-500 hover:underline" href="auth/register">
                Register?
              </a>
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
