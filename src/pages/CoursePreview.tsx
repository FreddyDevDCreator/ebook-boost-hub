
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Clock, BookOpen, ArrowLeft } from "lucide-react";

type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  preview_images: string[];
  preview_content: string;
  instructor: string;
  duration: string;
  level: string;
  slug: string;
};

const CoursePreview = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as Course;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
            <div className="h-96 bg-gray-200 rounded mb-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button onClick={() => navigate('/courses')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/courses')}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{course.level}</span>
              </div>
            </div>

            {course.preview_images?.length > 0 && (
              <div className="mb-8">
                <img
                  src={course.preview_images[0]}
                  alt={course.title}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}

            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">About this course</h2>
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              <h3 className="text-xl font-semibold mb-4">Course Preview Content</h3>
              <div className="bg-white rounded-lg p-6 shadow-md">
                {course.preview_content}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="text-3xl font-bold mb-4">
                {course.currency} {course.price.toLocaleString()}
              </div>
              <Button
                className="w-full mb-4"
                onClick={() => navigate(`/checkout/${course.slug}`)}
              >
                Enroll Now
              </Button>
              <div className="text-sm text-gray-500">
                <h4 className="font-semibold mb-2">This course includes:</h4>
                <ul className="space-y-2">
                  <li>• Full lifetime access</li>
                  <li>• Access on mobile and desktop</li>
                  <li>• Certificate of completion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
