import { API_BASE_URL } from '../config';
import { IRegsiterPayload, LoginPayload, Task } from '../types';
import { getCookie } from '../utils/helpers';

export const register = async (payload: IRegsiterPayload, init: Partial<RequestInit> = {}): Promise<any> => {
  const resp = await fetch(`${API_BASE_URL}/auth/create-user`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

  const json = await resp.json();

  return json;
};

export const login = async (payload: LoginPayload, init: Partial<RequestInit> = {}): Promise<any> => {
  const resp = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

  const json = await resp.json();

  return json;
};

export const createTask = async (
  payload: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
  init: Partial<RequestInit> = {}
): Promise<null | Task[]> => {
  const resp = await fetch(`${API_BASE_URL}/secure/tasks/create`, {
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
    ...init,
  });

  const json = await resp.json();

  return json.data;
};

export const deleteTask = async (taskId: number): Promise<any> => {
  const resp = await fetch(`${API_BASE_URL}/secure/tasks/delete/${taskId}`, {
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });

  const json = await resp.json();

  return json.data;
};
export const updateTaskStatus = async (taskId: number, status: string): Promise<any> => {
  const resp = await fetch(`${API_BASE_URL}/secure/tasks/update/${taskId}`, {
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });

  const json = await resp.json();

  return json.data;
};

export const getTasks = async (init: Partial<RequestInit> = {}): Promise<null | Task[]> => {
  const resp = await fetch(`${API_BASE_URL}/secure/tasks/list`, {
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
      'Content-Type': 'application/json',
    },
    ...init,
  });

  const json = await resp.json();

  return json.data;
};
