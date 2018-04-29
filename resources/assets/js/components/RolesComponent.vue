<template>
    <div class="container">
        <div class="card">
            <div class="card-header text-capitalize">
                <span>{{ $tc('general.role', 2) }}</span>
            </div>
            <div class="card-body">
                <p class="lead" v-if="$can('manage_roles')">Create and manage roles for residents.</p>
                <p class="lead" v-else>A overview of all assigned roles.</p>

                <user-roles-component :roles="roles" class="mb-4" />
                <role-abilities-component :roles="roles" :abilities="abilities" v-if="$can('manage_roles')"/>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "roles-component",
        props: {
            roles: {default: () => [], type: [Array]},
            abilities: {default: () => [], type: [Array]},
        },
        data: () => ({
        }),
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped>
</style>