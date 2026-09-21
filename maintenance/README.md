# Cortina de "sitio en construcción"

`index.html` de esta carpeta es la página que ven los visitantes cuando el sitio está en
pausa. Es autocontenida: no pasa por Vite, no depende de ningún bundle y funciona aunque el
navegador tenga JavaScript desactivado.

## Por qué no es un overlay dentro de la aplicación

El sitio es una SPA estática. Si la cortina fuera una capa de React, el contenido viajaría
igual al navegador dentro de `dist/assets/index-*.js`, y cualquiera podría verlo borrando un
elemento desde DevTools o leyendo el bundle por URL.

Por eso, en modo mantenimiento el deploy **no compila ni publica la aplicación**: sube
únicamente esta página. El contenido no llega al servidor, así que no hay nada que inspeccionar.

## Cómo poner la cortina

1. En GitHub: **Settings → Secrets and variables → Actions → Variables**.
2. Crear (o editar) la variable `MAINTENANCE_MODE` con el valor `true`.
3. Ir a **Actions → Deploy to GitHub Pages → Run workflow**.

## Cómo sacarla

1. Cambiar `MAINTENANCE_MODE` a `false`, o borrar la variable.
2. Volver a correr el workflow igual que arriba.

> Cambiar la variable por sí sola no republica nada: siempre hay que disparar el deploy.

Cuando se saca la cortina, Google puede tardar unos días en volver a indexar el sitio real,
porque esta página lleva `noindex`. Se puede acelerar pidiendo el rastreo desde Search Console.

## Mientras tanto

El sitio completo se sigue viendo en local con `npm run dev`. El código no se toca: la cortina
sólo cambia qué se publica.
