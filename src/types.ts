export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  address: {
    address: string;
    city: string;
  };
} & {
  login: string;
  avatar_url: string;
  repos_url: string;
};

export type TQuote = {
  id: number;
  quote: string;
  author: string;
};

export type TTodo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type TReqGetFunc = () => Promise<
  { users: TUser[] | undefined } | undefined
>;
