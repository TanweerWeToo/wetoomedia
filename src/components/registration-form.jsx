"use client";

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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);

      // Reset form
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
      });
    }, 1500);
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
                  className="focus-visible:ring-emerald-500"
                />
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
                  className="focus-visible:ring-emerald-500"
                />
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
                  className="focus-visible:ring-emerald-500"
                />
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
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                  className="focus-visible:ring-emerald-500"
                />
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
                  className="focus-visible:ring-emerald-500"
                />
                <p className="text-xs text-slate-500">
                  You must be between 18-60 years old
                </p>
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
                  className="focus-visible:ring-emerald-500"
                />
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
                  className="focus-visible:ring-emerald-500"
                />
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
                  className="focus-visible:ring-emerald-500"
                />
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
                  className="min-h-[80px] focus-visible:ring-emerald-500"
                />
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
