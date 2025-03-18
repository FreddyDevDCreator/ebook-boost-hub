
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, ArrowLeft, Mail, FileX } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

const API_BASE_URL = "https://ebookbackend-mgpp.onrender.com";

interface Course {
  _id: string;
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
}

const CoursePreview = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Course slug is required');
      
      const response = await axios.get(`${API_BASE_URL}/api/courses/slug/${slug}`);
      return response.data; // API should return a single course
    },
    enabled: !!slug,
  });

  const handleGetFreeCourse = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address to get this course for free.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API_BASE_URL}/api/courses/claim`, {
        courseId: course?._id,
        email,
      });
      
      toast({
        title: "Success!",
        description: `${course?.title} has been sent to your email.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim the course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setEmail("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              <Skeleton className="h-64 w-full mb-8" />
              <Skeleton className="h-8 w-1/3 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <Skeleton className="h-8 w-1/4 mb-4" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
            <div className="md:col-span-1">
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
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
          
          <Alert variant="destructive" className="mb-8">
            <AlertTitle>Error Loading Course</AlertTitle>
            <AlertDescription>
              We encountered an error while loading this course. Please try again later.
            </AlertDescription>
          </Alert>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  // Show "not found" state when course doesn't exist
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/courses')}
            className="mb-8 mx-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
          
          <div className="flex flex-col items-center justify-center max-w-md mx-auto">
            <FileX className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
            <p className="text-gray-500 mb-6">
              The course you're looking for could not be found. It may have been removed or the URL might be incorrect.
            </p>
            <Button onClick={() => navigate('/courses')}>Browse All Courses</Button>
          </div>
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
                  src={`${course.preview_images[0].startsWith('http') ? course.preview_images[0] : '/placeholder.svg'}`}
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
                {course.preview_content || "No preview content available for this course."}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="text-3xl font-bold mb-4 flex items-center">
                <span className="line-through text-gray-400">{course.currency} {course.price.toLocaleString()}</span>
                <span className="ml-2 text-green-600">FREE</span>
              </div>
              
              <div className="space-y-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Enter your email to get this course for free
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
                <Button
                  className="w-full"
                  onClick={handleGetFreeCourse}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : (
                    <>
                      Get Free Course
                      <Mail className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              
              <div className="text-sm text-gray-500 mt-6">
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
