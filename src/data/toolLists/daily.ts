import { ToolMetadata } from '../../types';

export const dailyUseTools: ToolMetadata[] = [
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    category: 'Daily Use',
    slug: 'age-calculator',
    metaTitle: 'Age Calculator - Simple Calculator',
    metaDescription: 'Use this age calculator to check values instantly.',
    benefit: 'Calculate your exact age in years, months, and days.',
    faqs: [
      { question: 'How is this value calculated?', answer: 'The tool uses a simple formula and shows the result instantly.' },
      { question: 'Can I use this for business calculations?', answer: 'Yes.' },
      { question: 'Is this tool free?', answer: 'Yes, it is free to use.' },
      { question: 'Does this save my data?', answer: 'Basic calculator inputs are not saved.' }
    ],
    relatedTools: [],
    status: 'Active'
  }
];
