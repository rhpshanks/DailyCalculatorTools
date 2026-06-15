export const categories = [
  "Business",
  "Unit Converter",
  "Print & Paper",
  "Text",
  "Image & Media",
  "Daily Use"
];

import { calculateTools } from './toolLists/business';
import { converterTools } from './toolLists/converters';
import { textTools } from './toolLists/text';
import { imageTools } from './toolLists/images';
import { printTools } from './toolLists/print';
import { dailyUseTools } from './toolLists/daily';
import { ToolMetadata } from '../types';

export const allTools: ToolMetadata[] = [
  ...calculateTools,
  ...converterTools,
  ...textTools,
  ...imageTools,
  ...printTools,
  ...dailyUseTools
];

export const getToolsByCategory = (category: string) => allTools.filter(t => t.category === category && t.status === 'Active');
export const getActiveTools = () => allTools.filter(t => t.status === 'Active');
export const getToolBySlug = (slug: string) => allTools.find(t => t.slug === slug);
export const searchTools = (query: string) => {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return getActiveTools().filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) || 
    tool.category.toLowerCase().includes(lowerQuery) ||
    tool.slug.includes(lowerQuery)
  );
};
