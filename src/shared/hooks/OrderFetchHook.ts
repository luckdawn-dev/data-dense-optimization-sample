import { useEffect, useState, useTransition } from "react";
import type { Order } from "../models/order/order.model";

/**
 * Shared data-loading machinery for both order hooks.
 * Filter and sort strategies live in each hook; this owns nothing else
 * than "download the dataset and own the spinner until it is ready".
 */
export default function useOrderFetch() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [, startTransition] = useTransition();

    useEffect(() => {
        const controller = new AbortController();

        fetch("/orders-20000.json", { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error(`Failed to load orders (HTTP ${response.status})`);
                return response.json();
            })
            .then((data) => {
                // The 20k-row render runs at low priority, in slices, so the
                // browser stays responsive — and keeps painting the current
                // UI (the spinner) until the new table is fully ready.
                startTransition(() => {
                    setOrders(data);
                    setIsFetching(false);
                });
            })
            .catch((error) => {
                if ((error as DOMException)?.name === "AbortError") return;
                console.error("Failed to load orders:", error);
                setIsFetching(false);
            });

        return () => controller.abort();
    }, []);

    return { orders, isFetching }
}
