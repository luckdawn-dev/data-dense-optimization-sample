import useOrder from "../../shared/hooks/SlowOrderHook";
import { badgeTone } from "../../shared/utils/order-badge";
import LoadingRow from "../../shared/components/LoadingRow";


export default function SlowOrderTable() {
    const { filteredOrders, setFilterInput, isOrdered, setIsOrdered, isFetching } = useOrder();

    return (
        <main className="page">
            <header className="page-header">
                <h1>Slow table</h1>
                <p>Renders all rows directly — filter and sort computed in memory.</p>
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
                <div className="table-wrap">
                    <table className="data-table">
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

                        <tbody>
                            {isFetching ? (
                                <LoadingRow columns={17} />
                            ) : filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td className="mono">{order.id}</td>
                                    <td className="mono">{order.orderNumber}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.updatedAt}</td>
                                    <td className="mono">{order.customerId}</td>
                                    <td>{order.customerName}</td>
                                    <td className="mono">{order.customerEmail}</td>
                                    <td>{order.customerSegment}</td>
                                    <td>{order.customerCity}</td>
                                    <td>{order.customerState}</td>
                                    <td>{order.salesChannel}</td>
                                    <td><span className="badge" data-tone={badgeTone(order.status)}>{order.status}</span></td>
                                    <td>{order.paymentMethod}</td>
                                    <td><span className="badge" data-tone={badgeTone(order.paymentStatus)}>{order.paymentStatus}</span></td>
                                    <td><span className="badge" data-tone={badgeTone(order.fulfillmentStatus)}>{order.fulfillmentStatus}</span></td>
                                    <td><span className="badge" data-tone={badgeTone(order.priority)}>{order.priority}</span></td>
                                    <td>{order.warehouse}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}
