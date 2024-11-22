import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/HeaderTop/header";
import NavBar from "@/components/Header/headerSticky";
import ProductDetailClient from "@/components/Product Detail/ProductDetail";

import { notFound } from "next/navigation";

interface Product {
  id: number;
  image: string;
  hoverImage: string;
  title: string;
  category: string;
  description: string;
  price: number;
  brand: string;
  slug: string;
  reviews: number;
  rating: number;
  specifications: string[];
}

interface ProductDetailProps {
  params: {
    slug: string;
  };
}

const ProductDetail = async ({ params }: ProductDetailProps) => {
  const { slug } = params;

  try {
    const res = await fetch(`http://localhost:2000/api/products/slug/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return notFound();
    }

    const product: Product = await res.json();

    return (
      <>
        <Header />
        <NavBar />
        <ProductDetailClient product={product} />
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return notFound();
  }
};

export default ProductDetail;
