"use client"

import React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { format } from "date-fns"
import {
  CalendarIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  GraduationCap,
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  FileText,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const formatDate = (date) => {
  if (!date) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function RegistrationForm({ courseName, courseColor = "emerald" }) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState()
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Refs for inputs to maintain focus
  const inputRefs = {
    fullName: useRef(null),
    fatherName: useRef(null),
    email: useRef(null),
    mobile: useRef(null),
    recentDegree: useRef(null),
    graduationSubject: useRef(null),
    optionalPaper: useRef(null),
    comments: useRef(null),
  }

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    email: "",
    mobile: "",
    dob: "",
    state: "",
    recentDegree: "",
    graduationSubject: "",
    graduationYear: "",
    optionalPaper: "",
    comments: "",
  })

  // Validation errors state
  const [errors, setErrors] = useState({})

  // Field status (for showing success icons)
  const [fieldStatus, setFieldStatus] = useState({})

  // Track if field has been touched (for validation timing)
  const [touched, setTouched] = useState({})

  // Color theme based on course
  const colorMap = {
    emerald: {
      primary: "bg-emerald-600 hover:bg-emerald-700 text-white",
      light: "bg-emerald-50 text-emerald-800",
      border: "border-emerald-200 focus:border-emerald-500",
      icon: "text-emerald-600",
      badge: "bg-emerald-100 text-emerald-800",
      success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    },
    blue: {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      light: "bg-blue-50 text-blue-800",
      border: "border-blue-200 focus:border-blue-500",
      icon: "text-blue-600",
      badge: "bg-blue-100 text-blue-800",
      success: "bg-blue-50 border-blue-200 text-blue-800",
    },
    purple: {
      primary: "bg-purple-600 hover:bg-purple-700 text-white",
      light: "bg-purple-50 text-purple-800",
      border: "border-purple-200 focus:border-purple-500",
      icon: "text-purple-600",
      badge: "bg-purple-100 text-purple-800",
      success: "bg-purple-50 border-purple-200 text-purple-800",
    },
  }

  const colors = colorMap[courseColor] || colorMap.emerald

  // States list for dropdown
  const states = [
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
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
    "Chandigarh",
  ]

  // Graduation years (current year - 30 to current year)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 31 }, (_, i) => currentYear - 30 + i)

  // Handle input change without immediate validation
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Mark as touched
    if (!touched[name]) {
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }))
    }
  }

  // Handle input blur for validation
  const handleBlur = (name) => {
    validateField(name, formData[name])
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  // Handle select change
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    validateField(name, value)
  }

  // Handle date change
  const handleDateChange = (date) => {
    setDate(date);
    const formattedDate = date ? formatDate(date) : "";
    setFormData({
      ...formData,
      dob: formattedDate,
    });

    setTouched((prev) => ({
      ...prev,
      dob: true,
    }));

    validateField("dob", formattedDate);
  }

  // Validate a single field
  const validateField = (name, value) => {
    let error = ""
    let isValid = true

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Full name is required"
          isValid = false
        }
        break
      case "fatherName":
        if (!value.trim()) {
          error = "Father's name is required"
          isValid = false
        }
        break
      case "email":
        if (!value.trim()) {
          error = "Email is required"
          isValid = false
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid"
          isValid = false
        }
        break
      case "mobile":
        if (!value.trim()) {
          error = "Mobile number is required"
          isValid = false
        } else if (!/^[0-9]{10}$/.test(value)) {
          error = "Must be 10 digits"
          isValid = false
        }
        break
      case "dob":
        if (!value) {
          error = "Date of birth is required"
          isValid = false
        }
        break
      case "state":
        if (!value) {
          error = "State is required"
          isValid = false
        }
        break
      case "recentDegree":
        if (!value.trim()) {
          error = "Recent degree is required"
          isValid = false
        }
        break
      case "graduationSubject":
        if (!value.trim()) {
          error = "Graduation subject is required"
          isValid = false
        }
        break
      case "graduationYear":
        if (!value) {
          error = "Graduation year is required"
          isValid = false
        }
        break
      default:
        break
    }

    // Update errors
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))

    // Update field status
    setFieldStatus((prev) => ({
      ...prev,
      [name]: value && isValid ? "success" : "",
    }))

    return isValid
  }

  // Validate form
  const validateForm = () => {
    const fields = [
      "fullName",
      "fatherName",
      "email",
      "mobile",
      "dob",
      "state",
      "recentDegree",
      "graduationSubject",
      "graduationYear",
    ]

    let isValid = true
    const newErrors = {}
    const newFieldStatus = {}
    const newTouched = {}

    fields.forEach((field) => {
      newTouched[field] = true
      const fieldIsValid = validateField(field, formData[field])
      if (!fieldIsValid) {
        isValid = false
        newErrors[field] = errors[field] || `${field} is invalid`
        newFieldStatus[field] = ""
      } else {
        newFieldStatus[field] = "success"
      }
    })

    setErrors(newErrors)
    setFieldStatus(newFieldStatus)
    setTouched(newTouched)
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive",
      })

      // Focus the first field with an error
      for (const field of Object.keys(errors)) {
        if (errors[field] && inputRefs[field]?.current) {
          inputRefs[field].current.focus()
          break
        }
      }

      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Replace with your actual API endpoint
      // const response = await axios.post("/api/register", formData)

      toast({
        title: "Registration Successful",
        description: "Your registration has been submitted successfully.",
      })

      setFormSubmitted(true)

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          fullName: "",
          fatherName: "",
          email: "",
          mobile: "",
          dob: "",
          state: "",
          recentDegree: "",
          graduationSubject: "",
          graduationYear: "",
          optionalPaper: "",
          comments: "",
        })
        setDate(null)
        setFieldStatus({})
        setFormSubmitted(false)
        setTouched({})
        setOpen(false)
      }, 2000)
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Input with validation
  const FormInput = ({ label, name, type = "text", placeholder, maxLength, required = false, icon = null }) => (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-sm font-medium flex items-center gap-1.5">
        {icon && React.cloneElement(icon, { className: "h-4 w-4" })}
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          onBlur={() => handleBlur(name)}
          placeholder={placeholder}
          maxLength={maxLength}
          ref={inputRefs[name]}
          className={cn(
            "transition-all duration-200 pr-10",
            touched[name] && errors[name]
              ? "border-red-500 focus-visible:ring-red-500"
              : touched[name] && fieldStatus[name] === "success"
                ? "border-green-500 focus-visible:ring-green-500"
                : "",
          )}
          disabled={isSubmitting || formSubmitted}
        />
        {touched[name] && errors[name] && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
        )}
        {touched[name] && fieldStatus[name] === "success" && !errors[name] && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
        )}
      </div>
      {touched[name] && errors[name] && <p className="text-red-500 text-xs animate-fadeIn">{errors[name]}</p>}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="bg-accent hover:bg-accent/80 text-white">
          Enroll Now
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden border-0 shadow-xl">
        <div className={`px-6 py-4 ${colors.light} border-b`}>
          <DialogTitle className="text-xl font-bold text-center">
            {formSubmitted ? "Enrollment Complete!" : `Enroll Now`}
          </DialogTitle>
          {!formSubmitted && (
            <p className="text-center text-muted-foreground text-sm mt-1">
              Please fill in your details to complete enrollment
            </p>
          )}
        </div>

        <ScrollArea className="max-h-[70vh] px-6 pb-6">
          {formSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className={`mx-auto rounded-full p-3 w-16 h-16 flex items-center justify-center ${colors.success}`}>
                <CheckCircle2 className={`h-8 w-8 ${colors.icon}`} />
              </div>
              <h3 className="font-semibold text-lg">Enrollment Successful!</h3>
              <p className="text-muted-foreground">
                Thank you for enrolling in the course. We'll contact you shortly with further details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className={`h-4 w-4 ${colors.icon}`} />
                  <h3 className="font-medium text-sm uppercase tracking-wide">Personal Information</h3>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput label="Full Name" name="fullName" placeholder="Enter your full name" required />
                    <FormInput label="Father's Name" name="fatherName" placeholder="Enter father's name" required />
                  </div>
                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    icon={<Mail />}
                  />
                  <FormInput
                    label="Mobile Number"
                    name="mobile"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    required
                    icon={<Phone />}
                  />

                  {/* Date of Birth */}
                  <div className="space-y-1.5">
                    <Label htmlFor="dob" className="text-sm font-medium flex items-center gap-1.5">
                      <CalendarIcon className="h-4 w-4" />
                      Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal transition-all duration-200",
                              !formData.dob && "text-muted-foreground",
                              touched.dob && errors.dob
                                ? "border-red-500"
                                : touched.dob && fieldStatus.dob === "success"
                                  ? "border-green-500"
                                  : "",
                              "pr-10",
                            )}
                            disabled={isSubmitting || formSubmitted}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.dob ? formData.dob : "DD/MM/YYYY"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateChange}
                            disabled={(date) => date > new Date() || date < new Date("1940-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {touched.dob && errors.dob && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                      )}
                      {touched.dob && fieldStatus.dob === "success" && !errors.dob && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                      )}
                    </div>
                    {touched.dob && errors.dob && <p className="text-red-500 text-xs animate-fadeIn">{errors.dob}</p>}
                  </div>

                  {/* State */}
                  <div className="space-y-1.5">
                    <Label htmlFor="state" className="text-sm font-medium flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      State <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Select
                        value={formData.state}
                        onValueChange={(value) => handleSelectChange("state", value)}
                        disabled={isSubmitting || formSubmitted}
                      >
                        <SelectTrigger
                          className={cn(
                            "transition-all duration-200",
                            touched.state && errors.state
                              ? "border-red-500"
                              : touched.state && fieldStatus.state === "success"
                                ? "border-green-500"
                                : "",
                            "pr-10",
                          )}
                        >
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {touched.state && errors.state && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                      )}
                      {touched.state && fieldStatus.state === "success" && !errors.state && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                      )}
                    </div>
                    {touched.state && errors.state && (
                      <p className="text-red-500 text-xs animate-fadeIn">{errors.state}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className={`h-4 w-4 ${colors.icon}`} />
                  <h3 className="font-medium text-sm uppercase tracking-wide">Education Details</h3>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-4">
                  <FormInput
                    label="Recent Degree/Course"
                    name="recentDegree"
                    placeholder="e.g., B.A., B.Sc., M.A."
                    required
                    icon={<BookOpen />}
                  />
                  <FormInput
                    label="Graduation Subject"
                    name="graduationSubject"
                    placeholder="e.g., Economics, Physics"
                    required
                    icon={<BookOpen />}
                  />

                  {/* Graduation Year */}
                  <div className="space-y-1.5">
                    <Label htmlFor="graduationYear" className="text-sm font-medium flex items-center gap-1.5">
                      <CalendarIcon className="h-4 w-4" />
                      Graduation Year <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Select
                        value={formData.graduationYear}
                        onValueChange={(value) => handleSelectChange("graduationYear", value)}
                        disabled={isSubmitting || formSubmitted}
                      >
                        <SelectTrigger
                          className={cn(
                            "transition-all duration-200",
                            touched.graduationYear && errors.graduationYear
                              ? "border-red-500"
                              : touched.graduationYear && fieldStatus.graduationYear === "success"
                                ? "border-green-500"
                                : "",
                            "pr-10",
                          )}
                        >
                          <SelectValue placeholder="Select graduation year" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {touched.graduationYear && errors.graduationYear && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                      )}
                      {touched.graduationYear && fieldStatus.graduationYear === "success" && !errors.graduationYear && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                      )}
                    </div>
                    {touched.graduationYear && errors.graduationYear && (
                      <p className="text-red-500 text-xs animate-fadeIn">{errors.graduationYear}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* UPSC Specific Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className={`h-4 w-4 ${colors.icon}`} />
                  <h3 className="font-medium text-sm uppercase tracking-wide">UPSC Specific Details</h3>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-4">
                  <FormInput
                    label="Optional Paper for UPSC Exam"
                    name="optionalPaper"
                    placeholder="e.g., Geography, Public Administration"
                    icon={<FileText />}
                  />

                  {/* Comments/Remarks */}
                  <div className="space-y-1.5">
                    <Label htmlFor="comments" className="text-sm font-medium flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      Comments/Remarks (Optional)
                    </Label>
                    <Textarea
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      placeholder="Any additional information or requirements"
                      rows={3}
                      disabled={isSubmitting || formSubmitted}
                      ref={inputRefs.comments}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Badge variant="outline" className={colors.badge}>
                  {courseName}
                </Badge>
                <div className="mt-4">
                  <Button
                    type="submit"
                    className={`w-full ${colors.primary} transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}
                    disabled={isSubmitting || formSubmitted}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </Button>
                </div>

                <p className="text-center text-xs text-muted-foreground pt-4">
                  By registering, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </form>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
