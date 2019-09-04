<template>
    <div class="notification-wrapper">
        <b-alert @dismissed="dismiss(notification)" class="notification_container mx-3" dismissible fade show
                 v-for="notification in activeNotifications" variant="warning" :key="`notification_${notification.id}`">
            <p class="lead alert-heading mb-2"><strong>{{ notification.title }}</strong></p>
            <p v-html="$markdown(notification.message)"></p>
        </b-alert>
    </div>
</template>

<script>
    import {BAlert} from 'bootstrap-vue'

    export default {
        name: "ShowNotificationsComponent",
        components: {
            BAlert,
        },
        props: {
            notifications: {default: () => [], type: [Array]},
        },
        data: () => ({
            activeNotifications: [],
            dismissed: [],
        }),
        mounted() {
            this.getDismissed();
            this.activeNotifications = this.filteredNotifications();
        },
        methods: {
            filteredNotifications() {
                return this.notifications.filter(item => {
                    return !this.dismissed.includes(item.id);
                })
            },
            dismiss(notification) {
                this.dismissed.push(notification.id);
            },
            getDismissed() {
                const allDismissed = JSON.parse(localStorage.getItem("dismissedAlerts")) || [];
                this.dismissed = allDismissed.filter(item => {
                    return this.notifications.some(alert => alert.id === item);
                });
            }
        },
        watch: {
            dismissed() {
                localStorage.setItem("dismissedAlerts", JSON.stringify(this.dismissed));
            }
        }
    }
</script>

<style scoped>

</style>