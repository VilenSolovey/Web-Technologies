import { fetchShoes, addShoe, updateShoe, deleteShoe } from './api.js';

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

let shoes = [];
let filteredShoes = [];

function displayShoes(shoesToDisplay = shoes) {
    shoeListContainer.innerHTML = ""; 
    shoesToDisplay.forEach((shoe) => {
        const shoeCard = `
            <div class="shoes-card" data-id="${shoe.id}">
                <img src="./images/image2.png" alt="${shoe.name} image">
                <h3>${shoe.name}</h3>
                <p>${shoe.size} розмір</p>
                <p><strong>₴${shoe.price}</strong></p>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        shoeListContainer.innerHTML += shoeCard;
    });

    addEditDeleteHandlers();
}

function addEditDeleteHandlers() {
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const shoeId = button.closest('.shoes-card').getAttribute('data-id');
            openEditModal(parseInt(shoeId)); 
        });
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const shoeId = button.closest('.shoes-card').getAttribute('data-id');
            await deleteShoe(parseInt(shoeId));
            await fetchAndDisplayShoes(); // Оновлюємо список
        });
    });
}

async function fetchAndDisplayShoes() {
    shoes = await fetchShoes(); // Отримуємо дані з API
    filteredShoes = shoes;
    displayShoes();
    calculateTotalPrice(filteredShoes);
}

function calculateTotalPrice(shoesToCalculate) {
    const totalPrice = shoesToCalculate.reduce((sum, shoe) => sum + parseFloat(shoe.price), 0);
    totalPriceElement.textContent = `₴${totalPrice}`;
}

fetchAndDisplayShoes(); // Отримуємо взуття

sortButton.addEventListener("click", async () => {
    const query = searchInput.value.trim().toLowerCase(); 
    const sortedShoes = await fetchShoes({ search: query, sortBy: 'asc' });
    filteredShoes = sortedShoes; 
    displayShoes(filteredShoes);
    calculateTotalPrice(filteredShoes);
});

searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim().toLowerCase();
    const searchedShoes = await fetchShoes({ search: query });
    filteredShoes = searchedShoes;
    displayShoes(filteredShoes);
    calculateTotalPrice(filteredShoes);
});

countButton.addEventListener("click", async () => {
    const query = searchInput.value.trim().toLowerCase(); 
    const response = await fetch(`http://localhost:3001/shoes/total-price?search=${query}`);  
    const data = await response.json();  
    totalPriceElement.textContent = `₴${data.totalPrice}`; 
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

addShoeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("shoe-name").value;
    const price = document.getElementById("shoe-price").value;
    const size = document.getElementById("shoe-size").value;

    const newShoe = await addShoe({ name, price, size }); // Використовуємо функцію API
    shoes.push(newShoe); 
    displayShoes(shoes); 
    calculateTotalPrice(shoes); 

    modal.style.display = "none";
    addShoeForm.reset();
});

let currentEditId = null; 

function openEditModal(id) {
    currentEditId = id;
    const shoeToEdit = shoes.find(shoe => shoe.id === currentEditId);

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

editShoeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newName = document.getElementById("edit-shoe-name").value;
    const newPrice = document.getElementById("edit-shoe-price").value;
    const newSize = document.getElementById("edit-shoe-size").value;

    await updateShoe(currentEditId, { name: newName, price: newPrice, size: newSize });

    shoes = shoes.map(shoe => 
        shoe.id === currentEditId ? { ...shoe, name: newName, price: newPrice, size: newSize } : shoe
    );

    displayShoes(shoes); 
    calculateTotalPrice(shoes); 

    editModal.style.display = "none"; 
});
