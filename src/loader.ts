// Find the type for a review, should probably be in the docs. Or write it yourself based on the response
type Review = any

export default async ({
  apiKey,
  placeId,
  language
}: {
  apiKey: string
  placeId: string
  language: string
}) => {
  try {
      const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=${language}`
      );
      const data = await response.json();

      console.log("Google Places API Response:", data);

      if (!data.result || !data.result.reviews) {
          throw new Error("No reviews found for this place.");
      }

      return data.result.reviews.map((review: any, index: number) => ({
          id: `review-${index}`,
          ...review,
      }));
  } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
  }
},