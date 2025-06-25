export default interface Payment {
  id: string;
  name: string;
  email: string;
  description: string;
  amount: number;
  status: string;
  payment_date: string;
}
