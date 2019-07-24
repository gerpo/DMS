<template>
    <div class="card">
        <div class="card-header text-capitalize">{{ $tc('user.user', 2) }}</div>
        <div class="card-body row">

            <div class="col-12 col-lg-10 table-responsive">
                <table-component :data="users" :loading="isLoading" :search-function="searchFunction"
                                 sort-by="lastname">
                    <template #columns>
                        <th class="align-middle"></th>
                        <th class="align-middle">{{$t('user.last_name') }}</th>
                        <th class="align-middle">{{ $t('user.first_name') }}</th>
                        <th class="align-middle">{{ $t('user.username') }}</th>
                        <th class="align-middle">{{ $t('user.email') }}</th>
                        <th class="align-middle">{{ $t('user.room') }}</th>
                        <th class="align-middle">{{ $t('user.house') }}</th>
                        <th class="align-middle">{{ $t('user.confirmed') }}</th>
                        <th class="align-middle"></th>
                        <th class="align-middle"></th>
                    </template>
                    <template slot-scope="{row, index}">
                        <td class="align-middle">
                            <a :href="route('users.show', row.username)" class="btn btn-link text-capitalize px-0">
                                <img src="/images/icons/info.svg" :title="$t('user.show_profile')" alt="user profile" style="width: 16px">
                            </a>
                        </td>
                        <td class="align-middle">{{ row.lastname }}</td>
                        <td class="align-middle">{{ row.firstname }}</td>
                        <td class="align-middle">{{ row.username }}</td>
                        <td class="align-middle">{{ row.email }}</td>
                        <td class="align-middle">{{ row.full_room }}</td>
                        <td class="align-middle">{{ row.house }}</td>
                        <td class="align-middle text-center">
                            <div class="custom-control custom-checkbox">
                                <input :id="`confirmed_${index}`" class="custom-control-input" disabled
                                       type="checkbox" v-model="row.confirmed">
                                <label :for="`confirmed_${index}`" class="custom-control-label"></label>
                            </div>
                        </td>
                        <td class="align-middle">
                            <button @click="editUser(row)" class="btn btn-link text-capitalize">Edit</button>
                        </td>
                        <td class="align-middle">
                            <button @click="contactUser(row)" class="btn btn-link text-capitalize">{{
                                $t('general.contact') }}
                            </button>
                        </td>
                    </template>
                </table-component>
            </div>

            <div class="sidebar col-12 col-lg-2 order-first order-lg-2 text-capitalize">
                <button aria-controls="filterCollapse" aria-expanded="false" class="btn btn-outline-primary d-lg-none"
                        data-target="#filters" data-toggle="collapse" type="button">
                    {{ $tc('general.filter', 2) | capitalize }}
                </button>
                <div class="collapse d-lg-block" id="filters">
                    <div class="d-flex d-lg-block justify-content-start">
                        <h4 class="d-none d-lg-block">{{ $tc('general.filter', 2) }}</h4>

                        <hr class="d-none d-lg-block">
                        <div class="mr-5 mr-lg-0">
                            <h5>{{ $tc('general.dorm', 2) }}</h5>
                            <ul class="filter-list">
                                <li class="filter-list-item" v-for="house in houses">
                                    <div class="custom-control custom-checkbox">
                                        <input :id="house.name" @change="filterChanged" class="custom-control-input"
                                               type="checkbox" v-model="house.checked">
                                        <label :for="house.name" class="custom-control-label">{{ house.name }}</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <hr class="d-none d-lg-block">
                        <div>
                            <h5>{{ $tc('user.user', 2) }}</h5>
                            <ul class="filter-list">
                                <li class="filter-list-item" v-for="filter in residentFilter">
                                    <div class="custom-control custom-checkbox">
                                        <input :id="filter.name" @change="fetchUsers" class="custom-control-input"
                                               type="checkbox" v-model="filter.checked">
                                        <label :for="filter.name" class="custom-control-label">{{ $tc('user.' +
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
        <modal-component :show="showEditUserModal" @close="$store.dispatch('hideEditUserModal')">
            <template #title>
                {{ `${selectedUser.firstname} ${selectedUser.lastname}` }}
            </template>
            <edit-user-component :houseNames="houseNames" :user="selectedUser"/>
        </modal-component>
        <modal-component :show="showContactUserModal" @close="$store.dispatch('hideContactUserModal')">
            <template #title>
                {{ $t('mail.newMail') }}
            </template>
            <new-mail-component :to="selectedUser.email"></new-mail-component>
        </modal-component>
    </div>
</template>

<script>
    import TableComponent from './TableComponent';
    import EditUserComponent from './EditUserComponent';
    import {mapState} from 'vuex';

    const userStore = {
        state: {
            users: [],
            showEditUserModal: false,
            showContactUserModal: false,
            selectedUser: {}
        },
        mutations: {
            addUserData(state, userData) {
                state.users = userData;
            },
            filterUserData(state, filteredUsers) {
                state.users = filteredUsers;
            },
            showEditUserModal(state) {
                state.showEditUserModal = true;
            },
            hideEditUserModal(state) {
                state.showEditUserModal = false;
            },
            showContactUserModal(state) {
                state.showContactUserModal = true;
            },
            hideContactUserModal(state) {
                state.showContactUserModal = false;
            },
            userUpdated(state, user) {
                const index = state.users.findIndex(item => item.id === user.id);
                state.users.splice(index, 1, user);
            },
            selectUser(state, user) {
                state.selectedUser = user;
            }
        },
        actions: {
            addUserData(context, userData) {
                context.commit('addUserData', userData);
            },
            filterUserData(context, filteredUsers) {
                context.commit('filterUserData', filteredUsers)
            },
            showEditUserModal(context) {
                context.commit('showEditUserModal');
            },
            hideEditUserModal(context) {
                context.commit('hideEditUserModal');
            },
            showContactUserModal(context) {
                context.commit('showContactUserModal');
            },
            hideContactUserModal(context) {
                context.commit('hideContactUserModal');
            },
            userUpdated(context, user) {
                context.commit('userUpdated', user);
                context.commit('hideEditUserModal');
            },
            selectUser(context, user) {
                context.commit('selectUser', user);
            }
        },
    };

    export default {
        name: "user-component",
        components: {
            EditUserComponent,
            TableComponent,
        },
        props: {
            houseNames: {default: () => [], type: [Array]},
            usersData: {default: () => [], type: [Array]},
        },
        data: () => ({
            houses: [],
            displayedUsers: [],
            page: 1,
            filter: '',
            sort: '',
            residentFilter: [
                {name: 'main_tenant', checked: true},
                {name: 'subtenant', checked: true},
                {name: 'active_tenant', checked: true},
                {name: 'inactive_tenant', checked: false},
            ],
            isLoading: false,
        }),
        beforeCreate() {
            this.$store.registerModule('userModule', userStore);
        },
        async created() {
            await this.$store.dispatch('addUserData', this.usersData);
            this.houseNames.forEach(house => {
                this.houses.push({name: house, checked: true});
            });
        },
        computed: {
            ...mapState({
                users: state => state.userModule.users,
                selectedUser: state => state.userModule.selectedUser,
                showEditUserModal: state => state.userModule.showEditUserModal,
                showContactUserModal: state => state.userModule.showContactUserModal,
            }),

            filters() {
                return [{prop: 'house', value: this.houses.filter(house => house.checked).map(house => house.name)}];
            }
        },
        methods: {
            async fetchUsers() {

                const residentFilter = JSON.stringify(this.residentFilter.filter(filter => filter.checked).map(filter => filter['name']));
                this.isLoading = true;
                await axios.get(route('api.users'), {params: {residentFilter}})
                    .then(response => {
                        this.isLoading = false;
                        this.$store.dispatch('addUserData', response.data.data);
                    })
            },
            filterChanged() {
                this.$store.dispatch('filterUserData', this.usersData.filter(user => this.houses.some(house => house.checked && user.house === house.name)));
            },
            searchFunction(user, searchQuery) {
                return user.lastname.toLowerCase().includes(searchQuery.toLowerCase())
                    || user.firstname.toLowerCase().includes(searchQuery.toLowerCase())
                    || user.email.toLowerCase().includes(searchQuery.toLowerCase())
                    || user.username.toLowerCase().includes(searchQuery.toLowerCase())
                    || user.full_room.toLowerCase().includes(searchQuery.toLowerCase());
            },
            editUser(user) {
                this.$store.dispatch('selectUser', user);
                this.$store.dispatch('showEditUserModal');
            },
            contactUser(user) {
                this.$store.dispatch('selectUser', user);
                this.$store.dispatch('showContactUserModal');
            },
        },
        watch: {
            showEditUserModal(value) {
                if (!value) {
                    this.$store.dispatch('selectUser', {});
                }
            },
            showContactUserModal(value) {
                if (!value) {
                    this.$store.dispatch('selectUser', {});
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