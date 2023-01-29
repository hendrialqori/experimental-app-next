import { Suspense } from 'react';
import Loading from 'react-loading';
import type { TQuote, TTodo } from '@/types';

const getQuotes = async (): Promise<TQuote[] | undefined> => {
  const request = await fetch('https://dummyjson.com/quotes');
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, 2000);
  });

  if (!request.ok) throw new Error('Something went wrong!');

  return request.json();
};

const getTodos = async (): Promise<TTodo[] | undefined> => {
  const request = await fetch('https://dummyjson.com/todos');
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, 4000);
  });

  return request.json();
};

async function Todos() {
  const todos = await getTodos();
  return (
    <div>
      <h1 className="font-bold">Todos</h1>
      {JSON.stringify(todos)}
    </div>
  );
}

export default async function Sequential() {
  const quotes = await getQuotes();
  return (
    <main className="grid grid-cols-2 gap-4">
      <div>
        <h1 className="font-bold">Qoutes</h1> {JSON.stringify(quotes)}
      </div>
      <Suspense fallback={<p>Fetching todos ...</p>}>
        {/* @ts-ignore */}
        <Todos />
      </Suspense>
    </main>
  );
}
