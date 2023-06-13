import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import LoginForm from '../components/LoginForm';
import User from '@/interfaces/User';
import Dashboard from '@/components/Dashdoard';
import { useEffect } from 'react';

const Home: NextPage<{ fallbackData: User | undefined }> = ({
  fallbackData,
}) => {
  const router = useRouter();

  const { data, error } = useSWR<User>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/auth/users/get/me`,
    fetcher,
    { fallbackData, revalidateOnMount: true }
  );

  // useEffect(() => {
  //   if (data) {
  //     // Save the user to localStorage
  //     localStorage.setItem('user', JSON.stringify(data));
  //   }
  // }, [data]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <LoginForm fallbackData={fallbackData} />
        </div>
      </div>
    );
  }

  if (!data) {
    // Redirect to the login screen if there is no logged-in user
    router.replace('/login');
    return null;
  }

  if (data) {
    return <Dashboard user={data} />;
  }

  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const data = await fetcher(
      `http://auth-srv/api/auth/users/get/me`,
      context.req.headers
    );
    console.log('Server');
    return { props: { fallbackData: data } };
  } catch (error: any) {
    return { props: { fallbackData: { error: error.message } } };
  }
};

export default Home;
