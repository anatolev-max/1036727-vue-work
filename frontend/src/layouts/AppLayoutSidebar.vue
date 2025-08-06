<template>
    <!-- Keeps track of which column a task is assigned to -->
    <app-drop
        class="backlog"
        :class="{ 'backlog--hide': state.backlogIsHidden }"
        @drop="moveTask"
    >
        <!-- Responsible for opening and closing the backlog -->
        <button
            class="backlog__title"
            @click="state.backlogIsHidden = !state.backlogIsHidden"
        >
            <span>Бэклог</span>
        </button>

        <div class="backlog__content">
            <div class="backlog__scroll">
                <div class="backlog__collapse">
                    <div class="backlog__user">
                        <div class="backlog__account">
                            <img
                                src="@/assets/img/user6.jpg"
                                width="32"
                                height="32"
                                alt="Ваш аватар"
                            />
                            Игорь Пятин
                        </div>

                        <div class="backlog__counter">{{ sidebarTasks.length }}</div>
                    </div>

                    <div class="backlog__target-area">
                        <!-- Tasks in the backlog -->
                        <task-card
                            v-for="task in sidebarTasks"
                            class="backlog__task"
                            :key="task.id"
                            :task="task"
                            @drop="moveTask($event, task)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </app-drop>
</template>

<script setup>
import {reactive, computed}              from 'vue'
import AppDrop                           from '@/common/components/AppDrop.vue'
import {getTargetColumnTasks, addActive} from '@/common/helpers.js'
import TaskCard                          from '@/modules/tasks/components/TaskCard.vue'

// 1. props
const props = defineProps({
    tasks: {
        type:     Array,
        required: true
    }
});

// 2. data
const state = reactive({
    backlogIsHidden: false
});

// 3. emits
const emits = defineEmits([
    'updateTasks'
]);

// 4. computed
/**
 * Filter tasks that belong to the backlog (columnId === null)
 *
 * @type {ComputedRef<any[]>}
 */
const sidebarTasks = computed(() => {
    return props.tasks
        .filter(task => !task.columnId)
        .sort((taskA, taskB) => taskA.sortOrder - taskB.sortOrder);
});

// 5. methods
/**
 * @param active
 * @param toTask
 */
function moveTask (active, toTask) {
    // Don't update the array if the task hasn't moved
    if (toTask && active.id === toTask.id) {
        return;
    }

    const toColumnId = null;

    // Get tasks for the current column
    const targetColumnTasks = getTargetColumnTasks(toColumnId, props.tasks);
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
    });

    emits('updateTasks', tasksToUpdate);
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.backlog {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    flex-grow: 1;

    min-width: 400px;
    max-width: 400px;
    padding-top: 16px;

    background-color: $gray-100;

    $bl: ".backlog";

    &__title {
        position: relative;

        height: 26px;
        margin-bottom: 5px;
        margin-left: 12px;
        padding-left: 28px;

        cursor: pointer;
        text-align: left;

        color: $blue-gray-600;
        border: none;
        background-color: transparent;

        &::before {
            position: absolute;
            top: 50%;
            left: 0;

            width: 24px;
            height: 24px;

            content: "";
            transition: $animationSpeed;
            transform: translateY(-53%) rotate(180deg);

            background-image: url("@/assets/img/arrow-right.svg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        }

        span {
            @include m-s14-h21;
        }
    }

    &--hide {
        min-width: 40px;
        max-width: 40px;

        #{$bl}__title {
            &::before {
                transform: translateY(-53%);
            }
        }

        #{$bl}__scroll {
            visibility: hidden;
            overflow: hidden;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        width: 400px;

        background-color: $gray-100;
    }

    &__scroll {
        overflow-y: auto;
        flex-grow: 1;

        height: 1px;
        padding-bottom: 20px;
    }

    &__collapse {
        padding-bottom: 1px;

        border-bottom: 1px solid $blue-gray-200;
    }

    &__user {
        display: flex;
        align-items: center;

        box-sizing: border-box;
        width: 100%;
        margin: 0;
        padding: 15px 12px;

        text-align: left;

        border: none;
        outline: none;
        background-color: transparent;

        &:active {
            color: inherit;
        }
    }

    &__account {
        display: flex;
        align-items: center;

        max-width: 80%;
        margin-right: auto;

        @include m-s18-h21;

        img {
            width: 32px;
            height: 32px;
            margin-right: 8px;

            border-radius: 50%;
        }
    }

    &__counter {
        box-sizing: border-box;
        width: 32px;
        height: 32px;
        padding-top: 6px;

        text-align: center;

        border-radius: 50%;
        background-color: $blue-gray-100;

        @include m-s18-h21;
    }

    &__arrow {
        width: 10px;
        height: 30px;
        margin: 0 0 0 18px;
        padding: 0;

        cursor: pointer;

        border: none;
        outline: none;
        background-color: transparent;
        background-image: url("@/assets/img/icon-arrow.svg");
        background-repeat: no-repeat;
        background-position: center;

        &--top {
            transform: rotate(180deg);
        }
    }

    &__task {
        margin-right: 12px;
        margin-bottom: 11px;
        margin-left: 12px;
    }
}
</style>
