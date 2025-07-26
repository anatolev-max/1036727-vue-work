<template>
    <main class="content">
        <section class="desk">
            <!-- board-header -->
            <div class="desk__header">
                <h1 class="desk__title">Design Coffee Lab</h1>
                <div class="desk__filters">
                    <div class="desk__user-filter">
                        <!-- user-list -->
                        <ul class="user-filter">
                            <li
                                v-for="user in users"
                                :key="user.id"
                                :title="user.name"
                                class="user-filter__item"
                            >
                                <a class="user-filter__button">
                                    <img
                                        :src="getImage(user.avatar)"
                                        alt="Аватар юзера"
                                        width="24"
                                        height="24"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="desk__meta-filter">
                        <!-- status-list -->
                        <ul class="meta-filter">
                            <li
                                v-for="({ value, label }) in STATUSES"
                                :key="value"
                                class="meta-filter__item"
                            >
                                <a
                                    class="meta-filter__status"
                                    :class="`meta-filter__status meta-filter__status--color meta-filter__status--${value}`"
                                    :title="label"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- columns and tasks -->
            <div
                v-if="columns.length"
                class="desk__columns"
            >
                <div
                    v-for="column in columns"
                    :key="column.id"
                    class="column"
                >
                    <h2 class="column__name">{{ column.title }}</h2>
                    <div class="column__target-area">

                        <!-- tasks -->
                        <div
                            v-for="task in columnTasks[column.id]"
                            :key="column.id"
                            class="column__task"
                        >
                            <div class="task">
                                <div
                                    v-if="task.user"
                                    class="task__user"
                                >
                                    <div class="task__avatar">
                                        <img
                                            :src="getImage(task.user.avatar)"
                                            width="20"
                                            height="20"
                                            :alt="task.user.name"
                                        >
                                    </div>
                                    {{ task.user.name }}
                                </div>

                                <div class="task__statuses">
                                    <span
                                        v-if="task.status"
                                        class="task__status"
                                        :class="`task__status--${task.status}`"
                                    ></span>
                                    <span
                                        v-if="task.timeStatus"
                                        class="task__status"
                                        :class="`task__status--${task.timeStatus}`"
                                    ></span>
                                </div>

                                <h5
                                    class="task__title"
                                    :class="{'task__title--first': !task.user}"
                                >
                                    {{ task.title }}
                                </h5>

                                <ul
                                    v-if="task.tags && task.tags.length"
                                    class="task__tags"
                                >
                                    <li
                                        v-for="(tag, index) in task.tags"
                                        :key="index"
                                    >
                                        <span class="tag tag--blue">{{ tag }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- empty board -->
            <p
                v-else
                class="desk__emptiness"
            >Пока нет ни одной колонки</p>
        </section>
    </main>
</template>

<script setup>
import users                                   from '../mocks/users.json';
import columns                                 from '../mocks/columns.json';
import rawTasks                                from '../mocks/tasks.json';
import {STATUSES}                              from '@/common/constants';
import {getTagsArrayFromString, normalizeTask} from "@/common/helpers";

const normalizedTasks = rawTasks.map(task => normalizeTask(task));

const columnTasks = normalizedTasks
    .filter(({columnId}) => columnId)
    .reduce((accumulator, task) => {
        task.tags = getTagsArrayFromString(task.tags);

        if (accumulator[task.columnId]) {
            accumulator[task.columnId] = [...accumulator[task.columnId], task];
        } else {
            accumulator[task.columnId] = [task];
        }

        return accumulator;
    }, {})

const getImage = (image) => {
    return new URL(`../assets/img/${image}`, import.meta.url).href;
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/app.scss';
@import '@/assets/scss/views/home-view.scss';

</style>
