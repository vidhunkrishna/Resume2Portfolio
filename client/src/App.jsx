import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import UploadPage from './pages/UploadPage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/portfolio/:id" element={<PortfolioPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
