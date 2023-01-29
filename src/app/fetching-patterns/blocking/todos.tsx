import type { TTodo } from '@/types';

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

export default async function Todos() {
  const todos = await getTodos();
  return (
    <div>
      <h1 className="font-bold">Todos</h1> <br /> {JSON.stringify(todos)}
    </div>
  );
}
