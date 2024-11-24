import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/HeaderTop/header";
import NavBar from "@/components/Header/headerSticky";
import PostDetailClient from "@/components/PostDetailClient/PostDetailClient";
import { notFound } from "next/navigation";


interface Post {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  author: string;
  date: string;
  slug: string;
}

interface PostDetailProps {
  params: {
    slug: string;
  };
}

const PostDetail = async ({ params }: PostDetailProps) => {
  const { slug } = params;

  try {
    const res = await fetch(`http://localhost:2000/api/posts/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return notFound();
    }

    const post: Post = await res.json();

    return (
      <>
        <Header />
        <NavBar />
        <div className="bg-[#F4F5F7]">
        <PostDetailClient post={post} />
        </div>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }
};

export default PostDetail;
