async function fetchJSON(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Förfrågan misslyckades med status: ${response.status}`)
        }
        
        return await response.json()
        
    }catch (error){
        console.error('Fel vid hämtning av JSON från API', error.message)
    }

}


// Använd funktionen med API:ets URL
const apiUrl = 'https://api.escuelajs.co/api/v1/products';
fetchJSON(apiUrl)
  .then((jsonData) => {
    // Gör något med den hämtade JSON-datan här
    console.log(jsonData);
  });