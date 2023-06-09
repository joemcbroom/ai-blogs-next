import Image from 'next/image';
import { Inter } from '@next/font/google';

const styles = {};

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <h1 className='font-bold text-3xl'> Hi</h1>
    </main>
  );
}
