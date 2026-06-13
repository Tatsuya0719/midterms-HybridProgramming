interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://dummyjson.com/posts?limit=8", {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  return data.posts;
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1 className="page-title">Global Posts Feed (ISR)</h1>
      <p className="page-subtitle">Background Cache refreshing enabled (60s intervals)</p>
      
      <div className="posts-stack">
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <h2 className="product-title" style={{ fontSize: "1.25rem", marginBottom: "12px" }}>
              {post.title}
            </h2>
            <p style={{ color: "#475569", lineHeight: "1.6", margin: 0 }}>{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}