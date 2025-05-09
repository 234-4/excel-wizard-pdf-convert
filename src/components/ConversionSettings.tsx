
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ConversionSettings = () => {
  const [includePagination, setIncludePagination] = useState(true);
  const [fitToPage, setFitToPage] = useState(true);
  const [orientation, setOrientation] = useState("portrait");
  const [paperSize, setPaperSize] = useState("a4");

  return (
    <div className="bg-muted/30 rounded-md p-4">
      <h3 className="font-medium mb-4">Conversion Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="pagination" className="cursor-pointer">Include pagination</Label>
          <Switch 
            id="pagination" 
            checked={includePagination}
            onCheckedChange={setIncludePagination}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="fit-page" className="cursor-pointer">Fit content to page</Label>
          <Switch 
            id="fit-page" 
            checked={fitToPage}
            onCheckedChange={setFitToPage}
          />
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label htmlFor="orientation">Page orientation</Label>
          <Select value={orientation} onValueChange={setOrientation}>
            <SelectTrigger id="orientation">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="paper-size">Paper size</Label>
          <Select value={paperSize} onValueChange={setPaperSize}>
            <SelectTrigger id="paper-size">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a4">A4</SelectItem>
              <SelectItem value="letter">Letter</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="a3">A3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Accordion type="single" collapsible>
          <AccordionItem value="advanced">
            <AccordionTrigger>Advanced settings</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="header" className="cursor-pointer">Include header row</Label>
                  <Switch id="header" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="gridlines" className="cursor-pointer">Show gridlines</Label>
                  <Switch id="gridlines" defaultChecked />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ConversionSettings;
