

import {  z } from "zod";


export const ListingSchema = z.object({
    title: z.string(),
    description: z.string(),
    bathrooms: z.number(),
    bedrooms: z.number(),
    category: z.enum(['house','flat','apartment','business','hostel_boys','hostel_girls','land','room']),
    location: z.string(),
    price: z.number(),
    type: z.enum(["sale", "rent"]),
    images: z
    .array(
      z.instanceof(File).refine(
        (file) =>
          file.type.startsWith("image/") && file.size > 0,
        {
          message: "Each file must be an image and not empty",
        }
      )
    )
    .min(1, "At least one image"),
    landArea: z.number().optional(),
    numberOfFloors: z.number().optional(),
    houseArea: z.number().optional(),
    area: z.number().optional()

})


export type CreateListingSchema = z.infer<typeof ListingSchema>