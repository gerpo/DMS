<template>
    <div class="container">
        <div class="card">
            <div class="card-header text-capitalize">
                <span>{{ $t('user.profile') }}</span>
            </div>
            <div class="card-body text-capitalize">
                <div class="section col-10 offset-1">
                    <div class="clearfix">
                        <h4 class="float-left">Personal Info</h4>
                        <div class="float-right" v-if="$can('manage_users', user.id)">
                            <button class="btn btn-outline-primary" @click="changeEditMode">Edit</button>
                        </div>
                    </div>
                    <div class="row py-1 form-group">
                        <div class="col-xxl-1 col-lg-2 font-weight-bold">{{ $t('user.first_name') }}</div>
                        <div class="col-md-6">{{ user.firstname }}</div>
                    </div>
                    <div class="row py-1 form-group">
                        <div class="col-xxl-1 col-lg-2 font-weight-bold">{{ $t('user.last_name') }}</div>
                        <div class="col-md-6">{{ user.lastname }}</div>
                    </div>
                    <div class="row py-1 form-group">
                        <div class="col-xxl-1 col-lg-2 font-weight-bold">{{ $t('user.email') }}</div>
                        <div class="col-md-6">{{ user.email }}</div>
                    </div>
                    <div class="row py-1 form-group">
                        <div class="col-xxl-1 col-lg-2 font-weight-bold">{{ $t('user.username') }}</div>
                        <div class="col-md-6">{{ user.username }}</div>
                    </div>
                    <div class="row py-1 form-group">
                        <div class="col-xxl-1 col-lg-2 font-weight-bold">{{ $t('user.room') }}</div>
                        <div class="col-md-auto">{{ user.full_room }}</div>
                        <div class="col-xxl-1 col-lg-2 font-weight-bold">{{ $t('user.house') }}</div>
                        <div class="col-md-auto">{{ user.house }}</div>
                    </div>
                    <div class="row py-1">
                        <div class="col-xxl-1 col-lg-2 font-weight-bold">{{ $t('user.created_at') }}</div>
                        <div class="col-md-6">{{ user.created_at | moment('calendar') }}</div>
                    </div>
                    <div class="row py-1" v-if="user.deleted_at">
                        <div class="col-xxl-1 col-lg-2 font-weight-bold">{{ $t('user.deleted_at') }}</div>
                        <div class="col-md-auto">{{ user.deleted_at | moment('calendar') }}</div>
                    </div>
                </div>
                <hr>
                <div class="section col-10 offset-1" v-if="user.roles.length > 0 || user.abilities.length > 0">
                    <h4>Roles & Abilities</h4>
                    <div class="row" v-if="user.roles.length > 0">
                        <div class="col">
                            <h5>Is</h5>
                            <ul>
                                <li v-for="role in user.roles">{{ role.title }}</li>
                            </ul>
                        </div>
                        <div class="col" v-if="user.abilities.length > 0">
                            <h5>Can</h5>
                            <ul class="text-normal">
                                <li v-for="ability in user.abilities">{{ ability.title }}</li>
                            </ul>
                        </div>
                        <div class="col" v-else-if="$is('admin')">
                            <h5>Can</h5>
                            <p class="text-normal font-weight-bold">As an administrator all functions are available.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal :show="showEditUserModal" @close="showEditUserModal = false">
            <edit-user-component :houseNames="houseNames" :user="user"/>
        </modal>
    </div>
</template>

<script>
    import EditUserComponent from './EditUserComponent.vue';

    export default {
        name: "profile-component",
        components:{
            EditUserComponent
        },
        props: {
            user: {
                default: () => {
                }, type: [Object]
            },
            houseNames: {default: () => [], type: [Array]},
        },
        data: () => ({
            showEditUserModal: false
        }),
        methods: {
            changeEditMode() {
                this.showEditUserModal = true;
            }
        }
    }
</script>

<style scoped>
    .text-normal {
        text-transform: none;
    }
</style>