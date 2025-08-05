<template>
    <div>
        <counter-button @action="decrement">-</counter-button>
        <counter-value :value="count"></counter-value>
        <counter-button @action="increment">+</counter-button>
    </div>
</template>

<script setup>
import {ref}         from 'vue'
import CounterButton from './CounterButton.vue';
import CounterValue  from './CounterValue.vue';

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
