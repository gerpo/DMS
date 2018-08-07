<template>
    <section id="accordion">
        <div class="card" v-for="role in currentRoles">
            <div class="card-header text-capitalize d-flex justify-content-between align-items-center"
                 data-toggle="collapse"
                 :data-target="'#' + role.name">
                <div>
                    <p class="h5 m-0">{{ role.name }}</p>
                    <p class="card-subtitle m-0">{{ role.title }}</p>
                </div>
                <span class="badge badge-primary badge-pill">{{ role.users.length }}</span>
            </div>
            <div :id="role.name" class="collapse" data-parent="#accordion">
                <div class="card-body row">
                    <ul v-if="role.users.length > 0" class="list-group col-md-6 col-xxl-4 offset-xxl-1">
                        <li v-for="user in role.users" :title="user.full_room"
                            class="list-group-item d-flex justify-content-between align-items-center">
                            <span>{{ user.firstname }} {{ user.lastname }} - {{ user.full_room }} {{ user.house }}</span>
                            <button type="button" class="close text-danger" aria-label="Retract" title="Retract"
                                    v-if="$can('manage_roles')"
                                    @click="retractRole(user, role)">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </li>
                    </ul>
                    <p v-else class="list-group-item col-md-6 col-xxl-4 offset-xxl-1">Role is not assigned to any
                        resident.</p>

                    <div class="col-md-6 col-xxl-4 offset-xxl-2" v-if="$can('manage_roles')">
                        <autocomplete :data="fetchUsers" searchAttr="lastname"
                                      button-text="assign" placeholder="Assign to..." :onButtonClick="userSelected"
                                      :additionalProps="{role}"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Autocomplete from './AutoCompleteComponent.vue';

    export default {
        name: "user-roles-component",
        components: {
            Autocomplete
        },
        props: {
            roles: {default: () => [], type: [Array]},
        },
        data: () => ({
            currentRoles: [],
            errors: {},
        }),
        mounted() {
            this.currentRoles = this.roles;
        },
        methods: {
            async retractRole(user, role) {
                return await axios.delete(route('api.user-roles.destroy', user.id), {data: {data: [role]}})
                    .then(repsonse => {
                        role.users.splice(role.users.indexOf(user), 1);
                        this.flash('Role was successfully retracted from user.', 'success')
                    })
                    .catch(error => {
                        this.flash('Role could not be retracted from user.', 'danger');
                        console.log(error);
                    });
            },
            async assignRole(user, role) {
                return await axios.post(route('api.user-roles.store', user.id), {data: [role]})
                    .then(response => {
                        role.users.push(user);
                        this.flash('Role was successfully assigned from user.', 'success')
                    })
                    .catch(error => {
                        this.flash('Role could not be assigned to user.', 'danger');
                        console.log(error);
                    });
            },
            userSelected(value) {
                const user = value.result;
                const role = value.role;
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