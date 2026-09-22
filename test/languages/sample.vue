<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{ title: string; score?: number }>();
const emit = defineEmits<{ select: [title: string] }>();
const active = ref(false);
const label = computed(() => `${props.title}: ${props.score ?? "unrated"}`);
</script>

<template>
    <article :class="{ active }" @click="emit('select', title)">
        <h2>{{ label }}</h2>
        <button type="button" @click.stop="active = !active">Toggle</button>
    </article>
</template>

<style scoped>
article.active { border-color: #7757ba; }
</style>
