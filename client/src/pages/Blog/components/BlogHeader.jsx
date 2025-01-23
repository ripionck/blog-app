import PropTypes from "prop-types";
import { Calendar, Clock, Tag } from "lucide-react";

const BlogHeader = ({ author, title, publishDate, readingTime, category }) => {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={author.avatar || "/placeholder.svg"}
          alt={author.firstname}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <h3 className="font-medium">
            {author.firstname} {author.lastname}
          </h3>
          <p className="text-sm text-gray-500">{author.email}</p>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {new Date(publishDate).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {readingTime} min read
        </div>
        <div className="flex items-center gap-1">
          <Tag className="h-4 w-4" />
          {category}
        </div>
      </div>
    </header>
  );
};

BlogHeader.propTypes = {
  author: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  readingTime: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};

export default BlogHeader;
