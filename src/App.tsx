import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import AdSidebar from './components/AdSidebar';
import CategoryMenu from './components/CategoryMenu';
import Calculator from './components/Calculator';
import Converter from './components/Converter';
import { ThemeProvider } from './utils/themeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[var(--theme-bg-page)]">
          <NavBar />
          
          <div className="flex-1 max-w-[1400px] w-full mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col md:flex-row flex-1 gap-6 min-w-0">
              {/* Main Content Area */}
              <main className="flex-1 min-w-0">
                <Routes>
                  <Route path="/" element={<Navigate to="/convert/length-m-to-cm" replace />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/convert/:catId-:fromId-to-:toId" element={<Converter />} />
                  <Route path="*" element={<Navigate to="/convert/length-m-to-cm" replace />} />
                </Routes>
              </main>

              {/* Category Menu (Sidebar on desktop, top on mobile) */}
              <CategoryMenu />
            </div>
            
            {/* Right Ad Sidebar */}
            <AdSidebar />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}
