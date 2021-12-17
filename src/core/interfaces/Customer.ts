export interface Customer {
  _id: string;
  userId?: string;
  alias?: string;
  email: string;
  password?: string;
  avatar?: string;
  name: {
    first?: string;
    last?: string;
    full: string;
  };
}

