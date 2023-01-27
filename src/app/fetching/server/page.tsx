import Image from 'next/image';
import type { TReqGetFunc } from '@/types';

const RequestGET: TReqGetFunc = async () => {
  const req = await fetch('https://dummyjson.com/users');
  if (!req.ok) {
    throw new Error('Something went wrong!');
  }

  return await req.json();
};

export default async function ServerSide() {
  // Run request func server side
  const usersReponse = await RequestGET();

  return (
    <main>
      <div className="mb-8 mt-4">
        <h1 className="font-semibold">GET Request with Server side </h1>
      </div>
      <div
        className="flex items-center justify-center gap-3 flex-wrap"
        aria-label="user"
      >
        {usersReponse?.users?.map((user, i) => (
          <figure
            key={i}
            className="rounded-md p-3 border-[1px] border-gray-200 w-[30%] relative"
          >
            <Image
              className="bg-gray-100 rounded-full object-cover absolute -top-3 -left-3"
              src={user.image}
              alt="avatar"
              width={40}
              height={40}
            />
            <figcaption className="text-center">
              <h2 className="font-semibold text-lg text-gray-600">
                {user.firstName} {user.lastName}
              </h2>
              <div className="text-sm mt-2 italic">
                <p>" {user.address.address}</p>
                <p>{user.address.city}"</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
