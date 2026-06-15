import { ToolMetadata } from '../../types';

export const textTools: ToolMetadata[] = [
  {
    id: 'word-counter',
    name: 'Word Counter',
    category: 'Text',
    slug: 'word-counter',
    metaTitle: 'Word Counter - Simple Calculator',
    metaDescription: 'Use this word counter to check values instantly with formula and examples.',
    benefit: 'Count words and characters in your text instantly.',
    faqs: [
      { question: 'How is this value calculated?', answer: 'The tool uses a simple formula and shows the result instantly.' },
      { question: 'Can I use this for business calculations?', answer: 'Yes.' },
      { question: 'Is this tool free?', answer: 'Yes, it is free to use.' },
      { question: 'Does this save my data?', answer: 'Text inputs are processed only in your browser.' }
    ],
    relatedTools: ['character-counter'],
    status: 'Active'
  },
  {
    id: 'character-counter',
    name: 'Character Counter',
    category: 'Text',
    slug: 'character-counter',
    metaTitle: 'Character Counter - Simple Calculator',
    metaDescription: 'Use this character counter to check text length instantly.',
    benefit: 'Count characters with and without spaces.',
    faqs: [
      { question: 'Does this save my data?', answer: 'Text inputs are processed only in your browser.' }
    ],
    relatedTools: ['word-counter'],
    status: 'Active'
  }
];
