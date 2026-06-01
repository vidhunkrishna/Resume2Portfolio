import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/home/Hero.jsx';
import UploadSection from '../components/home/UploadSection.jsx';
import Features from '../components/home/Features.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import SiteFooter from '../components/home/SiteFooter.jsx';
import { generatePortfolio } from '../services/api.js';

export default function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!file) {
      setError('Please upload your resume first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { portfolioId } = await generatePortfolio(file);
      navigate(`/portfolio/${portfolioId}`);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to generate portfolio'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-app max-w-3xl pb-4">
        <Hero />
        <UploadSection
          file={file}
          loading={loading}
          error={error}
          onFileSelect={setFile}
          onGenerate={handleGenerate}
        />
      </div>
      <Features />
      <HowItWorks />
      <SiteFooter />
    </>
  );
}
