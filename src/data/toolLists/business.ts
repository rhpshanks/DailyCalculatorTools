import { ToolMetadata } from '../../types';

export const calculateTools: ToolMetadata[] = [
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'Business',
    slug: 'percentage-calculator',
    metaTitle: 'Percentage Calculator - Simple Calculator',
    metaDescription: 'Use this percentage calculator to calculate values instantly with formula, examples, and common value table.',
    benefit: 'Calculate any percentage instantly.',
    formulaText: 'Percentage value = Amount × Percentage ÷ 100',
    exampleText: '18 percent of Rs 50,000 = Rs 9,000. Rs 50,000 plus 18 percent = Rs 59,000.',
    faqs: [
      { question: 'How is this value calculated?', answer: 'The tool uses a simple formula and shows the result instantly.' },
      { question: 'Can I use this for business calculations?', answer: 'Yes, but verify final tax or legal values with a qualified person where needed.' },
      { question: 'Is this tool free?', answer: 'Yes, it is free to use.' },
      { question: 'Does this save my data?', answer: 'Basic calculator inputs are not saved.' }
    ],
    relatedTools: ['reverse-percentage-calculator', 'discount-calculator', 'gst-calculator'],
    tableData: {
      headers: ['Amount', '18 Percent'],
      rows: [
        { label: 'Rs 1,000', value: 'Rs 180' },
        { label: 'Rs 5,000', value: 'Rs 900' },
        { label: 'Rs 10,000', value: 'Rs 1,800' },
        { label: 'Rs 50,000', value: 'Rs 9,000' }
      ]
    },
    status: 'Active'
  },
  {
    id: 'reverse-percentage-calculator',
    name: 'Reverse Percentage Calculator',
    category: 'Business',
    slug: 'reverse-percentage-calculator',
    metaTitle: 'Reverse Percentage Calculator - Simple Calculator',
    metaDescription: 'Use this reverse percentage calculator to calculate original values instantly.',
    benefit: 'Find the original number before a percentage was added.',
    formulaText: 'Original Value = Total ÷ (1 + Percentage ÷ 100)',
    exampleText: 'If you paid Rs 59,000 including 18% tax, original is Rs 59,000 ÷ 1.18 = Rs 50,000.',
    faqs: [
      { question: 'How is this value calculated?', answer: 'The tool uses a simple formula and shows the result instantly.' },
      { question: 'Can I use this for business calculations?', answer: 'Yes, but verify final tax or legal values with a qualified person where needed.' },
      { question: 'Is this tool free?', answer: 'Yes, it is free to use.' },
      { question: 'Does this save my data?', answer: 'Basic calculator inputs are not saved.' }
    ],
    relatedTools: ['percentage-calculator', 'discount-calculator'],
    status: 'Active'
  }
];
