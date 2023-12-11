const searchInput = document.getElementById('search_input');

//* ------USER INPUT------*//
//Sökning sker vid skrift i sökrutan
searchInput.addEventListener('input', performSearch);

//* ------FETCH JSON------*//
async function fetchJSON(url) {
  try {
    const response = await fetch(url)

    if(!response.ok)`Förfrågan misslyckades med status: ${response.status}`

    return await response.json()
    
  } catch (error) {
    console.error('Fel vid hämtning av JSON från API', error.message)
  }

}

function performSearch() {
  console.clear();

  //* ------HANDLING INPUT------*//
  // Användarens söksträng
  let searchInputValue = searchInput.value;
  console.log(`Inmatning: ${searchInputValue}`);

  // Tar bort specialtecken och omvandlar dem till mellanslag
  let cleanedSearchInput = searchInputValue
    .replace(/[./*+?^!${}()|[\]\\]/g, ' ')
    .trim();

  // Delar upp söksträngen i en array och filtrerar bort tomma termer
  let searchTerms = cleanedSearchInput.split(' ').filter((term) => term !== '');
  console.log(`söker: ${searchTerms}`);
  console.log(searchTerms);

  //* ------FETCHING PRODUCTS------*//
  // Hämtar produkter och filtrerar dem
  fetchJSON('https://fakestoreapi.com/products').then((products) => {
  
    //* ------FILTERING------*//
    let searchResult; 
    if (searchTerms.length === 0){
        // Visa alla produkter om söktermerna är tomma
        searchResult = products;
    }else {
        searchResult = products.filter((p) => {
          // Testar om någon del av produktobjekten matchar användarens söksträng
          return searchTerms.some((term) => {
            return (
              p.title.toLowerCase().includes(term.toLowerCase()) ||
              p.description.toLowerCase().includes(term.toLowerCase())
            
            );
          });
        });
    }

    console.log(searchResult);

    //* ------MAP and CREATE HTML------*//
    const mappedResults = searchResult.map((p) => {
      return `
              <div class="product">
                <h3>${p.title}</h3>
                <img src="${p.image}">
                <h4>Price: ${p.price}</h4>
                <p>Description: ${p.description}</p>
                <div class="cart-add-Remove_constainer">
                  <button id="reduce-product">-</button>
                  <p>0</p>
                  <button id="add-product">+</button>
                </div>
              </div>
              `;
    });
    // let dataDiv = document.getElementById('data-display');
    // dataDiv.innerHTML = mapResults.join('');
    document.getElementById('data-display').innerHTML = mappedResults.join('');
  });
}

// Kör performSearch direkt när sidan laddas
performSearch();

//* ------LOCALSTORAGE------*//

//   localStorage.setItem('userCart',JSON.stringify(filteredProducts));
//   let userCart = JSON.parse(localStorage.getItem('userCart'))

//* ------REDUCE into one VALUE------*//

// let totalPrice = userCart.reduce((totalPrice, product) => {
//     let price = totalPrice + product.price;
//     return parseFloat(price.toFixed(2));
// },0)
