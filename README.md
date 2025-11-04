# odoo_free_gantt

Este repositorio contiene el módulo **Project Task Gantt View**, que habilita una vista de Gantt para las tareas del módulo estándar de proyectos en Odoo.

## Características principales

- Vista de Gantt para `project.task` agrupada por proyecto.
- Integración con las vistas de lista y formulario existentes para facilitar la navegación.
- Menú dedicado dentro de la aplicación de Proyectos para acceder rápidamente a la planificación.

## Instrucciones de instalación

1. **Copiar el módulo**
   - Coloca la carpeta `project_task_gantt` dentro de la ruta de `addons` de tu instancia de Odoo.

2. **Actualizar la ruta de addons (si es necesario)**
   - Edita el archivo de configuración de Odoo (`odoo.conf`) y agrega la ruta donde ubicarse el módulo:
     ```ini
     addons_path = /ruta/a/odoo/addons,/ruta/a/custom/addons
     ```

3. **Actualizar la lista de aplicaciones**
   - Inicia el servidor de Odoo.
   - Ve a *Aplicaciones* > *Actualizar lista de aplicaciones* y confirma la actualización.

4. **Instalar el módulo**
   - Busca "Project Task Gantt View" en el módulo de aplicaciones.
   - Haz clic en *Instalar*.

5. **Abrir la vista de Gantt**
   - Ve a *Proyectos* > *Gantt de Tareas* para visualizar y planificar las tareas con la nueva vista de Gantt.

## Dependencias

- `project`
- `web_gantt`

Asegúrate de tener ambos módulos instalados y actualizados en tu instancia de Odoo.
