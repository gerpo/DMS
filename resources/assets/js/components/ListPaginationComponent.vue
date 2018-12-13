<template>
    <div class="list-pagination col-md-6 col-xxl-4 offset-xxl-1">
        <input type="text" v-model="search_query" title="search query" class="form-control mb-2"
               :placeholder="placeholder" @keyup="currentPage = 1">
        <ul class="list-group">
            <slot v-for="item in currentItems" :item="item" :search_query="search_query">
                <li>{{ item[searchAttr] | highlight(search_query) }}</li>
            </slot>
            <li v-if="currentItems.length === 0"
                class="list-group-item d-flex justify-content-between align-items-center">
                <span>No Results</span>
            </li>
        </ul>
        <div class="list-pagination_pages_wrapper mt-2 d-flex justify-content-center align-items-baseline"
             v-if="pages > 1">
            <button class="btn btn-link" v-if="currentPage > 1" @click="previousPage">Previous</button>
            <span>{{this.currentPage}} of {{this.pages}}</span>
            <button class="btn btn-link" v-if="currentPage < pages" @click="nextPage">Next</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list-pagination-component",
        props: {
            data: {default: () => [], type: [Array]},
            itemsPerPage: {default: 10, type: [Number]},
            searchable: {default: true, type: [Boolean]},
            searchAttr: {default: 'name', type: [String]},
            placeholder: {default: 'Search...', type: [String]}
        },
        data: () => ({
            currentPage: 1,
            search_query: '',
            currentData: [],
        }),
        computed: {
            filteredItems() {
                if (!this.search_query) {
                    return this.data;
                }
                return this.data.filter(item => this.compareFunction(item[this.searchAttr]));
            },
            currentItems() {
                let start = (this.currentPage - 1) * this.itemsPerPage;
                let end = start + this.itemsPerPage;

                return this.filteredItems.slice(start, end);
            },
            pages() {
                return Math.ceil(this.filteredItems.length / this.itemsPerPage);
            }
        },
        methods: {
            compareFunction(value) {
                return value.toLowerCase().includes(this.search_query.toLowerCase());
            },
            nextPage() {
                if (this.currentPage < this.pages) {
                    this.currentPage++;
                }
            },
            previousPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
            }
        }
    }
</script>

<style scoped>

</style>