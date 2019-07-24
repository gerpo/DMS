<template>
    <div class="active-notifications">
        <p class="lead mb-1">Current Notifications</p>
        <div :class="{'alert-success': notification.published_at, 'alert-warning': !notification.published_at}"
             class="notification alert"
             v-for="notification in activeNotifications">
            <div class="d-flex justify-content-between">
                <p class="alert-heading lead mb-0">
                    {{ notification.title }}
                </p>
                <div class="btn-group">
                    <button @click="publish(notification)" class="btn btn-sm btn-outline-primary"
                            v-if="!notification.is_active">Publish
                    </button>
                    <button @click="deleteNotification(notification)" class="btn btn-sm btn-outline-danger">Delete</button>
                </div>
            </div>
            <footer class="blockquote-footer">
                Created by
                <a :href="route('users.show', notification.creator.username)">
                    {{ notification.creator.full_name }}</a><span class="text-lowercase"
                                                                  v-if="notification.published_at">, Published {{ notification.published_at | moment('calendar') }}</span>
            </footer>
            <p v-html="$markdown(notification.message)"></p>
        </div>
    </div>
</template>

<script>

    export default {
        name: "ManageNotificationsComponent",
        components: {},
        props: {
            notifications: {default: () => [], type: [Array]},
        },
        data: () => ({
            activeNotifications: []
        }),
        mounted() {
            this.activeNotifications = this.notifications;
        },
        methods: {
            async publish(notification) {
                return await axios.patch(route('notifications.update', notification.id), {is_active: true})
                    .then(reponse => {
                        let old = this.activeNotifications.find(item => item.id === notification.id);
                        old = Object.assign(old, reponse.data);

                        this.$notify({text: `Notification "${notification.title}" was successfully published.`, type: 'success'});
                    })

            },
            async deleteNotification(notification) {
                return await axios.delete(route('notifications.destroy', notification.id))
                    .then(response => {
                        const index = this.activeNotifications.findIndex(item => item.id === notification.id);
                        this.activeNotifications.splice(index,1)

                        this.$notify({text: `Notification "${notification.title}" was successfully deleted.`, type: 'success'});
                    })

            }
        }
    }
</script>

<style scoped>

</style>