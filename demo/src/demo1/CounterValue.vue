<template>
    <span>Current value: {{ value }}</span>
</template>

<script setup>
// 1. props
defineProps({
    value: {
        type:     Number,
        required: true,
    }
});
</script>

<style lang="scss" scoped>
span {
    margin: 0 10px;
}
</style>
