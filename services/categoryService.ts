// import client from "@/db";

// export async function categoryService(category: string) {
//     console.log(category)
//   try {
//     const data = await client.listings.findMany({
//       where: {
//         category: category,
//       },
//       include: {
//         images: true
//       }
//     });
//     if (!data || data.length === 0) {
//         console.log("No listings found for the category:", category);
//         return [];
//       }
//     // console.log("data is service",data)
//     return data;
//   } catch (e) {}
//   return "Some Error Happeed";
// }


import client from "@/db";

export async function categoryService(category: string, page: number = 1, limit: number = 5) {
  const skip = (page - 1) * limit;

  try {
    const data = await client.listings.findMany({
      where: { category },
      include: { images: true },
      skip,
      take: limit,
    });

    const totalRecords = await client.listings.count({ where: { category } });

    return {
      data,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
    };
  } catch (error) {
    // console.error("Error fetching category listings:", error);
    return { data: [], totalRecords: 0, totalPages: 0, currentPage: page };
  }
}
