document.addEventListener('DOMContentLoaded', () => {
  // ► Initialisation des données simulées (à remplacer par login réel)
  const joueurActuel = {
    nom: "Vincent",
    sexe: "Homme",
    fonction: "Soldat", // Change ici pour tester d'autres classes
    faction: "Neurorage"
  };

  for (const key in joueurActuel) {
    localStorage.setItem(key, joueurActuel[key]);
  }
 document.querySelectorAll("nav button[data-page]").forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("data-page");
      const iframe = document.querySelector("#iframe-container iframe");
      if (iframe) {
        iframe.src = page;
      }
    });
  });

  // ► Affichage des infos dans le header et le profil
  const username = localStorage.getItem("nom") || "[Nom d'utilisateur]";
  document.getElementById("username-display").textContent = username;
  document.getElementById("faction-name").textContent = localStorage.getItem("faction") || "Aucun";

  // ► Gestion du bouton santé (modal perso)
  document.getElementById("openModal").onclick = () => {
    document.getElementById("modalPerso").style.display = "block";
  };

  // ► Gestion du bouton compétences (modal skills)
  document.getElementById("openSkills").addEventListener("click", () => {
    const fonctionRaw = localStorage.getItem("fonction") || "Soldat";
    const fonction = fonctionRaw.charAt(0).toUpperCase() + fonctionRaw.slice(1).toLowerCase();
  
    // Charge les deux fichiers JSON
    Promise.all([
      fetch('data/attributs_base.json').then(res => res.json()),
      fetch('data/competences.json').then(res => res.json())
    ]).then(([attributsData, competencesData]) => {
      const attributs = attributsData[fonction] || [];
      const competences = competencesData[fonction] || [];
  
      const modal = document.getElementById('modalSkills');
      const container = modal.querySelector('.modal-content');
  
      // Nettoyage
      container.innerHTML = `
        <span class="close" id="closeSkills">&times;</span>
        <h2>Compétences du personnage</h2>
        <div class="skills-columns">
          <ul id="attributs-col"></ul>
          <ul id="competences-col"></ul>
        </div>
      `;
  
      // Remplissage
      const ulAttr = container.querySelector('#attributs-col');
      const ulComp = container.querySelector('#competences-col');
  
      Object.entries(attributs).forEach(([nom, valeur]) => {
        const li = document.createElement('li');
        li.textContent = `${nom} : ${valeur}`;
        ulAttr.appendChild(li);
      });
  
      competences.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        ulComp.appendChild(li);
      });
  
      modal.style.display = 'block';
  
      // Fermeture
      document.getElementById('closeSkills').addEventListener('click', () => {
        modal.style.display = 'none';
      });
    });
  });

  // ► Gestion des fermetures de modaux (clic sur les croix)
  document.querySelectorAll(".close").forEach(closeBtn => {
    closeBtn.onclick = function () {
      this.closest(".modal").style.display = "none";
    };
  });

  // ► Fermeture des modaux si clic en dehors
  window.onclick = function (event) {
    document.querySelectorAll(".modal").forEach(modal => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  };


  // ► Déconnexion
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "player_dashboard/index.html";
  });
});
