import client from "@/db";

export async function searchBarService(
  location: string,
  category: string,
  price: number,
  bedrooms: number | null,
  bathrooms: number | null,
  type: string,
  landArea: number | null,
  area: number | null
) {
  try {
    console.log(
      location,
      category,
      price,
      bedrooms,
      bathrooms,
      type,
      landArea,
      area
    );

    // Lenient range for price (25% tolerance)
    const priceRange = { min: price * 0.75, max: price * 1.25 };

    // Lenient ranges for bedrooms, bathrooms, landArea, and area (using 25% tolerance)
    const bedroomRange =
      bedrooms && (category === "apartment" || category === "flat")
        ? { min: Math.floor(bedrooms * 0.75), max: Math.ceil(bedrooms * 1.25) }
        : null;

    const bathroomRange =
      bathrooms && (category === "apartment" || category === "flat")
        ? { min: Math.floor(bathrooms * 0.75), max: Math.ceil(bathrooms * 1.25) }
        : null;

    const landAreaRange = landArea
      ? { min: landArea * 0.75, max: landArea * 1.25 }
      : null;

    const areaRange = area ? { min: area * 0.75, max: area * 1.25 } : null;

    console.log(bedroomRange, bathroomRange, landAreaRange, areaRange);

    // Construct the search query with strict conditions for some and OR logic for lenient parameters
    const query: any = {
      location: {
        contains: location, // Strict matching for location
        mode: "insensitive",
      },
      category: {
        contains: category, // Strict matching for category
        mode: "insensitive",
      },
      type: {
        contains: type, // Strict matching for type
        mode: "insensitive",
      },
    };

    // Apply OR logic for lenient fields if provided
    const orConditions = [];

    // Lenient field: Price
    orConditions.push({
      price: { gte: priceRange.min, lte: priceRange.max },
    });

    // Lenient field: Bedrooms
    if (bedroomRange) {
      orConditions.push({
        bedrooms: { gte: bedroomRange.min, lte: bedroomRange.max },
      });
    }

    // Lenient field: Bathrooms
    if (bathroomRange) {
      orConditions.push({
        bathrooms: { gte: bathroomRange.min, lte: bathroomRange.max },
      });
    }

    // Lenient field: Land Area
    if (landAreaRange) {
      orConditions.push({
        landArea: { gte: landAreaRange.min, lte: landAreaRange.max },
      });
    }

    // Lenient field: Area
    if (areaRange) {
      orConditions.push({
        area: { gte: areaRange.min, lte: areaRange.max },
      });
    }

    // If no lenient conditions are provided, return empty result
    if (orConditions.length > 0) {
      query.OR = orConditions; // At least one lenient condition must match
    } else {
      // If no lenient conditions, return empty result because lenient condition is required
      return [];
    }

    // Fetch results from the database
    const results = await client.listings.findMany({ where: query });

    function calculateScore(listing : any){
      let matchScore = 0;

      if (listing.price >= priceRange.min && listing.price <= priceRange.max) {
        matchScore += 1;
      }
    
      // Check bedroom range match (only if bedroomRange is defined)
      if (bedroomRange && listing.bedrooms !== null && listing.bedrooms >= bedroomRange.min && listing.bedrooms <= bedroomRange.max) {
        matchScore += 1;
      }
    
      // Check bathroom range match (only if bathroomRange is defined)
      if (bathroomRange && listing.bathrooms !== null && listing.bathrooms >= bathroomRange.min && listing.bathrooms <= bathroomRange.max) {
        matchScore += 1;
      }
    
      // Check land area range match (only if landAreaRange is defined)
      if (landAreaRange && listing.landArea !== null && listing.landArea >= landAreaRange.min && listing.landArea <= landAreaRange.max) {
        matchScore += 1;
      }
    
      // Check area range match (only if areaRange is defined)
      if (areaRange && listing.area !== null && listing.area >= areaRange.min && listing.area <= areaRange.max) {
        matchScore += 1;
      }

      return matchScore;
    }

    const scoredResults = results.map((listing) => ({
      ...listing,
      matchScore: calculateScore(listing),
    }));
     

    scoredResults.sort((a, b) => b.matchScore - a.matchScore);
    console.log("scoredReuslt", scoredResults)
    // Filter out listings with no match score
    const finalResults = scoredResults.filter((listing) => listing.matchScore > 0);
    console.log("finalResult", finalResults)
    return finalResults;
  } catch (error) {
    return {
      message: "Something happened",
      error: error,
    };
  }
}
