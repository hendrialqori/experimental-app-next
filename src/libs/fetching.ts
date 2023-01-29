import { TQuote, TTodo } from '@/types';

export const getQuotes = async (): Promise<TQuote[] | undefined> => {
  const request = await fetch('https://dummyjson.com/quotes');

  if (!request.ok) throw new Error('Something went wrong!');

  return request.json();
};

export const getTodos = async (): Promise<TTodo | undefined> => {
  const request = await fetch('https://dummyjson.com/todos');

  if (!request.ok) throw new Error('Something went wrong!');

  return request.json();
};
