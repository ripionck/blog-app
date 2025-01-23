import PropTypes from "prop-types";

const BlogContent = ({ content }) => {
  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

BlogContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default BlogContent;
