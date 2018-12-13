<template>
    <div class="card">
        <div class="card-header text-capitalize">{{ $tc('user.user', 2) }}</div>
        <div class="card-body row">

            <table-component
                    class="col-10"
                    :data="fetchUsers"
                    :show-caption="false"
                    sort-by="lastname"
                    sort-order="asc"
                    filter-placeholder="Search..."
                    table-class="table table-sm table-hover"
                    filter-input-class="form-control mb-2"

                    ref="table"
            >
                <table-column show="lastname" :label="$t('user.last_name')" header-class="text-capitalize" />
                <table-column show="firstname" :label="$t('user.first_name')" header-class="text-capitalize" />
                <table-column show="username" :label="$t('user.username')" header-class="text-capitalize" />
                <table-column show="email" :label="$t('user.email')" header-class="text-capitalize" />
                <table-column show="full_room" :label="$t('user.room')" header-class="text-capitalize" />
                <table-column show="house" :label="$t('user.house')" header-class="text-capitalize" />
                <table-column show="confirmed" :label="$t('user.confirmed')" :filterable="false" header-class="text-capitalize" />
                <table-column :filterable="false">
                    <template slot-scope="row">
                        <button @click="editUser(row)" class="btn btn-link text-capitalize">Edit</button>
                    </template>
                </table-column>
                <table-column :filterable="false">
                    <template slot-scope="row">
                        <button @click="" href="#" class="btn btn-link text-capitalize">{{ $t('general.contact') }}
                        </button>
                    </template>
                </table-column>
            </table-component>

            <div class="sidebar col-2 text-capitalize">
                <h4>{{ $tc('general.filter', 2) }}</h4>

                <hr>
                <h5>{{ $tc('general.dorm', 2) }}</h5>
                <ul class="filter-list">
                    <li v-for="house in houses" class="filter-list-item">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="house.checked"
                                   @change="filterChanged" :id="house.name">
                            <label class="custom-control-label" :for="house.name">{{ house.name }}</label>
                        </div>
                    </li>
                </ul>

                <hr>
                <h5>{{ $tc('user.user', 2) }}</h5>
                <ul class="filter-list">
                    <li v-for="filter in residentFilter" class="filter-list-item">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="filter.checked"
                                   @change="filterChanged" :id="filter.name">
                            <label class="custom-control-label" :for="filter.name">{{ $tc('user.' + filter.name, 2)
                                }}</label>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
        <modal :show="showEditUserModal" @close="showEditUserModal = false">
            <edit-user-component :houseNames="houseNames" :user="selectedUser"/>
        </modal>
    </div>
</template>

<script>
    import {TableColumn, TableComponent} from 'vue-table-component';
    import EditUserComponent from "./EditUserComponent";

    export default {
        name: "user-component",
        components: {
            EditUserComponent,
            TableComponent,
            TableColumn
        },
        data: () => ({
            houses: [],
            page: 1,
            filter: '',
            sort: '',
            showEditUserModal: false,
            selectedUser: {},
            residentFilter: [
                {name: 'main_tenant', checked: true},
                {name: 'subtenant', checked: true},
                {name: 'current_tenant', checked: true},
                {name: 'former_tenant', checked: false},
            ]
        }),
        props: {
            houseNames: {default: () => [], type: [Array]},
        },
        async created() {
            this.houseNames.forEach(house => {
                this.houses.push({name: house, checked: true});
            })
        },
        methods: {
            async fetchUsers({page, filter, sort}) {

                this.page = page;
                this.filter = filter;
                this.sort = sort;
                const houses = JSON.stringify(this.houses.filter(house => !house.checked).map(house => house['name']));
                const residentFilter = JSON.stringify(this.residentFilter.filter(filter => filter.checked).map(filter => filter['name']));

                return await axios.get(route('api.users'), {params: {page, filter, sort, houses, residentFilter}})
                    .then(response => Promise.resolve({
                        data: response.data.data,
                        pagination: {
                            totalPages: response.data.last_page,
                            currentPage: page
                        },
                    }));
            },
            async filterChanged() {
                const payload = {page: this.page, filter: this.filter, sort: this.sort};
                return await this.fetchUsers(payload)
                    .then(this.$refs.table.refresh());
            },
            editUser(user) {
                this.selectedUser = user;
                this.showEditUserModal = true;
            }
        },
        watch: {
            showEditUserModal(value) {
                if (!value) {
                    this.selectedUser = {};
                }
            }
        }
    }
</script>

<style>

    .filter-list {
        padding-left: 0;
    }

    .filter-list-item {
        list-style: none;
    }

</style>