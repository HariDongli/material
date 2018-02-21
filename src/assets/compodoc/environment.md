## Introduction

Un glossaire technique permettant de comprendre rapidement quels sont les outils utilisés dans le frontal web SIGA et à quel niveau ils interviennent.

## Outils

  - [NodeJS](https://nodejs.org/en/) : Environnement d'exécution de commandes JavaScript.
  - [NPM](https://www.npmjs.com/) : Gestionnaire de Packages (librairies) (Embarqué nativement dans NodeJS).
  - [Angular-CLI](https://cli.angular.io/) : Interface de ligne de commandes pour gérer un projet Angular (Dépendance NodeJS).
  - [Webpack](https://webpack.js.org/) : Module Bundler pour les applications JavaScript (Embarqué nativement dans Angular-CLI). Permet de concaténer les différents modules et ressources de l'application en un package optimisé.
  - [Angular](https://angular.io/) : Framework de développement d'applications Web.
  - [TypeScript](https://www.typescriptlang.org/) : Language de programmation qui représente un "Sur-ensemble" du JavaScript : Améliore et sécurise la production de code JavaScript.
  - [Jenkins](https://jenkins.io/) : Serveur d'automatisation des process : Permet d'assurer des "job" de déploiement, d'intégration continue, etc... pour tout type d'application.
  - [GitLab](https://about.gitlab.com/) : Gestionnaire de projets.

## Production

Pour résumer le but de chacun des outils dans ce projet :

Akka Technologie utilise un dépôt `GitLab` pour gérer et suivre l'évolution de ses projet. La plupart de ces projets sont souvent liés à un serveur `Jenkins` pour assurer les différents processus d'Integration, de Production, et de Livraison.

Le projet SIGA est une application Web réalisée en `Angular` / `TypeScript`. 

Le développement est réalisé dans un environnement `NodeJS` et `NPM` nous permet de nous assurer que les dépendances fonctionnelles du projet sont valides à tout instant.
`Angular-CLI` permet de manipuler la génération ainsi que la construction de l'appplication dans tous les environnements souhaités (Développement, Integration, Production, ...) et garantit performance et rapidité de l'application grâce à un packaging maîtrisé avec `Webpack`.