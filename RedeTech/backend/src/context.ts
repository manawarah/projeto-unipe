import { AsyncLocalStorage } from 'node:async_hooks';

type ContextType = {
  userId?: string;
};

export const asyncLocalStorage = new AsyncLocalStorage<ContextType>();

export const getContext = (): ContextType | undefined => asyncLocalStorage.getStore();
