import { User } from "lucide-react";

const Profile = () => (
  <div className="relative">
    <button
      className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-transparent
                     hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
        <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        Sign In
      </span>
    </button>
  </div>
);

export default Profile;
