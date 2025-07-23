
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, FileDown, FilePlus2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FileUploader from "@/components/FileUploader";
import ConversionSettings from "@/components/ConversionSettings";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    setConvertedFileUrl(null);
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
    
    try {
      // In a real implementation, you would send the file to a server or use a library
      // For this demo, we'll simulate a conversion with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Create a fake PDF URL for demonstration purposes
      const fakePdfUrl = URL.createObjectURL(new Blob(['PDF content'], { type: 'application/pdf' }));
      setConvertedFileUrl(fakePdfUrl);
      
      toast({
        title: "Conversion complete",
        description: "Your Excel file has been converted to PDF",
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "An error occurred during conversion",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
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
                
                {convertedFileUrl && (
                  <Button 
                    variant="outline" 
                    asChild
                  >
                    <a href={convertedFileUrl} download="converted.pdf">
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
        </div>
      </div>
    </div>
  );
};

export default Index;
