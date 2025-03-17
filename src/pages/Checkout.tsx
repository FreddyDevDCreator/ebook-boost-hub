
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { FLUTTERWAVE_CONFIG } from "@/config/payment";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/types/supabase";
import { ShoppingCart, CreditCard, Shield, Clock, Check } from "lucide-react";

type Course = Tables["courses"];
type Order = Tables["orders"];

const Checkout = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    phoneNumber: "",
  });

  // Determine if we're checking out an ebook or a course
  const isEbook = courseSlug?.startsWith('ebook-');
  const ebookTier = isEbook ? courseSlug.replace('ebook-', '') : null;

  // Calculate the price based on the ebook tier
  const getEbookPrice = (): number => {
    if (ebookTier === 'basic') return 29.99;
    if (ebookTier === 'pro') return 49.99;
    if (ebookTier === 'premium') return 99.99;
    return 0;
  };

  // For ebooks, we don't need to query the database
  const ebookDetails = isEbook ? {
    title: `Node.js Book - ${ebookTier?.charAt(0).toUpperCase()}${ebookTier?.slice(1)} Package`,
    price: getEbookPrice(),
    currency: 'USD',
    id: `ebook-${ebookTier}`
  } : null;

  // Only query the database for courses, not for ebooks
  const { data: course } = useQuery({
    queryKey: ['course', courseSlug],
    queryFn: async () => {
      if (isEbook) {
        return ebookDetails as Course;
      }
      
      const { data, error } = await supabase
        .from('courses')
        .select('id, title, price, currency')
        .eq('slug', courseSlug)
        .single();
      
      if (error) throw error;
      return data as Course;
    },
    // Initialize with the ebook details if it's an ebook checkout
    initialData: isEbook ? ebookDetails as Course : undefined,
  });

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        navigate(isEbook ? "/book" : "/courses");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, navigate, isEbook]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateCustomerId = () => {
    return `cust_${Date.now()}${Math.random().toString(36).substring(2, 7)}`;
  };

  const config = course ? {
    public_key: FLUTTERWAVE_CONFIG.publicKey,
    tx_ref: `tx_${Date.now()}`,
    amount: course.price,
    currency: course.currency,
    payment_options: FLUTTERWAVE_CONFIG.payment_options,
    customer: {
      id: generateCustomerId(),
      email: formData.customerEmail,
      name: formData.customerName,
      phone_number: formData.phoneNumber,
    },
    customizations: {
      title: course.title,
      description: `Payment for ${course.title}`,
      logo: 'https://res.cloudinary.com/del59phog/image/upload/v1737451299/wlrpccbwrj4aebtc6xvy.jpg',
    },
    meta: {
      source: 'web',
      consumer_id: generateCustomerId(),
      course_id: course.id,
    },
  } : null;

  const handleFlutterPayment = async (response: any) => {
    console.log("Flutterwave response:", response);

    if (response.status === "completed" || response.status === "successful") {
      // Make sure we have the course price value
      if (!course || typeof course.price !== 'number') {
        toast({
          title: "Error",
          description: "Could not process payment: course information missing",
          variant: "destructive",
        });
        return;
      }

      // Save order to database with required fields
      const orderData = {
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        amount: course.price,  // Ensure amount is always provided
        status: 'completed'
      };

      const { error } = await supabase
        .from('orders')
        .insert(orderData);

      if (error) {
        console.error('Error saving order:', error);
        toast({
          title: "Error",
          description: "There was a problem saving your order. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      setShowSuccessModal(true);
      setFormData({ customerName: "", customerEmail: "", phoneNumber: "" });
    } else {
      toast({
        title: "Payment Failed",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      });
    }
    closePaymentModal();
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate(isEbook ? '/book' : '/courses')}>Back</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Checkout
            </h1>
            <p className="text-center text-gray-600 mb-8">Complete your purchase to gain access to {course.title}</p>

            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-6 pb-4 border-b">Personal Information</h2>
                  
                  <div className="space-y-4">
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
                        className="w-full"
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
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="08012345678"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 pb-4 border-b">Payment Method</h2>
                  <div className="flex items-center mb-4">
                    <CreditCard className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">Card Payment</span>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-gray-50 mb-4">
                    <p className="text-sm text-gray-600">
                      All transactions are secure and encrypted. Your payment details are processed securely.
                    </p>
                  </div>

                  {formData.customerName && formData.customerEmail && formData.phoneNumber && config ? (
                    <FlutterWaveButton
                      {...config}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-md transition"
                      callback={handleFlutterPayment}
                      onClose={() => closePaymentModal()}
                      text={`Complete Purchase - ${course.currency} ${course.price.toLocaleString()}`}
                    />
                  ) : (
                    <Button 
                      disabled 
                      className="w-full py-3"
                    >
                      Please fill all fields
                    </Button>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4 pb-4 border-b">Order Summary</h2>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">{course.title}</span>
                      <span className="font-semibold">
                        {course.currency} {course.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center mb-1">
                        <span>Subtotal</span>
                        <span>{course.currency} {course.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-600 text-sm mb-1">
                        <span>Tax</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between items-center font-bold text-lg pt-2 border-t mt-2">
                        <span>Total</span>
                        <span>{course.currency} {course.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <Shield className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Lifetime Access</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Satisfaction Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500 mt-8">
              By completing this purchase, you agree to our terms and conditions.
            </p>
          </div>
        </div>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent 
          className="sm:max-w-md bg-white p-6 rounded-lg shadow-xl border-2 border-green-500"
          aria-describedby="payment-success-description"
        >
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-green-600">
              Payment Successful! 🎉
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4 mt-4">
            <p id="payment-success-description" className="text-lg font-medium text-gray-800">Thank you for your purchase!</p>
            <p className="text-md text-gray-600">
              {isEbook ? "Your ebook access details" : "Course access details"} have been sent to your email address.
            </p>
            <div className="mt-6 p-4 bg-green-50 rounded-md">
              <p className="text-sm text-green-600">
                Redirecting to {isEbook ? "ebooks" : "courses"} page in a few seconds...
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Checkout;
