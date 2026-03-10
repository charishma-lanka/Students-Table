import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  GraduationCap,
  Calendar,
  ChevronDown,
  ChevronRight,
  UserPlus,
  UserCheck,
  LogOut,
} from "lucide-react";
import logo from "./assets/logo.jpg"; 

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [managementOpen, setManagementOpen] = useState(false);

  
  const mainMenu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { 
      name: "Management", 
      icon: Users, 
      path: "/management",
      hasDropdown: true,
      subItems: [
        { name: "Student List", icon: UserCheck, path: "/management/students" },
        { name: "Add Student", icon: UserPlus, path: "/management/students/add" },
      ]
    },
  ];

  const middleMenu = [
    { name: "E-learning", icon: BookOpen, path: "/elearning" },
    { name: "E-exam", icon: FileText, path: "/eexam" },
    { name: "E-report", icon: GraduationCap, path: "/ereport" },
    { name: "Timeline", icon: Calendar, path: "/timeline" },
  ];

  
  const isManagementActive = location.pathname.startsWith("/management");

  return (
    <>
    
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-[#4B0082] text-white transition-all duration-300 overflow-hidden flex-shrink-0 h-screen flex flex-col`}
      >
        
        <div className="p-5 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center space-x-3">
            {/* Logo Image */}
            <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0 shadow-md">
              <img 
                src={logo} 
                alt="School Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                 e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span class="text-[#4B0082] font-bold text-xl">JB</span>';
                }}
              />
            </div>
            
        
            <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-wide leading-tight">Jai Bharathi</h1>
              <p className="text-[10px] text-white/70 font-medium tracking-wider">SCHOOL</p>
            </div>
          </div>
        </div>

      
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {/* Main Menu - Dashboard & Management */}
          <div className="space-y-1">
            {mainMenu.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              // Management with Dropdown
              if (item.hasDropdown) {
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => setManagementOpen(!managementOpen)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2.5 rounded-lg
                        transition-colors text-sm
                        ${isManagementActive
                          ? "bg-white/10 text-white"
                          : "text-white/80 hover:bg-white/10"
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={18} />
                        <span>{item.name}</span>
                      </div>
                      {managementOpen ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>

                    {/* Dropdown Items */}
                    {managementOpen && (
                      <div className="ml-4 mt-1 pl-4 border-l border-white/20 space-y-1">
                        {item.subItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = location.pathname === subItem.path;
                          
                          return (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              onClick={() => setSidebarOpen(false)}
                              className={`
                                flex items-center space-x-3 px-3 py-2 rounded-lg text-sm
                                transition-colors
                                ${isSubActive
                                  ? "bg-white/10 text-white"
                                  : "text-white/70 hover:bg-white/10 hover:text-white"
                                }
                              `}
                            >
                              <SubIcon size={16} />
                              <span>{subItem.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Dashboard 
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm
                    transition-colors
                    ${isActive
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/10"
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Middle Menu - E-learning, E-exam, E-report, Timeline */}
          <div className="mt-4 space-y-1">
            {middleMenu.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm
                    transition-colors
                    ${isActive
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/10"
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile - Fixed at bottom */}
        <div className="p-4 border-t border-white/20 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">MS</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Mohammed Salman</p>
              <p className="text-xs text-white/60">Admin</p>
            </div>
            <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
              <LogOut size={16} className="text-white/60" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;