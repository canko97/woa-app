import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';

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

function LoginPage() {
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
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        values,
        { withCredentials: true }
      );

      router.push('/');
    } catch (e: any) {
      setLoginError(e.message);
    }
  }

  console.log({ errors });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded px-8 py-6">
          <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
          {loginError && <p className="text-yellow-400 mb-4">{loginError}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">
                Email:
              </label>
              <input
                id="email"
                type="email"
                placeholder="example.email.com"
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

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
