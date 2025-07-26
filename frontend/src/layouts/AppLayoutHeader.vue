<template>
    <header class="header">
        <!-- logo -->
        <div class="header__logo">
            <a href="#" class="logo">
                <img
                    src="@/assets/img/logo.svg"
                    alt="VueWork logo"
                    width="147"
                    height="23"
                />
            </a>
        </div>

        <!-- search -->
        <form action="#" class="header__search">
            <input type="search" name="search" required placeholder="Поиск"/>
            <button type="submit">Найти</button>
        </form>

        <!-- new-task-button -->
        <a href="#" class="header__create-task">Создать карточку</a>

        <!-- user-avatar -->
        <a href="#" class="header__user">
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
                />
                <span>Администратор</span>
                <a href="#" class="user-menu__link">Мой аккаунт</a>
                <a href="#" class="user-menu__link">Выйти</a>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>

@import '@/assets/scss/ds-system/ds-system';
@import '@/assets/scss/views/layout-header.scss';

</style>
