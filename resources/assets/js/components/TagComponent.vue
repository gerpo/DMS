<template>
    <span class="tag-input-tag" :class="tagClass">
        {{ title }}
        <span class="tag-input-tag-btn" :class="btnClass" aria-hidden="true" @click="btnAction(id)" v-if="showBtn">&times;</span>
    </span>
</template>

<script>
    export default {
        name: "tag-component",
        props: {
            id: {default: 0, type: [Number]},
            title: {default: '', type: [String]},
            tagClass: {default: '', type: [String]},
            btnAction: {default: () => {}, type: [Function]},
            showBtn: {default: true, type: [Boolean]},
            btnClass: {default: '', type: [String]},
        }
    }
</script>

<style scoped>
    .tag-input-tag {
        display: inline-block;
        border-radius: 0.3rem;
        padding: .1rem .5rem;
        margin-right: .2rem;
        margin-top: .2rem;
    }

    .tag-input-tag-btn {
        cursor: pointer;
    }
</style>