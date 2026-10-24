# Estadística Aplicada a la Educación — Maestría

**Universidad William Osler**  
**Catedrático: Luis Arturo López Vergara**

Plataforma HTML/CSS/JavaScript estática para **7 clases síncronas de 90 minutos**. La primera clase incluye teoría, caso, laboratorio Excel/jamovi, autoevaluación y avance local. Clases 02–07 están señaladas como pendientes, sin contenidos ficticiamente completados.

## Publicación con GitHub Pages

1. Crear un repositorio público, recomendado: `estadistica_aplicada_educacion`.
2. Subir **el contenido de esta carpeta** a la raíz de la rama `main` (no subir una carpeta contenedora adicional).
3. GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**.
4. Abrir `https://USUARIO.github.io/estadistica_aplicada_educacion/` (sustituir USUARIO) después del despliegue.
5. Abrir `unidad_01/` para el primer módulo.

## Publicación de audiovisuales

Editar `recursos.json` en la raíz. En `clase_01`, reemplazar cada `url` vacía con un vínculo público válido. El sitio puede incrustar videos YouTube, vistas previas de archivos Drive, MP3 directos e imágenes directas. Para enlaces de NotebookLM no incrustables, aparece un enlace de apertura externa. Antes de compartir, verificar los permisos del recurso y los bloqueos de terceros.

## Avance y privacidad

Se guarda en `localStorage` con clave `estadistica_maestria_v1_...`: siete marcadores de clase, notas, respuestas y calificación. La séptima actividad (quiz) se acredita con **70%**. Se puede exportar/importar JSON desde la sección Avance. **No sincroniza dispositivos, no registra alumnos en servidor ni acredita calificación oficial**. Borrar caché o almacenamiento puede eliminar progreso no respaldado. Para seguimiento docente real se necesitaría integrar autenticación y backend/LMS.

## Estructura

- `index.html`: portada y ruta del curso.
- `unidad_01/index.html`, `unidad_01/clase.js`: clase y evaluación interactiva.
- `assets/`: diseño y funciones de almacenamiento.
- `recursos.json`: catálogo de medios editable.
- `materiales/`: guía Word, laboratorio Excel y CSV simulado.

## Recomendaciones de NotebookLM

Utilizar la guía Word como fuente, revisar la exactitud de las generaciones, publicar los audiovisuales con permisos de acceso adecuados y añadir las URL a `recursos.json`. No incorporar datos personales de estudiantes a herramientas públicas sin las autorizaciones pertinentes.
