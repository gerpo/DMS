<template>
    <div>
        <div class="form-group row">

            <div class="col-md-10 offset-md-1">
                <label for="firstname">First Name</label>
                <input id="firstname" type="text" :placeholder="$t('user.first_name')"
                       :class="{ 'form-control': true, 'is-invalid': errors.firstname }"
                       name="firstname" v-model="updatedUser.firstname" required autofocus>


                <span class="invalid-feedback" v-if="errors.firstname">
                    <strong>{{ errors.firstname[0] }}</strong>
                </span>

            </div>
        </div>

        <div class="form-group row">

            <div class="col-md-10 offset-md-1">
                <label for="lastname">Last Name</label>
                <input id="lastname" type="text" :placeholder="$t('user.last_name')"
                       :class="{ 'form-control': true, 'is-invalid': errors.lastname }"
                       name="lastname" v-model="updatedUser.lastname" required autofocus>

                <span class="invalid-feedback" v-if="errors.lastname">
                    <strong>{{ errors.lastname[0] }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group row">

            <div class="col-md-2 offset-md-1">
                <label for="floor">Floor</label>
                <input id="floor" type="number" min="0" max="15" size="2"
                       :placeholder="$t('user.floor')"
                       :class="{ 'form-control': true, 'is-invalid': errors.floor }"
                       name="floor" v-model="updatedUser.floor" required autofocus>

                <span class="invalid-feedback" v-if="errors.floor">
                    <strong>{{ errors.floor[0] }}</strong>
                </span>
            </div>

            <div class="col-md-2">
                <label for="room">Room</label>
                <input id="room" type="number" min="1" max="16" size="2"
                       :placeholder="$t('user.room')"
                       :class="{ 'form-control': true, 'is-invalid': errors.room }"
                       name="room" v-model="updatedUser.room" required autofocus>

                <span class="invalid-feedback" v-if="errors.room">
                    <strong>{{ errors.room[0] }}</strong>
                </span>
            </div>

            <div class="col-md-6">
                <label for="house">House</label>
                <select id="house"
                        v-model="updatedUser.house"
                        :class="{ 'form-control': true, 'is-invalid': errors.house }"
                        name="house" required autofocus>
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
                <input id="username" type="text" :placeholder="$t('user.username')"
                       :class="{ 'form-control': true, 'is-invalid': errors.username }"
                       name="username" v-model="updatedUser.username"
                       :disabled="!$can('manage_users')" required autofocus>

                <span class="invalid-feedback" v-if="errors.username">
                    <strong>{{ errors.username[0] }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group row">

            <div class="col-md-10 offset-md-1">
                <label for="email">Email</label>
                <input id="email" type="email" :placeholder="$t('user.email')"
                       :class="{ 'form-control': true, 'is-invalid': errors.email }"
                       name="email" v-model="updatedUser.email" required>

                <span class="invalid-feedback" v-if="errors.email">
                    <strong>{{ errors.email[0] }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group row mb-0">
            <div class="col-md-6 offset-md-3">
                <button @click="saveUser" class="btn btn-block btn-success">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
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
            validationClass: ''
        }),
        methods: {
            async saveUser() {
                return await axios.post(route('api.users.update', this.user.id), this.updatedUser)
                    .then(response => {
                        this.flash('User updated', 'success');
                        this.$parent.$emit('close');
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors;
                        this.flash('User was not updated. An error occurred.', 'danger');
                    });
            }
        },
        mounted() {
            this.updatedUser = this.user;
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