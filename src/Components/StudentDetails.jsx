import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import {
  ArrowLeft,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  Award,
  AlertCircle,
  Printer,
  Heart,
  UserCircle,
} from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";

const StudentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  
  // Delete confirmation modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Fetch student data
  useEffect(() => {
    const fetchStudent = () => {
      try {
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const foundStudent = students.find(s => s.id === parseInt(id));
        
        if (foundStudent) {
          setStudent(foundStudent);
        } else {
          toast.error("Student not found");
          navigate('/management/students');
        }
      } catch (error) {
        console.error("Error fetching student:", error);
        toast.error("Failed to load student details");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, navigate]);

  // Handle delete - open modal instead of window.confirm
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const updatedStudents = students.filter(s => s.id !== parseInt(id));
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    toast.success(`${student.name || `${student.firstName} ${student.lastName}`} deleted successfully!`);
    navigate('/management/students');
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get full name
  const getFullName = () => {
    if (student.name) return student.name;
    return `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'Not specified';
  };

  // Get initials for avatar
  const getInitials = () => {
    const name = getFullName();
    if (name === 'Not specified') return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading student details...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-gray-800 font-medium mb-2">Student not found</p>
          <button
            onClick={() => navigate('/management/students')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Back to Student List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Student"
        message={`Are you sure you want to delete ${getFullName()}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* Header with Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/management/students')}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Details</h1>
            <p className="text-sm text-gray-600 mt-1">
              View complete information about the student
            </p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <Printer size={18} />
            <span className="hidden sm:inline">Print</span>
          </button>
          
          <button
            onClick={() => navigate(`/management/students/edit/${student.id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Edit size={18} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>

      {/* Rest of the component remains exactly the same... */}
      {/* Student Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-8">
          <div className="flex items-center space-x-6">
            {/* Profile Image/Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white shadow-lg overflow-hidden border-4 border-white/30">
                {student.profileImage ? (
                  <img 
                    src={student.profileImage} 
                    alt={getFullName()}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <span className="text-3xl font-bold text-purple-600">
                      {getInitials()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Basic Info */}
            <div className="flex-1 text-white">
              <h2 className="text-3xl font-bold">{getFullName()}</h2>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>{student.email || 'No email'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>{student.phone || 'No phone'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>Age: {student.age || 'N/A'} years</span>
                </div>
              </div>
              <div className="mt-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  student.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {student.status || 'Active'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px px-6">
            <button
              onClick={() => setActiveTab("personal")}
              className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "personal"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <User size={16} className="inline mr-2" />
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab("academic")}
              className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "academic"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <BookOpen size={16} className="inline mr-2" />
              Academic Info
            </button>
            <button
              onClick={() => setActiveTab("parent")}
              className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "parent"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Users size={16} className="inline mr-2" />
              Parent Info
            </button>
            <button
              onClick={() => setActiveTab("emergency")}
              className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "emergency"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Heart size={16} className="inline mr-2" />
              Emergency
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Personal Information Tab */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User size={20} className="mr-2 text-purple-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">First Name</p>
                  <p className="text-sm font-medium text-gray-900">{student.firstName || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Last Name</p>
                  <p className="text-sm font-medium text-gray-900">{student.lastName || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Email Address</p>
                  <p className="text-sm font-medium text-gray-900">{student.email || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                  <p className="text-sm font-medium text-gray-900">{student.phone || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Alternate Phone</p>
                  <p className="text-sm font-medium text-gray-900">{student.alternatePhone || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(student.dateOfBirth)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Age</p>
                  <p className="text-sm font-medium text-gray-900">{student.age || 'N/A'} years</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Gender</p>
                  <p className="text-sm font-medium text-gray-900">{student.gender || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Blood Group</p>
                  <p className="text-sm font-medium text-gray-900">{student.bloodGroup || 'Not specified'}</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 flex items-center mt-8">
                <MapPin size={20} className="mr-2 text-purple-600" />
                Address Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Address Line 1</p>
                  <p className="text-sm font-medium text-gray-900">{student.addressLine1 || student.address || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Address Line 2</p>
                  <p className="text-sm font-medium text-gray-900">{student.addressLine2 || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">City</p>
                  <p className="text-sm font-medium text-gray-900">{student.city || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">State</p>
                  <p className="text-sm font-medium text-gray-900">{student.state || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Pincode</p>
                  <p className="text-sm font-medium text-gray-900">{student.pincode || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Country</p>
                  <p className="text-sm font-medium text-gray-900">{student.country || 'India'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Academic Information Tab */}
          {activeTab === "academic" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <BookOpen size={20} className="mr-2 text-purple-600" />
                Academic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Admission Number</p>
                  <p className="text-sm font-medium text-gray-900">{student.admissionNumber || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Admission Date</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(student.admissionDate)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Class</p>
                  <p className="text-sm font-medium text-gray-900">{student.className || student.class || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Section</p>
                  <p className="text-sm font-medium text-gray-900">{student.section || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Roll Number</p>
                  <p className="text-sm font-medium text-gray-900">{student.rollNumber || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Previous School</p>
                  <p className="text-sm font-medium text-gray-900">{student.previousSchool || 'Not specified'}</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 flex items-center mt-8">
                <Award size={20} className="mr-2 text-purple-600" />
                Additional Information
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Remarks</p>
                  <p className="text-sm font-medium text-gray-900">{student.remarks || 'No remarks'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Parent Information Tab */}
          {activeTab === "parent" && (
            <div className="space-y-6">
              {/* Father's Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                  <User size={20} className="mr-2 text-purple-600" />
                  Father's Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Father's Name</p>
                    <p className="text-sm font-medium text-gray-900">{student.fatherName || 'Not specified'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Father's Phone</p>
                    <p className="text-sm font-medium text-gray-900">{student.fatherPhone || 'Not specified'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Father's Email</p>
                    <p className="text-sm font-medium text-gray-900">{student.fatherEmail || 'Not specified'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Father's Occupation</p>
                    <p className="text-sm font-medium text-gray-900">{student.fatherOccupation || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Mother's Information */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                  <UserCircle size={20} className="mr-2 text-purple-600" />
                  Mother's Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Mother's Name</p>
                    <p className="text-sm font-medium text-gray-900">{student.motherName || 'Not specified'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Mother's Phone</p>
                    <p className="text-sm font-medium text-gray-900">{student.motherPhone || 'Not specified'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Mother's Email</p>
                    <p className="text-sm font-medium text-gray-900">{student.motherEmail || 'Not specified'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Mother's Occupation</p>
                    <p className="text-sm font-medium text-gray-900">{student.motherOccupation || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Emergency Contact Tab */}
          {activeTab === "emergency" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Heart size={20} className="mr-2 text-purple-600" />
                Emergency Contact
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Contact Person Name</p>
                  <p className="text-sm font-medium text-gray-900">{student.emergencyContactName || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Contact Person Phone</p>
                  <p className="text-sm font-medium text-gray-900">{student.emergencyContactPhone || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Relationship</p>
                  <p className="text-sm font-medium text-gray-900">{student.emergencyContactRelation || 'Not specified'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Metadata */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>Student ID: {student.id}</span>
              {student.createdAt && (
                <span>Created: {formatDate(student.createdAt)}</span>
              )}
              {student.updatedAt && (
                <span>Updated: {formatDate(student.updatedAt)}</span>
              )}
            </div>
            <div>
              <button
                onClick={() => navigate('/management/students')}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;