// Initialisation du panier
let cart = [];

// Fonction pour ajouter un produit au panier
function addToCart(productName, productPrice) {
    // Vérifie si le produit existe déjà dans le panier
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        // Si le produit existe, augmente la quantité
        existingProduct.quantity += 1;
    } else {
        // Si le produit n'existe pas, ajoute un nouvel élément
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCartDisplay();
}

// Fonction pour supprimer un produit du panier
function removeFromCart(productName) {
    // Recherche et supprime le produit du panier
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
}

// Fonction pour afficher le contenu du panier
function updateCartDisplay() {
    // Sélectionne ou crée une section pour afficher le panier
    let cartContainer = document.getElementById("cart-container");
    if (!cartContainer) {
        cartContainer = document.createElement("div");
        cartContainer.id = "cart-container";
        document.body.appendChild(cartContainer);
    }

    // Efface le contenu précédent
    cartContainer.innerHTML = `<h2>Votre Panier</h2>`;

    // Vérifie si le panier est vide
    if (cart.length === 0) {
        cartContainer.innerHTML += `<p>Votre panier est vide.</p>`;
        return;
    }

    // Affiche les éléments du panier
    const list = document.createElement("ul");
    cart.forEach(item => {
        const listItem = document.createElement("li");

        // Contenu du produit avec un bouton "Supprimer"
        listItem.innerHTML = `
            ${item.name} - ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}
            <button onclick="removeFromCart('${item.name}')">Supprimer</button>
        `;

        list.appendChild(listItem);
    });

    // Calcul et affichage du total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalElement = document.createElement("p");
    totalElement.innerHTML = `<strong>Total : $${total.toFixed(2)}</strong>`;

    // Ajoute tout au conteneur
    cartContainer.appendChild(list);
    cartContainer.appendChild(totalElement);
}

// Exemple d'utilisation de la mise à jour dynamique
document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay(); // Initialise le panier au chargement de la page
});
