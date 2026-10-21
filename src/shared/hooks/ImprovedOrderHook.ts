import { useDeferredValue, useMemo, useState } from "react";
import useOrderFetch from "./OrderFetchHook";

export default function useImprovedOrder() {
    const { orders, isFetching } = useOrderFetch();
    const [filterInput, setFilterInput] = useState<string>('');
    const [isOrdered, setIsOrdered] = useState<boolean>(false);

    const search = useDeferredValue(filterInput);

    const orderedOrders = useMemo(() => {
        return isOrdered ? [...orders].sort((a, b) => a.customerName.localeCompare(b.customerName)) : orders
    }, [orders, isOrdered]);

    const filteredOrders = useMemo(() => {
        return orderedOrders.filter((order) => order.id.includes(search));
    }, [search, orderedOrders])

    return { filteredOrders, setFilterInput, isOrdered, setIsOrdered, isFetching }
}
