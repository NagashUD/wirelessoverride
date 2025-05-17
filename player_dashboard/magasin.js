import { getStockByCategorie } from './itemHelper.js';

function createItemCard(item) {
  const div = document.createElement('div');
  div.className = 'item-card';
  div.innerHTML = `
    <img src="img/items/${item.icone}" alt="${item.nom}" class="icone-item" />
    <div class="info">
      <strong>${item.nom}</strong>
      <p>${item.rarete || "commun"} / niv ${item.niveau || 1}</p>
    </div>
  `;
  div.addEventListener('click', () => ouvrirModal(item));
  return div;
}
function getStockByCategorie(categorie) {
  if (!Items[categorie]) {
    console.warn(`Catégorie introuvable : ${categorie}`);
    return [];
  }
  return Object.values(Items[categorie]);
}

function ouvrirModal(item) {
  const modal = document.getElementById('item-modal');
  const body = document.getElementById('modal-body');
  body.innerHTML = `
    <img src="img/items/${item.icone}" alt="${item.nom}" />
    <h3>${item.nom}</h3>
    <p>${item.description}</p>
    <ul>
      ${item.dégâts ? `<li>Dégâts : ${item.dégâts}</li>` : ''}
      ${item.précision ? `<li>Précision : ${item.précision}%</li>` : ''}
      ${item.type ? `<li>Type : ${item.type}</li>` : ''}
      ${item.niveau ? `<li>Niveau requis : ${item.niveau}</li>` : ''}
      ${item.valeur ? `<li>Prix : ${item.valeur}₩</li>` : ''}
    </ul>
    <div style="margin-top: 15px; text-align: right;">
      <button id="confirm-achat">Acheter</button>
      <button id="annuler-achat">Annuler</button>
    </div>
  `;

  modal.classList.remove('hidden');

  document.getElementById('confirm-achat').onclick = () => {
    alert(`Tu as acheté ${item.nom} pour ${item.valeur}₩`);
    modal.classList.add('hidden');
  };

  document.getElementById('annuler-achat').onclick = () => {
    modal.classList.add('hidden');
  };
}

document.querySelector('.close-btn').onclick = () => {
  document.getElementById('item-modal').classList.add('hidden');
};

function afficherStock() {
  document.querySelectorAll('.stock-list').forEach(div => {
    const cat = div.dataset.categorie;
    const stock = getStockByCategorie(cat);
    div.innerHTML = '';
    stock.forEach(item => {
      const carte = createItemCard(item);
      div.appendChild(carte);
    });
  });
}

window.addEventListener('DOMContentLoaded', afficherStock);