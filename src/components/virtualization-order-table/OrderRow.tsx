import { memo } from "react"
import type { Order } from "../../shared/models/order/order.model"
import { badgeTone } from "../../shared/utils/order-badge"

type OrderRowProps = {
    order: Order
    /** Virtual offset (px) of this row inside the scroll content. */
    offset: number
}

function OrderRow({ order, offset }: OrderRowProps) {
    return (
        <tr style={{ transform: `translateY(${offset}px)` }}>
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
    )
}

export const MemoizedOrderRow = memo(OrderRow)
