# App mobile Illiconstat

## Initialiser son environnement
`npm install`

## Ajouter une dépendance node avec Browserify
`node_modules/.bin/browserify -r lib1 -r lib2 > app/vendor/vendor.js`  
Ne pas oublier de déclarer le service comme dans `nools.service.js` pour l'utiliser comme une dépendance angular

## Lancer les tests
`npm test`