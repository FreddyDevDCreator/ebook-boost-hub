
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { FLUTTERWAVE_CONFIG } from "@/config/payment";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, navigate]);

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

  const config = {
    public_key: FLUTTERWAVE_CONFIG.publicKey,
    tx_ref: `tx_${Date.now()}`,
    amount: FLUTTERWAVE_CONFIG.amount,
    currency: FLUTTERWAVE_CONFIG.currency,
    payment_options: FLUTTERWAVE_CONFIG.payment_options,
    customer: {
      id: generateCustomerId(),
      email: formData.customerEmail,
      name: formData.customerName,
      phone_number: formData.phoneNumber,
    },
    customizations: {
      title: 'Node.js Performance Optimization Book',
      description: 'Payment for ebook',
      logo: 'https://res.cloudinary.com/del59phog/image/upload/v1737451299/wlrpccbwrj4aebtc6xvy.jpg',
    },
    meta: {
      source: 'web',
      consumer_id: generateCustomerId(),
    },
  };

  const handleFlutterPayment = async (response: any) => {
    console.log("Flutterwave response:", response);

    if (response.status === "completed" || response.status === "successful") {
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

  return (
    <>
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
                  <span className="font-semibold">₦25,000</span>
                </div>
              </div>

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
                  />
                </div>

                {formData.customerName && formData.customerEmail && formData.phoneNumber ? (
                  <FlutterWaveButton
                    {...config}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded"
                    callback={handleFlutterPayment}
                    onClose={() => closePaymentModal()}
                    text="Complete Purchase - ₦25,000"
                  />
                ) : (
                  <Button 
                    disabled 
                    className="w-full"
                  >
                    Please fill all fields
                  </Button>
                )}
              </div>
            </div>

            <p className="text-center text-sm text-gray-500">
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
            <p className="text-md text-gray-600">Your ebook has been sent to your email address.</p>
            <div className="mt-6 p-4 bg-green-50 rounded-md">
              <p className="text-sm text-green-600">
                Redirecting to homepage in a few seconds...
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Checkout;
