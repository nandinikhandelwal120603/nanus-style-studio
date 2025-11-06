import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationState {
  top: string;
  bottom: string;
  hairstyle: string;
  accessory: string;
}

const Receipt = () => {
  const location = useLocation();
  const { toast } = useToast();
  const state = location.state as LocationState;
  const [finalImage, setFinalImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state) {
      generateOutfit();
    }
  }, [state]);

  const generateOutfit = async () => {
    setIsLoading(true);
    
    // TODO: Replace this with your actual Gemini or Banana API endpoint.
    // The endpoint should accept 5 images and return a composite outfit image.
    try {
      const response = await fetch("/api/generate-outfit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800", // User's base photo
          top: state.top,
          bottom: state.bottom,
          hairstyle: state.hairstyle,
          accessory: state.accessory,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFinalImage(data.finalImage);
      } else {
        // For demo purposes, use a placeholder
        setFinalImage("https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800");
      }
    } catch (error) {
      console.error("Error generating outfit:", error);
      // Fallback to placeholder
      setFinalImage("https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    // TODO: Hook this up to download the generated image
    // e.g. trigger a download from finalImage URL
    if (finalImage) {
      const link = document.createElement("a");
      link.href = finalImage;
      link.download = "styled-by-nanu-outfit.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started!",
        description: "Your outfit is being downloaded.",
      });
    }
  };

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No outfit data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Final Outfit Image */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Your Generated Look</h2>
            <div className="relative aspect-[3/4] bg-card rounded-3xl overflow-hidden shadow-[var(--shadow-soft)]">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                    <p className="text-lg font-medium">Creating your look...</p>
                  </div>
                </div>
              ) : (
                <img
                  src={finalImage}
                  alt="Generated outfit"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <Button
              onClick={handleDownload}
              disabled={isLoading}
              className="w-full py-6 text-lg rounded-full"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Outfit
            </Button>
          </div>

          {/* Right: Outfit Receipt */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🧾</span>
              <h2 className="text-3xl font-bold">Outfit Receipt</h2>
            </div>
            
            <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-soft)] space-y-6">
              <div className="space-y-4">
                {/* Header Row */}
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
                  <div className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Item
                  </div>
                  <div className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Selected Image
                  </div>
                </div>

                {/* Top */}
                <div className="grid grid-cols-2 gap-4 items-center py-3">
                  <div className="font-medium">Top</div>
                  <div className="rounded-2xl overflow-hidden aspect-square bg-secondary/50">
                    <img
                      src={state.top}
                      alt="Selected top"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Bottom */}
                <div className="grid grid-cols-2 gap-4 items-center py-3">
                  <div className="font-medium">Bottom</div>
                  <div className="rounded-2xl overflow-hidden aspect-square bg-secondary/50">
                    <img
                      src={state.bottom}
                      alt="Selected bottom"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Hairstyle */}
                <div className="grid grid-cols-2 gap-4 items-center py-3">
                  <div className="font-medium">Hairstyle</div>
                  <div className="rounded-2xl overflow-hidden aspect-square bg-secondary/50">
                    <img
                      src={state.hairstyle}
                      alt="Selected hairstyle"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Accessory */}
                <div className="grid grid-cols-2 gap-4 items-center py-3">
                  <div className="font-medium">Accessory</div>
                  <div className="rounded-2xl overflow-hidden aspect-square bg-secondary/50">
                    <img
                      src={state.accessory}
                      alt="Selected accessory"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
