import { ToolMetadata } from '../../types';

export const printTools: ToolMetadata[] = [
  {
    id: 'a4-size-in-pixels',
    name: 'A4 Size in Pixels',
    category: 'Print & Paper',
    slug: 'a4-size-in-pixels',
    metaTitle: 'A4 Size in Pixels - Simple Calculator',
    metaDescription: 'Use this A4 size in pixels to check values instantly.',
    benefit: 'Calculate the pixel dimensions for A4 at various DPI.',
    formulaText: 'Pixels = Inches × DPI',
    exampleText: 'A4 is 8.27 × 11.69 inches. At 300 DPI: 2480 × 3508 pixels.',
    faqs: [
      { question: 'How is this value calculated?', answer: 'The tool uses a simple formula and shows the result instantly.' },
      { question: 'Can I use this for business calculations?', answer: 'Yes, but verify final values with a qualified person where needed.' },
      { question: 'Is this tool free?', answer: 'Yes, it is free to use.' },
      { question: 'Does this save my data?', answer: 'Basic calculator inputs are not saved.' }
    ],
    relatedTools: [],
    tableData: {
      headers: ['DPI', 'A4 Size (Pixels)'],
      rows: [
        { label: '72 DPI', value: '595 × 842' },
        { label: '150 DPI', value: '1240 × 1754' },
        { label: '300 DPI', value: '2480 × 3508' },
        { label: '600 DPI', value: '4960 × 7016' }
      ]
    },
    status: 'Active'
  }
];
