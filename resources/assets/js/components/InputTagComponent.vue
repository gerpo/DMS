<template>
    <div :class="{'input-tag-wrapper__disabled': disabled}" class="input-tag-wrapper">
        <div class="input-tag-tags">
            <tag-component :btnAction="removeTag" :disabled="disabled" :id="i" :key="i" :title="t"
                           tag-class="bg-primary text-white" v-for="(t, i) in currentTags"/>
        </div>
        <input :class="inputClasses" :disabled="disabled" :placeholder="placeholder" @keydown="onKeyPress(tag, $event)"
               class="input-tag-input" title="recipient-input" type="text" v-model="tag">
    </div>
</template>

<script>
    import TagComponent from './TagComponent';

    export default {
        name: "input-tag-component",
        props: {
            tags: {default: () => [], type: [Array]},
            delimiter: {default: ',', type: [String]},
            spaceIsDelimiter: {default: true, type: [Boolean]},
            uniqueValues: {default: true, type: [Boolean]},
            validateTag: {default: (input) => true, type: [Function]},
            placeholder: {default: '', type: [String]},
            disabled: {default: false, type: [Boolean]},
            inputClasses: {
                default: () => {
                }, type: [Object]
            },
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
                if ((event.key === this.delimiter || event.key === 'Enter' || event.key === 'Tab' || (event.key === ' ' && this.spaceIsDelimiter)) && input.trim()) {
                    let re = new RegExp(this.delimiter, "g");
                    input = input.replace(re, '').trim();
                    if (input) {
                        this.addTag(input);
                    }
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
                this.tag = "";
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

<style lang="scss" scoped>
    .input-tag-wrapper {
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        line-height: 1.6;
        font-size: 0.9rem;
        padding: 0.375rem 0.75rem;

        margin-top: -0.2rem;

        &.is-invalid {
            border-color: #dc3545;
            padding-right: calc((1em + 0.75rem) * 3 / 4 + 1.75rem);
            background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right 0.75rem center/8px 10px, url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23dc3545' viewBox='-2 -2 7 7'%3e%3cpath stroke='%23dc3545' d='M0 0l3 3m0-3L0 3'/%3e%3ccircle r='.5'/%3e%3ccircle cx='3' r='.5'/%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E") #fff no-repeat center right 1.75rem/calc(0.8em + 0.375rem) calc(0.8em + 0.375rem);
        }

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