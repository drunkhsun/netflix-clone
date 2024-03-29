import useCurrentUser from '@/hooks/useCurrentUser';

import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

import { useRouter } from 'next/router';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getServerSession(context.req as NextApiRequest, context.res as NextApiResponse, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}

const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  return (
    <div className='flex items-center h-full justify-center'>
      <div className='flex flex-col'>
        <h1 className='text-3xl mid:text-6xl text-white text-center'>誰在觀賞影片？</h1>
        <div className='flex items-center justify-center gap-8 mt-10'>
          <div onClick={() => router.push('/')}>
            <div className='group flex-row w-44 mx-auto'>
              <div className='w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
                <img
                  src='/images/snorlax.png'
                  alt='Profile'
                />
              </div>
              <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white group-hover:cursor-pointer '>
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
