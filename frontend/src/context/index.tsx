import { createContext } from "react";

export type ContextType = {
	fetchUserDetails: () => Promise<void>;
	cartProductCount: number;
	fetchUserAddToCart: () => Promise<void>;
};

const Context = createContext<ContextType | null>(null);

export default Context;