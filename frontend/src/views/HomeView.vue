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
                        <div class="column__task">
                            <div class="task">
                                <div class="task__user">
                                    <div class="task__avatar">
                                        <img
                                            src=""
                                            alt="задача"
                                            width="20"
                                            height="20"
                                        >
                                    </div>
                                    Пользователь задачи
                                </div>

                                <div class="task__statuses">
                                    <span class="task__status"/>
                                    <span class="task__status"/>
                                </div>

                                <h5 class="task__title">Наименование задачи</h5>
                                <ul class="task__tags">
                                    <li>
                                        <span class="tag tag--blue">Тег задачи</span>
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
