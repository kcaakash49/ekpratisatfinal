"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import AdminUserSearchBar from "@/components/AdminUserSearchBar";

type User = {
  id: string;
  fullname: string;
  email: string;
  mobile: string;
  role: string;
  created: string; // Added created date
};

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingSearchQuery, setPendingSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `/api/admin/users/search?searchQuery=${encodeURIComponent(searchQuery)}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const data = await res.json();
        setUsers(data.users || []);
        setTotalUsers(data.totalUsers || 0);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [currentPage, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPendingSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(pendingSearchQuery);
    setCurrentPage(1);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditForm(user);
  };

  const closeEditModal = () => setEditingUser(null);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveEditedUser = async () => {
    if (!editingUser) return;
    await fetch(`/api/admin/users/${editingUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setUsers((prev) =>
      prev.map((user) => (user.id === editingUser.id ? { ...user, ...editForm } : user))
    );
    closeEditModal();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <AdminUserSearchBar value={pendingSearchQuery} onChange={handleSearchChange} onSearch={handleSearch} />

      <table className="w-full bg-white border border-gray-200">
        <thead><tr className="bg-gray-100 border-b"><th>ID</th><th>Full Name</th><th>Email</th><th>Mobile</th><th>Role</th><th>Created At</th><th>Actions</th></tr></thead>
        <tbody>
          {users.length ? (
            users.map((user) => (
              <tr key={user.id} className="border-b">
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.role}</td>
                <td>{user.created ? new Date(user.created).toLocaleDateString() : "N/A"} {/* Fallback if no date */}</td>
                <td><button onClick={() => openEditModal(user)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>


      <Pagination currentPage={currentPage} totalItems={totalUsers} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>

            <label className="block font-semibold">Full Name</label>
            <input name="fullname" value={editForm.fullname || ""} onChange={handleEditChange} className="border p-2 w-full mb-2" />

            <label className="block font-semibold">Email</label>
            <input name="email" value={editForm.email || ""} onChange={handleEditChange} className="border p-2 w-full mb-2" />

            <label className="block font-semibold">Mobile</label>
            <input name="mobile" value={editForm.mobile || ""} onChange={handleEditChange} className="border p-2 w-full mb-2" />

            <label className="block font-semibold">Role</label>
            <select name="role" value={editForm.role || ""} onChange={handleEditChange} className="border p-2 w-full mb-2">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>

            <label className="block font-semibold">Created At</label>
            <input
              type="text"
              value={new Date(editingUser.created).toLocaleString()} // Show formatted date
              disabled
              className="border p-2 w-full bg-gray-100 cursor-not-allowed mb-2"
            />

            <div className="flex justify-between">
              <button onClick={saveEditedUser} className="bg-green-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={closeEditModal} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
