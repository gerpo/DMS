<template>
    <div class="input-group">
        <label :for="id" hidden>{{ label }}</label>
        <input :id="id" v-model="model[searchAttr]" @input="searchData" @keyup.up="onArrowUp" @keyup.down="onArrowDown"
               @keyup.enter="onEnter" type="text" class="form-control"
               :placeholder="placeholder"/>
        <div class="input-group-append" v-if="showButton">
            <button class="btn btn-primary input-group-text text-capitalize" @click="submit">{{ buttonText }}</button>
        </div>
        <div class="ac__suggestions list-group" v-if="suggestionsAreOpen">
            <p class="list-group-item" v-if="isFetching">Loading...</p>
            <button class="ac__suggestion list-group-item list-group-item-action"
                    v-if="suggestions.length > 0"
                    v-for="(suggestion, i) in limitedSuggestions"
                    :class="{active: seletectedSuggestion===i}"
                    :key="suggestion[searchAttr]+i" @click="onSuggestionClick(i)">
                {{ suggestion[searchAttr] }}
            </button>
            <p class="list-group-item" v-if="suggestions.length === 0 && !isFetching">No Resident found.</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "auto-complete-component",
        props: {
            id: {default: 'autocomplete', type: [String]},
            label: {default: 'Search', type: [String]},
            placeholder: {default: 'Type..', type: [String]},
            buttonText: {default: 'Search', type: [String]},
            showButton: {default: true, type: [Boolean]},
            onButtonClick: {
                default: () => {
                }, type: [Function]
            },

            data: {default: () => [], type: [Array, Function]},
            searchAttr: {default: 'name', type: [String]},

            suggestionLimit: {default: 4, type: [Number]},

            caseSensitive: {default: false, type: [Boolean]},
            minInputLength: {default: 1, type: [Number]},

            additionalProps: {default: () => {}, type: [Object]}
        },
        data: () => ({
            model: {},
            suggestionsAreOpen: false,
            suggestions: [],
            seletectedSuggestion: -1,
            isFetching: false,
            selectedModel: null
        }),
        computed: {
            usesLocalData() {
                return Array.isArray(this.data);
            },
            limitedSuggestions() {
                if (this.suggestionLimit !== 0) {
                    return this.suggestions.slice(0, this.suggestionLimit)
                }
                return this.suggestions;
            },
        },
        methods: {
            searchData: _.debounce(async function () {
                const inputValue = this.model[this.searchAttr];

                if (inputValue.length < this.minInputLength) {
                    this.suggestionsAreOpen = false;
                    return
                }

                this.isFetching = true;
                this.suggestionsAreOpen = true;
                this.selectedModel = null;

                const data = this.usesLocalData
                    ? this.data
                    : await this.fetchServerData(inputValue);

                this.isFetching = false;

                this.suggestions = (data.length > 0) ? data.filter(d => this.compareFunction(d[this.searchAttr], inputValue)) : [];
            }, 150),
            async fetchServerData(inputValue = '') {

                const response = await this.data({
                    filter: inputValue
                });

                return response.data;
            },
            compareFunction(str, searchStr) {
                if (!this.caseSensitive) {
                    str = str.toLowerCase();
                    searchStr = searchStr.toLowerCase();
                }

                return str.startsWith(searchStr);
            },
            onArrowDown() {
                if (this.seletectedSuggestion < this.suggestions.length) {
                    this.seletectedSuggestion++;
                }
            },
            onArrowUp() {
                if (this.seletectedSuggestion > 0) {
                    this.seletectedSuggestion--;
                }
            },
            onEnter() {
                if (this.seletectedSuggestion < 0) {
                    this.submit();
                    return;
                }
                this.model[this.searchAttr] = this.suggestions[this.seletectedSuggestion][this.searchAttr];
                this.selectedModel = this.suggestions[this.seletectedSuggestion];
                this.suggestionsAreOpen = false;
                this.seletectedSuggestion = -1;
            },
            onSuggestionClick(i) {
                this.seletectedSuggestion = i;
                this.onEnter();
            },
            submit() {
                if (this.suggestions.length > 0 && this.selectedModel) {
                    this.onButtonClick(Object.assign({}, {result: this.selectedModel}, this.additionalProps));
                    this.model = {}
                }
            }
        }
    }
</script>

<style scoped>
    .ac__suggestions {
        position: absolute;
        top: 2.2rem;
        z-index: 9997;
    }

    .ac__suggestion {
        cursor: pointer;
    }
</style>