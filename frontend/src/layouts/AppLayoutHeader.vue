<template>
    <header class="header">
        <!-- logo -->
        <div class="header__logo">
            <a class="logo" href="#">
                <img
                    src="@/assets/img/logo.svg"
                    alt="VueWork logo"
                    width="147"
                    height="23"
                />
            </a>
        </div>

        <!-- search -->
        <form
            class="header__search"
            action="#"
            @submit.prevent
        >
            <input
                type="search"
                name="search"
                placeholder="Поиск"
                required
            >
            <button type="submit">Найти</button>
        </form>

        <!-- new-task-button -->
        <a
            class="header__create-task"
            href="#"
        >Создать карточку</a>

        <!-- user-avatar -->
        <a
            class="header__user"
            href="#"
        >
            <img
                src="@/assets/img/admin.jpg"
                alt="Администратор"
                width="40"
                height="40"
            />
        </a>

        <!-- user-panel -->
        <div class="header__menu">
            <div class="user-menu">
                <img
                    src="@/assets/img/admin.jpg"
                    width="40"
                    height="40"
                    alt="Администратор"
                >
                <span>Администратор</span>

                <a href="#" class="user-menu__link">Мой аккаунт</a>
                <a href="#" class="user-menu__link">Выйти</a>
            </div>
        </div>
    </header>
</template>

<script setup>
</script>

<style lang="scss" scoped>

@import '@/assets/scss/ds-system/ds-system';
@import '@/assets/scss/views/layout-header.scss';

</style>
