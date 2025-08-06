<!--suppress JSUnresolvedReference -->
<template>
    <main class="content">
        <section class="desk">
            <!-- Board header -->
            <div class="desk__header">
                <h1 class="desk__title">Design Coffee Lab</h1>

                <!-- Added a button to add a new column -->
                <button
                    class="desk__add"
                    type="button"
                    @click="addColumn"
                >Добавить столбец</button>

                <div class="desk__filters">
                    <div class="desk__user-filter">
                        <!-- User list -->
                        <ul class="user-filter">
                            <li
                                v-for="user in users"
                                :key="user.id"
                                class="user-filter__item"
                                :class="{active: filters.users.some(id => id === user.id)}"
                                :title="user.name"
                                @click="$emit('applyFilters', {item: user.id, entity: 'users'})"
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
                        <!-- List of statuses -->
                        <ul class="meta-filter">
                            <li
                                v-for="({ value, label }) in STATUSES"
                                :key="value"
                                class="meta-filter__item"
                                :class="{ active: filters.statuses.some(s => s === value) }"
                                @click="$emit('applyFilters', {item: value, entity: 'statuses'})"
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

            <!-- Columns and tasks -->
            <div
                v-if="columns.length"
                class="desk__columns"
            >
                <!-- Showing columns -->
                <desk-column
                    v-for="column in state.columns"
                    :key="column.id"
                    :column="column"
                    :tasks="props.tasks"
                    @delete="deleteColumn"
                    @update="updateColumn"
                    @update-tasks="$emit('updateTasks', $event)"
                />
            </div>

            <!-- Empty board -->
            <p
                v-else
                class="desk__emptiness"
            >Пока нет ни одной колонки</p>
        </section>
    </main>
</template>

<script setup>
import {reactive} from 'vue'
import {uniqueId} from 'lodash'
import columns    from '@/mocks/columns.json'
import users      from '@/mocks/users.json'
import {STATUSES} from '@/common/constants.js'
import {getImage} from '@/common/helpers.js'
import DeskColumn from '@/modules/columns/components/DeskColumn.vue'

// 1. props
const props = defineProps({
    tasks: {
        type:     Array,
        required: true
    },
    filters: {
        type:     Object,
        required: true
    }
});

// 2. data
const state = reactive({
    columns,
});

// 3. emits
defineEmits([
    'applyFilters',
    'updateTasks'
]);

// 5. methods
/**
 * @returns undefined
 */
function addColumn () {
    state.columns.push({
        id:    uniqueId('column_'),
        title: 'Новый столбец'
    })
}

/**
 * @param id
 */
function deleteColumn (id) {
    state.columns = state.columns.filter(column => column.id !== id);
}

/**
 * @param column
 */
function updateColumn (column) {
    const index = state.columns.findIndex(({id}) => id === column.id);

    if (~index) {
        state.columns.splice(index, 1, column)
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
}

.desk {
    $bl: ".desk";

    display: flex;
    flex-direction: column;
    flex-grow: 1;

    width: calc(100% - 400px);
    padding-top: 27px;

    background-color: $white-900;

    &__header {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        margin-bottom: 24px;
        padding: 0 17px;
    }

    &__title {
        @include m-s24-h21;

        margin: 0 auto 0 0;

        color: $black-900;
    }

    &__add {
        position: relative;

        margin: 0;
        padding: 0 0 0 35px;

        cursor: pointer;

        color: $blue-gray-600;
        border: none;
        outline: none;
        background-color: transparent;

        &::before {
            width: 24px;
            height: 24px;

            content: "";

            background-image: url("@/assets/img/icon-add.svg");

            @include p_center-v;
        }

        &:hover {
            color: $blue-600;
        }

        &:active {
            color: $blue-300;
        }
    }

    &__filters {
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;
        margin-top: 16px;
    }

    &__user-filter {
        margin-right: 40px;
    }

    &__columns {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        flex-grow: 1;

        border-top: 1px solid $blue-gray-200;
    }
}

.user-filter {
    @include clear-list;

    display: flex;
    flex-direction: row-reverse;

    &__item {
        margin-right: -4px;
    }

    &__button {
        display: block;
        overflow: hidden;

        width: 24px;
        height: 24px;

        cursor: pointer;
        transition: 0.3s;

        border: 1px solid $white-900;
        border-radius: 50%;
        outline: none;
        background-color: $blue-gray-50;

        &:hover {
            border-color: $blue-600;
        }

        img {
            display: block;

            width: 24px;
            height: 24px;
        }

        span {
            @include m-s14-h21;

            display: block;

            width: 100%;
            height: 100%;
            padding-top: 1px;

            text-align: center;

            color: $white-900;
            background-color: $green-700;
        }

        &--current {
            border-color: $white-900;
            box-shadow: 0 0 0 1px $blue-600;
        }
    }
}

.meta-filter {
    @include clear-list;

    display: flex;
    align-items: center;

    &__item {
        margin-left: 16px;

        &:first-child {
            margin-left: 0;
        }
    }

    &__status {
        display: block;

        box-sizing: content-box;
        margin: 0;
        padding: 0;

        cursor: pointer;
        transition: 0.3s;

        border: 1px solid $white-900;
        border-radius: 50%;
        outline: none;
        background-color: transparent;

        &:hover {
            border-color: $blue-600;
        }

        &--color {
            width: 8px;
            height: 8px;
        }

        &--green {
            background-color: $green-600;
        }

        &--orange {
            background-color: $orange-600;
        }

        &--red {
            background-color: $red-600;
        }

        &--time {
            width: 16px;
            height: 16px;

            background-image: url("@/assets/img/status-time.svg");
            background-repeat: no-repeat;
            background-size: cover;
        }

        &--alert {
            width: 16px;
            height: 16px;

            background-image: url("@/assets/img/status-alert.svg");
            background-repeat: no-repeat;
            background-size: cover;
        }

        &--current {
            border-color: $white-900;
            box-shadow: 0 0 0 1px $blue-600;
        }
    }
}

.active {
    border: 1px solid $blue-600;
    border-radius: 50%;
    outline: none;
    background-color: transparent;
}
</style>
