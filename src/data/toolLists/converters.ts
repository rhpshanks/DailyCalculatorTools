import { ToolMetadata } from '../../types';

export const converterTools: ToolMetadata[] = [
  {
    id: 'kg-to-grams',
    name: 'Kg to Grams',
    category: 'Unit Converter',
    slug: 'kg-to-grams',
    benefit: 'Convert kilograms to grams easily.',
    metaTitle: 'Kg to Grams Converter - Calculator Converter Tools',
    metaDescription: 'Use this kg to grams converter to check values instantly with formula and examples.',
    faqs: [],
    relatedTools: ['grams-to-kg', 'kg-to-pounds'],
    status: 'Active'
  },
  {
    id: 'grams-to-kg',
    name: 'Grams to Kg',
    category: 'Unit Converter',
    slug: 'grams-to-kg',
    benefit: 'Convert grams to kilograms easily.',
    metaTitle: 'Grams to Kg Converter - Calculator Converter Tools',
    metaDescription: 'Use this grams to kg converter to check values instantly with formula and examples.',
    faqs: [],
    relatedTools: ['kg-to-grams', 'kg-to-pounds'],
    status: 'Active'
  },
  {
    id: 'kg-to-pounds',
    name: 'Kg to Pounds',
    category: 'Unit Converter',
    slug: 'kg-to-pounds',
    benefit: 'Convert kilograms to pounds (lbs) easily.',
    metaTitle: 'Kg to Pounds Converter - Calculator Converter Tools',
    metaDescription: 'Use this kg to pounds converter to check values instantly with formula and examples.',
    faqs: [],
    relatedTools: ['kg-to-grams', 'grams-to-kg'],
    status: 'Active'
  },
  {
    id: 'feet-to-cm',
    name: 'Feet to Cm',
    category: 'Unit Converter',
    slug: 'feet-to-cm',
    benefit: 'Convert feet to centimeters easily.',
    metaTitle: 'Feet to Cm Converter - Calculator Converter Tools',
    metaDescription: 'Use this feet to cm converter to check values instantly with formula and examples.',
    faqs: [],
    relatedTools: [],
    status: 'Active'
  },
  {
    id: 'marla-to-sq-ft',
    name: 'Marla to Sq Ft',
    category: 'Unit Converter',
    slug: 'marla-to-sq-ft',
    benefit: 'Convert land size from Marla to Square Feet.',
    metaTitle: 'Marla to Sq Ft Converter - Calculator Converter Tools',
    metaDescription: 'Use this marla to sq ft calculator to convert values instantly.',
    faqs: [],
    relatedTools: ['sq-ft-to-marla', 'kanal-to-marla'],
    status: 'Active'
  },
  {
    id: 'sq-ft-to-marla',
    name: 'Sq Ft to Marla',
    category: 'Unit Converter',
    slug: 'sq-ft-to-marla',
    benefit: 'Convert Square Feet back to Marla.',
    metaTitle: 'Sq Ft to Marla Converter - Calculator Converter Tools',
    metaDescription: 'Use this sq ft to marla calculator to convert values instantly.',
    faqs: [],
    relatedTools: ['marla-to-sq-ft', 'kanal-to-marla'],
    status: 'Active'
  },
  {
    id: 'kanal-to-marla',
    name: 'Kanal to Marla',
    category: 'Unit Converter',
    slug: 'kanal-to-marla',
    benefit: 'Convert land size from Kanal to Marla.',
    metaTitle: 'Kanal to Marla Converter - Calculator Converter Tools',
    metaDescription: 'Use this Kanal to marla calculator to convert values instantly.',
    faqs: [],
    relatedTools: ['marla-to-sq-ft', 'sq-ft-to-marla'],
    status: 'Active'
  }
];
