import { categoryAction } from "@/action/categoryAction"

import Header from "@/components/Header"
import ListingListComponent from "@/components/ListingListComponent"
import Link from "next/link";



export default async function ({ params, searchParams }: any) {
  const category = await params;
  // console.log(category.items[0])
  const searchParam = await searchParams;
  const page = Number(searchParam?.page) || 1;
  const limit = 5; // Number of items per pag


  const { data: listings, totalPages, currentPage } = await categoryAction(category.items[0], page, limit);

  if (listings.length == 0) {
    return (
      <div className="flex flex-col h-full">
        <Header />
        <div className="flex flex-grow items-center justify-center ">
          No records found
        </div>
      </div>
    )
  }
  return (
    <div>
      <Header />
      <ListingListComponent listing={listings} />
      <div className="flex justify-center space-x-4 mt-4">
        {/* Previous Button */}
        {currentPage > 1 && (
          <Link
            href={`?page=${currentPage - 1}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Previous
          </Link>
        )}

        {/* Page Indicator */}
        <span className="px-4 py-2 border rounded">{`Page ${currentPage} of ${totalPages}`}</span>

        {/* Next Button */}
        {currentPage < totalPages && (
          <Link
            href={`?page=${currentPage + 1}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Next
          </Link>
        )}
      </div>
    </div>

  )

}