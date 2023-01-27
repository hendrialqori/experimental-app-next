export interface TUser {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  address: {
    address: string;
    city: string;
  };
}

export type TReqGetFunc = () => Promise<
  { users: TUser[] | undefined } | undefined
>;
