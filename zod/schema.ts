

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
    images:z
    .array(
      z.custom<File>((val) => val instanceof File, {
        message: "Each image must be a File object",
      })
    )
    .min(1, { message: "At least one image is required" }),
    landArea: z.number().optional(),
    numberOfFloors: z.number().optional(),
    houseArea: z.number().optional(),
    area: z.number().optional()

})


export type CreateListingSchema = z.infer<typeof ListingSchema>