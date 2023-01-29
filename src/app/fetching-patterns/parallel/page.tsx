import type { TQuote, TTodo } from '@/types';

const getQuotes = async (): Promise<TQuote[] | undefined> => {
  const request = await fetch('https://dummyjson.com/quotes');

  if (!request.ok) throw new Error('Something went wrong!');

  return request.json();
};

const getTodos = async (): Promise<TTodo[] | undefined> => {
  const request = await fetch('https://dummyjson.com/todos');
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, 3000);
  });

  if (!request.ok) throw new Error('Something went wrong!');

  return request.json();
};

export default async function Parallel() {
  const [quotes, todos] = await Promise.all([getQuotes(), getTodos()]);

  return (
    <main>
      <h1 className="font-bold text-lg mb-4">Parallel</h1>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-semibold">quotes</h3> : {JSON.stringify(quotes)}
        </div>
        <div>
          <h3 className="font-semibold">Todos</h3> : {JSON.stringify(todos)}
        </div>
      </div>
    </main>
  );
}
