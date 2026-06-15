import React from 'react';
import { ToolMetadata } from '../../types';
import PercentageCalculator from './implementations/PercentageCalculator';
import ReversePercentageCalculator from './implementations/ReversePercentageCalculator';
import KgToGrams from './implementations/KgToGrams';
import MarlaToSqFt from './implementations/MarlaToSqFt';
import WordCounter from './implementations/WordCounter';
import ImageResizeTool from './implementations/ImageResizeTool';
import A4SizeInPixels from './implementations/A4SizeInPixels';
import AgeCalculator from './implementations/AgeCalculator';
import GenericConverter from './implementations/GenericConverter';

export default function ToolFactory({ tool }: { tool: ToolMetadata }) {
  // Render specific implementation based on slug
  switch (tool.slug) {
    case 'percentage-calculator':
      return <PercentageCalculator />;
    case 'reverse-percentage-calculator':
      return <ReversePercentageCalculator />;
    case 'kg-to-grams':
      return <KgToGrams />;
    case 'grams-to-kg':
      return <GenericConverter label1="Grams (g)" label2="Kilograms (kg)" forwardRate={0.001} />;
    case 'kg-to-pounds':
      return <GenericConverter label1="Kilograms (kg)" label2="Pounds (lbs)" forwardRate={2.20462} />;
    case 'feet-to-cm':
      return <GenericConverter label1="Feet (ft)" label2="Centimeters (cm)" forwardRate={30.48} />;
    case 'sq-ft-to-marla':
      return <GenericConverter label1="Square Feet (sq ft)" label2="Marla (at 225 sq ft/marla)" forwardRate={1/225} />;
    case 'kanal-to-marla':
      return <GenericConverter label1="Kanal" label2="Marla" forwardRate={20} />;
    case 'marla-to-sq-ft':
      return <MarlaToSqFt />;
    case 'word-counter':
    case 'character-counter':
      return <WordCounter />;
    case 'image-resize-tool':
      return <ImageResizeTool />;
    case 'a4-size-in-pixels':
      return <A4SizeInPixels />;
    case 'age-calculator':
      return <AgeCalculator />;
    default:
      return (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-2xl">🚧</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Under Construction</h3>
          <p className="text-slate-500 max-w-md">This tool is currently being built exactly to specification.</p>
        </div>
      );
  }
}

