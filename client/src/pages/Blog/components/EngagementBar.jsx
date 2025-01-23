import { useState } from "react";
import PropTypes from "prop-types";
import { Heart, Share2, Bookmark, Eye } from "lucide-react";

const EngagementBar = ({ likes, readCount }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="sticky top-4 z-10 bg-white/80 backdrop-blur-sm border rounded-lg p-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-2"
          >
            <Heart
              className={`h-6 w-6 ${
                liked ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
            />
            <span className="text-gray-600">{likes.length}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500">
            <Share2 className="h-6 w-6" />
            <span>Share</span>
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className="flex items-center gap-2"
          >
            <Bookmark
              className={`h-6 w-6 ${
                saved ? "fill-indigo-500 text-indigo-500" : "text-gray-500"
              }`}
            />
            <span className="text-gray-600">Save</span>
          </button>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Eye className="h-6 w-6" />
          <span>{readCount} views</span>
        </div>
      </div>
    </div>
  );
};

EngagementBar.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  readCount: PropTypes.number.isRequired,
};

export default EngagementBar;
