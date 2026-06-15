export interface FAQ {
  question: string;
  answer: string;
}

export interface TableRow {
  label: string;
  value: string;
}

export interface TableData {
  headers: [string, string];
  rows: TableRow[];
}

export interface ToolMetadata {
  id: string;
  name: string;
  category: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  benefit: string;
  formulaText?: string;
  exampleText?: string;
  faqs: FAQ[];
  relatedTools: string[]; // array of slugs
  tableData?: TableData;
  status: 'Active' | 'Draft' | 'Hidden';
}
