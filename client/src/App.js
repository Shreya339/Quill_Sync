import TextEditor from "./text-editor";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { v4 as uuidV4} from 'uuid'
import "quill/dist/quill.snow.css";
import "./styles.css"


// JSX (JavaScript XML), a syntax extension for JavaScript commonly used with React to describe what the UI should look like

function App() {
  return (
    <Router>
      <Routes>
        
        {/* When user lands on home page, generate a random doc url */}
        <Route path="/" exact element = {<Navigate to={`/documents/${uuidV4()}`} />} />
    
        <Route path="/documents/:documentId" element = {<TextEditor/>} />
          
      </Routes>
    </Router>
  )
}

export default App;
