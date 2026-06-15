import { ToolMetadata } from '../../types';

export const imageTools: ToolMetadata[] = [
  {
    id: 'image-resize-tool',
    name: 'Image Resize Tool',
    category: 'Image & Media',
    slug: 'image-resize-tool',
    metaTitle: 'Image Resize Tool - Simple Calculator',
    metaDescription: 'Use this image resize tool to check values instantly.',
    benefit: 'Resize your images purely in the browser.',
    faqs: [
      { question: 'How is this value calculated?', answer: 'The tool uses a simple browser canvas api to resize.' },
      { question: 'Can I use this for business calculations?', answer: 'Yes.' },
      { question: 'Is this tool free?', answer: 'Yes, it is free to use.' },
      { question: 'Does this save my data?', answer: 'Images are processed purely in your browser, they are not uploaded to our servers.' }
    ],
    relatedTools: [],
    status: 'Active'
  }
];
