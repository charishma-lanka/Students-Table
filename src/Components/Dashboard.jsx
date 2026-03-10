import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  TrendingUp,
  Clock,
  Award,
  Bell,
  UserPlus,
  FileText,
  ChevronRight,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    pendingAssignments: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    
    // Calculate stats
    setStats({
      totalStudents: students.length,
      totalTeachers: 24, // Sample data
      totalClasses: [...new Set(students.map(s => s.className || s.class))].length || 8,
      pendingAssignments: 12, // Sample data
    });

    // Sample recent activities
    setRecentActivities([
      { id: 1, user: "Abdullah Syakir", action: "joined Class 9-B", time: "2 hours ago", type: "student" },
      { id: 2, user: "Mrs. Fatima", action: "submitted grades for Class 10", time: "5 hours ago", type: "teacher" },
      { id: 3, user: "Abdul Malik", action: "completed Mathematics assignment", time: "1 day ago", type: "student" },
      { id: 4, user: "Annual Day", action: "event scheduled for next week", time: "2 days ago", type: "event" },
    ]);

    // Sample upcoming events
    setUpcomingEvents([
      { id: 1, title: "Annual Sports Day", date: "2024-03-25", participants: "All Students" },
      { id: 2, title: "Parent-Teacher Meeting", date: "2024-03-28", participants: "Classes 8-12" },
      { id: 3, title: "Mathematics Olympiad", date: "2024-04-02", participants: "Selected Students" },
      { id: 4, title: "Summer Break", date: "2024-04-15", participants: "School Closed" },
    ]);
  }, []);

  // Quick actions with navigation
  const quickActions = [
    { 
      label: "Add New Student", 
      icon: UserPlus, 
      path: "/management/students/add", 
      color: "blue",
      onClick: () => navigate("/management/students/add")
    },
    { 
      label: "View Student List", 
      icon: Users, 
      path: "/management/students", 
      color: "green",
      onClick: () => navigate("/management/students")
    },
    { 
      label: "Create Exam", 
      icon: FileText, 
      path: "/eexam", 
      color: "purple",
      onClick: () => navigate("/eexam")
    },
    { 
      label: "Upload Material", 
      icon: BookOpen, 
      path: "/elearning", 
      color: "orange",
      onClick: () => navigate("/elearning")
    },
  ];

  // Get initials for avatar
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening at Jai Bharathi School today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-xs text-gray-500">Academic Year 2024-25</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp size={12} className="mr-1" />
                +{stats.totalStudents > 0 ? stats.totalStudents : 0} this year
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Teachers */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Teachers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalTeachers}</p>
              <p className="text-xs text-blue-600 mt-2 flex items-center">
                <GraduationCap size={12} className="mr-1" />
                {stats.totalTeachers} active staff
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <GraduationCap size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Classes */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Classes</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalClasses}</p>
              <p className="text-xs text-purple-600 mt-2 flex items-center">
                <BookOpen size={12} className="mr-1" />
                Classes 1-12
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen size={24} className="text-purple-600" />
            </div>
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Assignments</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingAssignments}</p>
              <p className="text-xs text-orange-600 mt-2 flex items-center">
                <Clock size={12} className="mr-1" />
                Due this week
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Award size={20} className="mr-2 text-purple-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={i}
                onClick={action.onClick}
                className="flex flex-col items-center p-4 bg-gray-50 hover:bg-purple-50 rounded-xl transition-colors group cursor-pointer"
              >
                <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className={`text-${action.color}-600`} />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center group-hover:text-purple-600">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 flex items-center">
              <Clock size={20} className="mr-2 text-purple-600" />
              Recent Activity
            </h2>
            <button 
              onClick={() => navigate('/management/students')}
              className="text-sm text-purple-600 hover:text-purple-700 flex items-center"
            >
              View All <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'student' ? 'bg-blue-100' :
                  activity.type === 'teacher' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  <span className={`text-sm font-medium ${
                    activity.type === 'student' ? 'text-blue-600' :
                    activity.type === 'teacher' ? 'text-green-600' : 'text-purple-600'
                  }`}>
                    {getInitials(activity.user)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events - Takes 1 column */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar size={20} className="mr-2 text-purple-600" />
            Upcoming Events
          </h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{event.participants}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-purple-600">
                      {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(event.date).toLocaleDateString('en-IN', { weekday: 'short' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/timeline')}
            className="w-full mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center"
          >
            View All Events <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Class Performance Summary */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp size={20} className="mr-2 text-purple-600" />
          Class Performance Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Class 8', 'Class 9', 'Class 10', 'Class 12'].map((className, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">{className}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">Avg. Score</span>
                <span className="text-sm font-bold text-green-600">{85 + i * 2}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div 
                  className="bg-purple-600 h-1.5 rounded-full" 
                  style={{ width: `${85 + i * 2}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;