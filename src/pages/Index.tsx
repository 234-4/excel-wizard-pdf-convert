
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, FileDown, FilePlus2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FileUploader from "@/components/FileUploader";
import ConversionSettings from "@/components/ConversionSettings";
import ConversionVisualizer from "@/components/ConversionVisualizer";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
  const [conversionError, setConversionError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    setConvertedFileUrl(null);
    setConversionError(null);
  };
  
  const handleConvert = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an Excel file to convert",
        variant: "destructive",
      });
      return;
    }
    
    setIsConverting(true);
    setConversionError(null);
    setConvertedFileUrl(null);
    
    try {
      // In a real implementation, you would send the file to a server or use a library
      // For this demo, we'll simulate a conversion with a timeout
      await new Promise((resolve, reject) => {
        // Simulate random error to show error handling
        const shouldFail = Math.random() > 0.8;
        
        setTimeout(() => {
          if (shouldFail) {
            reject(new Error("Could not process Excel file. The file format may be unsupported or corrupted."));
          } else {
            resolve(true);
          }
        }, 2000);
      });
      
      // Create a valid PDF blob
      const pdfContent = `%PDF-1.7
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 68 >>
stream
BT
/F1 24 Tf
100 700 Td
(Converted from Excel: ${file.name}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000233 00000 n
0000000301 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
420
%%EOF`;
      
      // Create a valid PDF blob with proper MIME type
      const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setConvertedFileUrl(pdfUrl);
      
      toast({
        title: "Conversion complete",
        description: "Your Excel file has been converted to PDF",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during conversion";
      setConversionError(errorMessage);
      
      toast({
        title: "Conversion failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };
  
  const handleRetry = () => {
    setConversionError(null);
    handleConvert();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Excel Wizard PDF Converter</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert your Excel spreadsheets to professional PDF documents with just a few clicks
          </p>
        </header>
        
        <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <FileUploader 
                file={file} 
                onFileChange={handleFileChange} 
              />
            </div>
            
            <div className="flex flex-col space-y-6">
              <ConversionSettings />
              
              <div className="flex flex-col space-y-4 mt-auto">
                <Button 
                  onClick={handleConvert} 
                  disabled={!file || isConverting}
                  className="w-full"
                >
                  {isConverting ? (
                    <>Converting...</>
                  ) : (
                    <>
                      <FileUp className="mr-2" />
                      Convert to PDF
                    </>
                  )}
                </Button>
                
                {convertedFileUrl && !conversionError && (
                  <Button 
                    variant="outline" 
                    asChild
                  >
                    <a 
                      href={convertedFileUrl} 
                      download={`${file?.name.replace(/\.[^/.]+$/, '') || 'converted'}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileDown className="mr-2" />
                      Download PDF
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {file && (
            <div className="mt-8 p-4 bg-secondary/50 rounded-md">
              <div className="flex items-center">
                <FilePlus2 className="mr-2" />
                <p className="font-medium">{file.name}</p>
                <span className="ml-auto text-muted-foreground text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </div>
          )}
          
          <ConversionVisualizer 
            isConverting={isConverting}
            file={file}
            convertedFileUrl={convertedFileUrl}
            error={conversionError}
            onRetry={handleRetry}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
