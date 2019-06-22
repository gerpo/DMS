<template>
    <div>
        <input :placeholder="placeholder" @keyup="currentPage = 1" class="form-control my-2" title="search query"
               type="text"
               v-if="searchable" v-model="search_query">
        <table class="table table-hover">
            <thead class="text-capitalize text-nowrap">
            <tr>
                <slot name="columns">
                    <th v-for="column in columns">
                        {{ column }}
                    </th>
                </slot>
            </tr>
            </thead>
            <tbody v-if="!loading" class="text-nowrap">
            <tr v-for="(item, index) in currentItems">
                <slot :index="index" :row="item">
                    <td v-for="column in columns">
                        {{ item[column] }}
                    </td>
                </slot>
            </tr>
            </tbody>
        </table>
        <div v-if="loading" class="spinner-border text-primary d-block mx-auto" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="text-center font-weight-light my-2" v-if="currentItems.length===0 && !loading">No search results found.</div>
        <nav aria-label="table pagination d-block mx-auto" v-if="currentItems.length!==0 && !loading">
            <ul class="pagination justify-content-center">
                <li :class="{disabled:(currentPage===1)}" class="page-item" v-if="pages > 1">
                    <button @click="previousPage" aria-label="Previous" class="page-link">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </button>
                </li>
                <li :class="{active: (currentPage===page)}" @click="currentPage=page" class="page-item"
                    v-for="page in pages">
                    <button class="page-link">{{ page }}</button>
                </li>
                <li :class="{disabled:(currentPage===pages)}" class="page-item" v-if="pages > 1">
                    <button @click="nextPage" aria-label="Next" class="page-link">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "TableComponent",
        props: {
            data: {default: () => [], type: [Array]},
            columns: {default: () => [], type: [Array]},
            itemsPerPage: {default: 50, type: [Number]},
            searchable: {default: true, type: [Boolean]},
            searchAttr: {type: [String]},
            searchFunction: {type: [Function]},
            sortBy: {default: '', type: [String]},
            sortOrder: {default: 'asc', type: [String]},
            placeholder: {default: 'Search...', type: [String]},
            loading: {default: false, type: [Boolean]},
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

                if (this.searchFunction) {
                    return this.data.filter(item => this.searchFunction(item, this.search_query));
                }

                return this.data.filter(item => this.compareFunction(item[this.searchAttr]));
            },
            currentItems() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;

                return this.sort(this.filteredItems.slice(start, end));
            },
            pages() {
                return Math.ceil(this.filteredItems.length / this.itemsPerPage);
            }
        },
        methods: {
            sort(values) {
                return values.sort((a, b) => {
                    if (a[this.sortBy] < b[this.sortBy]){
                        return this.sortOrder === 'asc' ? -1 : 1;
                    }

                    if (a[this.sortBy] > b[this.sortBy]){
                        return this.sortOrder === 'asc' ? 1 : -1;
                    }

                    return 0
                })
            },
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