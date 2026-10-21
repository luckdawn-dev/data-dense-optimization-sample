import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import useImprovedOrder from "../../shared/hooks/ImprovedOrderHook";
import { MemoizedOrderRow } from "./OrderRow";
import LoadingRow from "../../shared/components/LoadingRow";


export default function VirtualizationOrderTable() {
    const { filteredOrders, setFilterInput, isOrdered, setIsOrdered, isFetching } = useImprovedOrder();
    const scrollRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
        count: filteredOrders.length,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => 36.67824172973633,
        overscan: 20
    })
    const virtualRows = rowVirtualizer.getVirtualItems();

    return (
        <main className="page">
            <header className="page-header">
                <h1>Virtualized table</h1>
                <p>Only the visible rows are rendered — windowing via TanStack Virtual.</p>
            </header>

            <form className="toolbar">
                <input
                    className="field"
                    type="text"
                    placeholder="Filter by ID…"
                    onChange={(e) => setFilterInput(e.target.value)}
                />
                <button
                    type="button"
                    className="btn"
                    aria-pressed={isOrdered}
                    onClick={() => setIsOrdered((isOrd) => !isOrd)}
                >
                    Order by Customer Name
                </button>
                <span className="toolbar__count">
                    {filteredOrders.length.toLocaleString('en-US')} orders
                </span>
            </form>

            <section className="table-card">
                <div ref={scrollRef} className="table-wrap">
                    <table className="data-table is-virtualized">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Order Number</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Customer Id</th>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                <th>Customer Segment</th>
                                <th>Customer City</th>
                                <th>Customer State</th>
                                <th>Sales Channel</th>
                                <th>Status</th>
                                <th>Payment Method</th>
                                <th>Payment Status</th>
                                <th>Fulfillment Status</th>
                                <th>Priority</th>
                                <th>Warehouse</th>
                            </tr>
                        </thead>

                        <tbody style={{ height: rowVirtualizer.getTotalSize() }}>
                            {isFetching ? (
                                <LoadingRow columns={17} />
                            ) : virtualRows.map((virtualRow) => {
                                const order = filteredOrders[virtualRow.index]

                                return (
                                    <MemoizedOrderRow
                                        key={order.id}
                                        order={order}
                                        offset={virtualRow.start}
                                    />
                                )
                            })}
                        </tbody>

                    </table>
                </div>
            </section>
        </main>
    )
}
