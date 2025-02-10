
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      
      // Map specific images to specific posts
      return data?.map(post => {
        let imageUrl = post.featured_image;
        
        if (post.title === "Understanding the Node.js Event Loop") {
          imageUrl = "/lovable-uploads/5725d615-d33b-4de6-b8fc-3f8b95cef625.png";
        } else if (post.title === "10 Performance Optimization Tips") {
          imageUrl = "/lovable-uploads/20073a08-4de4-4097-8c6b-1a41938e37de.png";
        } else if (post.title === "Advanced Memory Management in Node.js") {
          imageUrl = "/lovable-uploads/f866da4b-6812-467a-8d43-2721f4f344dd.png";
        }
        
        return {
          ...post,
          featured_image: imageUrl
        };
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest Articles</h1>
          <p className="text-xl">Stay updated with the latest in Node.js performance optimization</p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={post.featured_image || "/placeholder.svg"}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <div className="text-sm text-emerald-600 mb-2">{post.category}</div>
                <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {new Date(post.published_at).toLocaleDateString()}
                  </div>
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Read More →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
