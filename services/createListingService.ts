// import jwt from "jsonwebtoken";
// import { CreateListingSchema } from "@/zod/schema";
// import client from "@/db";

// export async function createListingService(formData : CreateListingSchema,token:string){
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number}
//         const userId = decoded.userId
//         const listing = await client.listings.create({
//             data: {
//                 ...formData,
//                 userId
//             }
//         })
//         return {
//             message: "Lisiting Added Successfully",
//             listing: listing
//         }
//     }catch (error) {
//         return error
//     }
// }

import jwt from "jsonwebtoken";

import client from "@/db";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

export async function createListingService(
  formData: any,
  token: string
) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };
    const userId = decoded.userId;
    const files = formData.images || [];

    const imageUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filename = Date.now() + "-" + file.name;
        const filePath = path.join("/var/www/images", filename);

        // Save the file to /var/www/images
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        // Add image URL to the list
        imageUrls.push(`/images/${filename}`);
   
      }
    console.log("imageUrls", imageUrls)
    // Start a transaction to ensure both actions are performed atomically
    const result = await client.$transaction(async (prisma) => {
      // Create the listing first
      const listing = await prisma.listings.create({
        data: {
          ...formData,
          userId,
          images: {
            create: imageUrls.map((image) => ({
              url: image, // Base64 string (assuming it's stored in the 'url' field)
            })) || [], // Ensure an empty array if no images are provided
          },
        },
      });
      
      return listing;
    });
    revalidatePath("/");
    return {
      message: "Listing added successfully",
      listing: result,
    };
  } catch (error: any) {
    return {
      error: error.message || "An error occurred while adding the listing",
    };
  }
}
