
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const FileUploader = ({ file, onFileChange }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (isExcelFile(droppedFile)) {
        onFileChange(droppedFile);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (isExcelFile(selectedFile)) {
        onFileChange(selectedFile);
      }
    }
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isExcelFile = (file: File): boolean => {
    const excelTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.oasis.opendocument.spreadsheet',
    ];
    
    // Also check the file extension as a fallback
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['xls', 'xlsx', 'ods'];
    
    return excelTypes.includes(file.type) || 
           (fileExtension && validExtensions.includes(fileExtension));
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors",
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
        "hover:border-primary/50 hover:bg-primary/5"
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.ods"
        onChange={handleFileInputChange}
        className="hidden"
        id="file-upload"
      />

      {!file ? (
        <>
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg mb-2">Drop your Excel file here</h3>
          <p className="text-muted-foreground text-center mb-4">
            or click the button below to select a file
          </p>
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            className="mt-2"
          >
            Select File
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Supported formats: .xlsx, .xls, .ods
          </p>
        </>
      ) : (
        <div className="w-full flex flex-col items-center">
          <p className="text-center mb-4">File selected and ready to convert</p>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="mt-2"
            >
              Change File
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRemoveFile}
              className="mt-2"
            >
              <X className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
