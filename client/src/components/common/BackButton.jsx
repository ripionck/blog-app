import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
    >
      <MoveLeft />
      Go Back
    </button>
  );
};

export default BackButton;
