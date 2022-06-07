import { createContext } from "react";

export interface IAppContext {
  isAdmin: boolean;
  token: string;
}

export const appContext = createContext<IAppContext>({
  isAdmin: false,
  token: '',
});
