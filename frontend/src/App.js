import * as React from "react";
import { Routes , Route , BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from './pages/Login'
import Admin from "./pages/Admin";
import StudenLogin from "./pages/StudenLogin";
import QuizFrom1 from "./pages/QuizFrom1";
import QuizFrom2 from "./pages/QuizFrom2";
import QuizFrom3 from "./pages/QuizFrom3";
import QuizFrom4 from "./pages/QuizFrom4";
import StudentReport from "./pages/StudentReport";
import Students from "./pages/Students";
import StudentPage from "./pages/StudentPage"
import Setting from "./pages/Setting";
import { LanguageContext } from "./LangaugeContext";
import ThankPage from "./pages/ThankPage";
import Quiz from "./pages/Quiz";

function App() {
  const [language, setLanguage] = React.useState("th");
  const providerLanguage = React.useMemo(() => ({ language, setLanguage }), [
    language,
    setLanguage,
  ]);
  return (
    <LanguageContext.Provider value={providerLanguage}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app/admin" element={<Admin />} />
          <Route path="/app/student" element={<Students />} />
          <Route path="/app/settings" element={<Setting />} />
          <Route path="/app/quiz" element={<Quiz />} />
          
          

          <Route path="/student-login" element={<StudenLogin />} />
          <Route path="/student-page" element={<StudentPage />} />
          <Route path="/student/quiz-from1" element={<QuizFrom1 />} />
          <Route path="/student/quiz-from2" element={<QuizFrom2 />} />
          <Route path="/student/quiz-from3" element={<QuizFrom3 />} />
          <Route path="/student/quiz-from4" element={<QuizFrom4 />} />
          <Route path="/student-page/report" element={<StudentReport />} />
          <Route path="/thankyou-page" element={<ThankPage />} />

          {/* StudenLogin */}
          {/* <Route path="/app/admin" element={<Admin />} />
          <Route path="/app/village" element={<Village />} />
          <Route path="/app/admin" element={<Admin />} />
          <Route path="/app/profile" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </LanguageContext.Provider>
  );
}

export default App;
