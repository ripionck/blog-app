import PropTypes from "prop-types";
import {
  Link2Icon,
  List,
  ListOrdered,
  Bold,
  Italic,
  Underline,
  Code,
} from "lucide-react";

const TextEditor = ({ content, setContent }) => {
  const handleTextFormat = (format) => {
    // Implement text formatting logic here
    console.log("Format:", format);
  };

  return (
    <div className="border rounded-lg mb-8">
      <div className="flex items-center gap-2 border-b p-2">
        <button
          onClick={() => handleTextFormat("bullet")}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleTextFormat("number")}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleTextFormat("bold")}
          className="p-2 hover:bg-gray-100 rounded font-bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleTextFormat("italic")}
          className="p-2 hover:bg-gray-100 rounded italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleTextFormat("underline")}
          className="p-2 hover:bg-gray-100 rounded underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleTextFormat("link")}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <Link2Icon className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleTextFormat("link")}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <Code className="w-4 h-4" />
        </button>
      </div>
      <textarea
        placeholder="Start writing your blog post..."
        className="w-full p-4 min-h-[300px] focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

TextEditor.propTypes = {
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
};

export default TextEditor;
