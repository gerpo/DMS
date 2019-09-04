<template>
    <div>
        <section class="table-responsive">
            <table class="table table-hover">
                <thead class="text-center">
                <tr>
                    <th></th>
                    <th :id="`header_${ability.name}`" class="text-capitalize" scope="col" v-for="ability in abilities">
                        {{ ability.name | transform-role }}
                        <b-tooltip :target="`header_${ability.name}`">{{ ability.title }}</b-tooltip>
                    </th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="role in currentRoles">
                    <th :id="`header_${role.name}`" class="text-capitalize pl-4" scope="row">
                        {{ role.name }}
                        <b-tooltip :target="`header_${role.name}`">{{ role.title }}</b-tooltip>
                    </th>

                    <td class="text-center" v-for="ability in abilities">
                        <div class="custom-control custom-checkbox d-inline">
                            <input :checked="role.abilities.some(ab => ab.name === ability.name) || role.name === 'admin'"
                                   :data-ability="ability.name"
                                   :data-role="role.name"
                                   :disabled="role.name === 'admin'" :id="role.name+'-'+ability.name"
                                   :ref="role.name"
                                   class="custom-control-input"
                                   type="checkbox">
                            <label :for="role.name+'-'+ability.name"
                                   class="custom-control-label">&zwnj;</label>
                        </div>
                    </td>

                    <td>
                        <button @click="updateRole(role)" class="text-capitalize btn btn-sm btn-outline-primary"
                                type="button">Update
                        </button>
                    </td>
                    <td>
                        <button @click="confirmDeletion(role)" class="text-capitalize btn btn-sm btn-outline-danger"
                                type="button">Delete
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>
        <section class="form-group row my-3">
            <div class="col-md-3 offset-md-1 pb-2">
                <input class="form-control" placeholder="New Role Name.." type="text"
                       v-model="newRole.name">
            </div>

            <div class="col-md-5 pb-2">
                <input class="form-control" placeholder="New role Description.." type="text"
                       v-model="newRole.title">
            </div>

            <div class="col-md-2">
                <button @click="addRole" class="btn btn-block btn-outline-info text-capitalize" type="submit">
                    Add
                </button>
            </div>
        </section>
        <modal-component :show="showConfirmDeletion" @close="showConfirmDeletion = false">
            <div class="text-center">
                <p class="h4 my-3">Are you sure you want to delete the role
                    <strong class="text-capitalize">{{ roleToDelete.name }}</strong>?
                </p>
                <button @click="deleteRole(roleToDelete)" class="btn btn-lg btn-link">Yes!</button>
                <button @click="showConfirmDeletion = false" class="btn btn-lg btn-link text-secondary">Cancel</button>
            </div>
        </modal-component>
    </div>
</template>

<script>
    import {BTooltip} from 'bootstrap-vue'

    export default {
        name: "role-abilities-component",
        components: {
            BTooltip
        },
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
        },
        methods: {
            async addRole() {
                return await axios.post(route('api.roles.store'), this.newRole)
                    .then(response => {
                        this.$notify({text: 'Role was successfully added.', type: 'success'});
                        this.currentRoles.push(Object.assign({}, this.newRole, response.data));
                        this.currentRoles.sort();

                        this.newRole.name = '';
                        this.newRole.title = '';
                    })
                    .catch(error => {
                        console.log(error);
                        this.errors = error.response.data.errors;
                        this.$notify({text: 'Role was not created. An error occurred.', type: 'error'});
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
                        this.$notify({text: 'Role was updated.', type: 'success'});
                    })
                    .catch(error => {
                        this.$notify({text: 'Role was not updated. An error occurred.', type: 'error'});
                    })
            },
            async deleteRole(role) {

                return await axios.delete(route('api.roles.destroy', role.id))
                    .then(response => {
                        this.showConfirmDeletion = false;
                        this.roleToDelete = {};
                        this.$notify({text: 'Role was deleted successfully.', type: 'success'});

                        this.currentRoles.splice(this.currentRoles.indexOf(role), 1);
                    })
                    .catch(error => {
                        console.log(error);
                        this.$notify({text: 'Role was not deleted. An error occurred.', type: 'error'});
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