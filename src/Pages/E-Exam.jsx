import { useState } from "react";
import {
  FileText,
  Clock,
  Calendar,
  Award,
  PlayCircle,
  ChevronRight,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const EExam = () => {
  const [filter, setFilter] = useState("upcoming");

  const exams = [
    {
      id: 1,
      title: "Mathematics - Annual Exam",
      class: "Class 10",
      subject: "Mathematics",
      date: "2024-04-15",
      duration: "3 hours",
      totalMarks: 100,
      status: "upcoming",
      type: "annual",
    },
    {
      id: 2,
      title: "Science - Mid Term",
      class: "Class 9",
      subject: "Science",
      date: "2024-04-10",
      duration: "2.5 hours",
      totalMarks: 80,
      status: "upcoming",
      type: "midterm",
    },
    {
      id: 3,
      title: "English - Unit Test",
      class: "Class 8",
      subject: "English",
      date: "2024-03-28",
      duration: "1.5 hours",
      totalMarks: 50,
      status: "ongoing",
      type: "unit",
    },
    {
      id: 4,
      title: "Physics - Final Exam",
      class: "Class 12",
      subject: "Physics",
      date: "2024-03-20",
      duration: "3 hours",
      totalMarks: 100,
      status: "completed",
      type: "final",
      score: 85,
    },
    {
      id: 5,
      title: "Chemistry - Practical",
      class: "Class 11",
      subject: "Chemistry",
      date: "2024-03-18",
      duration: "2 hours",
      totalMarks: 50,
      status: "completed",
      type: "practical",
      score: 42,
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ongoing': return 'bg-green-50 text-green-700 border-green-200';
      case 'completed': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'annual': return <Award size={16} className="text-purple-600" />;
      case 'midterm': return <FileText size={16} className="text-blue-600" />;
      case 'unit': return <FileText size={16} className="text-green-600" />;
      case 'practical': return <AlertCircle size={16} className="text-orange-600" />;
      default: return <FileText size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FileText size={28} className="mr-3 text-purple-600" />
          E-Exam Portal
        </h1>
        <p className="text-gray-600 mt-1">Manage and take online examinations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Exams</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ongoing</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <PlayCircle size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">13</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {['upcoming', 'ongoing', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === status
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Exams List */}
      <div className="space-y-3">
        {exams
          .filter(exam => filter === 'all' ? true : exam.status === filter)
          .map((exam) => (
            <div key={exam.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    {getTypeIcon(exam.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                    <p className="text-sm text-gray-600">{exam.subject} • {exam.class}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(exam.status)}`}>
                        {exam.status}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar size={12} className="mr-1" />
                        {new Date(exam.date).toLocaleDateString('en-IN')}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        {exam.duration}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Award size={12} className="mr-1" />
                        {exam.totalMarks} marks
                      </div>
                      {exam.score && (
                        <div className="flex items-center text-xs font-medium text-green-600">
                          Score: {exam.score}/{exam.totalMarks}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                  {exam.status === 'upcoming' ? 'View Details' : 
                   exam.status === 'ongoing' ? 'Start Exam' : 'View Results'}
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EExam;