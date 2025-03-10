"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading"; // Your loading spinner component
import Header from "@/components/Header"; // Updated Header with avatar dropdown for admin
import { useSession } from "next-auth/react";
import AdminSidebar from "@/components/AdminSidebar";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalListings, setTotalListings] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // If the session is unauthenticated or the user is not an admin, redirect to sign-in
  useEffect(() => {
    if (status === "unauthenticated" || (session && session.user.role !== "ADMIN")) {
      router.push("/auth/signin");
    }
  }, [status, session, router]);

  // Fetch total users and listings data if authenticated
  useEffect(() => {
    if (status === "authenticated") {
      const fetchData = async () => {
        try {
          const [userRes, listingRes] = await Promise.all([
            fetch("/api/admin/users"),
            fetch("/api/admin/listings"),
          ]);

          if (!userRes.ok || !listingRes.ok) {
            throw new Error("Failed to fetch admin data");
          }

          const userData = await userRes.json();
          const listingData = await listingRes.json();
          setTotalUsers(userData.totalUsers);
          setTotalListings(listingData.totalListings);
        } catch (err: any) {
          setError(err.message || "Unknown error occurred");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [status]);

  if (loading) return <Loading />;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with logo, search, and admin avatar dropdown */}
      <Header className="sticky top-0 z-10 bg-white" />

      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar />

        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

          <div className="grid grid-cols-1 gap-8">
            {/* Stats Section */}
            <section className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Total Users */}
                <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
                  <div>
                    <h3 className="text-lg font-medium">Total Users</h3>
                    <p className="text-2xl font-bold">{totalUsers}</p>
                  </div>
                  <div className="bg-blue-500 text-white p-4 rounded-full">
                    <span className="text-3xl">👥</span>
                  </div>
                </div>

                {/* Total Listings */}
                <div className="flex justify-between items-center bg-green-100 p-4 rounded-lg">
                  <div>
                    <h3 className="text-lg font-medium">Total Listings</h3>
                    <p className="text-2xl font-bold">{totalListings}</p>
                  </div>
                  <div className="bg-green-500 text-white p-4 rounded-full">
                    <span className="text-3xl">🏠</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;