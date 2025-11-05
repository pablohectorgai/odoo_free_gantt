/** @odoo-module **/

import { Component, onMounted, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { DateTime } from "luxon";

const { category } = registry;

const COLOR_PALETTE = [
    "#5B8FF9",
    "#5AD8A6",
    "#F6BD16",
    "#E8684A",
    "#6DC8EC",
    "#9270CA",
    "#FF99C3",
    "#78D3F8",
    "#FFB1AC",
];

function parseDate(value) {
    if (!value) {
        return null;
    }
    const dt = DateTime.fromISO(value, { zone: "utc" });
    return dt.isValid ? dt : null;
}

function getTaskStart(task) {
    return parseDate(task.planned_date_begin) || parseDate(task.date_deadline) || DateTime.now();
}

function getTaskEnd(task) {
    return parseDate(task.planned_date_end) || parseDate(task.date_deadline) || getTaskStart(task);
}

function buildTimeline(start, end) {
    const days = [];
    let cursor = start.startOf("day");
    const limit = start.plus({ days: 365 });
    const finalDate = end < limit ? end : limit;
    while (cursor <= finalDate) {
        days.push({
            key: cursor.toISODate(),
            label: cursor.toFormat("dd/MM"),
        });
        cursor = cursor.plus({ days: 1 });
    }
    return days;
}

function computeRangeLabel(start, end) {
    return `${start.toFormat("dd MMM")} – ${end.toFormat("dd MMM")}`;
}

class ProjectTaskGantt extends Component {
    setup() {
        this.orm = useService("orm");
        this.action = useService("action");
        this.state = useState({
            loading: true,
            error: null,
            projects: [],
            activeProjectId: null,
            tasks: [],
            timeline: [],
            columns: 0,
            legend: [],
        });
        onMounted(() => this.loadData());
    }

    async loadData() {
        this.state.loading = true;
        this.state.error = null;
        try {
            const domain = this.state.activeProjectId
                ? [["project_id", "=", this.state.activeProjectId]]
                : [];
            const tasks = await this.orm.searchRead("project.task", domain, [
                "name",
                "planned_date_begin",
                "planned_date_end",
                "date_deadline",
                "project_id",
                "stage_id",
            ]);
            const projects = await this.orm.searchRead("project.project", [], ["name"], { order: "name" });
            this.state.projects = projects.map((project) => ({ id: project.id, name: project.name }));
            this._prepareData(tasks);
        } catch (error) {
            console.error("Error while loading data for Gantt", error);
            this.state.error = error.message || error.toString();
        } finally {
            this.state.loading = false;
        }
    }

    _prepareData(tasks) {
        if (!tasks.length) {
            this.state.tasks = [];
            this.state.timeline = [];
            this.state.columns = 0;
            this.state.legend = [];
            return;
        }
        const startDates = tasks.map((task) => getTaskStart(task));
        const endDates = tasks.map((task) => getTaskEnd(task));
        const minDate = DateTime.min(...startDates);
        const maxDate = DateTime.max(...endDates);
        let timeline = buildTimeline(minDate, maxDate);
        if (!timeline.length) {
            timeline = [{ key: minDate.toISODate(), label: minDate.toFormat("dd/MM") }];
        }
        const columns = timeline.length;
        const legend = new Map();
        const tasksData = tasks.map((task, index) => {
            const start = getTaskStart(task).startOf("day");
            const end = getTaskEnd(task).startOf("day");
            const startIndex = timeline.findIndex((day) => day.key === start.toISODate());
            const endIndex = timeline.findIndex((day) => day.key === end.toISODate());
            const safeStart = startIndex >= 0 ? startIndex : 0;
            const safeEnd = endIndex >= 0 ? endIndex : safeStart;
            const duration = safeEnd - safeStart + 1;
            const leftPercent = (safeStart / columns) * 100;
            const widthPercent = (duration / columns) * 100;
            const stageId = task.stage_id ? task.stage_id[0] : null;
            let color = COLOR_PALETTE[index % COLOR_PALETTE.length];
            if (stageId !== null) {
                if (!legend.has(stageId)) {
                    color = COLOR_PALETTE[legend.size % COLOR_PALETTE.length];
                    legend.set(stageId, {
                        id: stageId,
                        name: task.stage_id[1],
                        color,
                    });
                } else {
                    color = legend.get(stageId).color;
                }
            }
            return {
                id: task.id,
                name: task.name,
                project: task.project_id ? task.project_id[1] : this.env._t("Sin proyecto"),
                shortName: task.name.length > 28 ? `${task.name.slice(0, 25)}…` : task.name,
                range: computeRangeLabel(start, end),
                style: `left:${leftPercent}%;width:${Math.max(widthPercent, 1)}%;background:${color};top:12px;`,
            };
        });
        this.state.tasks = tasksData;
        this.state.timeline = timeline;
        this.state.columns = columns;
        this.state.legend = Array.from(legend.values());
    }

    onProjectChange(ev) {
        const value = ev.target.value;
        this.state.activeProjectId = value ? Number(value) : null;
        this.loadData();
    }

    refresh() {
        this.loadData();
    }

    openTask(taskId) {
        this.action.doAction({
            type: "ir.actions.act_window",
            res_model: "project.task",
            res_id: taskId,
            views: [[false, "form"]],
        });
    }
}

ProjectTaskGantt.template = "project_task_gantt.GanttClientAction";

category("actions").add("project_task_gantt.gantt_client_action", ProjectTaskGantt);
