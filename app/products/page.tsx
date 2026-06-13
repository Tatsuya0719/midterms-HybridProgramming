import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products?limit=12");
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="page-title">Static Products Listing (SSG)</h1>
      <p className="page-subtitle">Pre-rendered static catalog compiled at build time.</p>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div>
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
            <Link href={`/products/${product.id}`} className="btn-primary">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}