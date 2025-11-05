# odoo_free_gantt

Este repositorio contiene el módulo **Project Task Gantt View**, una solución completamente libre (community) para visualizar y planificar las tareas de proyectos en Odoo 17 mediante un diagrama de Gantt propio, sin depender del módulo Enterprise `web_gantt`.

## Características principales

- Diagrama de Gantt desarrollado con componentes propios que funciona en cualquier edición de Odoo 17.
- Filtrado rápido por proyecto y acceso directo al formulario de cada tarea.
- Actualización en vivo de la información mediante los servicios estándar de Odoo.
- Menú dedicado dentro de la aplicación de Proyectos.

## Requisitos previos

- Odoo 17 Community o Enterprise con acceso al módulo base `project`.

## Instrucciones de instalación

1. **Copiar el módulo**  
   Copia la carpeta `project_task_gantt` dentro de una ruta incluida en el parámetro `addons_path` de tu servidor Odoo.

2. **Actualizar la ruta de addons (si es necesario)**  
   Si la carpeta no está en una ruta ya configurada, edita el archivo `odoo.conf` y agrega el directorio correspondiente:

   ```ini
   addons_path = /ruta/a/odoo/addons,/ruta/a/custom/addons
   ```

3. **Actualizar la lista de aplicaciones**  
   Reinicia el servicio de Odoo y desde *Aplicaciones* haz clic en *Actualizar lista de aplicaciones*.

4. **Instalar el módulo**  
   Busca "Project Task Gantt View" y pulsa *Instalar*.

5. **Abrir la vista de Gantt**  
   Navega a *Proyectos* > *Gantt de Tareas*. Encontrarás la nueva vista con todas las tareas y podrás filtrarlas por proyecto.

## Funcionamiento

- El diagrama se construye a partir de las fechas planificadas de cada tarea (`planned_date_begin` y `planned_date_end`).
- Si una tarea no tiene fechas planificadas, se usan las fechas límite (`date_deadline`) o la fecha actual como respaldo.
- El color de cada barra representa la etapa (`stage_id`) de la tarea.

## Dependencias

- `project`

No es necesario instalar `web_gantt` ni ningún otro módulo Enterprise.
