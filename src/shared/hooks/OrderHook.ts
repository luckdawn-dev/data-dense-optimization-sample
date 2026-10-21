import { useEffect, useMemo, useState } from "react";
import type { Order } from "../models/order/order.model";


export default function useOrder() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filterInput, setFilterInput] = useState<string>('');
    const [isOrdered, setIsOrdered] = useState<boolean>(false);

    const filteredOrders = useMemo(() => {
        const filtOrders = orders.filter((order) => order.id.includes(filterInput));
        return isOrdered ? [...filtOrders].sort((a, b) => a.customerName.localeCompare(b.customerName)) : filtOrders;
    }, [filterInput, orders, isOrdered])

    useEffect(() => {
        fetch('/orders-20000.json')
            .then((response) => response.json())
            .then((response) => setOrders(response))
    }, [])


    return { filteredOrders, setFilterInput, isOrdered, setIsOrdered }
}