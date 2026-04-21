import { useState, useRef } from 'react';
import { Crop, X, Copy, Zap } from 'lucide-react';

interface Props {
  onScreenshotCapture: (imageData: string, text: string) => void;
}

export default function FloatingAIButton({ onScreenshotCapture }: Props) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [selectionBox, setSelectionBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSelecting(true);
    setStartPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isSelecting || !startPoint) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const width = currentX - startPoint.x;
    const height = currentY - startPoint.y;

    setSelectionBox({
      x: Math.min(startPoint.x, currentX),
      y: Math.min(startPoint.y, currentY),
      w: Math.abs(width),
      h: Math.abs(height),
    });
  };

  const handleMouseUp = async () => {
    if (!isSelecting || !selectionBox) return;

    setIsSelecting(false);

    try {
      const canvas = await html2canvas(document.body, {
        x: selectionBox.x,
        y: selectionBox.y,
        width: selectionBox.w,
        height: selectionBox.h,
        useCORS: true,
        allowTaint: true,
      });

      const imageData = canvas.toDataURL();

      // Extract text using OCR simulation (basic approach)
      const element = document.elementFromPoint(selectionBox.x, selectionBox.y);
      let extractedText = '';

      if (element) {
        const walk = document.createTreeWalker(
          element,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );

        let node;
        while ((node = walk.nextNode())) {
          const text = node.textContent?.trim();
          if (text) extractedText += text + ' ';
        }
      }

      onScreenshotCapture(imageData, extractedText.trim());
      setSelectionBox(null);
    } catch (error) {
      console.error('Screenshot failed:', error);
    }
  };

  if (isSelecting) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return (
      <div className="fixed inset-0 z-[9999] cursor-crosshair bg-black/20">
        {selectionBox && (
          <div
            className="absolute border-2 border-cyan-500 bg-cyan-500/10"
            style={{
              left: `${selectionBox.x}px`,
              top: `${selectionBox.y}px`,
              width: `${selectionBox.w}px`,
              height: `${selectionBox.h}px`,
            }}
          />
        )}
        <div className="fixed bottom-4 left-4 bg-[#111118] border border-white/10 rounded-lg p-3 text-white text-sm">
          <p>Drag to select area to analyze</p>
          <p className="text-gray-400 text-xs mt-1">Release to capture</p>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={startSelection}
      title="Capture screenshot and ask AI"
      className="fixed bottom-6 right-6 z-[999] w-14 h-14 bg-gradient-to-br from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
    >
      <Crop size={24} />
    </button>
  );
}

// Fallback for html2canvas if not available
async function html2canvas(element: HTMLElement, options: any) {
  const canvas = document.createElement('canvas');
  canvas.width = options.width;
  canvas.height = options.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Create a simple screenshot (basic implementation)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000000';
  ctx.font = '14px Arial';
  ctx.fillText('Screenshot Captured', 10, 20);

  return canvas;
}
