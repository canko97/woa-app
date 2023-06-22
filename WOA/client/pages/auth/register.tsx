import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';

const createUserSchema = object({
  firstName: string().nonempty({
    message: 'First Name is required',
  }),
  lastName: string().nonempty({
    message: 'Last Name is required',
  }),
  email: string({
    required_error: 'Email is required',
  }).email('Not a valid email'),
  password: string()
    .min(8, 'Password is too short - should be min 8 characters')
    .nonempty({
      message: 'Password is required',
    }),
  passwordConfirmation: string().nonempty({
    message: 'Password confirmation is required',
  }),
  role: string({ required_error: 'User needs a role' })
    .array()
    .default(['USER']),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation'],
});

// Create custom type to satisfy TypeScript
type CreateUserInput = TypeOf<typeof createUserSchema>;

function RegisterPage() {
  const router = useRouter();

  const [registerError, setRegisterError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({ resolver: zodResolver(createUserSchema) });

  async function onSubmit(values: CreateUserInput) {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/auth/users/create`,
        values
      );

      router.push('/');
    } catch (e: any) {
      setRegisterError(e.message);
    }
  }

  console.log({ errors });
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded px-8 py-6">
          <h2 className="text-3xl font-semibold text-center mb-4">Register</h2>
          {registerError && (
            <p className="text-yellow-400	 mb-4">{registerError}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-1">
                First Name:
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                {...register('firstName')}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              {errors.firstName && (
                <p className="text-red-500 mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-1">
                Last Name:
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                {...register('lastName')}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              {errors.lastName && (
                <p className="text-red-500 mt-1">{errors.lastName.message}</p>
              )}
            </div>
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
            <div className="mb-4">
              <label htmlFor="passwordConfirmation" className="block mb-1">
                Password Confirmation:
              </label>
              <input
                id="passwordConfirmation"
                type="password"
                placeholder="Password Confirmation"
                {...register('passwordConfirmation')}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              {errors.passwordConfirmation && (
                <p className="text-red-500 mt-1">
                  {errors.passwordConfirmation.message}
                </p>
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

export default RegisterPage;
