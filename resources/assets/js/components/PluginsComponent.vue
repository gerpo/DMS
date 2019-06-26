<template>
    <div class="plugins">
        <div class="card">
            <div class="card-header text-capitalize">
                <span>{{ $tc('general.plugin', 2) }}</span>
            </div>
            <div class="card-body">
                <p class="lead mb-1">Manage installed plugins.</p>
                <p class="lead font-weight-bold text-danger">All changes made here could have a negative impact on the
                    functionality of the application. Make
                    changes carefully.</p>

                <table class="table table-hover">
                    <tbody>
                    <tr v-for="plugin in localPlugins">
                        <td class="align-middle content-fit">
                            <toggle @change="updatePlugin(plugin)" class="align-middle" v-model="plugin.is_active"/>
                        </td>
                        <td class="align-middle">
                            {{ plugin.name }}
                            <span class="font-weight-light"
                                  v-model="plugin.description"> - {{ plugin.description }}</span>
                        </td>
                        <td class="align-middle content-fit">
                            <button @click="confirmDeletion(plugin)" class="btn btn-outline-danger"
                                    v-if="plugin.manually_added">Delete
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <modal :show="showConfirmDeletion" @close="showConfirmDeletion = false">
            <div class="text-center">
                <p class="h4 my-3">Are you sure you want to delete the plugin
                    <strong class="text-capitalize">{{ pluginToDelete.name }}</strong>?
                </p>
                <p class="text-danger">Beware that deleting a plugin can break the functionality of the system. Delete
                    with caution.</p>
                <button @click="deletePlugin(pluginToDelete)" class="btn btn-lg btn-link">Yes!</button>
                <button @click="showConfirmDeletion = false" class="btn btn-lg btn-link text-secondary">Cancel</button>
            </div>
        </modal>
    </div>
</template>

<script>
    import modal from './ModalComponent.vue';
    import toggle from './ToggleComponent.vue';

    export default {
        name: "plugins-component",
        components: {
            modal,
            toggle,
        },
        props: {
            plugins: {default: () => [], type: [Array]}
        },
        data: () => ({
            localPlugins: [],
            showConfirmDeletion: false,
            pluginToDelete: {}
        }),
        mounted() {
            this.localPlugins = this.plugins;
        },
        methods: {
            async updatePlugin(plugin) {
                const status = plugin.is_active ? 'activated' : 'deactivated';

                await axios.patch(route('api.plugins.update', plugin.id), plugin)
                    .then(response => {
                        this.$notify({text: `Plugin "${plugin.name}" was successfully ${status}.`, type: 'success'});
                    })
                    .catch(error => {
                        this.$notify({text: `Plugin "${plugin.name}" could not be ${status}.`, type: 'error'});
                        plugin.is_active = !plugin.is_active;
                    });
            },
            async deletePlugin() {
                await axios.delete(route('api.plugins.update', plugin.id))
                    .then(response => {
                        this.$notify({text: `Plugin "${plugin.name}" was successfully deleted.`, type: 'success'});
                    })
                    .catch(error => {
                        this.$notify({text: `Plugin "${plugin.name}" could not be deleted.`, type: 'error'});
                    })
            },
            confirmDeletion(plugin) {
                this.pluginToDelete = plugin;
                this.showConfirmDeletion = true;
            }
        },
        watch: {
            plugins(value) {
                this.localPlugins = value;
            }
        }
    }
</script>

<style scoped>

</style>