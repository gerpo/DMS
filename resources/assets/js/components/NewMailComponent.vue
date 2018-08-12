<template>
    <div class="container">
        <select class="custom-select mb-2" v-model="sender">
            <option value="" selected>Choose role as sender</option>
            <option v-for="s in senderList" :value="s.name">Send as {{ s.name | capitalize }}</option>
        </select>
        <input-tag :tags="recipients" :validate-tag="validateRecipient" :placeholder="$t('mail.to') | capitalize"
                   :disabled="toAll || group !== ''"/>
        <button class="btn btn-link btn-sm pt-0" :disabled="toAll"
                @click="showMoreReceiverOptions = !showMoreReceiverOptions">
            {{ showMoreReceiverOptions ? $tc('mail.lessReceiverOptions')
            :$t('mail.moreReceiverOptions')}}
        </button>
        <transition name="slide-in">
            <div class="bg-light p-1" v-show="showMoreReceiverOptions">
                <div class="custom-control custom-checkbox mb-2">
                    <input type="checkbox" class="custom-control-input" v-model="toAll" id="toAll">
                    <label class="custom-control-label" for="toAll">{{ $tc('mail.toAll') }}</label>
                </div>
                <input-tag :tags="ccRecipients" :validate-tag="validateRecipient" class="mb-2"
                           :placeholder="$t('mail.cc')"/>
                <input-tag :tags="bccRecipients" :validate-tag="validateRecipient" class="mb-2"
                           :placeholder="$t('mail.bcc')"/>
            </div>
        </transition>
        <input v-model="subject" type="text" class="form-control mb-2" :placeholder="$t('mail.subject') | capitalize" required/>
        <textarea v-model="content" class="form-control mb-2" id="message"
                  :placeholder="$t('mail.message') | capitalize" rows="13"></textarea>

        <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
            <h3>Drop files to upload</h3>
        </div>
        <div v-if="attachments.length" class="d-flex flex-wrap my-1">
            <div v-for="(file, index) in attachments" :key="file.id"
                 class="d-xxl-inline-block border mr-1 mb-1 p-2 rounded border-primary"
                 :class="{'border-danger': file.error, 'error': file.error, 'border-success': file.success, 'success': file.success}">
                <button v-if="!file.active" type="button" class="close" aria-label="Close" @click="removeFile(index)">
                    <span aria-hidden="true">&times;</span>
                </button>
                <p class="mb-0 mr-3 text-nowrap">{{ file.name }}</p>
                <span class="small font-italic">{{ file.size | formatSize }}</span>
                <span v-if="file.error" class="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 510 510" style="enable-background:new 0 0 510 510;" xml:space="preserve">
                        <g id="replay">
                            <path d="M255,102V0L127.5,127.5L255,255V153c84.15,0,153,68.85,153,153c0,84.15-68.85,153-153,153c-84.15,0-153-68.85-153-153H51
                            c0,112.2,91.8,204,204,204s204-91.8,204-204S367.2,102,255,102z" fill="#474747"></path>
                        </g>
                    </svg>
                </span>
                <span v-else-if="file.success" class="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 510 510" style="enable-background:new 0 0 510 510;" xml:space="preserve">
                        <g>
                            <g id="check-circle">
                                <path d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M204,382.5L76.5,255l35.7-35.7
                                l91.8,91.8l193.8-193.8l35.7,35.7L204,382.5z" fill="#91DC5A"></path>
                            </g>
                        </g>
                    </svg>
                </span>
                <span v-else-if="file.active" class="ml-2">
                    <svg width="16" height="16" viewBox="0 0 38 38"
                         xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                        <g fill="none" fill-rule="evenodd">
                            <g transform="translate(1 1)" stroke-width="2">
                                <circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle>
                                <path d="M36 18c0-9.94-8.06-18-18-18" stroke="blue">
                                    <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            from="0 18 18"
                                            to="360 18 18"
                                            dur="1s"
                                            repeatCount="indefinite"></animateTransform>
                                </path>
                            </g>
                        </g>
                    </svg>
                </span>
                <span v-else></span>
            </div>
        </div>
        <vue-upload ref="upload" :post-action="route('api.mailAttachments')" :custom-action="uploadAttachment"
                    v-model="attachments" :multiple="true"
                    :drop="true" :drop-directory="true" @input-file="inputFile"
                    class="btn btn-outline-secondary">
            Attach Files
        </vue-upload>
        <div class="d-flex justify-content-lg-end justify-content-center">
            <button class="btn btn-block btn-primary" type="submit" @click="sendMail">
                {{ $t('mail.send') }}
            </button>
        </div>
    </div>
</template>

<script>
    import InputTag from './InputTagComponent';
    import AutoComplete from './AutoCompleteComponent';
    import VueUpload from 'vue-upload-component';

    export default {
        name: "new-mail-component",
        components: {
            AutoComplete,
            InputTag,
            VueUpload
        },
        data: () => ({
            showMoreReceiverOptions: false,
            sender: '',
            senderList: [],
            group: '',
            toAll: false,
            recipients: [],
            ccRecipients: [],
            bccRecipients: [],
            subject: '',
            content: '',
            attachments: [],
            attachmentPaths: {}
        }),
        mounted() {
            this.senderList = this.fetchSenderList();
            //window.addEventListener('beforeunload', (e) => e.returnValue = true);
            window.addEventListener('unload', this.cleanUpBeforeLeave);
        },
        methods: {
            validateRecipient(input) {
                return true;
            },
            async sendMail() {
                return await axios.post(route('mails.store'), {
                    sender: this.sender,
                    toAll: this.toAll,
                    recipients: this.recipients,
                    ccRecipients: this.ccRecipients,
                    bccRecipients: this.bccRecipients,
                    subject: this.subject,
                    content: this.content,
                    attachmentPaths: this.attachmentPaths,
                })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            fetchSenderList() {
                const list = [];

                window.laravel.roles.forEach(role => list.push({
                    name: role,
                }));

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
            cleanUpBeforeLeave() {
                this.removeUploadedAttachments(this.attachmentPaths);
            },
            async removeUploadedAttachments(paths) {
                if (!(paths instanceof Object)) paths = [paths];
                await axios.delete(route('api.mailAttachments.destroy'), {data: {paths: paths}})
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
        }
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