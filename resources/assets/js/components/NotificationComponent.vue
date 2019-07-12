<template>
    <div class="card">
        <div class="card-header text-capitalize">
            <span>Notifications</span>
        </div>
        <div class="card-body row">
            <div class="form-group">
                <label for=""></label>
                <input type="text" placeholder="Titel">
            </div>
            <div class="form-group">
                <label for=""></label>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
        </div>
        <div class="custom-control custom-checkbox">
            <input class="custom-control-input" type="checkbox">
            <label  class="custom-control-label"></label>
        </div>
        <button class="btn-btn-block btn-primary">Save</button>
    </div>
</template>

<script>
    export default {
        name: "notification-component",
        components: {
        },
        data: () => ({
            showNewMailModal: false,
        })
    }
</script>

<style scoped>

</style>