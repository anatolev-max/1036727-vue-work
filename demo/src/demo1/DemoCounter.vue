<template>
    <div>
        <counter-button @action="decrement">-</counter-button>
        <counter-value :value="count"></counter-value>
        <counter-button @action="increment">+</counter-button>
    </div>
</template>

<script setup>
import {ref}         from 'vue';
import CounterButton from './CounterButton.vue';
import CounterValue  from './CounterValue.vue';

// 2. data
const count = ref(0);

// 5. methods
/**
 * @returns undefined
 */
const decrement = () => {
    count.value = count.value - 1;
}

/**
 * @returns undefined
 */
const increment = () => {
    count.value = count.value + 1;
}
</script>

<style>
    body {
        padding: 20px;
    }
</style>
