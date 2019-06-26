<template>
    <div class="col-10 offset-1">
        <select :class="{'is-invalid': errors.sender}"
                :data-original-title="validationErrors.first('sender')" class="custom-select mb-2" data-toggle="tooltip"
                data-vv-as="selected" name="sender"
                v-model="sender" v-validate="'included:'+ senderList.map((item) => item.name).join(',')">
            <option selected value="">Choose role as sender</option>
            <option :value="s.name" v-for="s in senderList">Send as {{ s.name | capitalize }}</option>
        </select>
        <input-tag :class="{'is-invalid': errors.recipients}" :disabled="toAll || group !== ''"
                   :placeholder="$t('mail.to') | capitalize"
                   :tags="recipients" :validate-tag="validateRecipient"/>
        <button :disabled="toAll" @click="showMoreReceiverOptions = !showMoreReceiverOptions"
                class="btn btn-link btn-sm pt-0">
            {{ showMoreReceiverOptions ? $tc('mail.lessReceiverOptions')
            :$t('mail.moreReceiverOptions')}}
        </button>
        <transition name="slide-in">
            <div class="bg-light p-1" v-show="showMoreReceiverOptions">
                <div class="custom-control custom-checkbox mb-2">
                    <input class="custom-control-input" id="toAll" type="checkbox" v-model="toAll">
                    <label class="custom-control-label" for="toAll">{{ $tc('mail.toAll') }}</label>
                </div>
                <select :disabled="toAll" class="custom-select mb-2" v-model="group">
                    <option selected value="">Choose group to send to</option>
                    <option :value="key" v-for="(g, key) in groupList">Send to {{ g | capitalize }}</option>
                </select>
                <input-tag :disabled="toAll || group !== ''" :placeholder="$t('mail.cc')" :tags="ccRecipients"
                           :validate-tag="validateRecipient" class="mb-2"/>
                <input-tag :disabled="toAll || group !== ''" :placeholder="$t('mail.bcc')" :tags="bccRecipients"
                           :validate-tag="validateRecipient" class="mb-2"/>
            </div>
        </transition>
        <input :placeholder="$t('mail.subject') | capitalize" class="form-control mb-2" type="text" v-model="subject"/>
        <textarea :placeholder="$t('mail.message') | capitalize" class="form-control mb-2" id="message"
                  rows="13" v-model="content"></textarea>

        <div class="drop-active" v-show="$refs.upload && $refs.upload.dropActive">
            <h3>Drop files to upload</h3>
        </div>
        <div class="d-flex flex-wrap my-1" v-if="attachments.length">
            <div :class="{'border-danger': file.error, 'error': file.error, 'border-success': file.success, 'success': file.success}"
                 :key="file.id"
                 class="d-xxl-inline-block border mr-1 mb-1 p-2 rounded border-primary"
                 v-for="(file, index) in attachments">
                <button @click="removeFile(index)" aria-label="Close" class="close" type="button" v-if="!file.active">
                    <span aria-hidden="true">&times;</span>
                </button>
                <p class="mb-0 mr-3 text-nowrap">{{ file.name }}</p>
                <span class="small font-italic">{{ file.size | formatSize }}</span>
                <span class="ml-2" v-if="file.error">
                    <svg height="16" style="enable-background:new 0 0 510 510;" viewBox="0 0 510 510" width="16"
                         xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                        <g id="replay">
                            <path d="M255,102V0L127.5,127.5L255,255V153c84.15,0,153,68.85,153,153c0,84.15-68.85,153-153,153c-84.15,0-153-68.85-153-153H51
                            c0,112.2,91.8,204,204,204s204-91.8,204-204S367.2,102,255,102z" fill="#474747"></path>
                        </g>
                    </svg>
                </span>
                <span class="ml-2" v-else-if="file.success">
                    <svg height="16" style="enable-background:new 0 0 510 510;" viewBox="0 0 510 510" width="16"
                         xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <g id="check-circle">
                                <path d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M204,382.5L76.5,255l35.7-35.7
                                l91.8,91.8l193.8-193.8l35.7,35.7L204,382.5z" fill="#91DC5A"></path>
                            </g>
                        </g>
                    </svg>
                </span>
                <span class="ml-2" v-else-if="file.active">
                    <svg height="16" stroke="#fff" viewBox="0 0 38 38"
                         width="16" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fill-rule="evenodd">
                            <g stroke-width="2" transform="translate(1 1)">
                                <circle cx="18" cy="18" r="18" stroke-opacity=".5"></circle>
                                <path d="M36 18c0-9.94-8.06-18-18-18" stroke="blue">
                                    <animateTransform
                                            attributeName="transform"
                                            dur="1s"
                                            from="0 18 18"
                                            repeatCount="indefinite"
                                            to="360 18 18"
                                            type="rotate"></animateTransform>
                                </path>
                            </g>
                        </g>
                    </svg>
                </span>
                <span v-else></span>
            </div>
        </div>
        <vue-upload :custom-action="uploadAttachment" :drop="true" :drop-directory="true"
                    :multiple="true" :post-action="route('api.mailAttachments')"
                    @input-file="inputFile" class="btn btn-outline-secondary mb-2" ref="upload"
                    v-model="attachments">
            Attach Files
        </vue-upload>
        <div class="d-flex justify-content-lg-end justify-content-center">
            <button @click="sendMail" class="btn btn-block btn-primary" type="submit">
                {{ $t('mail.send') | capitalize }}
                <span aria-hidden="true" class="spinner-border spinner-border-sm ml-1" role="status"
                      v-if="isLoading"></span>
            </button>
        </div>
    </div>
</template>

<script>
    import InputTag from './InputTagComponent';
    import VueUpload from 'vue-upload-component';

    export default {
        name: "new-mail-component",
        components: {
            InputTag,
            VueUpload
        },
        props: {
            to: {default: '', type: [String]},
        },
        data: () => ({
            showMoreReceiverOptions: false,
            sender: '',
            senderList: [],
            group: '',
            groupList: [],
            toAll: false,
            recipients: [],
            ccRecipients: [],
            bccRecipients: [],
            subject: '',
            content: '',
            attachments: [],
            attachmentPaths: {},
            isLoading: false,
            errors: [],
        }),
        mounted() {
            this.senderList = this.fetchSenderList();
            this.fetchGroupList();
            window.addEventListener('unload', this.cleanUpAllAttachments);

            if (this.to) this.recipients = [this.to];

            $('[data-toggle="tooltip"]').tooltip();
        },
        methods: {
            validateRecipient(input) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(input).toLowerCase());
            },
            async sendMail() {
                this.isLoading = true;
                return await axios.post(route('mails.store'), {
                    sender: this.sender,
                    toAll: this.toAll,
                    group: this.group,
                    recipients: this.recipients,
                    ccRecipients: this.ccRecipients,
                    bccRecipients: this.bccRecipients,
                    subject: this.subject,
                    content: this.content,
                    attachmentPaths: this.attachmentPaths,
                })
                    .then(response => {
                        this.$notify({text: 'Mail sent.', type: 'success'});
                        this.resetForm();
                    })
                    .catch(error => {
                        this.$notify({text: 'Mail could not be sent.', type: 'error'});
                        this.errors = error.response.data.errors;
                    }).finally(() => this.isLoading = false)
            },
            fetchSenderList() {
                const list = [];

                window.laravel.roles.forEach(role => list.push({
                    name: role,
                }));

                return list;
            },
            async fetchGroupList() {
                let list = {};

                await axios.get(route('api.mailGroups'))
                    .then(response => this.groupList = response.data);

                return list;
            },
            inputFile(newFile, oldFile) {
                if (newFile && oldFile) {
                    // update
                    if (newFile.active && !oldFile.active) {
                        // beforeSend
                        // min size
                        if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
                            this.$refs.upload.update(newFile, {error: 'size'})
                        }
                    }
                }
                // Automatically activate upload
                if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                    if (!this.$refs.upload.active) {
                        this.$refs.upload.active = true
                    }
                }
            },
            removeFile(fileIndex) {
                let removed = this.attachments.splice(fileIndex, 1)[0];
                if (this.attachmentPaths[removed.id] !== undefined) {
                    this.removeUploadedAttachments(this.attachmentPaths[removed.id])
                }
            },
            async uploadAttachment(data) {
                let formData = new FormData();
                formData.append('file', data.file);

                await axios.post(route('api.mailAttachments'), formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    if (response.status !== 200) throw new Error();
                    this.attachmentPaths[data.id] = response.data;
                }).catch(error => {
                    throw new Error(error);
                })
            },
            cleanUpAllAttachments() {
                this.removeUploadedAttachments(this.attachmentPaths);
            },
            resetForm() {
                this.recipients = [];
                this.ccRecipients = [];
                this.bccRecipients = [];
                this.subject = '';
                this.content = '';

                this.attachments = [];
                this.attachmentPaths = {};
            },
            async removeUploadedAttachments(paths) {
                if (!(paths instanceof Object)) paths = [paths];
                if (paths.length || Object.keys(paths).length) {
                    await axios.delete(route('api.mailAttachments.destroy'), {data: {paths: paths}})
                        .then(response =>
                            delete this.attachmentPaths[Object.keys(this.attachmentPaths).find(key => paths.includes(this.attachmentPaths[key]))]
                        )
                }
            }
        },
        filters: {
            formatSize(size) {
                if (size > 1024 * 1024 * 1024 * 1024) {
                    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
                } else if (size > 1024 * 1024 * 1024) {
                    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
                } else if (size > 1024 * 1024) {
                    return (size / 1024 / 1024).toFixed(2) + ' MB'
                } else if (size > 1024) {
                    return (size / 1024).toFixed(2) + ' KB'
                }
                return size.toString() + ' B'
            }
        },
    }
</script>

<style scoped>
    .drop-active {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 9999;
        opacity: .6;
        text-align: center;
        background: #000;
    }

    .drop-active h3 {
        margin: -.5em 0 0;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        font-size: 40px;
        color: #fff;
        padding: 0;
    }

    .error {
        background-color: hsl(0, 100%, 90%);
    }

    .success {
        background-color: hsl(100, 100%, 90%)
    }

    svg {
        vertical-align: middle;
    }
</style>