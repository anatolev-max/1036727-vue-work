<template>
    <div>
        <button @click="decrement">-</button>
        <span>Current value: {{ count }}</span>
        <button @click="increment">+</button>
    </div>
</template>

<script setup>
import {ref} from 'vue'

const count = ref(0);

const decrement = () => {
    count.value = count.value - 1;
}

const increment = () => {
    count.value = count.value + 1;
}
</script>

<style>
    body {
        padding: 20px;
    }
</style>

<style scoped>
button {
    padding: 5px 10px;
}

span {
    margin: 0 10px;
}
</style>
