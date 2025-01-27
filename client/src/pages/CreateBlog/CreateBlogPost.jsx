import { useState, useRef } from "react";
import { createPost } from "./createPost";
import TextEditor from "../../components/createBlog/TextEditor";
import { Loader2 } from "lucide-react";
import BackButton from "../../components/common/BackButton";

export default function CreateBlog() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const formRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(formRef.current);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(tags));
    formData.append("isDraft", isDraft.toString());

    const coverImage = formRef.current.coverImage.files[0];
    if (coverImage) {
      const imageUrl = await handleImageUpload(coverImage);
      if (imageUrl) {
        formData.append("coverImage", imageUrl);
      } else {
        setError("Image upload failed. Please try again.");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const token = "your_token_here";
      const result = await createPost(formData, token);

      if (result.error) {
        setError(result.error);
      } else {
        // Reset form
        formRef.current.reset();
        setContent("");
        setTags([]);
        setIsDraft(false);
        // You could redirect to the new post here
        alert("Post created successfully!");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      } else {
        console.error("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      e.preventDefault();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <BackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Blog Post
        </h1>
        <p className="text-gray-600">
          Share your thoughts and knowledge with the community
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter a brief description"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInput}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add tags separated by commas"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>

          <TextEditor
            onChange={setContent}
            initialContent={content}
            onImageUpload={handleImageUpload}
          />
        </div>

        <div>
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cover Image
          </label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="draft"
              checked={isDraft}
              onChange={(e) => setIsDraft(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="draft" className="ml-2 block text-sm text-gray-900">
              Save as draft
            </label>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isDraft ? "Saving..." : "Publishing..."}
                </>
              ) : isDraft ? (
                "Save Draft"
              ) : (
                "Publish Post"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
