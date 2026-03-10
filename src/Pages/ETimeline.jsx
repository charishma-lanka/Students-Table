import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Filter,
  Search,
  Bell,
  Star,
  Gift,
  Music,
  Trophy,
} from "lucide-react";

const Timeline = () => {
  const [filter, setFilter] = useState("all");

  const events = [
    {
      id: 1,
      title: "Annual Sports Day",
      date: "2024-03-25",
      time: "09:00 AM - 04:00 PM",
      location: "School Ground",
      participants: "All Students",
      type: "sports",
      icon: Trophy,
      color: "blue",
      description: "Annual sports competition with various athletic events and games.",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      date: "2024-03-28",
      time: "10:00 AM - 02:00 PM",
      location: "Classrooms",
      participants: "Classes 8-12",
      type: "academic",
      icon: Users,
      color: "green",
      description: "Meet the teachers to discuss student progress and performance.",
    },
    {
      id: 3,
      title: "Mathematics Olympiad",
      date: "2024-04-02",
      time: "10:00 AM - 12:00 PM",
      location: "Main Hall",
      participants: "Selected Students",
      type: "academic",
      icon: Star,
      color: "purple",
      description: "Inter-school mathematics competition for talented students.",
    },
    {
      id: 4,
      title: "Summer Break Begins",
      date: "2024-04-15",
      time: "All Day",
      location: "School Closed",
      participants: "All Students",
      type: "holiday",
      icon: Calendar,
      color: "orange",
      description: "School remains closed for summer vacation.",
    },
    {
      id: 5,
      title: "Cultural Festival",
      date: "2024-03-30",
      time: "11:00 AM - 06:00 PM",
      location: "Auditorium",
      participants: "All Students",
      type: "cultural",
      icon: Music,
      color: "pink",
      description: "Annual cultural festival with music, dance, and drama performances.",
    },
    {
      id: 6,
      title: "Teacher's Day Celebration",
      date: "2024-09-05",
      time: "09:00 AM - 01:00 PM",
      location: "School Ground",
      participants: "All Students",
      type: "cultural",
      icon: Gift,
      color: "red",
      description: "Celebration honoring teachers with performances and gifts.",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
      pink: "bg-pink-50 text-pink-600 border-pink-200",
      red: "bg-red-50 text-red-600 border-red-200",
    };
    return colors[color] || colors.blue;
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Calendar size={28} className="mr-3 text-purple-600" />
            Academic Timeline
          </h1>
          <p className="text-gray-600 mt-1">Track important dates and events</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
            {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar size={20} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Star size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Holidays</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Gift size={20} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option>All Types</option>
              <option>Academic</option>
              <option>Sports</option>
              <option>Cultural</option>
              <option>Holiday</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-200"></div>

        {/* Events */}
        <div className="space-y-6">
          {events.map((event, index) => {
            const Icon = event.icon;
            const isPast = event.date < today;

            return (
              <div key={event.id} className="relative flex items-start group">
                {/* Timeline Dot */}
                <div className={`absolute left-6 -ml-3 w-6 h-6 rounded-full border-4 border-white shadow-md ${isPast ? 'bg-gray-300' : `bg-${event.color}-500`
                  }`}></div>

                {/* Event Card */}
                <div className={`ml-20 flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow ${isPast ? 'opacity-75' : ''
                  }`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(event.color)}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar size={12} className="mr-1" />
                            {new Date(event.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock size={12} className="mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin size={12} className="mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Users size={12} className="mr-1" />
                            {event.participants}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isPast
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                      }`}>
                      {isPast ? 'View Details' : 'Set Reminder'}
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>

                  {/* Status Badge */}
                  {!isPast && (
                    <div className="absolute -top-2 -right-2">
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full shadow-lg">
                        Upcoming
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;