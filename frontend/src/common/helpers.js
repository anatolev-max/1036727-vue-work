import {DAY_IN_MILLISEC, TAG_SEPARATOR} from './constants.js';
import timeStatuses                     from './enums/timeStatuses.js';
import taskStatuses                     from './enums/taskStatuses.js';

import {toRaw} from 'vue';

/**
 * @param active
 * @param toTask
 * @param tasks
 * @returns {*}
 */
export const addActive = (active, toTask, tasks) => {
    const activeIndex = tasks.findIndex(task => task.id === active.id);
    // TODO: unknown syntax "~"
    if (~activeIndex) {
        tasks.splice(activeIndex, 1);
    }

    tasks.sort((a, b) => a.sortOrder - b.sortOrder);

    if (toTask) {
        const toTaskIndex = tasks.findIndex(task => task.id === toTask.id);
        tasks.splice(toTaskIndex, 0, active);
    } else {
        tasks.push(active);
    }

    return tasks;
};

/**
 * @param image
 * @returns {string}
 */
export const getImage = image => {
    // https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
    return new URL(`../assets/img/${image}`, import.meta.url).href;
}

/**
 * @param tags
 * @returns Array
 */
export const getTagsArrayFromString = (tags) => {
    const array = tags.split(TAG_SEPARATOR);

    return array.slice(1, array.length);
};

/**
 * @param toColumnId
 * @param tasks
 * @returns {*}
 */
export const getTargetColumnTasks = (toColumnId, tasks) => {
    return tasks.filter(task => task.columnId === toColumnId).map(task => toRaw(task));
};

/**
 * @param dueDate
 * @returns Object
 */
export const getTimeStatus = (dueDate) => {
    if (!dueDate) {
        return '';
    }

    const currentTime = +new Date();
    const taskTime = Date.parse(dueDate);
    const timeDelta = taskTime - currentTime;

    if (timeDelta > DAY_IN_MILLISEC) {
        return '';
    }

    return timeDelta < 0 ? timeStatuses.DEADLINE : timeStatuses.EXPIRED;
};

/**
 * @param task
 * @returns Object
 */
export const normalizeTask = (task) => {
    return {
        ...task,
        status:     task.statusId ? taskStatuses[task.statusId] : '',
        timeStatus: getTimeStatus(task.dueDate)
    };
};
