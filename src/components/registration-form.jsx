import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Add this helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function RegistrationFormDemo({ courseName }) {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    email: "",
    mobile: "",
    dob: "",
    state: "",
    degree: "",
    subject: "",
    gradYear: "",
    optionalPaper: "",
    comments: "",
    courseName: courseName,
    paid: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add validation state
  const [errors, setErrors] = useState({
    fullName: "",
    fatherName: "",
    email: "",
    mobile: "",
    dob: "",
    state: "",
    degree: "",
    subject: "",
    gradYear: "",
    optionalPaper: "",
  });

  // Add validation functions
  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "fullName":
        if (value.length < 3) {
          error = "Name must be at least 3 characters long";
        } else if (!/^[a-zA-Z\s]*$/.test(value)) {
          error = "Name should only contain letters and spaces";
        }
        break;

      case "fatherName":
        if (value.length < 3) {
          error = "Father's name must be at least 3 characters long";
        } else if (!/^[a-zA-Z\s]*$/.test(value)) {
          error = "Name should only contain letters and spaces";
        }
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "mobile":
        if (!/^[6-9]\d{9}$/.test(value)) {
          error = "Please enter a valid number (should start with 6-9 and be 10 digits)";
        }
        break;

      case "dob":
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18 || age > 60) {
          error = "Age must be between 18 and 60 years";
        }
        break;

      case "degree":
        if (value.length < 2) {
          error = "Please enter a valid degree";
        }
        break;

      case "subject":
        if (value.length < 2) {
          error = "Please enter a valid subject";
        }
        break;

      case "optionalPaper":
        if (value.length < 2) {
          error = "Please enter a valid optional paper";
        }
        break;

      default:
        break;
    }
    return error;
  };

  // Update handleInputChange to include validation
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Validate field and update errors
    const error = validateField(id, value);
    setErrors((prev) => ({
      ...prev,
      [id]: error,
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    const error = validateField(id, value);
    setErrors((prev) => ({
      ...prev,
      [id]: error,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate all fields
    let newErrors = {};
    let hasErrors = false;
    
    Object.keys(formData).forEach(key => {
      if (key !== "comments" && key !== "courseName" && key !== "paid") {
        const error = validateField(key, formData[key]);
        if (error) {
          hasErrors = true;
          newErrors[key] = error;
        }
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a new object with formatted date
      const formattedData = {
        ...formData,
        dob: formatDate(formData.dob) // Format the date before sending
      };

      const response = await toast.promise(
        axios.post(
          "https://powderblue-ibis-363059.hostingersite.com/register.php",
          formattedData, // Send the formatted data
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
        {
          pending: "Registering your account...",
          success: "Registration successful!",
          error: {
            render({ data }) {
              const errorMessage = data?.response?.data?.message || "Registration failed. Please try again";
              return errorMessage;
            },
          },
        }
      );

      // Reset form on success
      setFormData({
        fullName: "",
        fatherName: "",
        email: "",
        mobile: "",
        dob: "",
        state: "",
        degree: "",
        subject: "",
        gradYear: "",
        optionalPaper: "",
        comments: "",
        courseName: courseName,
        paid: false,
      });
      setErrors({});

    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const graduationYears = Array.from(
    { length: 15 },
    (_, i) => new Date().getFullYear() - i
  );

  // Get today's date in YYYY-MM-DD format for max date attribute
  const today = new Date().toISOString().split("T")[0];

  // Calculate date 60 years ago for min date attribute (minimum age)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 60);
  const minDateString = minDate.toISOString().split("T")[0];

  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
      
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full !gap-5 bg-accent hover:bg-accent/80 text-white">
            Register Now <ArrowRight className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-emerald-700">
              Registration Form
            </DialogTitle>
            <DialogDescription>
              Please fill in your details to register for{" "}
              <span className="font-medium text-emerald-600">{courseName}</span>
            </DialogDescription>
          </DialogHeader>

          <ScrollArea type="always" className="h-[70vh]">
            <form onSubmit={handleSubmit} className="space-y-4 p-1 pr-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className={`focus-visible:ring-emerald-500 ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherName" className="text-sm font-medium">
                  Father's Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your father's name"
                  className={`focus-visible:ring-emerald-500 ${
                    errors.fatherName ? "border-red-500" : ""
                  }`}
                />
                {errors.fatherName && (
                  <p className="text-xs text-red-500">{errors.fatherName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="example@email.com"
                  className={`focus-visible:ring-emerald-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  placeholder="Valid mobile number (10 digits)"
                  pattern="[6-9][0-9]{9}"
                  className={`focus-visible:ring-emerald-500 ${
                    errors.mobile ? "border-red-500" : ""
                  }`}
                />
                {errors.mobile && (
                  <p className="text-xs text-red-500">{errors.mobile}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob" className="text-sm font-medium">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  min={minDateString}
                  max={today}
                  className={`focus-visible:ring-emerald-500 ${
                    errors.dob ? "border-red-500" : ""
                  }`}
                />
                <p className="text-xs text-slate-500">
                  You must be between 18-60 years old
                </p>
                {errors.dob && (
                  <p className="text-xs text-red-500">{errors.dob}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium">
                  State <span className="text-red-500">*</span>
                </Label>
                <Select
                  className=""
                  required
                  onValueChange={(value) => handleSelectChange("state", value)}
                  value={formData.state}
                >
                  <SelectTrigger className="w-full border bg-background text-foreground shadow-sm focus-visible:ring-emerald-500">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {indianStates.map((state) => (
                      <SelectItem
                        key={state}
                        value={state.toLowerCase().replace(/\s+/g, "-")}
                        className="hover:bg-gray-100"
                      >
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-xs text-red-500">{errors.state}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="degree" className="text-sm font-medium">
                  Recent Degree/Course Completed{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., B.Tech, B.A., M.Sc."
                  className={`focus-visible:ring-emerald-500 ${
                    errors.degree ? "border-red-500" : ""
                  }`}
                />
                {errors.degree && (
                  <p className="text-xs text-red-500">{errors.degree}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">
                  Graduation Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Computer Science, Economics"
                  className={`focus-visible:ring-emerald-500 ${
                    errors.subject ? "border-red-500" : ""
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-red-500">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gradYear" className="text-sm font-medium">
                  Graduation Year <span className="text-red-500">*</span>
                </Label>
                <Select
                  required
                  onValueChange={(value) =>
                    handleSelectChange("gradYear", value)
                  }
                  value={formData.gradYear}
                >
                  <SelectTrigger className="w-full border bg-background text-foreground shadow-sm focus-visible:ring-emerald-500">
                    <SelectValue placeholder="Select graduation year" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {graduationYears.map((year) => (
                      <SelectItem
                        key={year}
                        value={year.toString()}
                        className="hover:bg-accent"
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.gradYear && (
                  <p className="text-xs text-red-500">{errors.gradYear}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="optionalPaper" className="text-sm font-medium">
                  Optional Paper for UPSC Exam{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="optionalPaper"
                  value={formData.optionalPaper}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Public Administration, Geography"
                  className={`focus-visible:ring-emerald-500 ${
                    errors.optionalPaper ? "border-red-500" : ""
                  }`}
                />
                {errors.optionalPaper && (
                  <p className="text-xs text-red-500">{errors.optionalPaper}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments" className="text-sm font-medium">
                  Comments/Remarks (optional)
                </Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  placeholder="Any additional information you'd like to share"
                  className={`min-h-[80px] focus-visible:ring-emerald-500 ${
                    errors.comments ? "border-red-500" : ""
                  }`}
                />
                {errors.comments && (
                  <p className="text-xs text-red-500">{errors.comments}</p>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <span className="flex items-center gap-2">
                      Enroll Now
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>

              <p className="text-xs text-center text-slate-500 pt-2">
                By registering, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
