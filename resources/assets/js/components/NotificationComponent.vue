<template>
    <div class="card">
        <div class="card-header text-capitalize">
            <span>Notifications</span>
        </div>
        <div class="card-body">
            <manage-notifications-component :notifications="allNotifications"
                                            v-if="allNotifications.length > 0"></manage-notifications-component>
            <hr v-if="allNotifications.length > 0">
            <p class="lead">Create New Notification</p>
            <div class="form-group">
                <label class="sr-only" for="title">Title</label>
                <input class="form-control mb-2" id="title" placeholder="Title" type="text"
                       v-model="newNotification.title">
                <label class="sr-only" for="message"></label>
                <textarea :class="{'is-invalid': validationErrors.has('message')}" class="form-control" cols="30"
                          id="message" name="message"
                          placeholder="Notification Message" rows="10" v-model="newNotification.message"
                          v-validate="'required'"></textarea>
                <b-tooltip target="message" v-if="validationErrors.has('message')">
                    {{ validationErrors.first('message') }}
                </b-tooltip>

            </div>
            <div class="form-group d-flex align-content-center">
                <button @click="createNotification" class="btn btn-primary">
                    {{ (newNotification.is_active) ? $t('notification.publish') : $t('notification.save') }}
                </button>
                <div class="custom-control custom-checkbox ml-2 align-self-center">
                    <input checked class="custom-control-input" id="isActive" type="checkbox"
                           v-model="newNotification.is_active">
                    <label class="custom-control-label" for="isActive">{{ $t('notification.publish_active') }}</label>
                </div>
                <div class="custom-control custom-checkbox ml-2 align-self-center">
                    <input :disabled="!newNotification.is_active" checked class="custom-control-input" id="sendMail"
                           type="checkbox" v-model="newNotification.send_mail">
                    <label class="custom-control-label" for="sendMail">{{ $t('notification.send_mail') }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ManageNotificationsComponent from "./ManageNotificationsComponent";
    import {BTooltip} from 'bootstrap-vue'

    export default {
        name: "notification-component",
        components: {
            ManageNotificationsComponent,
            BTooltip,
        },
        props: {
            activeNotifications: {default: () => [], type: [Array]},
        },
        data: () => ({
            newNotification: {
                title: '',
                message: '',
                is_active: false,
                send_mail: false,
            },
            allNotifications: [],
        }),
        created() {
            this.allNotifications = this.activeNotifications;
        },
        methods: {
            async createNotification() {
                await this.$validator.validate();
                if (this.validationErrors.any()) return;

                return await axios.post(route('notifications.store'), this.newNotification)
                    .then(response => {
                        this.allNotifications.push(response.data);
                        this.$notify({
                            text: `Notification "${this.newNotification.title}" was successfully added.`,
                            type: 'success'
                        });
                    })
                    .catch(error => {
                        this.$notify({
                            text: `Unfortunately an error occurred. Please, try again later.`,
                            type: 'error'
                        });
                    })
            }
        },
        watch: {
            'newNotification.is_active': function (value) {
                if (!value) {
                    this.newNotification.send_mail = value;
                }
            }
        }
    }
</script>

<style scoped>

</style>