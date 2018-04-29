<template>
    <label class="switch">
        <input type="checkbox" :checked="toggled" @change="toggle">
        <span class="slider"></span>
    </label>
</template>

<script>
    export default {
        name: "toggle-component",
        props: {
            value: {default: false, type: [Boolean]},
        },
        data: () => ({
            toggled: !!this.value
        }),
        mounted() {
            this.toggled = !!this.value;
        },
        methods: {
            toggle(event) {
                this.toggled = !this.toggled;
                this.$emit('input', this.toggled);
                this.$emit('change', {
                    value: this.toggled,
                    srcEvent: event
                })
            }
        },
        watch: {
            value(value) {
                this.toggled = !!value;
            }
        }
    }
</script>

<style scoped>
    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 30px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        display: none;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 16px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: 5px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(18px);
        -ms-transform: translateX(18px);
        transform: translateX(18px);
    }

    label {
        margin: 0;
    }
</style>