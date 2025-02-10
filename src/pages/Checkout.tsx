
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Fixed price for the book
      const amount = 29.99;

      const { error } = await supabase.from("orders").insert({
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        amount: amount,
      });

      if (error) throw error;

      toast({
        title: "Order Successful!",
        description: "Thank you for your purchase. You will receive an email with further instructions.",
      });

      // Reset form and redirect
      setFormData({ customerName: "", customerEmail: "" });
      navigate("/");
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Error",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Checkout
          </h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
              <div className="flex justify-between items-center">
                <span>Node.js Performance Optimization Book</span>
                <span className="font-semibold">$29.99</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  id="customerName"
                  name="customerName"
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Complete Purchase - $29.99"}
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500">
            By completing this purchase, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
