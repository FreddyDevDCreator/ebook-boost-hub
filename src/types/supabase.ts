
export type Tables = {
  blog_posts: {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    category: string;
    featured_image?: string;
    published_at: string;
    created_at?: string;
  };
  courses: {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    instructor: string;
    level: string;
    slug: string;
    duration: string;
    preview_content: string;
    preview_images: string[];
    created_at?: string;
  };
  contact_submissions: {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at?: string;
  };
  orders: {
    id: string;
    customer_name: string;
    customer_email: string;
    amount: number;
    status: string;
    created_at?: string;
  };
  profiles: {
    id: string;
    email: string;
    is_admin?: boolean;
    created_at?: string;
  };
  testimonials: {
    id: string;
    author_name: string;
    role?: string;
    content: string;
    rating?: number;
    created_at?: string;
  };
};
