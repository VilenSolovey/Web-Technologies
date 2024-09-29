const sortButton = document.getElementById("sort-btn");
const countButton = document.getElementById("count-btn");
const searchButton = document.getElementById("search-btn");
const clearButton = document.getElementById("clear-btn");
const shoeListContainer = document.getElementById("shoe-list");
const totalPriceElement = document.getElementById("total-price");
const searchInput = document.getElementById("search-input");
const addShoesBtn = document.getElementById("add-shoes-btn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-btn");
const addShoeForm = document.getElementById("add-shoe-form");
const editModal = document.getElementById("edit-modal");
const closeEditModalBtn = document.getElementById("close-edit-btn");
const editShoeForm = document.getElementById("edit-shoe-form");

let shoes = [
    { name: "Nike", price:"1200",size:"43",color:"black"},
    { name: "Adidas", price: "1800", size:"41", color:"red"},
    { name: "Puma", price: "2200", size:"42", color:"blue"},
    { name: "NewBalance", price: "12200", size:"42", color:"blue"},
    { name: "Asics", price: "1200", size:"42", color:"blue"}
];
let filteredShoes = shoes;

function displayShoes(shoesToDisplay = shoes) {
    shoeListContainer.innerHTML = ""; 
    shoesToDisplay.forEach((shoe, index) => {
        const shoeCard = `
            <div class="shoes-card">
                <img src="./images/image2.png" alt="${shoe.name} image">
                <h3>${shoe.name}</h3>
                <p>${shoe.size} розмір</p>
                <p><strong>₴${shoe.price}</strong></p>
                <button class="edit-btn" onclick="openEditModal(${index})">Edit</button>
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

addShoesBtn.addEventListener("click", () => {
    modal.style.display = "flex"; 
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

addShoeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("shoe-name").value;
    const price = document.getElementById("shoe-price").value;
    const size = document.getElementById("shoe-size").value;

    shoes.push({ name, price, size });

    displayShoes(shoes);

    modal.style.display = "none";
    addShoeForm.reset();
});


let currentEditIndex = null; 

function openEditModal(index) {
    currentEditIndex = index;

    const shoeToEdit = shoes[currentEditIndex];

    document.getElementById("edit-shoe-name").value = shoeToEdit.name;
    document.getElementById("edit-shoe-price").value = shoeToEdit.price;
    document.getElementById("edit-shoe-size").value = shoeToEdit.size;

    editModal.style.display = "flex"; 
}


closeEditModalBtn.addEventListener("click", () => {
    editModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === editModal) {
        editModal.style.display = "none";
    }
});


editShoeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    shoes[currentEditIndex].name = document.getElementById("edit-shoe-name").value;
    shoes[currentEditIndex].price = document.getElementById("edit-shoe-price").value;
    shoes[currentEditIndex].size = document.getElementById("edit-shoe-size").value;

    displayShoes(shoes);

    editModal.style.display = "none";
});
