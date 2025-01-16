

import {  z } from "zod";


export const ListingSchema = z.object({
    title: z.string(),
    description: z.string(),
    bathrooms: z.number().nullable().optional(),
    bedrooms: z.number().nullable().optional(),
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
    landArea: z.number().nullable().optional(),
    numberOfFloors: z.number().nullable().optional(),
    houseArea: z.number().nullable().optional(),
    area: z.number().nullable().optional()

})


export type CreateListingSchema = z.infer<typeof ListingSchema>