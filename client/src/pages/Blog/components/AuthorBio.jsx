import PropTypes from "prop-types";

const AuthorBio = ({ author }) => {
  return (
    <div className="mt-8 pt-8 border-t">
      <h3 className="text-lg font-semibold mb-4">About the Author</h3>
      <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl">
        <img
          src={author.avatar || "/placeholder.svg"}
          alt={author.firstname}
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h4 className="font-medium">
            {author.firstname} {author.lastname}
          </h4>
          <p className="text-sm text-gray-500 mb-2">{author.email}</p>
          <p className="text-gray-600">
            A passionate developer with over 10 years of experience in web
            development. Focused on creating efficient, scalable, and
            user-friendly applications.
          </p>
        </div>
      </div>
    </div>
  );
};

AuthorBio.propTypes = {
  author: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
};

export default AuthorBio;
