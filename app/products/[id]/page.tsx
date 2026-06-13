import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCart";

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products?limit=12");
  const data = await res.json();
  return data.products.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id: string): Promise<ProductDetails> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) notFound();
  return res.json();
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div>
      <h1 className="page-title">Product Details (SSG)</h1>
      <p className="page-subtitle">Pre-rendered detail profile page generated at build time.</p>
      
      <div className="detail-card">
        <img src={product.thumbnail} alt={product.title} />
        <h2 className="product-title" style={{ fontSize: "1.75rem" }}>{product.title}</h2>
        <p style={{ color: "#475569", lineHeight: "1.6", margin: "12px 0 24px 0" }}>{product.description}</p>
        <div className="product-price" style={{ fontSize: "1.75rem" }}>${product.price.toFixed(2)}</div>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}