<template>
    <div class="card">
        <div class="card-header text-capitalize">{{ $tc('user.user', 2) }}</div>
        <div class="card-body row">

            <!--<table-component
                    class="col-12 col-lg-10"
                    :data="fetchUsers"
                    :show-caption="false"
                    sort-by="lastname"
                    sort-order="asc"
                    filter-placeholder="Search..."
                    table-class="table table-sm table-hover text-nowrap"
                    filter-input-class="form-control mb-2"

                    ref="table"
            >
                <table-column show="lastname" :label="$t('user.last_name')" header-class="text-capitalize"/>
                <table-column show="firstname" :label="$t('user.first_name')" header-class="text-capitalize"/>
                <table-column show="username" :label="$t('user.username')" header-class="text-capitalize"/>
                <table-column show="email" :label="$t('user.email')" header-class="text-capitalize"/>
                <table-column show="full_room" :label="$t('user.room')" header-class="text-capitalize"/>
                <table-column show="house" :label="$t('user.house')" header-class="text-capitalize"/>
                <table-column show="confirmed" :label="$t('user.confirmed')" :filterable="false"
                              header-class="text-capitalize"/>
                <table-column :filterable="false">
                    <template slot-scope="row">
                        <button @click="editUser(row)" class="btn btn-link text-capitalize">Edit</button>
                    </template>
                </table-column>
                <table-column :filterable="false">
                    <template slot-scope="row">
                        <button @click="contactUser(row)" href="#" class="btn btn-link text-capitalize">{{
                            $t('general.contact') }}
                        </button>
                    </template>
                </table-column>
            </table-component>

            <div class="sidebar col-12 col-lg-2 text-capitalize">
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
            </div>-->

            <!--<el-table :data="users" class="col-12 col-lg-10 text-nowrap" :filters="filters"
                      header-row-class-name="text-capitalize">
                <el-table-column prop="lastname" fit :label="$t('user.last_name')" sortable></el-table-column>
                <el-table-column prop="firstname" :label="$t('user.first_name')" sortable></el-table-column>
                <el-table-column prop="username" :label="$t('user.username')" sortable></el-table-column>
                <el-table-column prop="email" :label="$t('user.email')" width="auto" sortable></el-table-column>
                <el-table-column prop="full_room" :label="$t('user.room')" sortable></el-table-column>
                <el-table-column prop="house" :label="$t('user.house')" sortable></el-table-column>
                <el-table-column prop="confirmed" :label="$t('user.confirmed')" align="center">
                    <template slot-scope="scope">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="scope.row.confirmed"
                                   :id="`confirmed_${scope.$index}`" disabled>
                            <label class="custom-control-label" :for="`confirmed_${scope.$index}`"></label>
                        </div>
                    </template>
                </el-table-column>
            </el-table>-->
            <div class="col-12 col-lg-10 table-responsive">
                <table class="table table-hover">
                    <thead class="text-capitalize text-nowrap">
                    <tr>
                        <td>{{$t('user.last_name') }}</td>
                        <td>{{ $t('user.first_name') }}</td>
                        <td>{{ $t('user.username') }}</td>
                        <td>{{ $t('user.email') }}</td>
                        <td>{{ $t('user.room') }}</td>
                        <td>{{ $t('user.house') }}</td>
                        <td>{{ $t('user.confirmed') }}</td>
                    </tr>
                    </thead>
                    <tbody class="text-nowrap">
                    <tr v-for="user in users">
                        <td>{{ user.lastname }}</td>
                        <td>{{ user.firstname }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.full_room }}</td>
                        <td>{{ user.house }}</td>
                        <td>{{ user.confirmed }}</td>
                    </tr>
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="sidebar col-12 col-lg-2 order-first order-lg-2 text-capitalize">
                <button class="btn btn-outline-primary d-lg-none" type="button" data-toggle="collapse"
                        data-target="#filters" aria-expanded="false" aria-controls="filterCollapse">
                    {{ $tc('general.filter', 2) | capitalize }}
                </button>
                <div class="collapse d-lg-block" id="filters">
                    <div class="d-flex d-lg-block justify-content-start">
                        <h4 class="d-none d-lg-block">{{ $tc('general.filter', 2) }}</h4>

                        <hr class="d-none d-lg-block">
                        <div class="mr-5 mr-lg-0">
                            <h5>{{ $tc('general.dorm', 2) }}</h5>
                            <ul class="filter-list">
                                <li v-for="house in houses" class="filter-list-item">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" v-model="house.checked"
                                               :id="house.name">
                                        <label class="custom-control-label" :for="house.name">{{ house.name }}</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <hr class="d-none d-lg-block">
                        <div>
                            <h5>{{ $tc('user.user', 2) }}</h5>
                            <ul class="filter-list">
                                <li v-for="filter in residentFilter" class="filter-list-item">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" v-model="filter.checked"
                                               :id="filter.name">
                                        <label class="custom-control-label" :for="filter.name">{{ $tc('user.' +
                                            filter.name,
                                            2)
                                            }}</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal-component :show="showEditUserModal" @close="showEditUserModal = false">
            <template #title>
                {{ `${selectedUser.firstname} ${selectedUser.lastname}` }}
            </template>
            <edit-user-component :houseNames="houseNames" :user="selectedUser"/>
        </modal-component>
        <modal-component :show="showContactUserModal" @close="showContactUserModal = false">
            <template #title>
                {{ $t('mail.newMail') }}
            </template>
            <new-mail-component :to="selectedUser.email"/>
        </modal-component>
    </div>
</template>

<script>
    import {TableColumn, TableComponent} from 'vue-table-component';
    import EditUserComponent from "./EditUserComponent";
    import {DataTables} from 'vue-data-tables';

    export default {
        name: "user-component",
        components: {
            EditUserComponent,
            TableComponent,
            TableColumn,
            DataTables,
        },
        data: () => ({
            houses: [],
            houses2: [],
            page: 1,
            filter: '',
            sort: '',
            showEditUserModal: false,
            showContactUserModal: false,
            selectedUser: {},
            residentFilter: [
                {name: 'main_tenant', checked: true},
                {name: 'subtenant', checked: true},
                {name: 'current_tenant', checked: true},
                {name: 'former_tenant', checked: false},
            ],
        }),
        props: {
            houseNames: {default: () => [], type: [Array]},
            users: {default: () => [], type: [Array]},
        },
        async created() {
            this.houseNames.forEach(house => {
                this.houses.push({name: house, checked: true});
                this.houses2.push({text: house, value: house});
            });
        },
        computed: {
            filters() {
                return [{prop: 'house', value: this.houses.filter(house => house.checked).map(house => house.name)}];
            }
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
            },
            contactUser(user) {
                this.selectedUser = user;
                this.showContactUserModal = true;
            },
        },
        watch: {
            showEditUserModal(value) {
                if (!value) {
                    this.selectedUser = {};
                }
            },
            showContactUserModal(value) {
                if (!value) {
                    this.selectedUser = {};
                }
            }
        }
    }
</script>

<style lang="scss">

    .filter-list {
        padding-left: 0;
    }

    .filter-list-item {
        list-style: none;
    }
</style>