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

## Cómo poner y sacar la cortina

El interruptor es el archivo **`maintenance/enabled`** de esta carpeta:

- `true` → se publica sólo la página de aviso
- `false` → se publica el sitio completo

Para cambiarlo desde la web de GitHub: abrí `maintenance/enabled`, tocá el lápiz, cambiá la
palabra y confirmá el commit. El push dispara el deploy automáticamente, así que **no hay que
hacer nada más**.

Para verificar qué hizo el deploy: **Actions → Deploy to GitHub Pages → última corrida**. El
paso «Leer el interruptor» dice si la cortina quedó activa o apagada.

> También se puede forzar la cortina con la variable de repositorio `MAINTENANCE_MODE = true`
> (Settings → Secrets and variables → Actions → Variables), pero en ese caso hay que correr el
> workflow a mano desde Actions: cambiar una variable no republica nada por sí sola.

Cuando se saca la cortina, Google puede tardar unos días en volver a indexar el sitio real,
porque esta página lleva `noindex`. Se puede acelerar pidiendo el rastreo desde Search Console.

## Mientras tanto

El sitio completo se sigue viendo en local con `npm run dev`. El código no se toca: la cortina
sólo cambia qué se publica.
