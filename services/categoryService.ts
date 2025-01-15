import client from "@/db";

export async function categoryService(category: string) {
    console.log(category)
  try {
    const data = await client.listings.findMany({
      where: {
        category: category,
      },
      include: {
        images: true
      }
    });
    if (!data || data.length === 0) {
        console.log("No listings found for the category:", category);
        return [];
      }
    // console.log("data is service",data)
    return data;
  } catch (e) {}
  return "Some Error Happeed";
}
