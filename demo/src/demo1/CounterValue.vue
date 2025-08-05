<template>
    <span>Current value: {{ value }}</span>
</template>

<script setup>
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
