<template>
    <button class="counter-button" @click="$emit('action')">
        <slot/>
    </button>
</template>

<script setup>
// 3. emits
defineEmits(['action']);
</script>

<style lang="scss" scoped>
button {
    padding: 5px 10px;
}
</style>
