<template>
    <div class="input-tag-wrapper" :class="{'input-tag-wrapper__disabled': disabled}">
        <div class="input-tag-tags">
            <tag-component v-for="(t, i) in currentTags" :key="i" :id="i" :title="t" :btnAction="removeTag"
                           tag-class="bg-primary text-white" :disabled="disabled"/>
        </div>
        <input type="text" class="input-tag-input" v-model="tag" @keyup="onKeyPress(tag, $event)"
               title="recipient-input" :placeholder="placeholder" :disabled="disabled">
    </div>
</template>

<script>
    import TagComponent from './TagComponent';

    export default {
        name: "input-tag-component",
        props: {
            tags: {default: () => [], type: [Array]},
            delimiter: {default: ',', type: [String]},
            uniqueValues: {default: true, type: [Boolean]},
            validateTag: {default: (input) => true, type: [Function]},
            placeholder: {default: '', type: [String]},
            disabled: {default: false, type: [Boolean]},
        },
        components: {
            TagComponent,
        },
        data: () => ({
            tag: "",
            currentTags: [],
        }),
        methods: {
            onKeyPress(input, event) {
                if ((event.key === this.delimiter || event.key === 'Enter') && input.trim()) {
                    this.addTag(input.trim());
                }

                if (!input && event.key === 'Backspace') {
                    this.editLastTag();
                }
            },
            addTag(input) {
                if ((this.uniqueValues && this.currentTags.includes(input)) || !this.validateTag(input)) return;

                this.currentTags.push(input.trim());
                this.resetInput();
            },
            removeTag(index) {
                this.currentTags.splice(index, 1)
            },
            editLastTag() {
                this.tag = this.currentTags.pop();
            },
            resetInput() {
                this.tag = ""
            }
        },
        mounted() {
            this.currentTags = this.tags;
        },
        watch: {
            tags(newTags) {
                this.currentTags = newTags;
            }
        }
    }
</script>

<style scoped>
    .input-tag-wrapper {
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        line-height: 1.6;
        font-size: 0.9rem;
        padding: 0.375rem 0.75rem;

        margin-top: -0.2rem;
    }

    .input-tag-wrapper:focus-within {
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    .input-tag-wrapper__disabled {
        color: #495057;
        background-color: #e9ecef;
    }

    .input-tag-tags:not(:empty) {
        margin-top: -0.2rem;
        padding-right: 5px;
        width: auto;
    }

    .input-tag-input {
        border: 0;
        box-shadow: none;
        flex: 1;
        padding: 0
    }
    .input-tag-input:disabled {
        background-color: #e9ecef;
    }

    .input-tag-input:focus {
        outline: none
    }
</style>