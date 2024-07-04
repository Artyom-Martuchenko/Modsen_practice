import axios from "axios";

export async function fetchSearch({searchDataHandler, xid}:{searchDataHandler: (value:any) => void, xid: string}) {
  const apiUrl = process.env.OPEN_TRIP_MAP_API_SEARCH + `${xid}`;
  const apiKey = process.env.OPEN_TRIP_MAP_API_KEY;
  try {
    const response = await axios.get(
    // "https://nominatim.openstreetmap.org/search",
    apiUrl,
    {
      params: {
        // Opentripmap 
        lang: 'en',
        apikey: apiKey,
        format: 'json',
        detailed: 'true',
        'radius': 1000,
        'limit': 1, 
      },
    }
    );
    console.log('Обработал', response)
    searchDataHandler(response)
  } catch (error) {
    console.error("Error fetching search object:", error);
  }
}