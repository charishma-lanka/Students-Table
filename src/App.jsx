import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from "./Components/Dashboard";
import StudentList from "./Components/StudentList";
import AddStudent from "./Components/AddStudent";
import EditStudent from "./Components/Editstudent";
import StudentDetails from "./Components/StudentDetails";

import ELearning from "./Pages/ELearning";
import EExam from "./Pages/E-Exam";
import EReport from "./Pages/E-Report";
import Timeline from "./Pages/ETimeline";

function App() {
  return (
    <BrowserRouter>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="management/students" element={<StudentList />} />
          <Route path="management/students/add" element={<AddStudent />} />
           <Route path="management/students/edit/:id" element={<EditStudent />} /> 
           <Route path="management/students/:id" element={<StudentDetails />} /> 
          <Route path="elearning" element={<ELearning />} />
          <Route path="eexam" element={<EExam />} />
          <Route path="ereport" element={<EReport />} />
          <Route path="timeline" element={<Timeline />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;