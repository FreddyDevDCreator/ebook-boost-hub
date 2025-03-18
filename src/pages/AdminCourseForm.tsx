
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";

const API_BASE_URL = "https://ebookbackend-mgpp.onrender.com";

type CourseFormData = {
  title: string;
  description: string;
  price: number;
  instructor: string;
  level: string;
  slug: string;
  duration: string;
  preview_content: string;
  currency: string;
  preview_images?: string[];
};

const AdminCourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CourseFormData>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      instructor: "",
      level: "beginner",
      slug: "",
      duration: "8 weeks",
      preview_content: "",
      currency: "USD",
      preview_images: [],
    },
  });

  // Fetch course data if editing
  const { isLoading: isFetchingCourse, error: fetchError } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await axios.get(`${API_BASE_URL}/api/courses/${id}`);
      return response.data;
    },
    enabled: !!id,
    meta: {
      onSuccess: (data: any) => {
        if (data) {
          form.reset(data);
        }
      }
    }
  });

  // Handle fetch error with useEffect
  useEffect(() => {
    if (fetchError) {
      toast.error("Failed to fetch course details");
      navigate("/admin/courses");
    }
  }, [fetchError, navigate]);

  // Create/Update mutation
  const mutation = useMutation({
    mutationFn: async (data: CourseFormData) => {
      if (id) {
        return axios.put(`${API_BASE_URL}/api/courses/${id}`, data);
      } else {
        return axios.post(`${API_BASE_URL}/api/courses`, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      toast.success(id ? "Course updated successfully" : "Course created successfully");
      navigate("/admin/courses");
    },
    onError: () => {
      toast.error(id ? "Failed to update course" : "Failed to create course");
    }
  });

  // Use an effect to handle setting form data when course data is fetched
  useEffect(() => {
    // This effect will run once the query has been executed
    const fetchData = async () => {
      if (!id) return;
      
      try {
        const response = await axios.get(`${API_BASE_URL}/api/courses/${id}`);
        if (response.data) {
          form.reset(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch course details");
        navigate("/admin/courses");
      }
    };
    
    if (id) {
      fetchData();
    }
  }, [id, form, navigate]);

  const onSubmit = async (data: CourseFormData) => {
    try {
      setIsLoading(true);
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error("Error saving course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Edit Course" : "Add New Course"}
      </h1>

      {isFetchingCourse && <div className="text-center py-4">Loading course data...</div>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="NGN">NGN</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="instructor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructor</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., 8 weeks" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="course-name-slug" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="preview_content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preview Content</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Enter course preview content"
                    className="min-h-[150px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/courses")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {id ? "Update Course" : "Create Course"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminCourseForm;
