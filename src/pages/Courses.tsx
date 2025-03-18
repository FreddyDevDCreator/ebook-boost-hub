
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, BookOpen, ArrowRight, Mail, FileX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";

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
  preview_images: string[];
}

const API_BASE_URL = "https://ebookbackend-mgpp.onrender.com";

const Courses = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [processingCourseId, setProcessingCourseId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/api/courses`);
      // Handle the API response structure correctly
      return response.data.courses || [];
    },
  });

  const handleGetFreeCourse = async (courseId: string, courseTitle: string) => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address to get this course for free.",
        variant: "destructive",
      });
      return;
    }

    setProcessingCourseId(courseId);

    try {
      await axios.post(`${API_BASE_URL}/api/courses/claim`, {
        courseId,
        email,
      });
      
      toast({
        title: "Success!",
        description: `${courseTitle} has been sent to your email.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim the course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingCourseId(null);
      setEmail("");
    }
  };

  // Show loading skeletons while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-gray-200 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state if API call fails
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Alert variant="destructive" className="mb-8">
            <AlertTitle>Error Loading Courses</AlertTitle>
            <AlertDescription>
              We encountered an error while loading courses. Please try again later.
            </AlertDescription>
          </Alert>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  // Show empty state if no courses are returned
  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center max-w-md mx-auto">
            <FileX className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Courses Available</h2>
            <p className="text-gray-500 mb-6">
              There are currently no courses available. Please check back later as we add new content regularly.
            </p>
            <Button onClick={() => window.location.reload()}>Refresh</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Available Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((course: Course) => (
            <Card key={course._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {course.preview_images && course.preview_images[0] && (
                <img
                  src={`${course.preview_images[0].startsWith('http') ? '' : '/placeholder.svg'}`}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.instructor}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.level}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col">
                <div className="w-full flex justify-between items-center mb-4">
                  <div className="text-lg font-bold">
                    <span className="line-through text-gray-400">{course.currency} {course.price.toLocaleString()}</span>
                    <span className="ml-2 text-green-600">FREE</span>
                  </div>
                  <Link to={`/courses/${course.slug}`}>
                    <Button variant="outline">
                      Preview Course
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="w-full pt-4 border-t border-gray-200">
                  <Label htmlFor={`email-${course._id}`} className="mb-2 block text-sm font-medium">
                    Enter your email to get this course for free
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      id={`email-${course._id}`}
                      type="email" 
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow"
                    />
                    <Button
                      onClick={() => handleGetFreeCourse(course._id, course.title)}
                      disabled={processingCourseId === course._id}
                    >
                      {processingCourseId === course._id ? (
                        "Processing..."
                      ) : (
                        <>
                          Get Free
                          <Mail className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
