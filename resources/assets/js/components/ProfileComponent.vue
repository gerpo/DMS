<template>
    <div class="container">
        <div class="card">
            <div class="card-header text-capitalize">
                <span>{{ $t('user.profile') }}</span>
            </div>
            <div class="card-body">
                <div class="section col-12 col-md-10 offset-md-1 text-capitalize">
                    <div class="clearfix">
                        <h4 class="float-left">Personal Info</h4>
                        <div class="float-right" v-if="$can('manage_users')">
                            <button @click="changeEditMode" class="btn btn-outline-primary">Edit</button>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-12 font-weight-light">{{ $t('user.first_name') }}</div>
                        <div class="col-12">{{ user.firstname }}</div>
                    </div>
                    <div class="row form-group">
                        <div class="col-12 font-weight-light">{{ $t('user.last_name') }}</div>
                        <div class="col-12">{{ user.lastname }}</div>
                    </div>
                    <div class="row mb-0 form-group">
                        <div class="col-6 font-weight-light">{{ $t('user.room') }}</div>
                        <div class="col-auto font-weight-light">{{ $t('user.house') }}</div>
                    </div>
                    <div class="row form-group">
                        <div class="col-6">{{ user.full_room }}</div>
                        <div class="col-auto">{{ user.house }}</div>
                    </div>
                    <div class="row form-group">
                        <div class="col-12 col-lg-2 font-weight-light">{{ $t('user.username') }}</div>
                        <div class="col-12">{{ user.username }}</div>
                    </div>
                    <div class="row form-group">
                        <div class="col-12 font-weight-light">{{ $t('user.email') }}</div>
                        <div class="col-12">{{ user.email }}</div>
                    </div>
                    <div class="row">
                        <div class="col-12 font-weight-light">{{ $t('user.created_at') }}</div>
                        <div class="col-12">{{ user.created_at | moment('calendar') }}</div>
                    </div>
                    <div class="row" v-if="user.deleted_at">
                        <div class="col-12 font-weight-light">{{ $t('user.deleted_at') }}</div>
                        <div class="col-12">{{ user.deleted_at | moment('calendar') }}</div>
                    </div>
                </div>
                <div class="section col-12 col-md-10 offset-md-1"
                     v-if="user.roles.length > 0 || user.abilities.length > 0">
                    <hr>
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
                        <div class="col" v-else-if="user.roles.includes('admin')">
                            <h5>Can</h5>
                            <p class="text-normal font-weight-bold">As an administrator all functions are available.</p>
                        </div>
                    </div>
                </div>
                <div class="section col-12 col-md-10 offset-md-1" v-if="$isAuthedUser(user.id)">
                    <hr>
                    <h4>Change Password</h4>
                    <div class="row form-group">
                        <div class="col-12 col-md-6 mb-2 mb-md-0">
                            <input :class="{'is-invalid': validationErrors.has('new-password')}"
                                   :data-original-title="validationErrors.first('new-password')"
                                   :placeholder="$t('general.password') | capitalize"
                                   class="form-control"
                                   data-toggle="tooltip" id="new-password"
                                   name="new-password" type="password" v-model="newPassword"
                                   v-validate="'min:6|confirmed:new-password_confirmation'">
                        </div>
                        <div class="col-12 col-md-6">
                            <input :placeholder="$t('general.password_confirm') | capitalize" class="form-control"
                                   id="new-password_confirmation"
                                   name="new-password_confirmation" ref="new-password_confirmation"
                                   type="password" v-model="newPasswordConfirm">
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-auto">
                            <button @click="changePassword" class="btn btn-success btn-block text-capitalize">
                                {{ $t('general.change_password') }}
                                <span aria-hidden="true" class="spinner-border spinner-border-sm ml-1" role="status"
                                      v-if="processingPassword"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="section col-12 col-md-10 offset-md-1" v-if="$isAuthedUser(user.id)">
                    <hr>
                    <h4>Change Email</h4>
                    <p>Once the email is changed you will need to confirm the new email.</p>
                    <div class="row form-group">
                        <div class="col-12 col-md-6 mb-2 mb-md-0">
                            <input :class="{'is-invalid': validationErrors.has('new-email')}"
                                   :data-original-title="validationErrors.first('new-email')"
                                   :placeholder="$t('general.email') | capitalize"
                                   class="form-control"
                                   data-toggle="tooltip" id="new-email"
                                   name="new-email" type="text" v-model="newEmail"
                                   v-validate="'email|confirmed:new-email_confirmation'">
                        </div>
                        <div class="col-12 col-md-6">
                            <input :placeholder="$t('general.email_confirm') | capitalize" class="form-control"
                                   id="new-email_confirmation"
                                   name="new-email_confirmation" ref="new-email_confirmation"
                                   type="email" v-model="newEmailConfirm">
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-auto">
                            <button @click="changeEmail" class="btn btn-success btn-block text-capitalize">
                                {{ $t('general.change_email') }}
                                <span aria-hidden="true" class="spinner-border spinner-border-sm ml-1" role="status"
                                      v-if="processingEmail"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal-component :show="showEditUserModal" @close="showEditUserModal = false">
            <edit-user-component :houseNames="houseNames" :user="user"/>
        </modal-component>
    </div>
</template>

<script>
    import EditUserComponent from './EditUserComponent.vue';

    export default {
        name: "profile-component",
        components: {
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
            showEditUserModal: false,
            newPassword: '',
            newPasswordConfirm: '',
            processingPassword: false,
            newEmail: '',
            newEmailConfirm: '',
            processingEmail: false,
            errors: []
        }),
        mounted() {
            $('[data-toggle="tooltip"]').tooltip();
        },
        methods: {
            changeEditMode() {
                this.showEditUserModal = true;
            },
            async changePassword() {
                const payload = {
                    'new-password': this.newPassword,
                    'new-password_confirmation': this.newPasswordConfirm,
                };

                this.processingPassword = true;
                await axios.post(route('api.user.password', this.user.id), payload)
                    .then(reponse => {
                        this.processingPassword = false;
                        this.flash('Password successfully changed.')
                    })
                    .catch(error => {
                        this.processingPassword = false;
                        this.errors = error.response.data.errors;
                        this.flash('Password was not updated. An error occurred.', 'danger');
                    });
            },
            async changeEmail() {
                const payload = {
                    'new-email': this.newPassword,
                    'new-email_confirmation': this.newPasswordConfirm,
                };

                this.processingPassword = true;
                await axios.post(route('api.user.email', this.user.id), payload)
                    .then(reponse => {
                        this.processingEmail = false;
                        this.flash('Password successfully changed.')
                    })
                    .catch(error => {
                        this.processingEmail = false;
                        this.errors = error.response.data.errors;
                        this.flash('Password was not updated. An error occurred.', 'danger');
                    });
            }
        }
    }
</script>

<style scoped>
    .text-normal {
        text-transform: none;
    }
</style>