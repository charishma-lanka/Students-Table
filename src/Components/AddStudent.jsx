import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {
  ArrowLeft,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  Award,
  AlertCircle,
  Upload,
  Loader,
} from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";

const AddStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Cancel confirmation modal state
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return "";
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Check for duplicate student
  const checkDuplicateStudent = (firstName, lastName, phone) => {
    const existingStudents = JSON.parse(localStorage.getItem('students') || '[]');
    const fullName = `${firstName} ${lastName}`.toLowerCase().trim();
    
    return existingStudents.some(student => {
      const studentName = (student.name || `${student.firstName} ${student.lastName}`).toLowerCase().trim();
      const nameMatch = studentName === fullName;
      const phoneMatch = student.phone === phone;
      
      return nameMatch && phoneMatch;
    });
  };

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    bloodGroup: "",
    
    // Academic Information
    admissionNumber: "",
    admissionDate: "",
    class: "",
    section: "",
    rollNumber: "",
    
    // Address Information
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    
    // Parent/Guardian Information
    fatherName: "",
    fatherPhone: "",
    fatherEmail: "",
    fatherOccupation: "",
    motherName: "",
    motherPhone: "",
    motherEmail: "",
    motherOccupation: "",
    
    // Emergency Contact
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    
    // Other
    previousSchool: "",
    remarks: "",
    status: "Active",
  });

  // Required fields 
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "dateOfBirth",
    "gender",
    "class",
    "section",
  ];

 // Validate email - ONLY GMAIL allowed
const validateEmail = (email) => {
  // First check basic format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Please enter a valid email address" };
  }
  
  // Check if it ends with @gmail.com
  if (!email.toLowerCase().endsWith('@gmail.com')) {
    return { valid: false, message: "Only Gmail addresses are allowed" };
  }
  
  return { valid: true };
};

  // Handle input change with phone validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Phone number validation 
    if (name.includes("phone") || name.includes("Phone") || name === "emergencyContactPhone") {
      // Allow only digits and limit to 10
      const digitsOnly = value.replace(/\D/g, '');
      const limitedDigits = digitsOnly.slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: limitedDigits }));
    } else if (name === "dateOfBirth") {
      const age = calculateAge(value);
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        age: age 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  // Validate single field
  const validateField = (name, value) => {
    let error = "";
    
    if (requiredFields.includes(name) && !value) {
      error = "This field is required";
    } else if (name === "email" && value) {
      const emailValidation = validateEmail(value);
      if (!emailValidation.valid) {
        error = emailValidation.message;
      }
    } else if ((name.includes("phone") || name.includes("Phone") || name === "emergencyContactPhone") && value) {
      if (value.length !== 10) {
        error = "Phone number must be exactly 10 digits";
      }
    } else if (name === "pincode" && value) {
      const pincodeRegex = /^[0-9]{6}$/;
      if (!pincodeRegex.test(value)) {
        error = "Please enter a valid 6-digit pincode";
      }
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });
    
    // Email validation - ONLY GMAIL
    if (formData.email) {
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.valid) {
        newErrors.email = emailValidation.message;
        isValid = false;
      }
    }
    
    // Validate phone numbers - exactly 10 digits
    if (formData.phone) {
      if (formData.phone.length !== 10) {
        newErrors.phone = "Phone number must be exactly 10 digits";
        isValid = false;
      }
    }
    
    if (formData.fatherPhone && formData.fatherPhone.length !== 10) {
      newErrors.fatherPhone = "Phone number must be exactly 10 digits";
      isValid = false;
    }
    
    if (formData.motherPhone && formData.motherPhone.length !== 10) {
      newErrors.motherPhone = "Phone number must be exactly 10 digits";
      isValid = false;
    }
    
    if (formData.alternatePhone && formData.alternatePhone.length !== 10) {
      newErrors.alternatePhone = "Phone number must be exactly 10 digits";
      isValid = false;
    }
    
    if (formData.emergencyContactPhone && formData.emergencyContactPhone.length !== 10) {
      newErrors.emergencyContactPhone = "Phone number must be exactly 10 digits";
      isValid = false;
    }
    
    if (formData.pincode && !/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }
      
      if (!file.type.match('image.*')) {
        toast.error("Please upload an image file");
        return;
      }
      
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setLoading(true);
    
    try {
      const isDuplicate = checkDuplicateStudent(formData.firstName, formData.lastName, formData.phone);
      
      if (isDuplicate) {
        toast.error(`Student ${formData.firstName} ${formData.lastName} with phone ${formData.phone} already exists!`);
        setLoading(false);
        return;
      }
      
      const existingStudents = JSON.parse(localStorage.getItem('students') || '[]');
      const fullName = `${formData.firstName} ${formData.lastName}`;
      
      const newStudent = {
        id: existingStudents.length + 1,
        ...formData,
        name: fullName,
        age: formData.age || calculateAge(formData.dateOfBirth),
        profileImage: imagePreview || null,
        createdAt: new Date().toISOString(),
        // Ensure class is saved as string
        class: formData.class ? formData.class.toString() : ""
      };
      
      const updatedStudents = [...existingStudents, newStudent];
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      toast.success(`Student ${fullName} added successfully!`);
      
      setTimeout(() => {
        navigate('/management/students');
      }, 1500);
    } catch (error) {
      console.error("Error saving student:", error);
      toast.error("Failed to add student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel - open modal instead of window.confirm
  const handleCancelClick = () => {
    setCancelModalOpen(true);
  };

  // Confirm cancel
  const confirmCancel = () => {
    navigate('/management/students');
  };

  // Check if field is required
  const isRequired = (fieldName) => requiredFields.includes(fieldName);

  // Render form field
  const renderField = (label, name, type = "text", options = {}) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {isRequired(name) && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {type === "select" ? (
          <select id={name}  name={name}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={options.disabled}
            className={`
              w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent
              ${touched[name] && errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-300'}
              ${options.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
            `}
          >
            <option value="">Select {label}</option>
            {options.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            rows="3"
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`
              w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent
              ${touched[name] && errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-300'}
            `}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={options.disabled}
            maxLength={name.includes("phone") || name.includes("Phone") || name === "emergencyContactPhone" ? 10 : undefined}
            className={`
              w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent
              ${touched[name] && errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-300'}
              ${options.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
            `}
          />
        )}
      </div>
      
     
      
     
     
      {touched[name] && errors[name] && (
        <p className="text-xs text-red-500 flex items-center mt-1">
          <AlertCircle size={12} className="mr-1" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Cancel Confirmation Modal */}
      <ConfirmationModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={confirmCancel}
        title="Cancel Adding Student"
        message="Are you sure you want to cancel? All entered data will be lost."
        confirmText="Yes, Cancel"
        cancelText="No, Continue"
        type="warning"
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/management/students')}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Student</h1>
            <p className="text-sm text-gray-600 mt-1">
              Fill in the student details below. Fields marked with <span className="text-red-500">*</span> are required.
            </p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleCancelClick}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <X size={18} />
            <span>Cancel</span>
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Save Student</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User size={20} className="mr-2 text-purple-600" />
            Profile Photo
          </h2>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 border-4 border-white shadow-lg overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={40} className="text-purple-400" />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="relative cursor-pointer">
                <span className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Upload size={16} className="mr-2" />
                  Upload Photo
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Recommended: Square JPG or PNG, max 2MB
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User size={20} className="mr-2 text-purple-600" />
            Personal Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderField("First Name", "firstName", "text")}
            {renderField("Last Name", "lastName", "text")}
            {renderField("Email Address", "email", "email")}
            {renderField("Phone Number", "phone", "tel")}
            {renderField("Alternate Phone", "alternatePhone", "tel")}
            {renderField("Date of Birth", "dateOfBirth", "date")}
            {renderField("Age", "age", "number", { disabled: true })}
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  touched.gender && errors.gender ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {touched.gender && errors.gender && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.gender}
                </p>
              )}
            </div>
            
            {renderField("Blood Group", "bloodGroup", "select", {
              options: [
                { value: "A+", label: "A+" },
                { value: "A-", label: "A-" },
                { value: "B+", label: "B+" },
                { value: "B-", label: "B-" },
                { value: "O+", label: "O+" },
                { value: "O-", label: "O-" },
                { value: "AB+", label: "AB+" },
                { value: "AB-", label: "AB-" },
              ]
            })}
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen size={20} className="mr-2 text-purple-600" />
            Academic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderField("Admission Number", "admissionNumber", "text")}
            {renderField("Admission Date", "admissionDate", "date")}
            
            {/* Class Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  touched.class && errors.class ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
              {touched.class && errors.class && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.class}
                </p>
              )}
            </div>
            
            {/* Section Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Section <span className="text-red-500">*</span>
              </label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  touched.section && errors.section ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select Section</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
              {touched.section && errors.section && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.section}
                </p>
              )}
            </div>
            
            {renderField("Roll Number", "rollNumber", "text")}
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin size={20} className="mr-2 text-purple-600" />
            Address Information
          </h2>
          
          <div className="space-y-6">
            {renderField("Address Line 1", "addressLine1", "text")}
            {renderField("Address Line 2", "addressLine2", "text")}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderField("City", "city", "text")}
              {renderField("State", "state", "text")}
              {renderField("Pincode", "pincode", "text")}
              {renderField("Country", "country", "text")}
            </div>
          </div>
        </div>

        {/* Parent/Guardian Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users size={20} className="mr-2 text-purple-600" />
            Parent/Guardian Information
          </h2>
          
          <div className="space-y-6">
            {/* Father's Information */}
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3">Father's Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderField("Father's Name", "fatherName", "text")}
                {renderField("Father's Phone", "fatherPhone", "tel")}
                {renderField("Father's Email", "fatherEmail", "email")}
                {renderField("Father's Occupation", "fatherOccupation", "text")}
              </div>
            </div>
            
            {/* Mother's Information */}
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3">Mother's Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderField("Mother's Name", "motherName", "text")}
                {renderField("Mother's Phone", "motherPhone", "tel")}
                {renderField("Mother's Email", "motherEmail", "email")}
                {renderField("Mother's Occupation", "motherOccupation", "text")}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2 text-purple-600" />
            Emergency Contact
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderField("Contact Person Name", "emergencyContactName", "text")}
            {renderField("Contact Person Phone", "emergencyContactPhone", "tel")}
            {renderField("Relationship", "emergencyContactRelation", "text")}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen size={20} className="mr-2 text-purple-600" />
            Additional Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("Previous School", "previousSchool", "text")}
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <div className="col-span-2">
              {renderField("Remarks", "remarks", "textarea")}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleCancelClick}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Save Student</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;