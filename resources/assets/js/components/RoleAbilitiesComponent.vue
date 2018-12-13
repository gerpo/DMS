<template>
    <div>
        <section class="table-responsive">
            <table class="table table-hover">
                <thead class="text-center">
                <th></th>
                <th v-for="ability in abilities" scope="col" data-toggle="tooltip" data-placement="auto"
                    :title="ability.title">
                    {{ ability.name }}
                </th>
                <th></th>
                <th></th>
                </thead>
                <tbody>
                <tr v-for="role in currentRoles">
                    <th class="text-capitalize pl-4" scope="row" data-toggle="tooltip" data-placement="auto"
                        :title="role.title">
                        {{ role.name }}
                    </th>

                    <td class="text-center" v-for="ability in abilities">
                        <div class="custom-control custom-checkbox d-inline">
                            <input type="checkbox" class="custom-control-input"
                                   :data-role="role.name"
                                   :data-ability="ability.name" :ref="role.name"
                                   :id="role.name+'-'+ability.name"
                                   :checked="role.abilities.some(ab => ab.name === ability.name) || role.name === 'admin'"
                                   :disabled="role.name === 'admin'">
                            <label class="custom-control-label"
                                   :for="role.name+'-'+ability.name">&zwnj;</label>
                        </div>
                    </td>

                    <td>
                        <button type="button" class="text-capitalize btn btn-sm btn-outline-primary"
                                @click="updateRole(role)">Update
                        </button>
                    </td>
                    <td>
                        <button type="button" class="text-capitalize btn btn-sm btn-outline-danger"
                                @click="confirmDeletion(role)">Delete
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>
        <section class="form-group row my-3">
            <div class="col-md-3 offset-md-1 pb-2">
                <input type="text" class="form-control text-capitalize" placeholder="New Role Name.."
                       v-model="newRole.name">
            </div>

            <div class="col-md-5 pb-2">
                <input type="text" class="form-control text-capitalize" placeholder="New role Description.."
                       v-model="newRole.title">
            </div>

            <div class="col-md-2">
                <button type="submit" @click="addRole" class="btn btn-block btn-outline-info text-capitalize">
                    Add
                </button>
            </div>
        </section>
        <modal :show="showConfirmDeletion" @close="showConfirmDeletion = false">
            <div class="text-center">
                <p class="h4 my-3">Are you sure you want to delete the role
                    <strong class="text-capitalize">{{ roleToDelete.name }}</strong>?
                </p>
                <button @click="deleteRole(roleToDelete)" class="btn btn-lg btn-link">Yes!</button>
                <button @click="showConfirmDeletion = false" class="btn btn-lg btn-link text-secondary">Cancel</button>
            </div>
        </modal>
    </div>
</template>

<script>
    export default {
        name: "role-abilities-component",
        props: {
            roles: {default: () => [], type: [Array]},
            abilities: {default: () => [], type: [Array]},
        },
        data: () => ({
            currentRoles: [],
            newRole: {
                name: '',
                title: '',
                abilities: [],
                users: []
            },
            errors: {},
            showConfirmDeletion: false,
            roleToDelete: {}
        }),
        mounted() {
            this.currentRoles = this.roles;
            $('[data-toggle="tooltip"]').tooltip();
        },
        methods: {
            async addRole() {
                return await axios.post(route('api.roles.store'), this.newRole)
                    .then(response => {
                        this.flash('Role was successfully added.', 'success');
                        this.currentRoles.push(Object.assign({}, this.newRole, response.data));
                        this.currentRoles.sort();

                        this.newRole.name = '';
                        this.newRole.title = '';
                    })
                    .catch(error => {
                        console.log(error);
                        this.errors = error.response.data.errors;
                        this.flash('Role was not created. An error occurred.', 'danger');
                    })
            },
            async updateRole(role) {
                let abilities = this.$refs[role.name].map(el => {
                    let data = {};
                    data['name'] = el.dataset.ability;
                    data['checked'] = el.checked;
                    return data;
                });
                let checkedAbilities = {
                    data: abilities.filter(ab => ab.checked)
                };
                let uncheckedAbilities = {
                    data: abilities.filter(ab => !ab.checked)
                };
                let requests = [];

                if (checkedAbilities.data.length > 0) requests.push(axios.post(route('api.role-abilities.store', role.id), checkedAbilities));
                if (uncheckedAbilities.data.length > 0) requests.push(axios.delete(route('api.role-abilities.destroy', role.id), {data: uncheckedAbilities}));

                return await axios.all(requests)
                    .then(response => {
                        this.flash('Role was updated.', 'success');
                    })
                    .catch(error => {
                        this.flash('Role was not updated. An error occurred.', 'danger');
                    })
            },
            async deleteRole(role) {

                return await axios.delete(route('api.roles.destroy', role.id))
                    .then(response => {
                        this.showConfirmDeletion = false;
                        this.roleToDelete = {};
                        this.flash('Role was deleted successfully.', 'success');

                        this.currentRoles.splice(this.currentRoles.indexOf(role), 1);
                    })
                    .catch(error => {
                        console.log(error);
                        this.flash('Role was not deleted. An error occurred.', 'danger');
                    })
            },
            confirmDeletion(role) {
                this.roleToDelete = role;
                this.showConfirmDeletion = true;
            }
        }
    }
</script>

<style scoped>

</style>