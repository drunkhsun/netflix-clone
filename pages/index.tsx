import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import Head from 'next/head';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';

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

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      {/* <Head>
        <title>Netflix Clone</title>
      </Head> */}
      <InfoModal
        visible={isOpen}
        onClose={closeModal}
      />
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList
          data={movies}
          title='現正熱播'
        />
        <MovieList
          data={favorites}
          title='我的片單'
        />
      </div>
    </>
  );
}
