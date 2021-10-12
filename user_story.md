# User Story

## I. L’utilisateur se connecte sur .static/index.html

- Récupérer meilleurs scores universels base de données
- Lire les cookies
  - Si existants : rediriger vers game.html en créant nouvel ID_partie puis ALLER À A

## II. L’utilisateur entre un pseudo et clique sur Nouvelle Partie

- Vérifier si le pseudo est conforme (non-vide, ect.)
  - Si non : afficher « pseudo incorrect »
  - Si oui, continuer
- Créer cookie
  - ID_partie + ID_session

---

A :

- Rediriger vers ./game.html
- Lancer les dés et récupérer leurs valeurs
  - Envoyer la requête de lancer au serveur
  - Générer les valeur_dés en back
  - Envoyer les cookies au serveur
  - Créer une entrée dans la base de données (ID_partie, ID_session, pseudo, valeur_dés, état_dés, partie_en_cours, compteur)
  - Récupérer les valeur_dés et état_dés et les afficher en front
- Récupérer les meilleurs scores de la session et le pseudo
  - Récupérer depuis la base de données à partir de l’ID de session du cookie

## III. L’utilisateur coche des dés

---

B :

- Mettre à jour le score en front à partir de valeur_dés

## IV. L’utilisateur appuie sur « Lancer les dés »

- Envoyer les cases cochées au serveur
  - Envoyer état_dés au serveur
  - Mettre à jour la base de données (état_dés, compteur = compteur + 1)
- Lancer les dés et récupérer leurs valeurs
  - Générer les valeur_dés en back
  - Mettre à jour la base de données (valeur_dés)
  - Récupérer les valeur_dés et état_dés et les afficher en front
- Vérifier si Game Over
  - Vérifier dans le back. Si oui :
    - Mettre à jour la base de données (partie_en_cours, état_dés)
  - Récupérer partie_en_cours
    - Si false :
      - Changement affichage page
    - Si true :
      - *ALLER À B*

## V. L’utilisateur relance une partie

- Mise à jour du cookie (nouvel ID_partie)
- *ALLER À A*
