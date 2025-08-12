export default interface Payment {
  id: string;
  order_id: string;
  transaction_id: string;
  liqpay_order_id: string;
  name: string;
  email: string;
  description: string;
  amount: number;
  status: string;
  payment_date: string;
  phone: string;
  currency: "UAH" | "USD";
}
