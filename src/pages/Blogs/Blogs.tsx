import "./Blogs.css";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 10 Tips for a Safe Road Trip",
    excerpt: "Planning a road trip? Here are essential tips to ensure your journey is safe and enjoyable.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    date: "March 15, 2024",
    author: "John Doe"
  },
  {
    id: 2,
    title: "Choosing the Right Car for Your Vacation",
    excerpt: "Learn how to select the perfect vehicle based on your travel needs, group size, and destination.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c538c40b?w=600&h=400&fit=crop",
    date: "March 10, 2024",
    author: "Sarah Smith"
  },
  {
    id: 3,
    title: "Understanding Car Rental Insurance",
    excerpt: "A comprehensive guide to car rental insurance options and what coverage you actually need.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    date: "March 5, 2024",
    author: "Mike Johnson"
  },
  {
    id: 4,
    title: "Best Destinations for a Weekend Getaway",
    excerpt: "Discover amazing destinations perfect for a weekend road trip adventure.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
    date: "February 28, 2024",
    author: "Emily Davis"
  }
];

export default function Blogs(): React.JSX.Element {
  return (
    <div className="blogs-page">
      <div className="blogs-hero">
        <div className="container">
          <h1>Our Blog</h1>
          <p>Stay updated with the latest tips, guides, and news</p>
        </div>
      </div>

      <div className="container">
        <div className="blogs-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-author">By {post.author}</span>
                </div>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <a href="#" className="read-more">Read More →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

