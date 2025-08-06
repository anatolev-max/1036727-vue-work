<!--suppress JSUnresolvedReference -->
<template>
    <app-layout
        :tasks="filteredTasks"
        :filters="state.filters"
        @update-tasks="updateTasks"
    >
        <home-view
            :tasks="filteredTasks"
            :filters="state.filters"
            @update-tasks="updateTasks"
            @apply-filters="applyFilters"
        />
    </app-layout>
</template>

<script setup>
import {reactive, computed} from 'vue';
import {normalizeTask}      from './common/helpers';
import tasks                from './mocks/tasks.json';
import {AppLayout}          from '@/layouts';
import {HomeView}           from '@/views';

// 2. data
const state = reactive({
    tasks: tasks.map(task => normalizeTask(task)),
    filters: {
        search:   '',
        users:    [],
        statuses: []
    }
});

// 4. computed
/**
 * @type {ComputedRef<*>}
 */
const filteredTasks = computed(() => {
    const filtersAreEmpty = Object.values(state.filters)
        .every(value => !value.length)
    if (filtersAreEmpty) {
        // Return all tasks if no filters are applied
        return state.tasks
    }

    // Apply search filter
    const searchFilter = task => task.title
        .toLowerCase()
        .includes(state.filters.search.toLowerCase().trim())

    // Apply filter by users
    const usersFilter = task => state.filters.users
        .some(userId => userId === task.userId)

    // Apply filter by statuses
    const statusesFilter = task => state.filters.statuses
        .some(el => el === task.status || el === task.timeStatus)

    // Process tasks according to filters
    return state.tasks.filter(task => {
        let result = {
            search: searchFilter,
            users: usersFilter,
            statuses: statusesFilter
        }
        return Object.entries(result)
            .every(([key, callback]) =>
                !state.filters[key].length || callback(task))
    })
})

// 5. methods
/**
 * Update task sorting
 *
 * findIndex will return the array element or -1
 * Use bitwise not to determine if index === -1
 * ~-1 will return 0, which means false
 *
 * @param tasksToUpdate
 */
function updateTasks(tasksToUpdate) {
    tasksToUpdate.forEach(task => {
        const index = state.tasks.findIndex(({ id }) => id === task.id)

        if (~index) {
            state.tasks.splice(index, 1, task)
        }
    })
}

/**
 * @param item
 * @param entity
 */
function applyFilters({item, entity}) {
    if (!Array.isArray(state.filters[entity])) {
        state.filters[entity] = item;
    } else {
        const resultValues = [...state.filters[entity]];
        const itemIndex = resultValues.findIndex(el => el === item);
        ~itemIndex
            ? resultValues.splice(itemIndex, 1)
            : resultValues.push(item);
        state.filters[entity] = resultValues;
    }
}
</script>

<style lang="scss">

@import '@/assets/scss/app.scss';

</style>
