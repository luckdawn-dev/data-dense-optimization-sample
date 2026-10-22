import { useCallback, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import useOrderFetch from "./OrderFetchHook";

export default function useOrder() {
    const { orders, isFetching } = useOrderFetch();
    const [filterInput, setFilterInput] = useState<string>('');
    const [isOrdered, setIsOrdered] = useState<boolean>(false);
    const [isSorting, setIsSorting] = useState<boolean>(false);

    const filteredOrders = useMemo(() => {
        const filtOrders = orders.filter((order) => order.id.includes(filterInput));
        return isOrdered ? [...filtOrders].sort((a, b) => a.customerName.localeCompare(b.customerName)) : filtOrders;
    }, [filterInput, orders, isOrdered])

    /**
     * A plain onClick toggle can never show a spinner: setIsOrdered and the
     * spinner state would be batched into the same render, and that render
     * blocks the main thread before the browser paints anything.
     *
     * So the toggle is split in three steps:
     * 1. set the spinner state alone (high priority — paints immediately);
     * 2. wait for the frame that confirms the overlay is on screen
     *    (rAF fires before the paint, the inner setTimeout after it);
     * 3. run the blocking 20k-row render via flushSync — the page freezes,
     *    but the overlay is already visible and the (compositor-animated)
     *    spinner keeps turning through the freeze.
     */
    const toggleIsOrdered = useCallback(() => {
        setIsSorting(true);

        requestAnimationFrame(() => {
            setTimeout(() => {
                flushSync(() => setIsOrdered((isOrd) => !isOrd));
                setIsSorting(false);
            }, 0);
        });
    }, []);

    return { filteredOrders, setFilterInput, isOrdered, toggleIsOrdered, isSorting, isFetching }
}
