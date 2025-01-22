const PopularTags = () => {
  const tags = [
    "#webdev",
    "#javascript",
    "#programming",
    "#react",
    "#tech",
    "#design",
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Popular Tags</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularTags;
