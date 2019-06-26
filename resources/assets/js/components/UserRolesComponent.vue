<template>
    <section id="accordion">
        <div class="card" v-for="role in currentRoles">
            <div :data-target="'#' + role.name"
                 class="card-header text-capitalize d-flex justify-content-between align-items-center"
                 data-toggle="collapse">
                <div>
                    <p class="h5 m-0">{{ role.name }}</p>
                    <p class="card-subtitle m-0">{{ role.title }}</p>
                </div>
                <span class="badge badge-primary badge-pill">{{ role.users.length }}</span>
            </div>
            <div :id="role.name" class="collapse" data-parent="#accordion">
                <div class="card-body row">
                    <list-pagination-component :data="role.users" :key="role.id" searchAttr="full_name"
                                               v-if="role.users.length > 0">
                        <template slot-scope="{item, search_query}">
                            <li :title="item.full_room"
                                class="list-group-item d-flex justify-content-between align-items-center">
                                <span><span v-html="$options.filters.highlight(item.full_name, search_query)"></span> - {{ item.full_room }} {{ item.house }} </span>
                                <button @click="retractRole(item, role)" aria-label="Retract" class="close text-danger"
                                        title="Retract"
                                        type="button"
                                        v-if="$can('manage_roles')">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </li>
                        </template>
                    </list-pagination-component>
                    <p class="list-group-item col-md-6 col-xxl-4 offset-xxl-1" v-else>Role is not assigned to any
                        resident.</p>

                    <div class="col-md-6 col-xxl-4 offset-xxl-2" v-if="$can('manage_roles')">
                        <autocomplete :additionalProps="{role}" :data="fetchUsers"
                                      :onButtonClick="userSelected" button-text="assign" placeholder="Assign to..."
                                      searchAttr="full_name">
                            <template slot-scope="{suggestion, search_query}">
                                <span v-html="$options.filters.highlight(suggestion.full_name, search_query)"></span>
                            </template>
                        </autocomplete>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Autocomplete from './AutoCompleteComponent.vue';
    import ListPaginationComponent from "./ListPaginationComponent";

    export default {
        name: "user-roles-component",
        components: {
            ListPaginationComponent,
            Autocomplete
        },
        props: {
            roles: {default: () => [], type: [Array]},
        },
        data: () => ({
            currentRoles: [],
            errors: {},
        }),
        async mounted() {
            this.currentRoles = this.roles;
        },
        methods: {
            async retractRole(user, role) {
                return await axios.delete(route('api.user-roles.destroy', user.id), {data: {data: [role]}})
                    .then(repsonse => {
                        role.users.splice(role.users.indexOf(user), 1);
                        this.$notify({test: 'Role was successfully retracted from user.', type: 'success'})
                    })
                    .catch(error => {
                        this.$notify({test: 'Role could not be retracted from user.', type: 'error'});
                        console.log(error);
                    });
            },
            async assignRole(user, role) {
                return await axios.post(route('api.user-roles.store', user.id), {data: [role]})
                    .then(response => {
                        role.users.push(user);
                        this.$notify({test: 'Role was successfully assigned to user.', type: 'success'})
                    })
                    .catch(error => {
                        this.$notify({test: 'Role could not be assigned to user.', type: 'error'});
                        console.log(error);
                    });
            },
            userSelected(value) {
                const user = value.result;
                const role = value.role;

                if (role.users.some(role_user => role_user.id === user.id)) {
                    this.$notify('User has Role already.');
                    return
                }

                this.assignRole(user, role);
            },
            async fetchUsers(input) {
                return await axios.get(route('api.users'), {params: input})
                    .then(response => ({
                        data: response.data.data
                    }));
            }
        }
    }
</script>

<style scoped>

    .card-header {
        cursor: pointer;
    }

</style>