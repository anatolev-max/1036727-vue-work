<template>
    <div
        @drop.stop="onDrop"
        @dragover.prevent
        @dragenter.prevent
    >
        <slot/>
    </div>
</template>

<script setup>
import {DATA_TRANSFER_PAYLOAD} from '../constants.js'

// 3. emits
const emit = defineEmits([
    'drop'
]);

// 5. methods
/**
 * @param dataTransfer
 */
function onDrop({dataTransfer}) {
    if (!dataTransfer) {
        return;
    }

    const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);

    if (payload) {
        const transferData = JSON.parse(dataTransfer.getData(DATA_TRANSFER_PAYLOAD));
        emit('drop', transferData);
    }
}
</script>

<style scoped lang="scss">
</style>
