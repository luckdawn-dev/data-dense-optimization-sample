export interface OrderItem {
  sku: string;
  productName: string;
  category: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerSegment: string;
  customerCity: string;
  customerState: string;
  salesChannel: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  priority: string;
  warehouse: string;
  carrier: string | null;
  trackingCode: string | null;
  shippedAt: string | null;
  estimatedDeliveryAt: string | null;
  deliveredAt: string | null;
  isExpress: boolean;
  itemCount: number;
  distinctSkuCount: number;
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  currency: string;
  couponCode: string | null;
  riskScore: number;
  assignedAgent: string;
  notes: string | null;
  tags: string[];
  items: OrderItem[];
}