# VOLA

Plataforma de reserva de vuelos privados y helicópteros — [vola.com.py](https://vola.com.py)

Sitio estático de alto rendimiento con diseño dark luxury, cotizador integrado con WhatsApp e internacionalización en 4 idiomas.

## Idiomas

| Código | Idioma    |
|--------|-----------|
| `es`   | Español   |
| `en`   | English   |
| `de`   | Deutsch   |
| `pt`   | Português |

El idioma se detecta automáticamente según:

1. Parámetro URL `?lang=en`
2. Preferencia guardada en `localStorage`
3. Idioma del navegador
4. Español (fallback)

## Estructura

```
vola/
├── index.html          # Markup semántico
├── styles.css          # Design system
├── app.js              # Lógica de interacción
├── i18n/
│   ├── translations.js # Diccionario ES · EN · DE · PT
│   └── i18n.js         # Motor de internacionalización
└── README.md
```

## Desarrollo local

Abrir `index.html` directamente en el navegador, o servir con un servidor local:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Visitar `http://localhost:8080`

## Configuración

### WhatsApp

Editar el número en `app.js`:

```javascript
const CONFIG = {
  whatsapp: {
    number: '595981234567', // Sin + ni espacios
  },
};
```

### Traducciones

Agregar o modificar textos en `i18n/translations.js`. Los elementos HTML usan atributos:

| Atributo               | Uso                          |
|------------------------|------------------------------|
| `data-i18n`            | Texto plano                  |
| `data-i18n-html`       | HTML (ej. `<br>`)            |
| `data-i18n-placeholder`| Placeholder de inputs        |
| `data-i18n-aria`       | Atributos `aria-label`       |

## Deploy en GitHub Pages

1. Subir el repositorio a GitHub
2. Ir a **Settings → Pages**
3. Source: **Deploy from branch** → `main` → `/ (root)`
4. El sitio estará disponible en `https://<usuario>.github.io/<repo>/`

Para compartir un idioma específico: `https://<usuario>.github.io/<repo>/?lang=de`

## Licencia

© 2026 VOLA. Todos los derechos reservados.
