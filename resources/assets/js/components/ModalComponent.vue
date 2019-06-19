<template>
    <portal to="modals">
        <div @click="close" aria-hidden="true" aria-labelledby="exampleModalCenterTitle" class="modal fade show d-block"
             id="exampleModalCenter" role="dialog" tabindex="-1" v-if="show">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-capitalize" id="exampleModalCenterTitle">
                            <slot name="title"></slot>
                        </h5>
                        <button aria-label="Close" class="close" data-dismiss="modal" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" @click.stop>
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop show fade" v-if="show" @click="close"></div>
    </portal>
</template>

<script>
    export default {
        name: "modal-component",
        props: ['show'],
        methods: {
            close: function () {
                this.$emit('close');
            }
        },
        mounted() {
            document.addEventListener("keydown", (e) => {
                if (this.show && (e.key === 'Esc' || e.key === 'Escape')) {
                    this.close();
                }
            });
        },
        watch: {
            show(value) {
                const bodyEl = document.getElementsByTagName('body')[0];
                if (value) {
                    bodyEl.classList.add('modal-open');
                } else {
                    bodyEl.classList.remove('modal-open');
                }
            }
        }
    }
</script>

<style scoped>

</style>