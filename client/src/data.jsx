export const categories = [
  {
    id: 1,
    title: "Technology",
    description:
      "Latest trends in web development, programming, and tech innovations",
    postCount: 24,
  },
  {
    id: 2,
    title: "Design",
    description: "UI/UX design principles, tools, and best practices",
    postCount: 18,
  },
  {
    id: 3,
    title: "Programming",
    description: "Coding tutorials, tips, and programming languages",
    postCount: 32,
  },
  {
    id: 4,
    title: "Career",
    description: "Career advice, job hunting tips, and professional growth",
    postCount: 15,
  },
  {
    id: 5,
    title: "Tutorials",
    description: "Step-by-step guides and educational content",
    postCount: 28,
  },
  {
    id: 6,
    title: "News",
    description: "Latest updates and news in tech industry",
    postCount: 21,
  },
];
export const userData = {
  name: "John Doe",
  avatar: "JD",
  role: "Web Developer & Technical Writer",
  bio: "Passionate about web development and sharing knowledge through technical writing.",
  stats: {
    posts: 24,
    likes: "1.2k",
    comments: 304,
  },
};

export const posts = [
  {
    id: 1,
    category: "Technology",
    title: "Getting Started with React Hooks: A Comprehensive Guide",
    author: "John Doe",
    date: "March 15, 2024",
    readTime: "8 min read",
    content:
      "React Hooks have revolutionized the way we write React components...",
    likes: 42,
    comments: 15,
  },
  {
    id: 2,
    category: "Design",
    title: "UI Design Trends 2024",
    date: "March 14, 2024",
    likes: 38,
    comments: 12,
  },
];

export const comments = [
  {
    id: 1,
    author: "Jane Smith",
    content:
      "Great article! The explanation of useEffect really helped me understand the concept better.",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    author: "Mike Johnson",
    content:
      "Could you elaborate more on custom hooks? I'm still trying to wrap my head around them.",
    timestamp: "5 hours ago",
  },
];
