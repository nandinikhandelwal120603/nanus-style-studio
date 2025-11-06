import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShuffleBox } from "@/components/ShuffleBox";

// TODO: Replace image arrays with your real uploaded image URLs
const tops = [
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
];

const bottoms = [
  "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
  "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400",
  "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
];

const hairstyles = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400",
  "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
];

const accessories = [
  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400",
  "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400",
  "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400",
];

const Shuffle = () => {
  const navigate = useNavigate();
  const [selectedTop, setSelectedTop] = useState(tops[0]);
  const [selectedBottom, setSelectedBottom] = useState(bottoms[0]);
  const [selectedHairstyle, setSelectedHairstyle] = useState(hairstyles[0]);
  const [selectedAccessory, setSelectedAccessory] = useState(accessories[0]);
  const [isShuffling, setIsShuffling] = useState(true);

  const handleGenerateLook = () => {
    setIsShuffling(false);
    
    // Redirects to Page 2 after images are selected
    // Sends selected images in state or query params
    navigate("/receipt", {
      state: {
        top: selectedTop,
        bottom: selectedBottom,
        hairstyle: selectedHairstyle,
        accessory: selectedAccessory,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 fade-in">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Your AI Stylist
          </h1>
          <p className="text-xl text-muted-foreground">
            Shuffle your closet & see your next look ✨
          </p>
        </div>

        {/* Shuffle Grid */}
        <div className="grid grid-cols-2 gap-6 mt-12">
          <ShuffleBox
            label="Tops"
            images={tops}
            isShuffling={isShuffling}
            onImageChange={setSelectedTop}
          />
          <ShuffleBox
            label="Bottoms"
            images={bottoms}
            isShuffling={isShuffling}
            onImageChange={setSelectedBottom}
          />
          <ShuffleBox
            label="Hairstyles"
            images={hairstyles}
            isShuffling={isShuffling}
            onImageChange={setSelectedHairstyle}
          />
          <ShuffleBox
            label="Accessories"
            images={accessories}
            isShuffling={isShuffling}
            onImageChange={setSelectedAccessory}
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-center pt-8">
          <Button
            onClick={handleGenerateLook}
            size="lg"
            className="px-12 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Generate Look ✨
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Shuffle;
