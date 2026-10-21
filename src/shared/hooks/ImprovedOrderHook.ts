import { useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";
import type { Order } from "../models/order/order.model";

/**
 * Yields exactly one full paint to the browser before heavy work starts.
 * Without it the whole fetch -> parse -> render chain can complete before
 * the screen paints a single frame, so the user never sees the spinner.
 * (A race the slow table always loses — its render is far heavier.)
 */
const nextFrame = () =>
    new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    );

export default function useImprovedOrder() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filterInput, setFilterInput] = useState<string>('');
    const [isOrdered, setIsOrdered] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [, startTransition] = useTransition();

    const search = useDeferredValue(filterInput);

    const orderedOrders = useMemo(() => {
        return isOrdered ? [...orders].sort((a, b) => a.customerName.localeCompare(b.customerName)) : orders
    }, [orders, isOrdered]);

    const filteredOrders = useMemo(() => {
        return orderedOrders.filter((order) => order.id.includes(search));
    }, [search, orderedOrders])

    useEffect(() => {
        // StrictMode mounts effects twice in dev — without the abort we'd
        // hit /orders-20000.json twice.
        const controller = new AbortController();

        fetch("/orders-20000.json", { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error(`Failed to load orders (HTTP ${response.status})`);
                return response.json();
            })
            .then((data) => nextFrame().then(() => data))
            .then((data) => {
                // The 20k-row render runs at low priority, in slices, so the
                // browser stays responsive. The old UI (spinner) remains on
                // screen until the new table is fully ready — guaranteed.
                startTransition(() => {
                    setOrders(data);
                    setIsFetching(false);
                });
            })
            .catch((error) => {
                // Aborted = StrictMode's simulated unmount killed this effect's
                // fetch. The second effect run owns the spinner now — do NOT
                // flip isFetching here, or the loader dies at t=0.
                if ((error as DOMException)?.name === "AbortError") return;
                console.error("Failed to load orders:", error);
                setIsFetching(false);
            });

        return () => controller.abort();
    }, []);

    return { filteredOrders, setFilterInput, isOrdered, setIsOrdered, isFetching }
}
