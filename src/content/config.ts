import {defineCollection} from "astro:content";

const reviews = defineCollection({
    loader: async () => {
        const API_KEY = "YourApiKey"; // Specify your Google Places API key here
        const PLACE_ID = "ChIJIzaTdkckh0cR-v18lq42DE4";
        const LANGUAGE = "en"; // Specify the language code here

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}&language=${LANGUAGE}`
            );
            const data = await response.json();

            console.log("Google Places API Response:", data);

            if (!data.result || !data.result.reviews) {
                throw new Error("No reviews found for this place.");
            }

            return data.result.reviews.map((review: any, index: any) => ({
                id: `review-${index}`,
                ...review,
            }));
        } catch (error) {
            console.error("Error fetching reviews:", error);
            return [];
        }
    },
});

export const collections = {reviews};
