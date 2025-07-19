export default interface Tariff {
  id: string;
  order: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  discount_type: "percent" | "fixed" | "none";
  duration: "week" | "month" | "year";
}
