import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
// Configuration Firebase


  const firebaseConfig = {
    apiKey: "AIzaSyCe7dOBqOQfEmBZYWTVv_hZrLYdmQWLi28",
    authDomain: "wirelessoverride.firebaseapp.com",
    projectId: "wirelessoverride",
     databaseURL: "https://wirelessoverride-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: "wirelessoverride.appspot.com",
    messagingSenderId: "674723237901",
    appId: "1:674723237901:web:7f9e6e0cc0b2ac21080544"
  };

  // Initialisation
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const params = new URLSearchParams(window.location.search);
const magasinId = params.get('id');


document.addEventListener("DOMContentLoaded", () => {
  const stockLists = document.querySelectorAll('stock-list');

  stockLists.forEach(list => {
    const categorie = list.dataset.categorie;
    const stock = getStockByCategorie(categorie); // Simulé ici
    afficherStock(categorie, stock); // Ton système d’affichage
  });
});

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Utilisateur connecté, on récupère les infos du magasin
      const magasinRef = ref(db, 'stock-list/' + magasinId);
      get(magasinRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            afficherMagasin(data);
          } else {
            document.getElementById("stock-list").innerHTML = "<p>Magasin introuvable.</p>";
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération :", error);
          document.getElementById("stock-list").innerHTML = "<p>Erreur de chargement.</p>";
        });
    } else {
      document.getElementById("stock-list").innerHTML = "<p>Vous devez être connecté.</p>";
    }
  });



function afficherMagasin(data) {
  const container = document.getElementById("stock-list");
  container.innerHTML = `
    <h2>${data.nom || "Nom inconnu"}</h2>
    <p><strong>Faction :</strong> ${data.faction || "?"}</p>
    <p><strong>Fonction :</strong> ${data.fonction || "?"}</p>
    <p><strong>Localisation :</strong> ${data.localisation || "?"}</p>
    <p><strong>Description :</strong> ${data.description || "?"}</p>
  `;
}

function getImagePath(icone) {
  if (!icone) return '';
  return icone.startsWith('images/') ? icone : `images/assets/${icone}`;
}

function afficherItems(categorie, items) {
  const container = document.querySelector(`stock-list[data-categorie="${categorie}"]`);
  if (!container) return;
  container.innerHTML = "";

  items.forEach((item, index) => {
    const imgPath = getImagePath(item.icone);

    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.dataset.id = item.id || index;

    itemDiv.innerHTML = `
      <div class="item-card">
        <img class="icone-item" src="${imgPath}" alt="${item.nom}">
        <div class="info">
          <strong>${item.nom}</strong>
          <span>${item.valeur ?? item.prix} ₵</span>
        </div>
      </div>
    `;

    itemDiv.addEventListener('click', () => ouvrirModal(item));
    container.appendChild(itemDiv);
  });
}


function ouvrirModal(item) {
  const modal = document.getElementById('item-modal');
  const body = document.getElementById('modal-body');
  const imgPath = getImagePath(item.icone);

  body.innerHTML = `
    <img src="${imgPath}" alt="${item.nom}" class="icone-item" />
    <h3>${item.nom}</h3>
    <p>${item.description}</p>
    <ul>
      ${item.dégâts ? `<li>Dégâts : ${item.dégâts}</li>` : ''}
      ${item.précision ? `<li>Précision : ${item.précision}%</li>` : ''}
      ${item.type ? `<li>Type : ${item.type}</li>` : ''}
      ${item.niveau ? `<li>Niveau requis : ${item.niveau}</li>` : ''}
      ${item.valeur ? `<li>Prix : ${item.valeur}¢</li>` : ''}
    </ul>
    <div style="margin-top: 15px; text-align: right;">
      <button id="confirm-achat">Acheter</button>
      <button id="annuler-achat">Annuler</button>
    </div>
  `;

  modal.classList.remove('hidden');

  document.getElementById("confirm-achat").onclick = async () => {
    await acheterItem(item);
    modal.classList.add('hidden');
  };

  document.getElementById("annuler-achat").onclick = () => {
    modal.classList.add('hidden');
  };
}

function afficherStock() {
  document.querySelectorAll('stock-list').forEach(div => {
    const cat = div.dataset.categorie;
    const stock = getStockByCategorie(cat);
    div.innerHTML = '';

    stock.forEach(item => {
      const carte = createItemCard(item);
      div.appendChild(carte);
    });
  });
}

function createItemCard(item) {
  const div = document.createElement('div');
  div.className = 'item-card';
  div.innerHTML = `
    <img src="${getImagePath(item.icone)}" alt="${item.nom}" class="icone-item" />
    <div class="info">
      <strong>${item.nom}</strong>
      <p>${item.rarete || "commun"} / niv ${item.niveau || 1}</p>
    </div>
  `;
  div.addEventListener('click', () => ouvrirModal(item));
  return div;
}

async function getUserSolde(uid) {
  const snapshot = await get(ref(db, `users/${uid}/solde`));
  return snapshot.exists() ? snapshot.val() : 0;
}

async function setUserSolde(uid, solde) {
  await update(ref(db, `users/${uid}`), { solde });
}


function ajouterItemAuCoffreBase(item) {
  const coffre = getCoffreBase(); // Doit renvoyer un tableau
  const index = coffre.findIndex(obj => obj.id === item.id);

  if (index !== -1) {
    if (coffre[index].quantity + item.quantity <= item.maxStack) {
      coffre[index].quantity += item.quantity;
    } else {
      alert("Stack maximal atteint pour cet objet !");
    }
  } else {
    coffre.push({ ...item });
  }

  setCoffreBase(coffre); // Doit stocker dans localStorage
}

async function acheterItem(item) {
  const user = auth.currentUser;
  if (!user) {
    alert("Utilisateur non connecté");
    return;
  }

  const uid = user.uid;
  const solde = await getUserSolde(uid);

  if (solde < item.valeur) {
    alert("Tu n’as pas assez de crédits !");
    return;
  }

  const nouveauSolde = solde - item.valeur;
  await setUserSolde(uid, nouveauSolde);
  ajouterItemAuCoffreBase(item);
  await sauvegarderCoffreEtSolde(uid);

  alert(`${item.nom} acheté et ajouté au coffre-base !`);
}

async function sauvegarderCoffreEtSolde(uid) {
  const solde = await getUserSolde(uid);
  const coffre = getCoffreBase();

  await update(ref(db, `users/${uid}`), {
    solde,
    "coffre-base": coffre
  }).then(() => console.log("Sauvegarde réussie"))
    .catch(err => console.error("Erreur de sauvegarde :", err));
}

document.addEventListener("DOMContentLoaded", () => {
  const closeButton = document.querySelector(".close-btn");
  const modal = document.getElementById("item-modal");

  if (closeButton) {
    closeButton.addEventListener("click", () => modal.classList.add("hidden"));
  }

  window.addEventListener("click", event => {
    if (event.target === modal) modal.classList.add("hidden");
  });

  afficherStock(); // Initialiser l'affichage des stocks
});




export function getStockByCategorie(categorie) {
  console.log("→ Catégorie demandée :", categorie);
  console.log("→ Contenu :", Items[categorie]);
  return Items[categorie] || [];
}