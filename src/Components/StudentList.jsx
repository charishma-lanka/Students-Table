import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Download,
  Mail,
  Phone,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  FileText,
  X,
  Filter,
  RefreshCw,
  Loader,
  AlertCircle,
} from "lucide-react";
import * as XLSX from 'xlsx';
import ConfirmationModal from "./ConfirmationModal";

const StudentList = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openDownloadDropdown, setOpenDownloadDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    class: "",
    section: "",
    status: "",
  });

  // Delete confirmation modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Load students from localStorage on component mount
  useEffect(() => {
    const loadStudents = () => {
      const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
      // Ensure each student has a unique ID (if not, generate one)
      const studentsWithIds = savedStudents.map((student, index) => ({
        ...student,
        id: student.id || `student-${index}-${Date.now()}`
      }));
      setStudents(studentsWithIds);
    };

    loadStudents();

    // Listen for storage events (in case of multiple tabs)
    const handleStorageChange = () => {
      loadStudents();
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is on download button or inside download dropdown
      const isDownloadClick = event.target.closest('.download-dropdown');
      const isActionClick = event.target.closest('.action-dropdown');
      
      if (!isDownloadClick && !isActionClick) {
        setOpenDropdown(null);
        setOpenDownloadDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate classes 1-12
  const allClasses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  
  // Get all possible sections (A, B, C)
  const allSections = ['A', 'B', 'C'];
  
  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const studentName = student.name || `${student.firstName || ''} ${student.lastName || ''}`.trim();
    
    const matchesSearch = searchTerm === "" || 
      studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.phone || '').includes(searchTerm) ||
      (student.parentName || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = filters.class ? student.class === filters.class : true;
    const matchesSection = filters.section ? student.section === filters.section : true;
    const matchesStatus = filters.status ? student.status === filters.status : true;
    
    return matchesSearch && matchesClass && matchesSection && matchesStatus;
  });

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  // Handle view student
  const handleViewStudent = (student) => {
    navigate(`/management/students/${student.id}`);
    setOpenDropdown(null);
  };

  // Handle edit student
  const handleEditStudent = (student) => {
    navigate(`/management/students/edit/${student.id}`);
    setOpenDropdown(null);
  };

  // Handle delete student - open modal instead of window.confirm
  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setDeleteModalOpen(true);
    setOpenDropdown(null);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (studentToDelete) {
      const updatedStudents = students.filter(s => s.id !== studentToDelete.id);
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setSelectedRows(selectedRows.filter(id => id !== studentToDelete.id));
      toast.success(`${studentToDelete.name || `${studentToDelete.firstName} ${studentToDelete.lastName}`} deleted successfully!`);
      setStudentToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  // Download Excel functions
  const downloadFilteredExcel = () => {
    setDownloading(true);
    const exportData = filteredStudents.map(student => ({
      'S.No': filteredStudents.indexOf(student) + 1,
      'Name': student.name || `${student.firstName || ''} ${student.lastName || ''}`.trim(),
      'Email': student.email || '',
      'Phone': student.phone || '',
      'Age': student.age || '',
      'Class': student.class ? `Class ${student.class}` : '-',
      'Status': student.status || 'Active'
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, `students_filtered_${new Date().toISOString().split('T')[0]}.xlsx`);
    setTimeout(() => setDownloading(false), 1000);
    setOpenDownloadDropdown(false);
  };

  const downloadAllExcel = () => {
    setDownloading(true);
    const allData = students.map((student, index) => ({
      'S.No': index + 1,
      'Name': student.name || `${student.firstName || ''} ${student.lastName || ''}`.trim(),
      'Email': student.email || '',
      'Phone': student.phone || '',
      'Age': student.age || '',
      'Class': student.class ? `Class ${student.class}` : '-',
      'Status': student.status || 'Active'
    }));

    const ws = XLSX.utils.json_to_sheet(allData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "All Students");
    XLSX.writeFile(wb, `students_all_${new Date().toISOString().split('T')[0]}.xlsx`);
    setTimeout(() => setDownloading(false), 1000);
    setOpenDownloadDropdown(false);
  };

  // Handle class filter click
  const handleClassClick = (className) => {
    setFilters({ ...filters, class: className });
    setCurrentPage(1);
  };

  // Handle section filter change
  const handleSectionChange = (e) => {
    setFilters({ ...filters, section: e.target.value });
    setCurrentPage(1);
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value });
    setCurrentPage(1);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      class: "",
      section: "",
      status: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
    toast.success("Filters cleared successfully");
  };

  // Get class for display in class column
  const getClassDisplay = (student) => {
    if (student.class) {
      return `Class ${student.class}`;
    } else {
      return '-';
    }
  };

  // Get student name
  const getStudentName = (student) => {
    return student.name || `${student.firstName || ''} ${student.lastName || ''}`.trim() || '-';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setStudentToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Student"
        message={`Are you sure you want to delete ${studentToDelete ? getStudentName(studentToDelete) : ''}? These student details will be permanently deleted.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all students</p>
        </div>
        <div className="flex gap-3">
          {/* Download Dropdown */}
          <div className="relative download-dropdown">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenDownloadDropdown(!openDownloadDropdown);
                setOpenDropdown(null);
              }}
              disabled={downloading}
              className="flex items-center space-x-2 border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {downloading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <Download size={20} />
              )}
              <span className="font-medium">Download</span>
            </button>

            {/* Download Dropdown Menu */}
            {openDownloadDropdown && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="py-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadAllExcel();
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                  >
                    <FileSpreadsheet size={16} className="mr-3 text-gray-400" />
                    <div className="text-left">
                      <p className="font-medium">All Students</p>
                      <p className="text-xs text-gray-500">{students.length} records</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadFilteredExcel();
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors border-t border-gray-100"
                  >
                    <FileText size={16} className="mr-3 text-gray-400" />
                    <div className="text-left">
                      <p className="font-medium">Filtered Results</p>
                      <p className="text-xs text-gray-500">{filteredStudents.length} records</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Add Student Button */}
          <button
            onClick={() => navigate('/management/students/add')}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2.5 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus size={20} />
            <span className="font-semibold">Add Student</span>
          </button>
        </div>
      </div>

      {/* Stats Cards - 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{students.length}</p>
              <p className="text-xs text-green-600 mt-2">
                {students.length > 0 ? `${students.length} enrolled` : 'No students'}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <User size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Students</p>
              <p className="text-3xl font-bold text-gray-900">
                {students.filter(s => s.status === 'Active').length}
              </p>
              <p className="text-xs text-green-600 mt-2">
                {students.length > 0 
                  ? `${Math.round((students.filter(s => s.status === 'Active').length / students.length) * 100)}% of total`
                  : '0% of total'}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
              <User size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Classes</p>
              <p className="text-3xl font-bold text-gray-900">
                {[...new Set(students.map(s => s.class).filter(Boolean))].length}
              </p>
              <p className="text-xs text-blue-600 mt-2">
                {[...new Set(students.map(s => s.class).filter(Boolean))].sort().join(', ') || 'No classes'}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Calendar size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Students</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, phone, parent..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Toggle Button */}
          <div className="flex items-end">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} className="text-gray-600" />
              <span>Filters</span>
              {(filters.class || filters.section || filters.status) && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-purple-100 text-purple-600 rounded-full">
                  Active
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Class Filter - Dropdown with All Classes option */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <select
                  value={filters.class}
                  onChange={(e) => handleClassClick(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Classes</option>
                  {allClasses.map((c) => (
                    <option key={c} value={c}>
                      Class {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section Filter - All Sections A, B, C */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <select
                  value={filters.section}
                  onChange={handleSectionChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Sections</option>
                  {allSections.map(s => (
                    <option key={s} value={s}>Section {s}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={handleStatusChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <RefreshCw size={16} />
                  <span>Clear Filters</span>
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.class || filters.section || filters.status) && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Active filters:</span>
                {filters.class && (
                  <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    Class {filters.class}
                    <button
                      onClick={() => setFilters({ ...filters, class: "" })}
                      className="ml-1 hover:text-purple-900"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {filters.section && (
                  <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    Section {filters.section}
                    <button
                      onClick={() => setFilters({ ...filters, section: "" })}
                      className="ml-1 hover:text-purple-900"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {filters.status && (
                  <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    {filters.status}
                    <button
                      onClick={() => setFilters({ ...filters, status: "" })}
                      className="ml-1 hover:text-purple-900"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Students Table - No scroll, fixed width with S.No column */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full">
        <div className="w-full">
          <table className="w-full table-fixed border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-200 bg-gray-50 w-16">
                  S.NO
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-200 bg-gray-50 w-1/5">
                  NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-200 bg-gray-50 w-1/5">
                  EMAIL
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-200 bg-gray-50 w-32">
                  PHONE
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-200 bg-gray-50 w-24">
                  CLASS
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-200 bg-gray-50 w-20">
                  AGE
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-200 bg-gray-50 w-28">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500 border border-gray-200">
                    <AlertCircle size={40} className="mx-auto mb-3 text-gray-400" />
                    <p>No students found</p>
                    <p className="text-sm text-gray-400 mt-1">Add students using the "Add Student" button</p>
                    <button
                      onClick={() => navigate('/management/students/add')}
                      className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Add New Student
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 border border-gray-200 text-sm text-gray-600">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 border border-gray-200 truncate">
                      <div className="text-sm font-medium text-gray-900 truncate" title={getStudentName(student)}>
                        {getStudentName(student)}
                      </div>
                    </td>
                    <td className="px-6 py-4 border border-gray-200 truncate">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail size={14} className="mr-2 text-gray-400 flex-shrink-0" />
                        <span className="truncate" title={student.email || '-'}>{student.email || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 border border-gray-200">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone size={14} className="mr-2 text-gray-400 flex-shrink-0" />
                        <span>{student.phone || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 border border-gray-200">
                      <div className="text-sm font-medium text-gray-900">
                        {getClassDisplay(student)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 border border-gray-200">
                      {student.age ? `${student.age}` : '-'}
                    </td>
                    <td className="px-6 py-4 border border-gray-200 relative">
                      <div className="action-dropdown inline-block">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(openDropdown === student.id ? null : student.id);
                            setOpenDownloadDropdown(false);
                          }}
                          className="text-gray-600 hover:text-purple-600 p-2 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <MoreVertical size={20} />
                        </button>

                        {/* Actions Dropdown - Fixed positioning */}
                        {openDropdown === student.id && (
                          <div 
                            className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 
                              top: '100%', 
                              left: '0',
                              minWidth: '180px'
                            }}
                          >
                            <div className="py-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewStudent(student);
                                }}
                                className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                              >
                                <Eye size={16} className="mr-3 text-gray-400" />
                                View Details
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditStudent(student);
                                }}
                                className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              >
                                <Edit size={16} className="mr-3 text-gray-400" />
                                Edit Student
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClick(student);
                                }}
                                className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 size={16} className="mr-3" />
                                Delete Student
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredStudents.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of {filteredStudents.length} entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    currentPage === i + 1
                      ? 'bg-purple-600 text-white'
                      : 'border border-gray-300 hover:bg-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;