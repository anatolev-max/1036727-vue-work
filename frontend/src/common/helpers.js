import {DAY_IN_MILLISEC, TAG_SEPARATOR} from './constants.js';
import timeStatuses                     from './enums/timeStatuses.js';
import taskStatuses                     from './enums/taskStatuses.js';

/**
 * @param tags
 * @returns Array
 */
export const getTagsArrayFromString = (tags) => {
    const array = tags.split(TAG_SEPARATOR);

    return array.slice(1, array.length);
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
