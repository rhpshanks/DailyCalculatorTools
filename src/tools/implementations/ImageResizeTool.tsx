import React, { useState, useRef } from 'react';
import { Download, Upload, Image as ImageIcon } from 'lucide-react';

export default function ImageResizeTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [lockAspect, setLockAspect] = useState(true);
  const [originalAspectRatio, setOriginalAspectRatio] = useState<number>(1);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImageSrc(event.target?.result as string);
          setWidth(img.width.toString());
          setHeight(img.height.toString());
          setOriginalAspectRatio(img.width / img.height);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (val: string) => {
    setWidth(val);
    if (lockAspect && val && !isNaN(parseInt(val))) {
      setHeight(Math.round(parseInt(val) / originalAspectRatio).toString());
    }
  };

  const handleHeightChange = (val: string) => {
    setHeight(val);
    if (lockAspect && val && !isNaN(parseInt(val))) {
      setWidth(Math.round(parseInt(val) * originalAspectRatio).toString());
    }
  };

  const generateResizedImage = () => {
    if (!imageSrc || !width || !height) return null;
    
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    const img = new Image();
    img.src = imageSrc;
    
    const w = parseInt(width);
    const h = parseInt(height);
    
    canvas.width = w;
    canvas.height = h;
    
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL('image/jpeg', 0.9);
  };

  const handleDownload = () => {
    const resizedURL = generateResizedImage();
    if (resizedURL) {
      const a = document.createElement('a');
      a.href = resizedURL;
      a.download = 'resized-image.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="space-y-8">
       {/* Privacy Note */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 flex gap-3">
         <span className="flex-shrink-0 mt-0.5">💡</span>
         <p><strong>Privacy note:</strong> Your images are processed entirely in your browser. They are not uploaded to our servers.</p>
      </div>

      {!imageSrc ? (
        <div 
          className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h4 className="text-lg font-bold text-slate-900 mb-2">Upload an image to resize</h4>
          <p className="text-slate-500 mb-6">JPEG, PNG or WebP</p>
          <button className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
            Select file
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-video bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center relative">
              <img src={imageSrc} alt="Preview" className="max-w-full max-h-full object-contain" />
              <button 
                onClick={() => setImageSrc(null)}
                className="absolute top-2 right-2 px-3 py-1 bg-white/90 shadow text-rose-600 text-xs font-semibold rounded-md hover:bg-white"
              >
                Clear
              </button>
            </div>
            {/* hidden canvas for generating resize */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
          
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Target Dimensions</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Width (px)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Height (px)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={lockAspect}
                onChange={(e) => setLockAspect(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700">Lock aspect ratio</span>
            </label>

            <button 
              onClick={handleDownload}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Resized Image
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
}
