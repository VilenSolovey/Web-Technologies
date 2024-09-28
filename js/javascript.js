const sortButton = document.getElementById("sort-btn");
const countButton = document.getElementById("count-btn");
const searchButton = document.getElementById("search-btn");
const clearButton = document.getElementById("clear-btn");
const shoeListContainer = document.getElementById("shoe-list");
const totalPriceElement = document.getElementById("total-price");
const searchInput = document.getElementById("search-input");

let shoes = [
    { name: "Nike", price:"1200",size:"43.5",color:"black"},
    { name: "Adidas", price: "1800", size:"41", color:"red"},
    { name: "Puma", price: "2200", size:"42", color:"blue"},
    { name: "NewBalance", price: "12200", size:"42", color:"blue"},
    { name: "Asics", price: "1200", size:"42", color:"blue"}
];

let filteredShoes = shoes;

function displayShoes(shoesToDisplay = shoes) {
    shoeListContainer.innerHTML = ""; 
    shoesToDisplay.forEach(shoe => {
        const shoeCard = `
            <div class="shoes-card">
                <img src="./images/image2.png" alt="${shoe.name} image">
                <h3>${shoe.name}</h3>
                <p>${shoe.size} розмір</p>
                <p><strong> ₴${shoe.price}</strong></p>
            </div>
        `;
        shoeListContainer.innerHTML += shoeCard;
    });
}

function calculateTotalPrice(shoesToCalculate) {
    const totalPrice = shoesToCalculate.reduce((sum, shoe) => sum + parseFloat(shoe.price), 0);
    totalPriceElement.textContent = `₴${totalPrice}`;
}

displayShoes();

sortButton.addEventListener("click", () => {
    filteredShoes.sort((a, b) => b.price - a.price); 
    displayShoes(filteredShoes); 
});

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    filteredShoes = shoes.filter(shoe => shoe.name.toLowerCase().includes(query)); 
    displayShoes(filteredShoes);
});

countButton.addEventListener("click", () => {
    calculateTotalPrice(filteredShoes); 
});

clearButton.addEventListener("click", () => {
    searchInput.value = "";
    filteredShoes = shoes; 
    displayShoes(shoes);
    totalPriceElement.textContent = ''; 
});
