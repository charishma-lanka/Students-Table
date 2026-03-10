import { useState } from "react";
import {
  GraduationCap,
  Download,
  Search,
  Filter,
  ChevronDown,
  Award,
  BookOpen,
  TrendingUp,
  User,
  Mail,
  Phone,
} from "lucide-react";

const EReport = () => {
  const [selectedStudent, setSelectedStudent] = useState("Abdullah Syakir");
  const [selectedTerm, setSelectedTerm] = useState("Term 1");

  const students = ["Abdullah Syakir", "Abdul Malik", "Abdurahman Allam", "Achmad Juandy"];
  const terms = ["Term 1", "Term 2", "Term 3", "Annual"];

  const reportData = {
    name: "Abdullah Syakir",
    class: "9-B",
    rollNumber: "2024-001",
    attendance: "92%",
    overallGrade: "A",
    overallPercentage: "85%",
    subjects: [
      { name: "Mathematics", marks: 92, total: 100, grade: "A+", status: "Excellent" },
      { name: "Science", marks: 88, total: 100, grade: "A", status: "Very Good" },
      { name: "English", marks: 85, total: 100, grade: "B+", status: "Good" },
      { name: "Social Studies", marks: 78, total: 100, grade: "B", status: "Satisfactory" },
      { name: "Hindi", marks: 90, total: 100, grade: "A", status: "Very Good" },
      { name: "Computer Science", marks: 95, total: 100, grade: "A+", status: "Excellent" },
    ],
    remarks: "Abdullah has shown consistent improvement throughout the term. His performance in Mathematics and Computer Science is outstanding. Needs to focus more on Social Studies.",
    classTeacher: "Mrs. Fatima Khan",
    nextTermStart: "2024-04-10",
  };

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A+': return 'text-green-600 bg-green-50';
      case 'A': return 'text-blue-600 bg-blue-50';
      case 'B+': return 'text-purple-600 bg-purple-50';
      case 'B': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <GraduationCap size={28} className="mr-3 text-purple-600" />
          E-Report - Student Report Cards
        </h1>
        <p className="text-gray-600 mt-1">View and download student progress reports</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Student</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              {students.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Term</label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              {terms.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              <Download size={18} className="mr-2" />
              Download Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
          <div className="flex items-center justify-between text-white">
            <div>
              <h2 className="text-xl font-bold">Student Progress Report</h2>
              <p className="text-purple-100">{selectedTerm} • Academic Year 2024-25</p>
            </div>
            <GraduationCap size={40} className="text-white/80" />
          </div>
        </div>

        {/* Student Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Student Name</p>
              <p className="font-medium text-gray-900">{reportData.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Class</p>
              <p className="font-medium text-gray-900">{reportData.class}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Roll Number</p>
              <p className="font-medium text-gray-900">{reportData.rollNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Attendance</p>
              <p className="font-medium text-green-600">{reportData.attendance}</p>
            </div>
          </div>
        </div>

        {/* Subject Marks */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen size={18} className="mr-2 text-purple-600" />
            Subject-wise Performance
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marks</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reportData.subjects.map((subject, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{subject.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{subject.marks}/{subject.total}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(subject.grade)}`}>
                        {subject.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{subject.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Overall Percentage</p>
              <p className="text-2xl font-bold text-purple-600">{reportData.overallPercentage}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Overall Grade</p>
              <p className="text-2xl font-bold text-green-600">{reportData.overallGrade}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Rank in Class</p>
              <p className="text-2xl font-bold text-blue-600">5/42</p>
            </div>
          </div>
        </div>

        {/* Remarks */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Teacher's Remarks</h3>
          <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            {reportData.remarks}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-sm font-medium text-purple-600">FK</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{reportData.classTeacher}</p>
                <p className="text-xs text-gray-500">Class Teacher</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Next term starts: {reportData.nextTermStart}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EReport;