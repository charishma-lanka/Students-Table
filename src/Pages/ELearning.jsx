import { useState } from "react";
import {
  BookOpen,
  Video,
  FileText,
  Download,
  Search,
  Filter,
  Clock,
  PlayCircle,
  ChevronRight,
  BookMarked,
  GraduationCap,
} from "lucide-react";

const ELearning = () => {
  const [selectedClass, setSelectedClass] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const classes = ["All Classes", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
  
  const materials = [
    {
      id: 1,
      title: "Mathematics - Algebra Fundamentals",
      subject: "Mathematics",
      class: "Class 9",
      type: "video",
      duration: "45 mins",
      uploadedBy: "Mr. Sharma",
      date: "2024-03-15",
      thumbnail: "📐",
    },
    {
      id: 2,
      title: "Science - Chemical Reactions",
      subject: "Science",
      class: "Class 10",
      type: "document",
      pages: 24,
      uploadedBy: "Mrs. Patel",
      date: "2024-03-14",
      thumbnail: "🧪",
    },
    {
      id: 3,
      title: "English - Grammar Basics",
      subject: "English",
      class: "Class 8",
      type: "presentation",
      slides: 32,
      uploadedBy: "Ms. Khan",
      date: "2024-03-13",
      thumbnail: "📚",
    },
    {
      id: 4,
      title: "History - Ancient Civilizations",
      subject: "History",
      class: "Class 11",
      type: "video",
      duration: "55 mins",
      uploadedBy: "Mr. Verma",
      date: "2024-03-12",
      thumbnail: "🏛️",
    },
    {
      id: 5,
      title: "Physics - Motion and Force",
      subject: "Physics",
      class: "Class 9",
      type: "document",
      pages: 18,
      uploadedBy: "Dr. Singh",
      date: "2024-03-11",
      thumbnail: "⚡",
    },
    {
      id: 6,
      title: "Computer Science - Programming Basics",
      subject: "Computer Science",
      class: "Class 12",
      type: "video",
      duration: "60 mins",
      uploadedBy: "Mr. Kumar",
      date: "2024-03-10",
      thumbnail: "💻",
    },
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return <Video size={16} className="text-blue-600" />;
      case 'document': return <FileText size={16} className="text-green-600" />;
      case 'presentation': return <BookOpen size={16} className="text-purple-600" />;
      default: return <FileText size={16} className="text-gray-600" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'video': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'document': return 'bg-green-50 text-green-700 border-green-200';
      case 'presentation': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <BookOpen size={28} className="mr-3 text-purple-600" />
          E-Learning Materials
        </h1>
        <p className="text-gray-600 mt-1">Access study materials, videos, and documents</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Materials</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Video Lessons</p>
              <p className="text-2xl font-bold text-gray-900">48</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Video size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-gray-900">72</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Downloads</p>
              <p className="text-2xl font-bold text-gray-900">1.2k</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Download size={20} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {classes.map(cls => (
                <option key={cls} value={cls.toLowerCase()}>{cls}</option>
              ))}
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((material) => (
          <div key={material.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center text-2xl">
                  {material.thumbnail}
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(material.type)}`}>
                  {material.type}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{material.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{material.subject} • {material.class}</p>
              
              <div className="flex items-center text-xs text-gray-500 space-x-3 mb-3">
                <div className="flex items-center">
                  {getTypeIcon(material.type)}
                  <span className="ml-1">
                    {material.type === 'video' ? material.duration : 
                     material.type === 'document' ? `${material.pages} pages` : 
                     `${material.slides} slides`}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  <span>{material.date}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">By {material.uploadedBy}</span>
                <button className="flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium">
                  {material.type === 'video' ? 'Watch' : 'Read'} <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ELearning;