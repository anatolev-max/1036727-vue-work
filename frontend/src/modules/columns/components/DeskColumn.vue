<template>
    <!-- Keeps track of which column a task is assigned to -->
    <app-drop
        class="column"
        @drop="moveTask"
    >
        <h2 class="column__name">
            <!-- Shows the column name -->
            <span
                v-if="!state.isInputShowed"
            >{{ state.columnTitle }}</span>

            <!-- Shows input if the column is editable -->
            <input
                v-else
                class="column__input"
                type="text"
                name="column_title"
                ref="columnTitle"
                v-model="state.columnTitle"
                @blur="updateInput"
            />

            <!-- Shows the task edit icon -->
            <app-icon
                v-if="!state.isInputShowed"
                class="icon--edit"
                @click="showInput"
            />

            <!-- Shows the delete column icon -->
            <!-- The icon will not be displayed if there are tasks in the column. -->
            <app-icon
                v-if="!state.isInputShowed && !columnTasks.length"
                class="icon--trash"
                @click="$emit('delete', column.id)"
            />
        </h2>

        <div class="column__target-area">
            <!-- The tasks were moved to a separate component -->
            <task-card
                v-for="task in columnTasks"
                :key="task.id"
                class="column__task"
                :task="task"
                @drop="moveTask($event, task)"
            />
        </div>
    </app-drop>
</template>

<script setup>
import {reactive, computed, nextTick, ref} from 'vue'
import AppDrop                             from '@/common/components/AppDrop.vue'
import AppIcon                             from '@/common/components/AppIcon.vue'
import {getTargetColumnTasks, addActive}   from '@/common/helpers'
import TaskCard                            from '@/modules/tasks/components/TaskCard.vue'

// 1. props
const props = defineProps({
    column: {
        type:     Object,
        required: true
    },
    tasks: {
        type:     Array,
        required: true
    }
})

// 2. data
const columnTitle = ref(null);
const state = reactive({
    isInputShowed: false,
    columnTitle:   props.column.title
});

// 3. emits
const emits = defineEmits([
    'update',
    'delete',
    'updateTasks'
]);

// 4. computed
// Filter tasks that belong to a specific column
const columnTasks = computed(() => {
    return props.tasks
        .filter(task => task.columnId === props.column.id)
        .sort((taskA, taskB) => taskA.sortOrder - taskB.sortOrder);
})

// 5. methods
/**
 * Shows the input for editing the column and brings it into focus.
 *
 * @returns {Promise<void>}
 */
async function showInput() {
    state.isInputShowed = true
    // The nextTick function waits for the component to re-render.
    // Since we changed span to input, we need to wait for the input to render.
    await nextTick()
    columnTitle.value.focus();
}

/**
 * @returns undefined
 */
function updateInput() {
    state.isInputShowed = false;

    // noinspection JSUnresolvedReference
    if (props.column.title === state.columnTitle) {
        return;
    }

    emits('update', {
        ...props.column,
        title: state.columnTitle
    });
}

/**
 * Method for transferring tasks
 *
 * @param active
 * @param toTask
 */
function moveTask(active, toTask) {
    // Do not update if there are no changes
    if (toTask && active.id === toTask.id) {
        return;
    }

    const toColumnId = props.column ? props.column.id : null;

    // Get tasks for the current column
    const targetColumnTasks = getTargetColumnTasks(toColumnId, props.tasks)
    const activeClone = {
        ...active,
        columnId: toColumnId
    };

    // Add active task to column
    const resultTasks = addActive(activeClone, toTask, targetColumnTasks);
    const tasksToUpdate = [];

    // Sort tasks in a column
    resultTasks.forEach((task, index) => {
        if (task.sortOrder !== index || task.id === active.id) {
            const newTask = {
                ...task,
                sortOrder: index
            };

            tasksToUpdate.push(newTask);
        }
    })
    emits('updateTasks', tasksToUpdate)
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.column {
    display: flex;
    flex-direction: column;

    padding-top: 15px;

    border-right: 1px solid $blue-gray-200;

    $bl: &;

    &__name,
    &__input {
        display: flex;
        align-items: center;

        margin: 0 8px;

        color: $blue-gray-600;

        @include m-s14-h21;

        &:hover {
            #{$bl}__button {
                opacity: 1;
            }
        }
    }

    &__input {
        margin: 0;
        padding: 0;

        border: none;
        border-bottom: 1px solid $blue-gray-200;
        outline: none;
    }

    &__target-area {
        overflow-y: auto;
        flex-grow: 1;

        min-width: 224px;
        max-width: 380px;
        height: 1px;
        padding-right: 8px;
        padding-bottom: 30px;
        padding-left: 8px;

        @media (min-width: 1500px) {
            min-width: 244px;
        }
    }

    &__task {
        display: block;

        margin-top: 16px;
    }

    &__button {
        margin: 0;
        padding: 0;

        transition: opacity $animationSpeed;
        transform: scale(0.8);

        opacity: 0;
        border: none;
        outline: none;
        background-color: transparent;
    }

    &__update {
        margin-right: 5px;
        margin-left: 5px;
    }
}
</style>
