<template>
    <div class="notification-wrapper">
        <div class="notification_container alert alert-warning alert-dismissible fade show p-2 mx-3"
             v-for="notification in activeNotifications">
            <p class="lead alert-heading"><strong>{{ notification.title }}</strong></p>
            <p v-html="$markdown(notification.message)"></p>
            <button @click="dismiss(notification)" aria-label="Close" class="close" data-dismiss="alert" type="button">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShowNotificationsComponent",
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