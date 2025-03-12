import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {Route, Routes} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  const pageSize = 5;
  const [progress, setProgress] = useState(0)
 
    return (
      <div>
        <NavBar/> 
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
      />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} pageSize={pageSize} country="in" category={"general"}/>}/>
          <Route path="/business" element={<News setProgress={setProgress} pageSize={pageSize} country="in" category={"business"}/>}/>
          <Route path="/entertainment" element={<News setProgress={setProgress} pageSize={pageSize} country="in" category={"entertainment"}/>}/>
          <Route path="/general" element={<News setProgress={setProgress} pageSize={pageSize} country="in" category={"general"}/>}/>
          <Route path="/health" element={<News setProgress={setProgress} pageSize={pageSize} country="in" category={"health"}/>}/>
          <Route path="/science" element={<News setProgress={setProgress} pageSize={pageSize} country="in" category={"science"}/>}/>
          <Route path="/sports" element={<News setProgress={setProgress} pageSize={pageSize} country="in" category={"sports"}/>}/>
          <Route path="/technology" element={<News setProgress={setProgress} pageSize={pageSize} country="in" category={"technology"}/>}/>
        </Routes>
      </div>
    )
 
}

export default App;