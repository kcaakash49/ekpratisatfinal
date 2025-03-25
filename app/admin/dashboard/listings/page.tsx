// /admin/dashboard/listings/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Added useRouter for navigation
import Pagination from "@/components/Pagination"; // Adjust the path as needed

type Listing = {
  id: string;
  title: string;
  price: number;
  category: string;
  created: string;
  user: {
    fullname: string;
  };
};

const ListingsPage = () => {
  const router = useRouter();  // Initialized useRouter
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalListings, setTotalListings] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const itemsPerPage = 10;

  const fetchListings = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/listings?page=${page}&limit=${itemsPerPage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }
      const data = await response.json();
      
      setListings(data.listings);
      setTotalListings(data.totalListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Delete listing
  const deleteListing = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/listings/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete listing");

      setListings((prev) => prev.filter((listing) => listing.id !== id));
      setTotalListings((prev) => prev - 1);
    } catch (error) {
      console.error("Error deleting listing:", (error as Error).message);
    }
  };

  // Redirect to the edit page
  const handleEdit = (id: string) => {
    router.push(`/edit-listing/${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Listings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="min-w-full border-collapse table-auto">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">User</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Created</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id}>
                  <td className="border p-2">{listing.id}</td>
                  <td className="border p-2">{listing.title}</td>
                  <td className="border p-2">{listing.user.fullname}</td>
                  <td className="border p-2">{listing.price}</td>
                  <td className="border p-2">{listing.category}</td>
                  <td className="border p-2">{new Date(listing.created).toLocaleString()}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(listing.id)}  // Handle the Edit button click
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteListing(listing.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalItems={totalListings}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ListingsPage;  // Ensure this is the default export
