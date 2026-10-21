import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { Order } from "../models/order/order.model";


export default function useImprovedOrder() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filterInput, setFilterInput] = useState<string>('');
    const [isOrdered, setIsOrdered] = useState<boolean>(false);
    
    const search = useDeferredValue(filterInput);

    const orderedOrders = useMemo(() => {
        return isOrdered ? [...orders].sort((a, b) => a.customerName.localeCompare(b.customerName)) : orders
    }, [orders, isOrdered]);

    const filteredOrders = useMemo(() => {
        return orderedOrders.filter((order) => order.id.includes(search));
    }, [search, orderedOrders])

    useEffect(() => {
        fetch('/orders-20000.json')
            .then((response) => response.json())
            .then((response) => setOrders(response))
    }, [])


    return { filteredOrders, setFilterInput, isOrdered, setIsOrdered }
}