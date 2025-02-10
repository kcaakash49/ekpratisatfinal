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

// import jwt from "jsonwebtoken";

// import client from "@/db";
// import fs from "fs";
// import path from "path";
// import { revalidatePath } from "next/cache";

// export async function createListingService(
//   formData: any,
//   token: string
// ) {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
//         userId: number;
//     };
//     const userId = decoded.userId;
//     console.log("userId", userId);

//     const files = formData.images || [];

//     // Start a transaction to ensure atomicity
//     const result = await client.$transaction(async (prisma) => {
//         // Generate image URLs and buffer the file data
//         const imageUrls: string[] = [];
//         const fileBuffers: { buffer: Buffer; path: string }[] = [];

//         for (let i = 0; i < files.length; i++) {
//             const file = files[i];
//             const filename = Date.now() + "-" + file.name;
//             const filePath = path.join("/var/www/images", filename);

//             // Buffer the file content but delay writing to disk
//             const buffer = Buffer.from(await file.arrayBuffer());
//             fileBuffers.push({ buffer, path: filePath });

//             // Add to image URLs
//             imageUrls.push(`/images/${filename}`);
//         }
//         console.log(imageUrls)
//         // Create the listing
//         const listing = await prisma.listings.create({
//             data: {
//                 ...formData,
//                 userId,
//                 images: {
//                     create: imageUrls.map((image) => ({
//                         url: image,
//                     })),
//                 },
//             },
//         });

//         // Write files to disk after the listing is created
//         fileBuffers.forEach(({ buffer, path }) => {
//             fs.writeFileSync(path, buffer);
//         });

//         return listing;
//     });

//     revalidatePath("/");
//     return {
//         message: "Listing added successfully",
//         listing: result,
//     };
// } catch (error: any) {
//     // console.error("Error adding listing:", error);
//     return {
//         error: "An error occurred while adding the listing",
//     };
// }


// }


import jwt from "jsonwebtoken";
import client from "@/db";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import sharp from "sharp"; // Import sharp for image resizing and conversion

export async function createListingService(
  formData: any,
  token: string
) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };
    const userId = decoded.userId;
    console.log("userId", userId);

    const files = formData.images || [];

    // Start a transaction to ensure atomicity
    const result = await client.$transaction(async (prisma) => {
      // Generate image URLs and buffer the file data
      const imageUrls: string[] = [];
      const fileBuffers: { buffer: Buffer; path: string }[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filename = Date.now() + "-" + file.name;
        const outputFormat = 'webp';
        const filePath = path.join("/var/www/images", filename.replace(path.extname(filename), `.${outputFormat}`)); // Image path changed to /var/www/images

        // Buffer the file content
        const buffer = Buffer.from(await file.arrayBuffer());

        // Resize and convert the image to WebP (or another format) with Sharp
        const optimizedBuffer = await sharp(buffer)
        .resize(1200) // Resize the image to 800px wide (adjust as necessary)
        .toFormat(outputFormat, { quality: 100 }) // Convert to WebP or your desired format
        .toBuffer(); // Get the resized buffer

        // Push to fileBuffers for later saving
        fileBuffers.push({ buffer: optimizedBuffer, path: filePath });

        // Add to image URLs
        imageUrls.push(`/images/${path.basename(filePath)}`);
      }

      console.log(imageUrls);

      // Create the listing
      const listing = await prisma.listings.create({
        data: {
          ...formData,
          userId,
          images: {
            create: imageUrls.map((image) => ({
              url: image,
            })),
          },
        },
      });

      // Write optimized files to disk after the listing is created
      fileBuffers.forEach(({ buffer, path }) => {
        fs.writeFileSync(path, buffer);
      });

      return listing;
    });

    // Revalidate the homepage cache to reflect new listings
    revalidatePath("/");

    return {
      message: "Listing added successfully",
      listing: result,
    };
  } catch (error: any) {
    console.error("Error adding listing:", error);
    return {
      error: "An error occurred while adding the listing",
    };
  }
}
