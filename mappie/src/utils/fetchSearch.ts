import axios from "axios";

export async function fetchSearch({searchDataHandler, xid}:{searchDataHandler: (value:any) => void, xid: string | undefined}) {
  try {
    const response = await axios.get(
    // "https://nominatim.openstreetmap.org/search",
    "https://api.opentripmap.com/0.1/ru/places/xid",
    {
        params: {
          // Opentripmap 
          lang: 'ru',
          apikey: "5ae2e3f221c38a28845f05b63c4541753ad62fc8c2b126b0b6433cb6",
          xid: xid,          
        },
    }
    );
    console.log(response)
    searchDataHandler(response)
  } catch (error) {
    console.error("Error fetching search object:", error);
  }
}