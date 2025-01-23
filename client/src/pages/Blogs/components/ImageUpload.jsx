import PropTypes from "prop-types";
import { useRef } from "react";
import { ImageIcon } from "lucide-react";

const ImageUpload = ({ imagePreview, setImagePreview }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8 text-center cursor-pointer"
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {imagePreview ? (
        <img
          src={imagePreview || "/placeholder.svg"}
          alt="Preview"
          className="max-h-64 mx-auto rounded"
        />
      ) : (
        <div className="space-y-2">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
          <div>
            <span className="text-indigo-600 hover:underline">
              Upload a file
            </span>
            {" or drag and drop"}
          </div>
          <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png,image/jpeg,image/gif"
        onChange={handleImageUpload}
      />
    </div>
  );
};

ImageUpload.propTypes = {
  imagePreview: PropTypes.string,
  setImagePreview: PropTypes.func.isRequired,
};

export default ImageUpload;
