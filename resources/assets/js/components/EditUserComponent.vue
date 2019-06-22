<template>
    <div>
        <div class="form-group row">

            <div class="col-md-10 offset-md-1">
                <label for="firstname">First Name</label>
                <input :class="{ 'form-control': true, 'is-invalid': errors.firstname }"
                       :placeholder="$t('user.first_name')" autofocus
                       id="firstname"
                       name="firstname" required type="text" v-model="updatedUser.firstname">


                <span class="invalid-feedback" v-if="errors.firstname">
                    <strong>{{ errors.firstname[0] }}</strong>
                </span>

            </div>
        </div>

        <div class="form-group row">

            <div class="col-md-10 offset-md-1">
                <label for="lastname">Last Name</label>
                <input :class="{ 'form-control': true, 'is-invalid': errors.lastname }"
                       :placeholder="$t('user.last_name')" autofocus
                       id="lastname"
                       name="lastname" required type="text" v-model="updatedUser.lastname">

                <span class="invalid-feedback" v-if="errors.lastname">
                    <strong>{{ errors.lastname[0] }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group row">

            <div class="col-md-2 offset-md-1">
                <label for="floor">Floor</label>
                <input :class="{ 'form-control': true, 'is-invalid': errors.floor }" :placeholder="$t('user.floor')"
                       autofocus id="floor" max="15"
                       min="0"
                       name="floor"
                       required size="2" type="number" v-model="updatedUser.floor">

                <span class="invalid-feedback" v-if="errors.floor">
                    <strong>{{ errors.floor[0] }}</strong>
                </span>
            </div>

            <div class="col-md-2">
                <label for="room">Room</label>
                <input :class="{ 'form-control': true, 'is-invalid': errors.room }" :placeholder="$t('user.room')"
                       autofocus id="room" max="16"
                       min="1"
                       name="room"
                       required size="2" type="number" v-model="updatedUser.room">

                <span class="invalid-feedback" v-if="errors.room">
                    <strong>{{ errors.room[0] }}</strong>
                </span>
            </div>

            <div class="col-md-6">
                <label for="house">House</label>
                <select :class="{ 'form-control': true, 'is-invalid': errors.house }"
                        autofocus
                        id="house"
                        name="house" required v-model="updatedUser.house">
                    <option :value="dorm" v-for="dorm in houseNames">{{ dorm }}</option>
                </select>

                <span class="invalid-feedback" v-if="errors.house">
                    <strong>{{ errors.house[0] }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group row">

            <div class="col-md-10 offset-md-1">
                <label for="username">Username</label>
                <input :class="{ 'form-control': true, 'is-invalid': errors.username }"
                       :disabled="!$can('manage_users')" :placeholder="$t('user.username')"
                       autofocus
                       id="username" name="username"
                       required type="text" v-model="updatedUser.username">

                <span class="invalid-feedback" v-if="errors.username">
                    <strong>{{ errors.username[0] }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group row">

            <div class="col-md-10 offset-md-1">
                <label for="email">Email</label>
                <input :class="{ 'form-control': true, 'is-invalid': errors.email }" :placeholder="$t('user.email')"
                       id="email"
                       name="email"
                       required type="email" v-model="updatedUser.email">

                <span class="invalid-feedback" v-if="errors.email">
                    <strong>{{ errors.email[0] }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group row mb-0">
            <div class="col-md-6 offset-md-3">
                <button @click="saveUser" class="btn btn-block btn-success text-capitalize">
                    {{ $t('general.save') }}
                    <span aria-hidden="true" class="spinner-border spinner-border-sm ml-1" role="status"
                          v-if="loading"></span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    const editUserModule = {
        mutations: {
            userUpdated(state, user) {

            }
        },
        actions: {
            userUpdated(context, user) {
                context.commit('userUpdated', user);
            }
        }
    };
    export default {
        name: "edit-user-component",
        props: {
            houseNames: {default: () => [], type: [Array]},
            user: {
                default: () => {
                }, type: [Object]
            }
        },
        data: () => ({
            errors: {},
            updatedUser: {},
            validationClass: '',
            loading: false,
        }),
        created() {
            this.$store.registerModule('editUserModule', editUserModule);
        },
        mounted() {
            this.updatedUser = this.user;
        },
        methods: {
            async saveUser() {
                this.loading = true;
                return await axios.post(route('api.users.update', this.user.id), this.updatedUser)
                    .then(response => {
                        this.flash('User updated', 'success');
                        this.$store.dispatch('userUpdated', response.data);
                    })
                    .catch(error => {
                        this.loading = false;
                        this.errors = error.response.data.errors;
                        this.flash('User was not updated. An error occurred.', 'danger');
                    });
            }
        },
        watch: {
            user(newUser) {
                this.updatedUser = Object.assign({}, newUser);
            }
        }
    }
</script>

<style scoped>

</style>