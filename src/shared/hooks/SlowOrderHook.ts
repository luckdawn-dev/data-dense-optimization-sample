import { useMemo, useState } from "react";
import useOrderFetch from "./OrderFetchHook";

export default function useOrder() {
    const { orders, isFetching } = useOrderFetch();
    const [filterInput, setFilterInput] = useState<string>('');
    const [isOrdered, setIsOrdered] = useState<boolean>(false);

    const filteredOrders = useMemo(() => {
        const filtOrders = orders.filter((order) => order.id.includes(filterInput));
        return isOrdered ? [...filtOrders].sort((a, b) => a.customerName.localeCompare(b.customerName)) : filtOrders;
    }, [filterInput, orders, isOrdered])

    return { filteredOrders, setFilterInput, isOrdered, setIsOrdered, isFetching }
}
