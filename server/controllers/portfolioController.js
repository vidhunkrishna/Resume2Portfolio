import Portfolio from '../models/Portfolio.js';
import { extractTextFromFile, parseResumeText } from '../services/resumeParser.js';
import { enrichWithGitHub } from '../services/githubService.js';

export async function generatePortfolio(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    const rawText = await extractTextFromFile(
      req.file.buffer,
      req.file.mimetype,
      req.file.originalname
    );

    if (!rawText || rawText.trim().length < 20) {
      return res.status(400).json({ message: 'Could not extract readable text from resume' });
    }

    const parsed = parseResumeText(rawText);
    const { githubProfile, githubRepos } = await enrichWithGitHub(parsed.githubUrl);

    const portfolio = await Portfolio.create({
      ...parsed,
      githubProfile,
      githubRepos,
    });

    const portfolioData = portfolio.toObject();
    delete portfolioData.__v;

    return res.status(201).json({
      portfolioId: portfolio._id.toString(),
      portfolioData,
    });
  } catch (error) {
    console.error('Generate portfolio error:', error);
    return res.status(500).json({
      message: error.message || 'Failed to generate portfolio',
    });
  }
}

export async function getPortfolio(req, res) {
  try {
    const portfolio = await Portfolio.findById(req.params.id).lean();

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    delete portfolio.__v;
    return res.json(portfolio);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    console.error('Get portfolio error:', error);
    return res.status(500).json({ message: 'Failed to fetch portfolio' });
  }
}
