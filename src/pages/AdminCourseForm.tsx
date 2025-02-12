
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type CourseFormData = {
  title: string;
  description: string;
  price: number;
  instructor: string;
  level: string;
  slug: string;
};

const AdminCourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CourseFormData>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      instructor: "",
      level: "beginner",
      slug: "",
    },
  });

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          form.reset(data);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("Failed to fetch course details");
        navigate("/admin/courses");
      }
    };

    fetchCourse();
  }, [id, form, navigate]);

  const onSubmit = async (data: CourseFormData) => {
    try {
      setIsLoading(true);

      if (id) {
        // Update existing course
        const { error } = await supabase
          .from("courses")
          .update(data)
          .eq("id", id);

        if (error) throw error;
        toast.success("Course updated successfully");
      } else {
        // Create new course
        const { error } = await supabase
          .from("courses")
          .insert([data]);

        if (error) throw error;
        toast.success("Course created successfully");
      }

      navigate("/admin/courses");
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error(id ? "Failed to update course" : "Failed to create course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Edit Course" : "Add New Course"}
      </h1>

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
                  <Input {...field} />
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
