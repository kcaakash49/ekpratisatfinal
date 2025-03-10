// AdminSidebar.js
import { useRouter } from "next/navigation";
import { FaUser, FaHome, FaUsers, FaBars, FaTimes, FaListAlt } from "react-icons/fa";
import { useState } from "react";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div
        className={`bg-gray-900 text-white h-screen p-4 transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <button onClick={toggleSidebar} className="text-white p-2 rounded focus:outline-none">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <ul className="mt-6 space-y-4">
          <li
            className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => router.push("/admin/dashboard")}
          >
            <FaHome size={20} />
            {isOpen && <span>Dashboard</span>}
          </li>

          <li
            className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => router.push("/admin/dashboard/users")}
          >
            <FaUsers size={20} />
            {isOpen && <span>Users</span>}
          </li>

          <li
            className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => router.push("/admin/dashboard/listings")}
          >
            <FaListAlt size={20} />
            {isOpen && <span>Listings</span>}
          </li>
        </ul>
      </div>

      
    </div>
  );
};

export default AdminSidebar;
