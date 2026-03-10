import { Menu, X, Bell, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const notificationRef = useRef(null);
  const profileRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const notifications = [
    { id: 1, title: "New student registration", time: "5 min ago", read: false },
    { id: 2, title: "Exam schedule updated", time: "1 hour ago", read: false },
    { id: 3, title: "Parent-teacher meeting", time: "2 hours ago", read: true },
  ];

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 flex-shrink-0">
      <div className="flex items-center justify-between w-full">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
      
          <h1 className="text-xl font-bold text-gray-800">Student Management System</h1>
        </div>

      
        <div className="flex items-center space-x-2">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg relative transition-colors"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notifications Dropdown Menu */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-700">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 ${
                        !notification.read ? 'bg-purple-50/50' : ''
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100 mt-2">
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 ml-2 pl-2 border-l border-gray-200 hover:bg-gray-50 rounded-lg pr-2 py-1 transition-colors"
            >
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <User size={16} className="text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
              <ChevronDown size={16} className="text-gray-500 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">Mohammed Salman</p>
                  <p className="text-xs text-gray-500">admin@jaibharathi.com</p>
                </div>
                
                <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                  <User size={16} className="text-gray-500" />
                  <span>Profile</span>
                </button>
                
                <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                  <Settings size={16} className="text-gray-500" />
                  <span>Settings</span>
                </button>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;