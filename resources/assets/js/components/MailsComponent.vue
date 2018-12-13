<template>
    <div class="card">
        <div class="card-header text-capitalize">
            <span>{{ $tc('general.mail', 2) }}</span>
        </div>
        <div class="card-body row">
            <new-mail class="col-10 offset-1"/>
        </div>
    </div>
</template>

<script>
    import NewMail from './NewMailComponent';

    export default {
        name: "mails-component",
        components: {
            NewMail
        },
        data: () => ({
            showNewMailModal: false,
        })
    }
</script>

<style scoped>

</style>