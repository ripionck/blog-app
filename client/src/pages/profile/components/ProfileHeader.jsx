import PropTypes from "prop-types";

const ProfileHeader = ({
  initials,
  name,
  title,
  description,
  posts,
  likes,
  comments,
}) => (
  <div className="bg-gray-50 rounded-lg p-8 text-center">
    <div className="flex justify-center mb-4">
      <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{initials}</span>
      </div>
    </div>

    <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
    <p className="text-gray-600 mb-2">{title}</p>
    <p className="text-gray-500 mb-6">{description}</p>

    <div className="flex justify-center gap-8">
      <div className="text-center">
        <div className="text-xl font-bold text-gray-900">{posts}</div>
        <div className="text-sm text-gray-500">Posts</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-gray-900">{likes}</div>
        <div className="text-sm text-gray-500">Likes</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-gray-900">{comments}</div>
        <div className="text-sm text-gray-500">Comments</div>
      </div>
    </div>
  </div>
);

ProfileHeader.propTypes = {
  initials: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  posts: PropTypes.number.isRequired,
  likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  comments: PropTypes.number.isRequired,
};

export default ProfileHeader;
