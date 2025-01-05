"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTasks = void 0;
const formatTasks = (tasks) => {
    return tasks.map((task) => {
        const copy = Object.assign({}, task);
        delete copy.task_id;
        delete copy.user_id;
        if (!copy.label)
            copy.label = undefined;
        if (!copy.section)
            copy.section = undefined;
        if (!copy.time)
            copy.time = undefined;
        return copy;
    });
};
exports.formatTasks = formatTasks;
