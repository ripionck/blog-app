import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import TextEditor from "./components/TextEditor";

export default function CreateBlogPost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Technology",
    tags: "",
    metaTitle: "",
    metaDescription: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Create New Blog Post
        </h1>
        <div className="space-x-3">
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Publish
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Enter your title"
        className="w-full text-4xl font-light text-gray-500 placeholder-gray-400 mb-8 focus:outline-none"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          className="w-full p-2 border rounded-lg h-24"
          value={formData.metaDescription}
          onChange={(e) =>
            setFormData({ ...formData, metaDescription: e.target.value })
          }
        />
      </div>

      <ImageUpload
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
      />

      <TextEditor
        content={formData.content}
        setContent={(content) => setFormData({ ...formData, content })}
      />

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories
          </label>
          <select
            className="w-full p-2 border rounded-lg"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option>Technology</option>
            <option>Design</option>
            <option>Business</option>
            <option>Marketing</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            placeholder="Add tags separated by commas"
            className="w-full p-2 border rounded-lg"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
