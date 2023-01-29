import { Suspense } from 'react';
import Todos from './todos';
import type { TQuote } from '@/types';

// type TSuspense = {
//   children: React.ReactNode;
// } & React.ComponentProps<SuspenseProps>;

// const CustomSuspense = ({ children, ...rest }: TSuspense) => {
//   return <Suspense {...rest}>{children}</Suspense>;
// };

const getQuotes = async (): Promise<TQuote[] | undefined> => {
  const request = await fetch('https://dummyjson.com/quotes');

  if (!request.ok) throw new Error('Something went wrong!');

  return request.json();
};

export default async function Blocking() {
  const quotes = await getQuotes();

  return (
    <main className="grid grid-cols-2  gap-4">
      <div>
        <h1 className="font-bold">Quotes</h1> <br /> {JSON.stringify(quotes)}
      </div>
      <Suspense fallback={<p>loading ..</p>}>
        {/* @ts-ignore */}
        <Todos />
      </Suspense>
    </main>
  );
}
