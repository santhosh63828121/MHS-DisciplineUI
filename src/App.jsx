import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'

import Del from './Component/Deletestd/delete';
import Download from './Component/Download';
import Upload from './Component/Upload/Upload'
import Home from './Component/Home'; // Assuming Home component is in the same directory
import Add from './Component/AddStd/Addstudent'; // Assuming About component is in the same directory


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          {/* Links for navigation */}
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Add Student</Link></li>
            <li><Link to="/download">Download </Link></li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/delete" element={<Del/>}/>
          <Route path="/download" element={<Download/>}/>
          <Route path="/upload" element={<Upload/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
