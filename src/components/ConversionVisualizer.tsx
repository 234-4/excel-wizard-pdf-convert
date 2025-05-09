
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { FileUp, FileDown, CheckCircle } from "lucide-react";

interface ConversionVisualizerProps {
  isConverting: boolean;
  file: File | null;
  convertedFileUrl: string | null;
}

const ConversionVisualizer = ({ isConverting, file, convertedFileUrl }: ConversionVisualizerProps) => {
  const [progress, setProgress] = useState(0);
  
  // Simulate progress when conversion is happening
  useEffect(() => {
    if (isConverting) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 10;
          return newProgress >= 95 ? 95 : newProgress;
        });
      }, 300);
      
      return () => {
        clearInterval(interval);
        if (convertedFileUrl) {
          setProgress(100);
        }
      };
    } else if (convertedFileUrl) {
      setProgress(100);
    }
  }, [isConverting, convertedFileUrl]);
  
  // Show nothing if no file is selected
  if (!file && !isConverting && !convertedFileUrl) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-card rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Conversion Status</h3>
      
      <div className="space-y-5">
        {/* File Flow Visualization */}
        <div className="flex items-center justify-center py-4">
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center ${file ? 'text-primary' : 'text-muted-foreground/30'}`}>
              <FileUp size={28} />
            </div>
            <span className="mt-2 text-sm">Excel File</span>
          </div>
          
          {/* Progress arrow */}
          <div className="mx-8 w-24 flex flex-col items-center">
            <div className="h-0.5 w-full bg-muted relative">
              <div 
                className="h-0.5 bg-primary absolute top-0 left-0 transition-all duration-300" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <span className="mt-2 text-xs text-muted-foreground">
              {isConverting ? 'Converting...' : (convertedFileUrl ? 'Completed' : 'Ready')}
            </span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 rounded-full ${convertedFileUrl ? 'bg-primary/10 text-primary' : 'bg-muted/30 text-muted-foreground/30'} flex items-center justify-center`}>
              {convertedFileUrl ? <FileDown size={28} /> : <FileDown size={28} />}
            </div>
            <span className="mt-2 text-sm">PDF File</span>
          </div>
        </div>
        
        {/* Progress bar */}
        {(file || isConverting) && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {/* Success indicator */}
        {convertedFileUrl && (
          <div className="flex items-center justify-center text-primary mt-4">
            <CheckCircle className="mr-2" />
            <span>Conversion complete! Your file is ready to download.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversionVisualizer;
