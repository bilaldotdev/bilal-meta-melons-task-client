export interface IRegsiterPayload {
  email: string;
  name: string;
  password: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}

export type LoginPayload = Pick<IRegsiterPayload, 'email' | 'password'>;
