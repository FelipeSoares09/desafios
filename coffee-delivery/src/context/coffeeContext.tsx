import React, { createContext, useEffect, useState } from "react";

interface CarItem {
    id: number;
    title: string;
    description: string;
    tags: string[];
    image: string;
    price: number;
    quantity: number;
}

interface DataContextType {
    data: any[];
    loading: boolean;
    error: any;
    cart: CarItem[];
    cartQuantity: number;
    updateCart: (cart: CarItem[]) => void;
}

interface DataProviderProps {
    children: React.ReactNode;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: DataProviderProps) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [cart, setCart] = useState<CarItem[]>([]);

    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

   const updateCart = (updateCart: CarItem[]) => {
    setCart(updateCart);
   }


    useEffect(() => {
        fetch('data.json')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                setData(data.coffees);
            } else {
                console.error("Os dados carregados não são válidos");
                setData([]);
            }
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        })
    }, []);

    return (
        <DataContext.Provider value={{ data, loading, error, cartQuantity, updateCart, cart }}>
            {children}
        </DataContext.Provider>
    );
}