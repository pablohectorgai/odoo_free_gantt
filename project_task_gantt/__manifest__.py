{
    "name": "Project Task Gantt View",
    "summary": "Vista de Gantt 100% community para las tareas de proyectos.",
    "description": """Permite gestionar las tareas de los proyectos con un diagrama de Gantt construido únicamente con componentes libres, sin depender de web_gantt ni de funcionalidades Enterprise.""",
    "version": "17.0.1.0.0",
    "author": "Odoo Community",
    "website": "https://github.com/odoo/odoo",
    "category": "Project",
    "depends": ["project"],
    "data": [
        "views/project_task_gantt_views.xml"
    ],
    "assets": {
        "web.assets_backend": [
            "project_task_gantt/static/src/scss/project_task_gantt.scss",
            "project_task_gantt/static/src/js/project_task_gantt.js",
            "project_task_gantt/static/src/xml/project_task_gantt_templates.xml",
        ]
    },
    "application": False,
    "license": "LGPL-3"
}
