'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { debounce } from 'lodash';
import useSWR from 'swr';
import type { TUser } from '@/types';

const fetcher = async (
  url: string,
  args?: object
): Promise<TUser[] | undefined> => {
  const request = await fetch('https://api.github.com/users', { ...args });
  return request.json();
};

export default function ClientSide() {
  const [query, setQuery] = useState('');

  // data fetching
  const { data, isLoading, error } = useSWR(['get-list-user'], fetcher);

  const queryAction = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, 400);

  const usersMemoize = useMemo(() => {
    return data?.filter((user) =>
      user.login.toLocaleLowerCase().includes(query)
    );
  }, [query, data]);

  return isLoading ? (
    'Loading ...'
  ) : (
    <main>
      <div className="" aria-label="top-side">
        <input
          className="w-full bg-gray-50 rounded-md outline-none p-2 focus:border-[1px] focus:border-blue-300"
          type="search"
          onChange={queryAction}
          placeholder="cari nama .."
        />
      </div>
      <div className="grid grid-cols-3 gap-3 mt-5" aria-label="users">
        {usersMemoize?.map((user, i) => (
          <figure
            key={i}
            className="rounded-md p-3 border-[1px] border-gray-200 relative"
          >
            <Image
              className="bg-gray-100 rounded-full object-cover absolute -top-3 -left-3"
              src={user.avatar_url}
              alt="avatar"
              width={40}
              height={40}
            />
            <figcaption className="p-1 mt-2">
              <h2 className="font-semibold text-lg text-gray-600">
                {user.login}
              </h2>
              <div className="text-sm mt-2 italic">
                <p>Repo's :</p>
                <a
                  href={user.repos_url}
                  className=" underline"
                  target={'_blank'}
                >
                  {user.repos_url.slice(28, user.repos_url.length) + ' ...'}
                </a>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
