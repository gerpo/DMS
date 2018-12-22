(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_es_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-es/debounce */ "./node_modules/lodash-es/debounce.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "auto-complete-component",
  props: {
    id: {
      default: 'autocomplete',
      type: [String]
    },
    label: {
      default: 'Search',
      type: [String]
    },
    placeholder: {
      default: 'Type..',
      type: [String]
    },
    buttonText: {
      default: 'Search',
      type: [String]
    },
    showButton: {
      default: true,
      type: [Boolean]
    },
    onButtonClick: {
      default: function _default() {},
      type: [Function]
    },
    data: {
      default: function _default() {
        return [];
      },
      type: [Array, Function]
    },
    searchAttr: {
      default: 'name',
      type: [String]
    },
    suggestionLimit: {
      default: 4,
      type: [Number]
    },
    caseSensitive: {
      default: false,
      type: [Boolean]
    },
    minInputLength: {
      default: 1,
      type: [Number]
    },
    additionalProps: {
      default: function _default() {},
      type: [Object]
    }
  },
  data: function data() {
    return {
      model: {},
      suggestionsAreOpen: false,
      suggestions: [],
      seletectedSuggestion: -1,
      isFetching: false,
      selectedModel: null
    };
  },
  computed: {
    usesLocalData: function usesLocalData() {
      return Array.isArray(this.data);
    },
    limitedSuggestions: function limitedSuggestions() {
      if (this.suggestionLimit !== 0) {
        return this.suggestions.slice(0, this.suggestionLimit);
      }

      return this.suggestions;
    }
  },
  methods: {
    searchData: Object(lodash_es_debounce__WEBPACK_IMPORTED_MODULE_1__["default"])(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var _this = this;

      var inputValue, data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              inputValue = this.model[this.searchAttr];

              if (!(inputValue.length < this.minInputLength)) {
                _context.next = 4;
                break;
              }

              this.suggestionsAreOpen = false;
              return _context.abrupt("return");

            case 4:
              this.isFetching = true;
              this.suggestionsAreOpen = true;
              this.selectedModel = null;

              if (!this.usesLocalData) {
                _context.next = 11;
                break;
              }

              _context.t0 = this.data;
              _context.next = 14;
              break;

            case 11:
              _context.next = 13;
              return this.fetchServerData(inputValue);

            case 13:
              _context.t0 = _context.sent;

            case 14:
              data = _context.t0;
              this.isFetching = false;
              this.suggestions = data.length > 0 ? data.filter(function (d) {
                return _this.compareFunction(d[_this.searchAttr], inputValue);
              }) : [];

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })), 250),
    fetchServerData: function () {
      var _fetchServerData = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var inputValue,
            response,
            _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                inputValue = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : '';
                _context2.next = 3;
                return this.data({
                  filter: inputValue
                });

              case 3:
                response = _context2.sent;
                return _context2.abrupt("return", response.data);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchServerData() {
        return _fetchServerData.apply(this, arguments);
      }

      return fetchServerData;
    }(),
    compareFunction: function compareFunction(str, searchStr) {
      if (!this.caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
      }

      return str.includes(searchStr);
    },
    onArrowDown: function onArrowDown() {
      if (this.seletectedSuggestion < this.suggestions.length) {
        this.seletectedSuggestion++;
      }
    },
    onArrowUp: function onArrowUp() {
      if (this.seletectedSuggestion > 0) {
        this.seletectedSuggestion--;
      }
    },
    onEnter: function onEnter() {
      if (this.seletectedSuggestion < 0) {
        this.submit();
        return;
      }

      this.model[this.searchAttr] = this.suggestions[this.seletectedSuggestion][this.searchAttr];
      this.selectedModel = this.suggestions[this.seletectedSuggestion];
      this.suggestionsAreOpen = false;
      this.seletectedSuggestion = -1;
    },
    onSuggestionClick: function onSuggestionClick(i) {
      this.seletectedSuggestion = i;
      this.onEnter();
    },
    submit: function submit() {
      if (this.suggestions.length > 0 && this.selectedModel) {
        this.onButtonClick(Object.assign({}, {
          result: this.selectedModel
        }, this.additionalProps));
        this.model = {};
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/EditUserComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/EditUserComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "edit-user-component",
  props: {
    houseNames: {
      default: function _default() {
        return [];
      },
      type: [Array]
    },
    user: {
      default: function _default() {},
      type: [Object]
    }
  },
  data: function data() {
    return {
      errors: {},
      updatedUser: {},
      validationClass: ''
    };
  },
  methods: {
    saveUser: function () {
      var _saveUser = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios.post(route('api.users.update', this.user.id), this.updatedUser).then(function (response) {
                  _this.flash('User updated', 'success');

                  _this.$parent.$emit('close');
                }).catch(function (error) {
                  _this.errors = error.response.data.errors;

                  _this.flash('User was not updated. An error occurred.', 'danger');
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveUser() {
        return _saveUser.apply(this, arguments);
      }

      return saveUser;
    }()
  },
  mounted: function mounted() {
    this.updatedUser = this.user;
  },
  watch: {
    user: function user(newUser) {
      this.updatedUser = Object.assign({}, newUser);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/InputTagComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/InputTagComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TagComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagComponent */ "./resources/assets/js/components/TagComponent.vue");
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "input-tag-component",
  props: {
    tags: {
      default: function _default() {
        return [];
      },
      type: [Array]
    },
    delimiter: {
      default: ',',
      type: [String]
    },
    spaceIsDelimiter: {
      default: true,
      type: [Boolean]
    },
    uniqueValues: {
      default: true,
      type: [Boolean]
    },
    validateTag: {
      default: function _default(input) {
        return true;
      },
      type: [Function]
    },
    placeholder: {
      default: '',
      type: [String]
    },
    disabled: {
      default: false,
      type: [Boolean]
    }
  },
  components: {
    TagComponent: _TagComponent__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      tag: "",
      currentTags: []
    };
  },
  methods: {
    onKeyPress: function onKeyPress(input, event) {
      if ((event.key === this.delimiter || event.key === 'Enter' || event.key === ' ' && this.spaceIsDelimiter) && input.trim()) {
        var re = new RegExp(this.delimiter, "g");
        input = input.replace(re, '').trim();

        if (input) {
          this.addTag(input);
        }
      }

      if (!input && event.key === 'Backspace') {
        this.editLastTag();
      }
    },
    addTag: function addTag(input) {
      if (this.uniqueValues && this.currentTags.includes(input) || !this.validateTag(input)) return;
      this.currentTags.push(input.trim());
      this.resetInput();
    },
    removeTag: function removeTag(index) {
      this.currentTags.splice(index, 1);
    },
    editLastTag: function editLastTag() {
      this.tag = this.currentTags.pop();
    },
    resetInput: function resetInput() {
      this.tag = "";
    }
  },
  mounted: function mounted() {
    this.currentTags = this.tags;
  },
  watch: {
    tags: function tags(newTags) {
      this.currentTags = newTags;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ListPaginationComponent.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ListPaginationComponent.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "list-pagination-component",
  props: {
    data: {
      default: function _default() {
        return [];
      },
      type: [Array]
    },
    itemsPerPage: {
      default: 10,
      type: [Number]
    },
    searchable: {
      default: true,
      type: [Boolean]
    },
    searchAttr: {
      default: 'name',
      type: [String]
    },
    placeholder: {
      default: 'Search...',
      type: [String]
    }
  },
  data: function data() {
    return {
      currentPage: 1,
      search_query: '',
      currentData: []
    };
  },
  computed: {
    filteredItems: function filteredItems() {
      var _this = this;

      if (!this.search_query) {
        return this.data;
      }

      return this.data.filter(function (item) {
        return _this.compareFunction(item[_this.searchAttr]);
      });
    },
    currentItems: function currentItems() {
      var start = (this.currentPage - 1) * this.itemsPerPage;
      var end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    },
    pages: function pages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    }
  },
  methods: {
    compareFunction: function compareFunction(value) {
      return value.toLowerCase().includes(this.search_query.toLowerCase());
    },
    nextPage: function nextPage() {
      if (this.currentPage < this.pages) {
        this.currentPage++;
      }
    },
    previousPage: function previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/MailsComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/MailsComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewMailComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewMailComponent */ "./resources/assets/js/components/NewMailComponent.vue");
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "mails-component",
  components: {
    NewMail: _NewMailComponent__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      showNewMailModal: false
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ModalComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ModalComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "modal-component",
  props: ['show'],
  methods: {
    close: function close() {
      this.$emit('close');
    }
  },
  mounted: function mounted() {
    var _this = this;

    document.addEventListener("keydown", function (e) {
      if (_this.show && e.keyCode === 27) {
        _this.close();
      }
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/NewMailComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/NewMailComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _InputTagComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InputTagComponent */ "./resources/assets/js/components/InputTagComponent.vue");
/* harmony import */ var vue_upload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-upload-component */ "./node_modules/vue-upload-component/dist/vue-upload-component.js");
/* harmony import */ var vue_upload_component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_upload_component__WEBPACK_IMPORTED_MODULE_2__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "new-mail-component",
  components: {
    InputTag: _InputTagComponent__WEBPACK_IMPORTED_MODULE_1__["default"],
    VueUpload: vue_upload_component__WEBPACK_IMPORTED_MODULE_2___default.a
  },
  data: function data() {
    return {
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
      attachmentPaths: {}
    };
  },
  mounted: function mounted() {
    this.senderList = this.fetchSenderList();
    this.fetchGroupList(); //window.addEventListener('beforeunload', (e) => e.returnValue = true);

    window.addEventListener('unload', this.cleanUpAllAttachments);
  },
  methods: {
    validateRecipient: function validateRecipient(input) {
      return true;
    },
    sendMail: function () {
      var _sendMail = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios.post(route('mails.store'), {
                  sender: this.sender,
                  toAll: this.toAll,
                  group: this.group,
                  recipients: this.recipients,
                  ccRecipients: this.ccRecipients,
                  bccRecipients: this.bccRecipients,
                  subject: this.subject,
                  content: this.content,
                  attachmentPaths: this.attachmentPaths
                }).then(function (response) {
                  _this.resetForm();
                }).catch(function (error) {
                  console.log(error);
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sendMail() {
        return _sendMail.apply(this, arguments);
      }

      return sendMail;
    }(),
    fetchSenderList: function fetchSenderList() {
      var list = [];
      window.laravel.roles.forEach(function (role) {
        return list.push({
          name: role
        });
      });
      return list;
    },
    fetchGroupList: function () {
      var _fetchGroupList = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var _this2 = this;

        var list;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                list = {};
                _context2.next = 3;
                return axios.get(route('api.mailGroups')).then(function (response) {
                  return _this2.groupList = response.data;
                });

              case 3:
                return _context2.abrupt("return", list);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchGroupList() {
        return _fetchGroupList.apply(this, arguments);
      }

      return fetchGroupList;
    }(),
    inputFile: function inputFile(newFile, oldFile) {
      if (newFile && oldFile) {
        // update
        if (newFile.active && !oldFile.active) {
          // beforeSend
          // min size
          if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            this.$refs.upload.update(newFile, {
              error: 'size'
            });
          }
        }
      } // Automatically activate upload


      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true;
        }
      }
    },
    removeFile: function removeFile(fileIndex) {
      var removed = this.attachments.splice(fileIndex, 1)[0];

      if (this.attachmentPaths[removed.id] !== undefined) {
        this.removeUploadedAttachments(this.attachmentPaths[removed.id]);
      }
    },
    uploadAttachment: function () {
      var _uploadAttachment = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(data) {
        var _this3 = this;

        var formData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                formData = new FormData();
                formData.append('file', data.file);
                _context3.next = 4;
                return axios.post(route('api.mailAttachments'), formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }).then(function (response) {
                  if (response.status !== 200) throw new Error();
                  _this3.attachmentPaths[data.id] = response.data;
                }).catch(function (error) {
                  throw new Error(error);
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function uploadAttachment(_x) {
        return _uploadAttachment.apply(this, arguments);
      }

      return uploadAttachment;
    }(),
    cleanUpAllAttachments: function cleanUpAllAttachments() {
      this.removeUploadedAttachments(this.attachmentPaths);
    },
    resetForm: function resetForm() {
      this.recipients = [];
      this.ccRecipients = [];
      this.bccRecipients = [];
      this.subject = '';
      this.content = '';
      this.attachments = [];
      this.attachmentPaths = {};
    },
    removeUploadedAttachments: function () {
      var _removeUploadedAttachments = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(paths) {
        var _this4 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(paths instanceof Object)) paths = [paths];
                console.log(paths);

                if (!(paths.length || Object.keys(paths).length)) {
                  _context4.next = 5;
                  break;
                }

                _context4.next = 5;
                return axios.delete(route('api.mailAttachments.destroy'), {
                  data: {
                    paths: paths
                  }
                }).then(function (response) {
                  return delete _this4.attachmentPaths[Object.keys(_this4.attachmentPaths).find(function (key) {
                    return paths.includes(_this4.attachmentPaths[key]);
                  })];
                });

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function removeUploadedAttachments(_x2) {
        return _removeUploadedAttachments.apply(this, arguments);
      }

      return removeUploadedAttachments;
    }()
  },
  filters: {
    formatSize: function formatSize(size) {
      if (size > 1024 * 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB';
      } else if (size > 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
      } else if (size > 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + ' MB';
      } else if (size > 1024) {
        return (size / 1024).toFixed(2) + ' KB';
      }

      return size.toString() + ' B';
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PluginsComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/PluginsComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ToggleComponent_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToggleComponent.vue */ "./resources/assets/js/components/ToggleComponent.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "plugins-component",
  components: {
    toggle: _ToggleComponent_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    plugins: {
      default: function _default() {
        return [];
      },
      type: [Array]
    }
  },
  data: function data() {
    return {
      localPlugins: [],
      showConfirmDeletion: false,
      pluginToDelete: {}
    };
  },
  mounted: function mounted() {
    this.localPlugins = this.plugins;
  },
  methods: {
    updatePlugin: function () {
      var _updatePlugin = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(plugin) {
        var _this = this;

        var status;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                status = plugin.is_active ? 'activated' : 'deactivated';
                _context.next = 3;
                return axios.patch(route('api.plugins.update', plugin.id), plugin).then(function (response) {
                  _this.flash("Plugin \"".concat(plugin.name, "\" was successfully ").concat(status, "."), 'success');
                }).catch(function (error) {
                  _this.flash("Plugin \"".concat(plugin.name, "\" could not be ").concat(status, "."), 'danger');

                  plugin.is_active = !plugin.is_active;
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updatePlugin(_x) {
        return _updatePlugin.apply(this, arguments);
      }

      return updatePlugin;
    }(),
    deletePlugin: function () {
      var _deletePlugin = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var _this2 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return axios.delete(route('api.plugins.update', plugin.id)).then(function (response) {
                  _this2.flash("Plugin \"".concat(plugin.name, "\" was successfully deleted."), 'success');
                }).catch(function (error) {
                  _this2.flash("Plugin \"".concat(plugin.name, "\" could not be deleted."), 'danger');
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function deletePlugin() {
        return _deletePlugin.apply(this, arguments);
      }

      return deletePlugin;
    }(),
    confirmDeletion: function confirmDeletion(plugin) {
      this.pluginToDelete = plugin;
      this.showConfirmDeletion = true;
    }
  },
  watch: {
    plugins: function plugins(value) {
      this.localPlugins = value;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ProfileComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ProfileComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditUserComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditUserComponent.vue */ "./resources/assets/js/components/EditUserComponent.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "profile-component",
  components: {
    EditUserComponent: _EditUserComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    user: {
      default: function _default() {},
      type: [Object]
    },
    houseNames: {
      default: function _default() {
        return [];
      },
      type: [Array]
    }
  },
  data: function data() {
    return {
      showEditUserModal: false
    };
  },
  methods: {
    changeEditMode: function changeEditMode() {
      this.showEditUserModal = true;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "role-abilities-component",
  props: {
    roles: {
      default: function _default() {
        return [];
      },
      type: [Array]
    },
    abilities: {
      default: function _default() {
        return [];
      },
      type: [Array]
    }
  },
  data: function data() {
    return {
      currentRoles: [],
      newRole: {
        name: '',
        title: '',
        abilities: [],
        users: []
      },
      errors: {},
      showConfirmDeletion: false,
      roleToDelete: {}
    };
  },
  mounted: function mounted() {
    this.currentRoles = this.roles;
    $('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    addRole: function () {
      var _addRole = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios.post(route('api.roles.store'), this.newRole).then(function (response) {
                  _this.flash('Role was successfully added.', 'success');

                  _this.currentRoles.push(Object.assign({}, _this.newRole, response.data));

                  _this.currentRoles.sort();

                  _this.newRole.name = '';
                  _this.newRole.title = '';
                }).catch(function (error) {
                  console.log(error);
                  _this.errors = error.response.data.errors;

                  _this.flash('Role was not created. An error occurred.', 'danger');
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addRole() {
        return _addRole.apply(this, arguments);
      }

      return addRole;
    }(),
    updateRole: function () {
      var _updateRole = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(role) {
        var _this2 = this;

        var abilities, checkedAbilities, uncheckedAbilities, requests;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                abilities = this.$refs[role.name].map(function (el) {
                  var data = {};
                  data['name'] = el.dataset.ability;
                  data['checked'] = el.checked;
                  return data;
                });
                checkedAbilities = {
                  data: abilities.filter(function (ab) {
                    return ab.checked;
                  })
                };
                uncheckedAbilities = {
                  data: abilities.filter(function (ab) {
                    return !ab.checked;
                  })
                };
                requests = [];
                if (checkedAbilities.data.length > 0) requests.push(axios.post(route('api.role-abilities.store', role.id), checkedAbilities));
                if (uncheckedAbilities.data.length > 0) requests.push(axios.delete(route('api.role-abilities.destroy', role.id), {
                  data: uncheckedAbilities
                }));
                _context2.next = 8;
                return axios.all(requests).then(function (response) {
                  _this2.flash('Role was updated.', 'success');
                }).catch(function (error) {
                  _this2.flash('Role was not updated. An error occurred.', 'danger');
                });

              case 8:
                return _context2.abrupt("return", _context2.sent);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateRole(_x) {
        return _updateRole.apply(this, arguments);
      }

      return updateRole;
    }(),
    deleteRole: function () {
      var _deleteRole = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(role) {
        var _this3 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return axios.delete(route('api.roles.destroy', role.id)).then(function (response) {
                  _this3.showConfirmDeletion = false;
                  _this3.roleToDelete = {};

                  _this3.flash('Role was deleted successfully.', 'success');

                  _this3.currentRoles.splice(_this3.currentRoles.indexOf(role), 1);
                }).catch(function (error) {
                  console.log(error);

                  _this3.flash('Role was not deleted. An error occurred.', 'danger');
                });

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteRole(_x2) {
        return _deleteRole.apply(this, arguments);
      }

      return deleteRole;
    }(),
    confirmDeletion: function confirmDeletion(role) {
      this.roleToDelete = role;
      this.showConfirmDeletion = true;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RolesComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RolesComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserRolesComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserRolesComponent.vue */ "./resources/assets/js/components/UserRolesComponent.vue");
/* harmony import */ var _RoleAbilitiesComponent_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoleAbilitiesComponent.vue */ "./resources/assets/js/components/RoleAbilitiesComponent.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "roles-component",
  components: {
    UserRolesComponent: _UserRolesComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    RoleAbilitiesComponent: _RoleAbilitiesComponent_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    roles: {
      default: function _default() {
        return [];
      },
      type: [Array]
    },
    abilities: {
      default: function _default() {
        return [];
      },
      type: [Array]
    }
  },
  data: function data() {
    return {};
  },
  mounted: function mounted() {},
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/TagComponent.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/TagComponent.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "tag-component",
  props: {
    id: {
      default: 0,
      type: [Number]
    },
    title: {
      default: '',
      type: [String]
    },
    tagClass: {
      default: '',
      type: [String]
    },
    btnAction: {
      default: function _default() {},
      type: [Function]
    },
    showBtn: {
      default: true,
      type: [Boolean]
    },
    btnClass: {
      default: '',
      type: [String]
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ToggleComponent.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ToggleComponent.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _this = undefined;

//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "toggle-component",
  props: {
    value: {
      default: false,
      type: [Boolean]
    }
  },
  data: function data() {
    return {
      toggled: !!_this.value
    };
  },
  mounted: function mounted() {
    this.toggled = !!this.value;
  },
  methods: {
    toggle: function toggle(event) {
      this.toggled = !this.toggled;
      this.$emit('input', this.toggled);
      this.$emit('change', {
        value: this.toggled,
        srcEvent: event
      });
    }
  },
  watch: {
    value: function value(_value) {
      this.toggled = !!_value;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/UserComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_table_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-table-component */ "./node_modules/vue-table-component/dist/index.js");
/* harmony import */ var vue_table_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_table_component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _EditUserComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditUserComponent */ "./resources/assets/js/components/EditUserComponent.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "user-component",
  components: {
    EditUserComponent: _EditUserComponent__WEBPACK_IMPORTED_MODULE_2__["default"],
    TableComponent: vue_table_component__WEBPACK_IMPORTED_MODULE_1__["TableComponent"],
    TableColumn: vue_table_component__WEBPACK_IMPORTED_MODULE_1__["TableColumn"]
  },
  data: function data() {
    return {
      houses: [],
      page: 1,
      filter: '',
      sort: '',
      showEditUserModal: false,
      selectedUser: {},
      residentFilter: [{
        name: 'main_tenant',
        checked: true
      }, {
        name: 'subtenant',
        checked: true
      }, {
        name: 'current_tenant',
        checked: true
      }, {
        name: 'former_tenant',
        checked: false
      }]
    };
  },
  props: {
    houseNames: {
      default: function _default() {
        return [];
      },
      type: [Array]
    }
  },
  created: function () {
    var _created = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var _this = this;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.houseNames.forEach(function (house) {
                _this.houses.push({
                  name: house,
                  checked: true
                });
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _created.apply(this, arguments);
    }

    return created;
  }(),
  methods: {
    fetchUsers: function () {
      var _fetchUsers = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(_ref) {
        var page, filter, sort, houses, residentFilter;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                page = _ref.page, filter = _ref.filter, sort = _ref.sort;
                this.page = page;
                this.filter = filter;
                this.sort = sort;
                houses = JSON.stringify(this.houses.filter(function (house) {
                  return !house.checked;
                }).map(function (house) {
                  return house['name'];
                }));
                residentFilter = JSON.stringify(this.residentFilter.filter(function (filter) {
                  return filter.checked;
                }).map(function (filter) {
                  return filter['name'];
                }));
                _context2.next = 8;
                return axios.get(route('api.users'), {
                  params: {
                    page: page,
                    filter: filter,
                    sort: sort,
                    houses: houses,
                    residentFilter: residentFilter
                  }
                }).then(function (response) {
                  return Promise.resolve({
                    data: response.data.data,
                    pagination: {
                      totalPages: response.data.last_page,
                      currentPage: page
                    }
                  });
                });

              case 8:
                return _context2.abrupt("return", _context2.sent);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchUsers(_x) {
        return _fetchUsers.apply(this, arguments);
      }

      return fetchUsers;
    }(),
    filterChanged: function () {
      var _filterChanged = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var payload;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                payload = {
                  page: this.page,
                  filter: this.filter,
                  sort: this.sort
                };
                _context3.next = 3;
                return this.fetchUsers(payload).then(this.$refs.table.refresh());

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function filterChanged() {
        return _filterChanged.apply(this, arguments);
      }

      return filterChanged;
    }(),
    editUser: function editUser(user) {
      this.selectedUser = user;
      this.showEditUserModal = true;
    }
  },
  watch: {
    showEditUserModal: function showEditUserModal(value) {
      if (!value) {
        this.selectedUser = {};
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserRolesComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/UserRolesComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AutoCompleteComponent_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutoCompleteComponent.vue */ "./resources/assets/js/components/AutoCompleteComponent.vue");
/* harmony import */ var _ListPaginationComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ListPaginationComponent */ "./resources/assets/js/components/ListPaginationComponent.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "user-roles-component",
  components: {
    ListPaginationComponent: _ListPaginationComponent__WEBPACK_IMPORTED_MODULE_2__["default"],
    Autocomplete: _AutoCompleteComponent_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    roles: {
      default: function _default() {
        return [];
      },
      type: [Array]
    }
  },
  data: function data() {
    return {
      currentRoles: [],
      errors: {}
    };
  },
  mounted: function () {
    var _mounted = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.currentRoles = this.roles;

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _mounted.apply(this, arguments);
    }

    return mounted;
  }(),
  methods: {
    retractRole: function () {
      var _retractRole = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(user, role) {
        var _this = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return axios.delete(route('api.user-roles.destroy', user.id), {
                  data: {
                    data: [role]
                  }
                }).then(function (repsonse) {
                  role.users.splice(role.users.indexOf(user), 1);

                  _this.flash('Role was successfully retracted from user.', 'success');
                }).catch(function (error) {
                  _this.flash('Role could not be retracted from user.', 'danger');

                  console.log(error);
                });

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function retractRole(_x, _x2) {
        return _retractRole.apply(this, arguments);
      }

      return retractRole;
    }(),
    assignRole: function () {
      var _assignRole = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(user, role) {
        var _this2 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return axios.post(route('api.user-roles.store', user.id), {
                  data: [role]
                }).then(function (response) {
                  role.users.push(user);

                  _this2.flash('Role was successfully assigned to user.', 'success');
                }).catch(function (error) {
                  _this2.flash('Role could not be assigned to user.', 'danger');

                  console.log(error);
                });

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function assignRole(_x3, _x4) {
        return _assignRole.apply(this, arguments);
      }

      return assignRole;
    }(),
    userSelected: function userSelected(value) {
      var user = value.result;
      var role = value.role;

      if (role.users.some(function (role_user) {
        return role_user.id === user.id;
      })) {
        this.flash('User has Role already.', 'info');
        return;
      }

      this.assignRole(user, role);
    },
    fetchUsers: function () {
      var _fetchUsers = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(input) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return axios.get(route('api.users'), {
                  params: input
                }).then(function (response) {
                  return {
                    data: response.data.data
                  };
                });

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchUsers(_x5) {
        return _fetchUsers.apply(this, arguments);
      }

      return fetchUsers;
    }()
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=style&index=0&id=56a234a4&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=style&index=0&id=56a234a4&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.ac__suggestions[data-v-56a234a4] {\n    position: absolute;\n    top: 2.2rem;\n    z-index: 9997;\n}\n.ac__suggestion[data-v-56a234a4] {\n    cursor: pointer;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/EditUserComponent.vue?vue&type=style&index=0&id=3039b261&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/EditUserComponent.vue?vue&type=style&index=0&id=3039b261&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/InputTagComponent.vue?vue&type=style&index=0&id=2b1d27c6&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/InputTagComponent.vue?vue&type=style&index=0&id=2b1d27c6&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.input-tag-wrapper[data-v-2b1d27c6] {\n    display: flex;\n    flex-wrap: wrap;\n    border: 1px solid #ced4da;\n    border-radius: 0.25rem;\n    line-height: 1.6;\n    font-size: 0.9rem;\n    padding: 0.375rem 0.75rem;\n\n    margin-top: -0.2rem;\n}\n.input-tag-wrapper[data-v-2b1d27c6]:focus-within {\n    border-color: #80bdff;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.input-tag-wrapper__disabled[data-v-2b1d27c6] {\n    color: #495057;\n    background-color: #e9ecef;\n}\n.input-tag-tags[data-v-2b1d27c6]:not(:empty) {\n    margin-top: -0.2rem;\n    padding-right: 5px;\n    width: auto;\n}\n.input-tag-input[data-v-2b1d27c6] {\n    border: 0;\n    box-shadow: none;\n    flex: 1;\n    padding: 0\n}\n.input-tag-input[data-v-2b1d27c6]:disabled {\n    background-color: #e9ecef;\n}\n.input-tag-input[data-v-2b1d27c6]:focus {\n    outline: none\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ListPaginationComponent.vue?vue&type=style&index=0&id=47d0489e&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ListPaginationComponent.vue?vue&type=style&index=0&id=47d0489e&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/MailsComponent.vue?vue&type=style&index=0&id=4e6d1838&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/MailsComponent.vue?vue&type=style&index=0&id=4e6d1838&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ModalComponent.vue?vue&type=style&index=0&id=465fd2c7&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ModalComponent.vue?vue&type=style&index=0&id=465fd2c7&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.modal-mask[data-v-465fd2c7] {\n    position: fixed;\n    z-index: 1040;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, .5);\n    transition: opacity .3s ease;\n}\n.modal-container[data-v-465fd2c7] {\n    max-width: 35%;\n    margin: 40px auto 0;\n    padding: 20px 30px;\n    background-color: #fff;\n    border-radius: 2px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);\n    transition: all .3s ease;\n    font-family: Helvetica, Arial, sans-serif;\n}\n.modal-header h3[data-v-465fd2c7] {\n    margin-top: 0;\n    color: #42b983;\n}\n.modal-body[data-v-465fd2c7] {\n    margin: 20px 0;\n}\n.modal-enter[data-v-465fd2c7] {\n    opacity: 0;\n}\n.modal-leave-active[data-v-465fd2c7] {\n    opacity: 0;\n}\n.modal-enter .modal-container[data-v-465fd2c7],\n.modal-leave-active .modal-container[data-v-465fd2c7] {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/NewMailComponent.vue?vue&type=style&index=0&id=09b4367d&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/NewMailComponent.vue?vue&type=style&index=0&id=09b4367d&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.drop-active[data-v-09b4367d] {\n    top: 0;\n    bottom: 0;\n    right: 0;\n    left: 0;\n    position: fixed;\n    z-index: 9999;\n    opacity: .6;\n    text-align: center;\n    background: #000;\n}\n.drop-active h3[data-v-09b4367d] {\n    margin: -.5em 0 0;\n    position: absolute;\n    top: 50%;\n    left: 0;\n    right: 0;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    font-size: 40px;\n    color: #fff;\n    padding: 0;\n}\n.error[data-v-09b4367d] {\n    background-color: hsl(0, 100%, 90%);\n}\n.success[data-v-09b4367d] {\n    background-color: hsl(100, 100%, 90%)\n}\nsvg[data-v-09b4367d] {\n    vertical-align: middle;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PluginsComponent.vue?vue&type=style&index=0&id=1ba5dcf4&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/PluginsComponent.vue?vue&type=style&index=0&id=1ba5dcf4&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ProfileComponent.vue?vue&type=style&index=0&id=1891bcea&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ProfileComponent.vue?vue&type=style&index=0&id=1891bcea&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.text-normal[data-v-1891bcea] {\n    text-transform: none;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=style&index=0&id=2f19ff22&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=style&index=0&id=2f19ff22&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RolesComponent.vue?vue&type=style&index=0&id=83734e92&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RolesComponent.vue?vue&type=style&index=0&id=83734e92&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/TagComponent.vue?vue&type=style&index=0&id=8480fa8c&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/TagComponent.vue?vue&type=style&index=0&id=8480fa8c&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.tag-input-tag[data-v-8480fa8c] {\n    display: inline-block;\n    border-radius: 0.3rem;\n    padding: .1rem .5rem;\n    margin-right: .2rem;\n    margin-top: .2rem;\n}\n.tag-input-tag-btn[data-v-8480fa8c] {\n    cursor: pointer;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ToggleComponent.vue?vue&type=style&index=0&id=01a442bc&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ToggleComponent.vue?vue&type=style&index=0&id=01a442bc&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* The switch - the box around the slider */\n.switch[data-v-01a442bc] {\n    position: relative;\n    display: inline-block;\n    width: 50px;\n    height: 30px;\n}\n\n/* Hide default HTML checkbox */\n.switch input[data-v-01a442bc] {\n    display: none;\n}\n\n/* The slider */\n.slider[data-v-01a442bc] {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: #ccc;\n    transition: .4s;\n    border-radius: 16px;\n}\n.slider[data-v-01a442bc]:before {\n    position: absolute;\n    content: \"\";\n    height: 22px;\n    width: 22px;\n    left: 5px;\n    bottom: 4px;\n    background-color: white;\n    transition: .4s;\n    border-radius: 50%;\n}\ninput:checked + .slider[data-v-01a442bc] {\n    background-color: #2196F3;\n}\ninput:focus + .slider[data-v-01a442bc] {\n    box-shadow: 0 0 1px #2196F3;\n}\ninput:checked + .slider[data-v-01a442bc]:before {\n    -webkit-transform: translateX(18px);\n    transform: translateX(18px);\n}\nlabel[data-v-01a442bc] {\n    margin: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserComponent.vue?vue&type=style&index=0&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/UserComponent.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.filter-list {\n    padding-left: 0;\n}\n.filter-list-item {\n    list-style: none;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserRolesComponent.vue?vue&type=style&index=0&id=74de073c&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/UserRolesComponent.vue?vue&type=style&index=0&id=74de073c&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.card-header[data-v-74de073c] {\n    cursor: pointer;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=style&index=0&id=56a234a4&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=style&index=0&id=56a234a4&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./AutoCompleteComponent.vue?vue&type=style&index=0&id=56a234a4&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=style&index=0&id=56a234a4&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/EditUserComponent.vue?vue&type=style&index=0&id=3039b261&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/EditUserComponent.vue?vue&type=style&index=0&id=3039b261&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditUserComponent.vue?vue&type=style&index=0&id=3039b261&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/EditUserComponent.vue?vue&type=style&index=0&id=3039b261&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/InputTagComponent.vue?vue&type=style&index=0&id=2b1d27c6&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/InputTagComponent.vue?vue&type=style&index=0&id=2b1d27c6&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./InputTagComponent.vue?vue&type=style&index=0&id=2b1d27c6&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/InputTagComponent.vue?vue&type=style&index=0&id=2b1d27c6&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ListPaginationComponent.vue?vue&type=style&index=0&id=47d0489e&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ListPaginationComponent.vue?vue&type=style&index=0&id=47d0489e&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListPaginationComponent.vue?vue&type=style&index=0&id=47d0489e&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ListPaginationComponent.vue?vue&type=style&index=0&id=47d0489e&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/MailsComponent.vue?vue&type=style&index=0&id=4e6d1838&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/MailsComponent.vue?vue&type=style&index=0&id=4e6d1838&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./MailsComponent.vue?vue&type=style&index=0&id=4e6d1838&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/MailsComponent.vue?vue&type=style&index=0&id=4e6d1838&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ModalComponent.vue?vue&type=style&index=0&id=465fd2c7&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ModalComponent.vue?vue&type=style&index=0&id=465fd2c7&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalComponent.vue?vue&type=style&index=0&id=465fd2c7&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ModalComponent.vue?vue&type=style&index=0&id=465fd2c7&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/NewMailComponent.vue?vue&type=style&index=0&id=09b4367d&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/NewMailComponent.vue?vue&type=style&index=0&id=09b4367d&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewMailComponent.vue?vue&type=style&index=0&id=09b4367d&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/NewMailComponent.vue?vue&type=style&index=0&id=09b4367d&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PluginsComponent.vue?vue&type=style&index=0&id=1ba5dcf4&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/PluginsComponent.vue?vue&type=style&index=0&id=1ba5dcf4&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./PluginsComponent.vue?vue&type=style&index=0&id=1ba5dcf4&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PluginsComponent.vue?vue&type=style&index=0&id=1ba5dcf4&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ProfileComponent.vue?vue&type=style&index=0&id=1891bcea&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ProfileComponent.vue?vue&type=style&index=0&id=1891bcea&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ProfileComponent.vue?vue&type=style&index=0&id=1891bcea&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ProfileComponent.vue?vue&type=style&index=0&id=1891bcea&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=style&index=0&id=2f19ff22&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=style&index=0&id=2f19ff22&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./RoleAbilitiesComponent.vue?vue&type=style&index=0&id=2f19ff22&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=style&index=0&id=2f19ff22&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RolesComponent.vue?vue&type=style&index=0&id=83734e92&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RolesComponent.vue?vue&type=style&index=0&id=83734e92&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./RolesComponent.vue?vue&type=style&index=0&id=83734e92&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RolesComponent.vue?vue&type=style&index=0&id=83734e92&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/TagComponent.vue?vue&type=style&index=0&id=8480fa8c&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/TagComponent.vue?vue&type=style&index=0&id=8480fa8c&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./TagComponent.vue?vue&type=style&index=0&id=8480fa8c&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/TagComponent.vue?vue&type=style&index=0&id=8480fa8c&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ToggleComponent.vue?vue&type=style&index=0&id=01a442bc&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ToggleComponent.vue?vue&type=style&index=0&id=01a442bc&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ToggleComponent.vue?vue&type=style&index=0&id=01a442bc&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ToggleComponent.vue?vue&type=style&index=0&id=01a442bc&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserComponent.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/UserComponent.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserComponent.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserComponent.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserRolesComponent.vue?vue&type=style&index=0&id=74de073c&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/UserRolesComponent.vue?vue&type=style&index=0&id=74de073c&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserRolesComponent.vue?vue&type=style&index=0&id=74de073c&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserRolesComponent.vue?vue&type=style&index=0&id=74de073c&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=template&id=56a234a4&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=template&id=56a234a4&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "input-group" }, [
    _c("label", { attrs: { for: _vm.id, hidden: "" } }, [
      _vm._v(_vm._s(_vm.label))
    ]),
    _vm._v(" "),
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.model[_vm.searchAttr],
          expression: "model[searchAttr]"
        }
      ],
      staticClass: "form-control rounded-left",
      class: { rounded: !_vm.showButton },
      attrs: { id: _vm.id, type: "text", placeholder: _vm.placeholder },
      domProps: { value: _vm.model[_vm.searchAttr] },
      on: {
        input: [
          function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.$set(_vm.model, _vm.searchAttr, $event.target.value)
          },
          _vm.searchData
        ],
        keyup: [
          function($event) {
            if (
              !("button" in $event) &&
              _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])
            ) {
              return null
            }
            return _vm.onArrowUp($event)
          },
          function($event) {
            if (
              !("button" in $event) &&
              _vm._k($event.keyCode, "down", 40, $event.key, [
                "Down",
                "ArrowDown"
              ])
            ) {
              return null
            }
            return _vm.onArrowDown($event)
          },
          function($event) {
            if (
              !("button" in $event) &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            return _vm.onEnter($event)
          }
        ]
      }
    }),
    _vm._v(" "),
    _vm.showButton
      ? _c("div", { staticClass: "input-group-append" }, [
          _c(
            "button",
            {
              staticClass:
                "btn btn-primary input-group-text text-capitnpm rund alize",
              on: { click: _vm.submit }
            },
            [_vm._v(_vm._s(_vm.buttonText))]
          )
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.suggestionsAreOpen
      ? _c(
          "div",
          { staticClass: "ac__suggestions list-group w-100 pt-2" },
          [
            _vm.isFetching
              ? _c("p", { staticClass: "list-group-item" }, [
                  _vm._v("Loading...")
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm._l(_vm.limitedSuggestions, function(suggestion, i) {
              return _vm.suggestions.length > 0
                ? _c(
                    "button",
                    {
                      key: suggestion[_vm.searchAttr] + i,
                      staticClass:
                        "ac__suggestion list-group-item list-group-item-action",
                      class: { active: _vm.seletectedSuggestion === i },
                      on: {
                        click: function($event) {
                          _vm.onSuggestionClick(i)
                        }
                      }
                    },
                    [
                      _vm._t(
                        "default",
                        [
                          _vm._v(
                            "\n                " +
                              _vm._s(suggestion[_vm.searchAttr]) +
                              "\n            "
                          )
                        ],
                        {
                          suggestion: suggestion,
                          search_query: _vm.model[_vm.searchAttr]
                        }
                      )
                    ],
                    2
                  )
                : _vm._e()
            }),
            _vm._v(" "),
            _vm.suggestions.length === 0 && !_vm.isFetching
              ? _c("p", { staticClass: "list-group-item" }, [
                  _vm._v("No Resident found.")
                ])
              : _vm._e()
          ],
          2
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/EditUserComponent.vue?vue&type=template&id=3039b261&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/EditUserComponent.vue?vue&type=template&id=3039b261&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "form-group row" }, [
      _c("div", { staticClass: "col-10 offset-1" }, [
        _c("label", { attrs: { for: "firstname" } }, [_vm._v("First Name")]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.updatedUser.firstname,
              expression: "updatedUser.firstname"
            }
          ],
          class: { "form-control": true, "is-invalid": _vm.errors.firstname },
          attrs: {
            id: "firstname",
            type: "text",
            placeholder: _vm.$t("user.first_name"),
            name: "firstname",
            required: "",
            autofocus: ""
          },
          domProps: { value: _vm.updatedUser.firstname },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.updatedUser, "firstname", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _vm.errors.firstname
          ? _c("span", { staticClass: "invalid-feedback" }, [
              _c("strong", [_vm._v(_vm._s(_vm.errors.firstname[0]))])
            ])
          : _vm._e()
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "form-group row" }, [
      _c("div", { staticClass: "col-10 offset-1" }, [
        _c("label", { attrs: { for: "lastname" } }, [_vm._v("Last Name")]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.updatedUser.lastname,
              expression: "updatedUser.lastname"
            }
          ],
          class: { "form-control": true, "is-invalid": _vm.errors.lastname },
          attrs: {
            id: "lastname",
            type: "text",
            placeholder: _vm.$t("user.last_name"),
            name: "lastname",
            required: "",
            autofocus: ""
          },
          domProps: { value: _vm.updatedUser.lastname },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.updatedUser, "lastname", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _vm.errors.lastname
          ? _c("span", { staticClass: "invalid-feedback" }, [
              _c("strong", [_vm._v(_vm._s(_vm.errors.lastname[0]))])
            ])
          : _vm._e()
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "form-group row" }, [
      _c("div", { staticClass: "col-md-2 offset-1" }, [
        _c("label", { attrs: { for: "floor" } }, [_vm._v("Floor")]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.updatedUser.floor,
              expression: "updatedUser.floor"
            }
          ],
          class: { "form-control": true, "is-invalid": _vm.errors.floor },
          attrs: {
            id: "floor",
            type: "number",
            min: "0",
            max: "15",
            size: "2",
            placeholder: _vm.$t("user.floor"),
            name: "floor",
            required: "",
            autofocus: ""
          },
          domProps: { value: _vm.updatedUser.floor },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.updatedUser, "floor", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _vm.errors.floor
          ? _c("span", { staticClass: "invalid-feedback" }, [
              _c("strong", [_vm._v(_vm._s(_vm.errors.floor[0]))])
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-2" }, [
        _c("label", { attrs: { for: "room" } }, [_vm._v("Room")]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.updatedUser.room,
              expression: "updatedUser.room"
            }
          ],
          class: { "form-control": true, "is-invalid": _vm.errors.room },
          attrs: {
            id: "room",
            type: "number",
            min: "1",
            max: "16",
            size: "2",
            placeholder: _vm.$t("user.room"),
            name: "room",
            required: "",
            autofocus: ""
          },
          domProps: { value: _vm.updatedUser.room },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.updatedUser, "room", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _vm.errors.room
          ? _c("span", { staticClass: "invalid-feedback" }, [
              _c("strong", [_vm._v(_vm._s(_vm.errors.room[0]))])
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-6" }, [
        _c("label", { attrs: { for: "house" } }, [_vm._v("House")]),
        _vm._v(" "),
        _c(
          "select",
          {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.updatedUser.house,
                expression: "updatedUser.house"
              }
            ],
            class: { "form-control": true, "is-invalid": _vm.errors.house },
            attrs: { id: "house", name: "house", required: "", autofocus: "" },
            on: {
              change: function($event) {
                var $$selectedVal = Array.prototype.filter
                  .call($event.target.options, function(o) {
                    return o.selected
                  })
                  .map(function(o) {
                    var val = "_value" in o ? o._value : o.value
                    return val
                  })
                _vm.$set(
                  _vm.updatedUser,
                  "house",
                  $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                )
              }
            }
          },
          _vm._l(_vm.houseNames, function(dorm) {
            return _c("option", { domProps: { value: dorm } }, [
              _vm._v(_vm._s(dorm))
            ])
          }),
          0
        ),
        _vm._v(" "),
        _vm.errors.house
          ? _c("span", { staticClass: "invalid-feedback" }, [
              _c("strong", [_vm._v(_vm._s(_vm.errors.house[0]))])
            ])
          : _vm._e()
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "form-group row" }, [
      _c("div", { staticClass: "col-10 offset-1" }, [
        _c("label", { attrs: { for: "username" } }, [_vm._v("Username")]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.updatedUser.username,
              expression: "updatedUser.username"
            }
          ],
          class: { "form-control": true, "is-invalid": _vm.errors.username },
          attrs: {
            id: "username",
            type: "text",
            placeholder: _vm.$t("user.username"),
            name: "username",
            disabled: !_vm.$can("manage_users"),
            required: "",
            autofocus: ""
          },
          domProps: { value: _vm.updatedUser.username },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.updatedUser, "username", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _vm.errors.username
          ? _c("span", { staticClass: "invalid-feedback" }, [
              _c("strong", [_vm._v(_vm._s(_vm.errors.username[0]))])
            ])
          : _vm._e()
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "form-group row" }, [
      _c("div", { staticClass: "col-10 offset-1" }, [
        _c("label", { attrs: { for: "email" } }, [_vm._v("Email")]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.updatedUser.email,
              expression: "updatedUser.email"
            }
          ],
          class: { "form-control": true, "is-invalid": _vm.errors.email },
          attrs: {
            id: "email",
            type: "email",
            placeholder: _vm.$t("user.email"),
            name: "email",
            required: ""
          },
          domProps: { value: _vm.updatedUser.email },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.updatedUser, "email", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _vm.errors.email
          ? _c("span", { staticClass: "invalid-feedback" }, [
              _c("strong", [_vm._v(_vm._s(_vm.errors.email[0]))])
            ])
          : _vm._e()
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "form-group row mb-0" }, [
      _c("div", { staticClass: "col-6 offset-3" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-block btn-success",
            on: { click: _vm.saveUser }
          },
          [_vm._v("\n                Save\n            ")]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/InputTagComponent.vue?vue&type=template&id=2b1d27c6&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/InputTagComponent.vue?vue&type=template&id=2b1d27c6&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "input-tag-wrapper",
      class: { "input-tag-wrapper__disabled": _vm.disabled }
    },
    [
      _c(
        "div",
        { staticClass: "input-tag-tags" },
        _vm._l(_vm.currentTags, function(t, i) {
          return _c("tag-component", {
            key: i,
            attrs: {
              id: i,
              title: t,
              btnAction: _vm.removeTag,
              "tag-class": "bg-primary text-white",
              disabled: _vm.disabled
            }
          })
        }),
        1
      ),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.tag,
            expression: "tag"
          }
        ],
        staticClass: "input-tag-input",
        attrs: {
          type: "text",
          title: "recipient-input",
          placeholder: _vm.placeholder,
          disabled: _vm.disabled
        },
        domProps: { value: _vm.tag },
        on: {
          keyup: function($event) {
            _vm.onKeyPress(_vm.tag, $event)
          },
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.tag = $event.target.value
          }
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ListPaginationComponent.vue?vue&type=template&id=47d0489e&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ListPaginationComponent.vue?vue&type=template&id=47d0489e&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "list-pagination col-md-6 col-xxl-4 offset-xxl-1" },
    [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.search_query,
            expression: "search_query"
          }
        ],
        staticClass: "form-control mb-2",
        attrs: {
          type: "text",
          title: "search query",
          placeholder: _vm.placeholder
        },
        domProps: { value: _vm.search_query },
        on: {
          keyup: function($event) {
            _vm.currentPage = 1
          },
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.search_query = $event.target.value
          }
        }
      }),
      _vm._v(" "),
      _c(
        "ul",
        { staticClass: "list-group" },
        [
          _vm._l(_vm.currentItems, function(item) {
            return _vm._t(
              "default",
              [
                _c("li", [
                  _vm._v(
                    _vm._s(
                      _vm._f("highlight")(
                        item[_vm.searchAttr],
                        _vm.search_query
                      )
                    )
                  )
                ])
              ],
              { item: item, search_query: _vm.search_query }
            )
          }),
          _vm._v(" "),
          _vm.currentItems.length === 0
            ? _c(
                "li",
                {
                  staticClass:
                    "list-group-item d-flex justify-content-between align-items-center"
                },
                [_c("span", [_vm._v("No Results")])]
              )
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _vm.pages > 1
        ? _c(
            "div",
            {
              staticClass:
                "list-pagination_pages_wrapper mt-2 d-flex justify-content-center align-items-baseline"
            },
            [
              _vm.currentPage > 1
                ? _c(
                    "button",
                    {
                      staticClass: "btn btn-link",
                      on: { click: _vm.previousPage }
                    },
                    [_vm._v("Previous")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("span", [
                _vm._v(_vm._s(this.currentPage) + " of " + _vm._s(this.pages))
              ]),
              _vm._v(" "),
              _vm.currentPage < _vm.pages
                ? _c(
                    "button",
                    {
                      staticClass: "btn btn-link",
                      on: { click: _vm.nextPage }
                    },
                    [_vm._v("Next")]
                  )
                : _vm._e()
            ]
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/MailsComponent.vue?vue&type=template&id=4e6d1838&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/MailsComponent.vue?vue&type=template&id=4e6d1838&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "card" }, [
    _c("div", { staticClass: "card-header text-capitalize" }, [
      _c("span", [_vm._v(_vm._s(_vm.$tc("general.mail", 2)))])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "card-body row" },
      [_c("new-mail", { staticClass: "col-10 offset-1" })],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ModalComponent.vue?vue&type=template&id=465fd2c7&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ModalComponent.vue?vue&type=template&id=465fd2c7&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "modal" } }, [
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.show,
            expression: "show"
          }
        ],
        staticClass: "modal-mask",
        on: { click: _vm.close }
      },
      [
        _c(
          "div",
          {
            staticClass: "modal-container",
            on: {
              click: function($event) {
                $event.stopPropagation()
              }
            }
          },
          [_vm._t("default")],
          2
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/NewMailComponent.vue?vue&type=template&id=09b4367d&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/NewMailComponent.vue?vue&type=template&id=09b4367d&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container" },
    [
      _c(
        "select",
        {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.sender,
              expression: "sender"
            }
          ],
          staticClass: "custom-select mb-2",
          on: {
            change: function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value
                  return val
                })
              _vm.sender = $event.target.multiple
                ? $$selectedVal
                : $$selectedVal[0]
            }
          }
        },
        [
          _c("option", { attrs: { value: "", selected: "" } }, [
            _vm._v("Choose role as sender")
          ]),
          _vm._v(" "),
          _vm._l(_vm.senderList, function(s) {
            return _c("option", { domProps: { value: s.name } }, [
              _vm._v("Send as " + _vm._s(_vm._f("capitalize")(s.name)))
            ])
          })
        ],
        2
      ),
      _vm._v(" "),
      _c("input-tag", {
        attrs: {
          tags: _vm.recipients,
          "validate-tag": _vm.validateRecipient,
          placeholder: _vm._f("capitalize")(_vm.$t("mail.to")),
          disabled: _vm.toAll || _vm.group !== ""
        }
      }),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-link btn-sm pt-0",
          attrs: { disabled: _vm.toAll },
          on: {
            click: function($event) {
              _vm.showMoreReceiverOptions = !_vm.showMoreReceiverOptions
            }
          }
        },
        [
          _vm._v(
            "\n        " +
              _vm._s(
                _vm.showMoreReceiverOptions
                  ? _vm.$tc("mail.lessReceiverOptions")
                  : _vm.$t("mail.moreReceiverOptions")
              ) +
              "\n    "
          )
        ]
      ),
      _vm._v(" "),
      _c("transition", { attrs: { name: "slide-in" } }, [
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.showMoreReceiverOptions,
                expression: "showMoreReceiverOptions"
              }
            ],
            staticClass: "bg-light p-1"
          },
          [
            _c("div", { staticClass: "custom-control custom-checkbox mb-2" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.toAll,
                    expression: "toAll"
                  }
                ],
                staticClass: "custom-control-input",
                attrs: { type: "checkbox", id: "toAll" },
                domProps: {
                  checked: Array.isArray(_vm.toAll)
                    ? _vm._i(_vm.toAll, null) > -1
                    : _vm.toAll
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.toAll,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.toAll = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.toAll = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.toAll = $$c
                    }
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "label",
                {
                  staticClass: "custom-control-label",
                  attrs: { for: "toAll" }
                },
                [_vm._v(_vm._s(_vm.$tc("mail.toAll")))]
              )
            ]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.group,
                    expression: "group"
                  }
                ],
                staticClass: "custom-select mb-2",
                attrs: { disabled: _vm.toAll },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.group = $event.target.multiple
                      ? $$selectedVal
                      : $$selectedVal[0]
                  }
                }
              },
              [
                _c("option", { attrs: { value: "", selected: "" } }, [
                  _vm._v("Choose group to send to")
                ]),
                _vm._v(" "),
                _vm._l(_vm.groupList, function(g, key) {
                  return _c("option", { domProps: { value: key } }, [
                    _vm._v("Send to " + _vm._s(_vm._f("capitalize")(g)))
                  ])
                })
              ],
              2
            ),
            _vm._v(" "),
            _c("input-tag", {
              staticClass: "mb-2",
              attrs: {
                tags: _vm.ccRecipients,
                "validate-tag": _vm.validateRecipient,
                placeholder: _vm.$t("mail.cc"),
                disabled: _vm.toAll || _vm.group !== ""
              }
            }),
            _vm._v(" "),
            _c("input-tag", {
              staticClass: "mb-2",
              attrs: {
                tags: _vm.bccRecipients,
                "validate-tag": _vm.validateRecipient,
                placeholder: _vm.$t("mail.bcc"),
                disabled: _vm.toAll || _vm.group !== ""
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.subject,
            expression: "subject"
          }
        ],
        staticClass: "form-control mb-2",
        attrs: {
          type: "text",
          placeholder: _vm._f("capitalize")(_vm.$t("mail.subject")),
          required: ""
        },
        domProps: { value: _vm.subject },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.subject = $event.target.value
          }
        }
      }),
      _vm._v(" "),
      _c("textarea", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.content,
            expression: "content"
          }
        ],
        staticClass: "form-control mb-2",
        attrs: {
          id: "message",
          placeholder: _vm._f("capitalize")(_vm.$t("mail.message")),
          rows: "13"
        },
        domProps: { value: _vm.content },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.content = $event.target.value
          }
        }
      }),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.$refs.upload && _vm.$refs.upload.dropActive,
              expression: "$refs.upload && $refs.upload.dropActive"
            }
          ],
          staticClass: "drop-active"
        },
        [_c("h3", [_vm._v("Drop files to upload")])]
      ),
      _vm._v(" "),
      _vm.attachments.length
        ? _c(
            "div",
            { staticClass: "d-flex flex-wrap my-1" },
            _vm._l(_vm.attachments, function(file, index) {
              return _c(
                "div",
                {
                  key: file.id,
                  staticClass:
                    "d-xxl-inline-block border mr-1 mb-1 p-2 rounded border-primary",
                  class: {
                    "border-danger": file.error,
                    error: file.error,
                    "border-success": file.success,
                    success: file.success
                  }
                },
                [
                  !file.active
                    ? _c(
                        "button",
                        {
                          staticClass: "close",
                          attrs: { type: "button", "aria-label": "Close" },
                          on: {
                            click: function($event) {
                              _vm.removeFile(index)
                            }
                          }
                        },
                        [
                          _c("span", { attrs: { "aria-hidden": "true" } }, [
                            _vm._v("×")
                          ])
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c("p", { staticClass: "mb-0 mr-3 text-nowrap" }, [
                    _vm._v(_vm._s(file.name))
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "small font-italic" }, [
                    _vm._v(_vm._s(_vm._f("formatSize")(file.size)))
                  ]),
                  _vm._v(" "),
                  file.error
                    ? _c("span", { staticClass: "ml-2" }, [
                        _c(
                          "svg",
                          {
                            staticStyle: {
                              "enable-background": "new 0 0 510 510"
                            },
                            attrs: {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "16",
                              height: "16",
                              viewBox: "0 0 510 510",
                              "xml:space": "preserve"
                            }
                          },
                          [
                            _c("g", { attrs: { id: "replay" } }, [
                              _c("path", {
                                attrs: {
                                  d:
                                    "M255,102V0L127.5,127.5L255,255V153c84.15,0,153,68.85,153,153c0,84.15-68.85,153-153,153c-84.15,0-153-68.85-153-153H51\n                        c0,112.2,91.8,204,204,204s204-91.8,204-204S367.2,102,255,102z",
                                  fill: "#474747"
                                }
                              })
                            ])
                          ]
                        )
                      ])
                    : file.success
                      ? _c("span", { staticClass: "ml-2" }, [
                          _c(
                            "svg",
                            {
                              staticStyle: {
                                "enable-background": "new 0 0 510 510"
                              },
                              attrs: {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "16",
                                height: "16",
                                viewBox: "0 0 510 510",
                                "xml:space": "preserve"
                              }
                            },
                            [
                              _c("g", [
                                _c("g", { attrs: { id: "check-circle" } }, [
                                  _c("path", {
                                    attrs: {
                                      d:
                                        "M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M204,382.5L76.5,255l35.7-35.7\n                            l91.8,91.8l193.8-193.8l35.7,35.7L204,382.5z",
                                      fill: "#91DC5A"
                                    }
                                  })
                                ])
                              ])
                            ]
                          )
                        ])
                      : file.active
                        ? _c("span", { staticClass: "ml-2" }, [
                            _c(
                              "svg",
                              {
                                attrs: {
                                  width: "16",
                                  height: "16",
                                  viewBox: "0 0 38 38",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  stroke: "#fff"
                                }
                              },
                              [
                                _c(
                                  "g",
                                  {
                                    attrs: {
                                      fill: "none",
                                      "fill-rule": "evenodd"
                                    }
                                  },
                                  [
                                    _c(
                                      "g",
                                      {
                                        attrs: {
                                          transform: "translate(1 1)",
                                          "stroke-width": "2"
                                        }
                                      },
                                      [
                                        _c("circle", {
                                          attrs: {
                                            "stroke-opacity": ".5",
                                            cx: "18",
                                            cy: "18",
                                            r: "18"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "path",
                                          {
                                            attrs: {
                                              d: "M36 18c0-9.94-8.06-18-18-18",
                                              stroke: "blue"
                                            }
                                          },
                                          [
                                            _c("animateTransform", {
                                              attrs: {
                                                attributeName: "transform",
                                                type: "rotate",
                                                from: "0 18 18",
                                                to: "360 18 18",
                                                dur: "1s",
                                                repeatCount: "indefinite"
                                              }
                                            })
                                          ],
                                          1
                                        )
                                      ]
                                    )
                                  ]
                                )
                              ]
                            )
                          ])
                        : _c("span")
                ]
              )
            }),
            0
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "vue-upload",
        {
          ref: "upload",
          staticClass: "btn btn-outline-secondary",
          attrs: {
            "post-action": _vm.route("api.mailAttachments"),
            "custom-action": _vm.uploadAttachment,
            multiple: true,
            drop: true,
            "drop-directory": true
          },
          on: { "input-file": _vm.inputFile },
          model: {
            value: _vm.attachments,
            callback: function($$v) {
              _vm.attachments = $$v
            },
            expression: "attachments"
          }
        },
        [_vm._v("\n        Attach Files\n    ")]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "d-flex justify-content-lg-end justify-content-center" },
        [
          _c(
            "button",
            {
              staticClass: "btn btn-block btn-primary",
              attrs: { type: "submit" },
              on: { click: _vm.sendMail }
            },
            [
              _vm._v(
                "\n            " + _vm._s(_vm.$t("mail.send")) + "\n        "
              )
            ]
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PluginsComponent.vue?vue&type=template&id=1ba5dcf4&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/PluginsComponent.vue?vue&type=template&id=1ba5dcf4&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "plugins" },
    [
      _c("div", { staticClass: "card" }, [
        _c("div", { staticClass: "card-header text-capitalize" }, [
          _c("span", [_vm._v(_vm._s(_vm.$tc("general.plugin", 2)))])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "card-body" }, [
          _c("p", { staticClass: "lead mb-1" }, [
            _vm._v("Manage installed plugins.")
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "lead font-weight-bold text-danger" }, [
            _vm._v(
              "All changes made here could have a negative impact on the\n                functionality of the application. Make\n                changes carefully."
            )
          ]),
          _vm._v(" "),
          _c("table", { staticClass: "table table-hover" }, [
            _c(
              "tbody",
              _vm._l(_vm.localPlugins, function(plugin) {
                return _c("tr", [
                  _c(
                    "td",
                    { staticClass: "align-middle content-fit" },
                    [
                      _c("toggle", {
                        staticClass: "align-middle",
                        on: {
                          change: function($event) {
                            _vm.updatePlugin(plugin)
                          }
                        },
                        model: {
                          value: plugin.is_active,
                          callback: function($$v) {
                            _vm.$set(plugin, "is_active", $$v)
                          },
                          expression: "plugin.is_active"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("td", { staticClass: "align-middle" }, [
                    _vm._v(
                      "\n                        " +
                        _vm._s(plugin.name) +
                        "\n                        "
                    ),
                    _c(
                      "span",
                      {
                        staticClass: "font-weight-light",
                        model: {
                          value: plugin.description,
                          callback: function($$v) {
                            _vm.$set(plugin, "description", $$v)
                          },
                          expression: "plugin.description"
                        }
                      },
                      [_vm._v(" - " + _vm._s(plugin.description))]
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", { staticClass: "align-middle content-fit" }, [
                    plugin.manually_added
                      ? _c(
                          "button",
                          {
                            staticClass: "btn btn-outline-danger",
                            on: {
                              click: function($event) {
                                _vm.confirmDeletion(plugin)
                              }
                            }
                          },
                          [_vm._v("Delete\n                        ")]
                        )
                      : _vm._e()
                  ])
                ])
              }),
              0
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c(
        "modal",
        {
          attrs: { show: _vm.showConfirmDeletion },
          on: {
            close: function($event) {
              _vm.showConfirmDeletion = false
            }
          }
        },
        [
          _c("div", { staticClass: "text-center" }, [
            _c("p", { staticClass: "h4 my-3" }, [
              _vm._v(
                "Are you sure you want to delete the plugin\n                "
              ),
              _c("strong", { staticClass: "text-capitalize" }, [
                _vm._v(_vm._s(_vm.pluginToDelete.name))
              ]),
              _vm._v("?\n            ")
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "text-danger" }, [
              _vm._v(
                "Beware that deleting a plugin can break the functionality of the system. Delete\n                with caution."
              )
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-lg btn-link",
                on: {
                  click: function($event) {
                    _vm.deletePlugin(_vm.pluginToDelete)
                  }
                }
              },
              [_vm._v("Yes!")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-lg btn-link text-secondary",
                on: {
                  click: function($event) {
                    _vm.showConfirmDeletion = false
                  }
                }
              },
              [_vm._v("Cancel")]
            )
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ProfileComponent.vue?vue&type=template&id=1891bcea&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ProfileComponent.vue?vue&type=template&id=1891bcea&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container" },
    [
      _c("div", { staticClass: "card" }, [
        _c("div", { staticClass: "card-header text-capitalize" }, [
          _c("span", [_vm._v(_vm._s(_vm.$t("user.profile")))])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "card-body text-capitalize" }, [
          _c("div", { staticClass: "section col-10 offset-1" }, [
            _c("div", { staticClass: "clearfix" }, [
              _c("h4", { staticClass: "float-left" }, [
                _vm._v("Personal Info")
              ]),
              _vm._v(" "),
              _vm.$can("manage_users", _vm.user.id)
                ? _c("div", { staticClass: "float-right" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-primary",
                        on: { click: _vm.changeEditMode }
                      },
                      [_vm._v("Edit")]
                    )
                  ])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row py-1 form-group" }, [
              _c(
                "div",
                { staticClass: "col-xxl-1 col-lg-2 font-weight-bold" },
                [_vm._v(_vm._s(_vm.$t("user.first_name")))]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-6" }, [
                _vm._v(_vm._s(_vm.user.firstname))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row py-1 form-group" }, [
              _c(
                "div",
                { staticClass: "col-xxl-1 col-lg-2 font-weight-bold" },
                [_vm._v(_vm._s(_vm.$t("user.last_name")))]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-6" }, [
                _vm._v(_vm._s(_vm.user.lastname))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row py-1 form-group" }, [
              _c(
                "div",
                { staticClass: "col-xxl-1 col-lg-2 font-weight-bold" },
                [_vm._v(_vm._s(_vm.$t("user.email")))]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-6" }, [
                _vm._v(_vm._s(_vm.user.email))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row py-1 form-group" }, [
              _c(
                "div",
                { staticClass: "col-xxl-1 col-lg-2 font-weight-bold" },
                [_vm._v(_vm._s(_vm.$t("user.username")))]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-6" }, [
                _vm._v(_vm._s(_vm.user.username))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row py-1 form-group" }, [
              _c(
                "div",
                { staticClass: "col-xxl-1 col-lg-2 font-weight-bold" },
                [_vm._v(_vm._s(_vm.$t("user.room")))]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-auto" }, [
                _vm._v(_vm._s(_vm.user.full_room))
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "col-xxl-1 col-lg-2 font-weight-bold" },
                [_vm._v(_vm._s(_vm.$t("user.house")))]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-auto" }, [
                _vm._v(_vm._s(_vm.user.house))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row py-1" }, [
              _c(
                "div",
                { staticClass: "col-xxl-1 col-lg-2 font-weight-bold" },
                [_vm._v(_vm._s(_vm.$t("user.created_at")))]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-6" }, [
                _vm._v(
                  _vm._s(_vm._f("moment")(_vm.user.created_at, "calendar"))
                )
              ])
            ]),
            _vm._v(" "),
            _vm.user.deleted_at
              ? _c("div", { staticClass: "row py-1" }, [
                  _c(
                    "div",
                    { staticClass: "col-xxl-1 col-lg-2 font-weight-bold" },
                    [_vm._v(_vm._s(_vm.$t("user.deleted_at")))]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-auto" }, [
                    _vm._v(
                      _vm._s(_vm._f("moment")(_vm.user.deleted_at, "calendar"))
                    )
                  ])
                ])
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _vm.user.roles.length > 0 || _vm.user.abilities.length > 0
            ? _c("div", { staticClass: "section col-10 offset-1" }, [
                _c("h4", [_vm._v("Roles & Abilities")]),
                _vm._v(" "),
                _vm.user.roles.length > 0
                  ? _c("div", { staticClass: "row" }, [
                      _c("div", { staticClass: "col" }, [
                        _c("h5", [_vm._v("Is")]),
                        _vm._v(" "),
                        _c(
                          "ul",
                          _vm._l(_vm.user.roles, function(role) {
                            return _c("li", [_vm._v(_vm._s(role.title))])
                          }),
                          0
                        )
                      ]),
                      _vm._v(" "),
                      _vm.user.abilities.length > 0
                        ? _c("div", { staticClass: "col" }, [
                            _c("h5", [_vm._v("Can")]),
                            _vm._v(" "),
                            _c(
                              "ul",
                              { staticClass: "text-normal" },
                              _vm._l(_vm.user.abilities, function(ability) {
                                return _c("li", [_vm._v(_vm._s(ability.title))])
                              }),
                              0
                            )
                          ])
                        : _vm.$is("admin")
                          ? _c("div", { staticClass: "col" }, [
                              _c("h5", [_vm._v("Can")]),
                              _vm._v(" "),
                              _c(
                                "p",
                                { staticClass: "text-normal font-weight-bold" },
                                [
                                  _vm._v(
                                    "As an administrator all functions are available."
                                  )
                                ]
                              )
                            ])
                          : _vm._e()
                    ])
                  : _vm._e()
              ])
            : _vm._e()
        ])
      ]),
      _vm._v(" "),
      _c(
        "modal",
        {
          attrs: { show: _vm.showEditUserModal },
          on: {
            close: function($event) {
              _vm.showEditUserModal = false
            }
          }
        },
        [
          _c("edit-user-component", {
            attrs: { houseNames: _vm.houseNames, user: _vm.user }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=template&id=2f19ff22&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=template&id=2f19ff22&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("section", { staticClass: "table-responsive" }, [
        _c("table", { staticClass: "table table-hover" }, [
          _c(
            "thead",
            { staticClass: "text-center" },
            [
              _c("th"),
              _vm._v(" "),
              _vm._l(_vm.abilities, function(ability) {
                return _c(
                  "th",
                  {
                    staticClass: "text-capitalize",
                    attrs: {
                      scope: "col",
                      "data-toggle": "tooltip",
                      "data-placement": "auto",
                      title: ability.title
                    }
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm._f("transform-role")(ability.name)) +
                        "\n            "
                    )
                  ]
                )
              }),
              _vm._v(" "),
              _c("th"),
              _vm._v(" "),
              _c("th")
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.currentRoles, function(role) {
              return _c(
                "tr",
                [
                  _c(
                    "th",
                    {
                      staticClass: "text-capitalize pl-4",
                      attrs: {
                        scope: "row",
                        "data-toggle": "tooltip",
                        "data-placement": "auto",
                        title: role.title
                      }
                    },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(role.name) +
                          "\n                "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.abilities, function(ability) {
                    return _c("td", { staticClass: "text-center" }, [
                      _c(
                        "div",
                        {
                          staticClass: "custom-control custom-checkbox d-inline"
                        },
                        [
                          _c("input", {
                            ref: role.name,
                            refInFor: true,
                            staticClass: "custom-control-input",
                            attrs: {
                              type: "checkbox",
                              "data-role": role.name,
                              "data-ability": ability.name,
                              id: role.name + "-" + ability.name,
                              disabled: role.name === "admin"
                            },
                            domProps: {
                              checked:
                                role.abilities.some(function(ab) {
                                  return ab.name === ability.name
                                }) || role.name === "admin"
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            {
                              staticClass: "custom-control-label",
                              attrs: { for: role.name + "-" + ability.name }
                            },
                            [_vm._v("‌")]
                          )
                        ]
                      )
                    ])
                  }),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "button",
                      {
                        staticClass:
                          "text-capitalize btn btn-sm btn-outline-primary",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            _vm.updateRole(role)
                          }
                        }
                      },
                      [_vm._v("Update\n                    ")]
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "button",
                      {
                        staticClass:
                          "text-capitalize btn btn-sm btn-outline-danger",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            _vm.confirmDeletion(role)
                          }
                        }
                      },
                      [_vm._v("Delete\n                    ")]
                    )
                  ])
                ],
                2
              )
            }),
            0
          )
        ])
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "form-group row my-3" }, [
        _c("div", { staticClass: "col-md-3 offset-md-1 pb-2" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.newRole.name,
                expression: "newRole.name"
              }
            ],
            staticClass: "form-control text-capitalize",
            attrs: { type: "text", placeholder: "New Role Name.." },
            domProps: { value: _vm.newRole.name },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.newRole, "name", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-5 pb-2" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.newRole.title,
                expression: "newRole.title"
              }
            ],
            staticClass: "form-control text-capitalize",
            attrs: { type: "text", placeholder: "New role Description.." },
            domProps: { value: _vm.newRole.title },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.newRole, "title", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-2" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-block btn-outline-info text-capitalize",
              attrs: { type: "submit" },
              on: { click: _vm.addRole }
            },
            [_vm._v("\n                Add\n            ")]
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "modal",
        {
          attrs: { show: _vm.showConfirmDeletion },
          on: {
            close: function($event) {
              _vm.showConfirmDeletion = false
            }
          }
        },
        [
          _c("div", { staticClass: "text-center" }, [
            _c("p", { staticClass: "h4 my-3" }, [
              _vm._v(
                "Are you sure you want to delete the role\n                "
              ),
              _c("strong", { staticClass: "text-capitalize" }, [
                _vm._v(_vm._s(_vm.roleToDelete.name))
              ]),
              _vm._v("?\n            ")
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-lg btn-link",
                on: {
                  click: function($event) {
                    _vm.deleteRole(_vm.roleToDelete)
                  }
                }
              },
              [_vm._v("Yes!")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-lg btn-link text-secondary",
                on: {
                  click: function($event) {
                    _vm.showConfirmDeletion = false
                  }
                }
              },
              [_vm._v("Cancel")]
            )
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RolesComponent.vue?vue&type=template&id=83734e92&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RolesComponent.vue?vue&type=template&id=83734e92&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "card" }, [
    _c("div", { staticClass: "card-header text-capitalize" }, [
      _c("span", [_vm._v(_vm._s(_vm.$tc("general.role", 2)))])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "card-body" },
      [
        _vm.$can("manage_roles")
          ? _c("p", { staticClass: "lead" }, [
              _vm._v("Create and manage roles for residents.")
            ])
          : _c("p", { staticClass: "lead" }, [
              _vm._v("A overview of all assigned roles.")
            ]),
        _vm._v(" "),
        _c("user-roles-component", {
          staticClass: "mb-4",
          attrs: { roles: _vm.roles }
        }),
        _vm._v(" "),
        _vm.$can("manage_roles")
          ? _c("role-abilities-component", {
              attrs: { roles: _vm.roles, abilities: _vm.abilities }
            })
          : _vm._e()
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/TagComponent.vue?vue&type=template&id=8480fa8c&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/TagComponent.vue?vue&type=template&id=8480fa8c&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("span", { staticClass: "tag-input-tag", class: _vm.tagClass }, [
    _vm._v("\n    " + _vm._s(_vm.title) + "\n    "),
    _vm.showBtn
      ? _c(
          "span",
          {
            staticClass: "tag-input-tag-btn",
            class: _vm.btnClass,
            attrs: { "aria-hidden": "true" },
            on: {
              click: function($event) {
                _vm.btnAction(_vm.id)
              }
            }
          },
          [_vm._v("×")]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ToggleComponent.vue?vue&type=template&id=01a442bc&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ToggleComponent.vue?vue&type=template&id=01a442bc&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("label", { staticClass: "switch" }, [
    _c("input", {
      attrs: { type: "checkbox" },
      domProps: { checked: _vm.toggled },
      on: { change: _vm.toggle }
    }),
    _vm._v(" "),
    _c("span", { staticClass: "slider" })
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserComponent.vue?vue&type=template&id=ebaad86a&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/UserComponent.vue?vue&type=template&id=ebaad86a& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "card" },
    [
      _c("div", { staticClass: "card-header text-capitalize" }, [
        _vm._v(_vm._s(_vm.$tc("user.user", 2)))
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "card-body row" },
        [
          _c(
            "table-component",
            {
              ref: "table",
              staticClass: "col-10",
              attrs: {
                data: _vm.fetchUsers,
                "show-caption": false,
                "sort-by": "lastname",
                "sort-order": "asc",
                "filter-placeholder": "Search...",
                "table-class": "table table-sm table-hover",
                "filter-input-class": "form-control mb-2"
              }
            },
            [
              _c("table-column", {
                attrs: {
                  show: "lastname",
                  label: _vm.$t("user.last_name"),
                  "header-class": "text-capitalize"
                }
              }),
              _vm._v(" "),
              _c("table-column", {
                attrs: {
                  show: "firstname",
                  label: _vm.$t("user.first_name"),
                  "header-class": "text-capitalize"
                }
              }),
              _vm._v(" "),
              _c("table-column", {
                attrs: {
                  show: "username",
                  label: _vm.$t("user.username"),
                  "header-class": "text-capitalize"
                }
              }),
              _vm._v(" "),
              _c("table-column", {
                attrs: {
                  show: "email",
                  label: _vm.$t("user.email"),
                  "header-class": "text-capitalize"
                }
              }),
              _vm._v(" "),
              _c("table-column", {
                attrs: {
                  show: "full_room",
                  label: _vm.$t("user.room"),
                  "header-class": "text-capitalize"
                }
              }),
              _vm._v(" "),
              _c("table-column", {
                attrs: {
                  show: "house",
                  label: _vm.$t("user.house"),
                  "header-class": "text-capitalize"
                }
              }),
              _vm._v(" "),
              _c("table-column", {
                attrs: {
                  show: "confirmed",
                  label: _vm.$t("user.confirmed"),
                  filterable: false,
                  "header-class": "text-capitalize"
                }
              }),
              _vm._v(" "),
              _c("table-column", {
                attrs: { filterable: false },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(row) {
                      return [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-link text-capitalize",
                            on: {
                              click: function($event) {
                                _vm.editUser(row)
                              }
                            }
                          },
                          [_vm._v("Edit")]
                        )
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("table-column", {
                attrs: { filterable: false },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(row) {
                      return [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-link text-capitalize",
                            attrs: { href: "#" },
                            on: { click: function($event) {} }
                          },
                          [
                            _vm._v(
                              _vm._s(_vm.$t("general.contact")) +
                                "\n                    "
                            )
                          ]
                        )
                      ]
                    }
                  }
                ])
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "sidebar col-2 text-capitalize" }, [
            _c("h4", [_vm._v(_vm._s(_vm.$tc("general.filter", 2)))]),
            _vm._v(" "),
            _c("hr"),
            _vm._v(" "),
            _c("h5", [_vm._v(_vm._s(_vm.$tc("general.dorm", 2)))]),
            _vm._v(" "),
            _c(
              "ul",
              { staticClass: "filter-list" },
              _vm._l(_vm.houses, function(house) {
                return _c("li", { staticClass: "filter-list-item" }, [
                  _c("div", { staticClass: "custom-control custom-checkbox" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: house.checked,
                          expression: "house.checked"
                        }
                      ],
                      staticClass: "custom-control-input",
                      attrs: { type: "checkbox", id: house.name },
                      domProps: {
                        checked: Array.isArray(house.checked)
                          ? _vm._i(house.checked, null) > -1
                          : house.checked
                      },
                      on: {
                        change: [
                          function($event) {
                            var $$a = house.checked,
                              $$el = $event.target,
                              $$c = $$el.checked ? true : false
                            if (Array.isArray($$a)) {
                              var $$v = null,
                                $$i = _vm._i($$a, $$v)
                              if ($$el.checked) {
                                $$i < 0 &&
                                  _vm.$set(house, "checked", $$a.concat([$$v]))
                              } else {
                                $$i > -1 &&
                                  _vm.$set(
                                    house,
                                    "checked",
                                    $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                                  )
                              }
                            } else {
                              _vm.$set(house, "checked", $$c)
                            }
                          },
                          _vm.filterChanged
                        ]
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "label",
                      {
                        staticClass: "custom-control-label",
                        attrs: { for: house.name }
                      },
                      [_vm._v(_vm._s(house.name))]
                    )
                  ])
                ])
              }),
              0
            ),
            _vm._v(" "),
            _c("hr"),
            _vm._v(" "),
            _c("h5", [_vm._v(_vm._s(_vm.$tc("user.user", 2)))]),
            _vm._v(" "),
            _c(
              "ul",
              { staticClass: "filter-list" },
              _vm._l(_vm.residentFilter, function(filter) {
                return _c("li", { staticClass: "filter-list-item" }, [
                  _c("div", { staticClass: "custom-control custom-checkbox" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: filter.checked,
                          expression: "filter.checked"
                        }
                      ],
                      staticClass: "custom-control-input",
                      attrs: { type: "checkbox", id: filter.name },
                      domProps: {
                        checked: Array.isArray(filter.checked)
                          ? _vm._i(filter.checked, null) > -1
                          : filter.checked
                      },
                      on: {
                        change: [
                          function($event) {
                            var $$a = filter.checked,
                              $$el = $event.target,
                              $$c = $$el.checked ? true : false
                            if (Array.isArray($$a)) {
                              var $$v = null,
                                $$i = _vm._i($$a, $$v)
                              if ($$el.checked) {
                                $$i < 0 &&
                                  _vm.$set(filter, "checked", $$a.concat([$$v]))
                              } else {
                                $$i > -1 &&
                                  _vm.$set(
                                    filter,
                                    "checked",
                                    $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                                  )
                              }
                            } else {
                              _vm.$set(filter, "checked", $$c)
                            }
                          },
                          _vm.filterChanged
                        ]
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "label",
                      {
                        staticClass: "custom-control-label",
                        attrs: { for: filter.name }
                      },
                      [_vm._v(_vm._s(_vm.$tc("user." + filter.name, 2)))]
                    )
                  ])
                ])
              }),
              0
            )
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "modal",
        {
          attrs: { show: _vm.showEditUserModal },
          on: {
            close: function($event) {
              _vm.showEditUserModal = false
            }
          }
        },
        [
          _c("edit-user-component", {
            attrs: { houseNames: _vm.houseNames, user: _vm.selectedUser }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserRolesComponent.vue?vue&type=template&id=74de073c&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/UserRolesComponent.vue?vue&type=template&id=74de073c&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    { attrs: { id: "accordion" } },
    _vm._l(_vm.currentRoles, function(role) {
      return _c("div", { staticClass: "card" }, [
        _c(
          "div",
          {
            staticClass:
              "card-header text-capitalize d-flex justify-content-between align-items-center",
            attrs: { "data-toggle": "collapse", "data-target": "#" + role.name }
          },
          [
            _c("div", [
              _c("p", { staticClass: "h5 m-0" }, [_vm._v(_vm._s(role.name))]),
              _vm._v(" "),
              _c("p", { staticClass: "card-subtitle m-0" }, [
                _vm._v(_vm._s(role.title))
              ])
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "badge badge-primary badge-pill" }, [
              _vm._v(_vm._s(role.users.length))
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "collapse",
            attrs: { id: role.name, "data-parent": "#accordion" }
          },
          [
            _c(
              "div",
              { staticClass: "card-body row" },
              [
                role.users.length > 0
                  ? _c("list-pagination-component", {
                      key: role.id,
                      attrs: { data: role.users, searchAttr: "full_name" },
                      scopedSlots: _vm._u([
                        {
                          key: "default",
                          fn: function(ref) {
                            var item = ref.item
                            var search_query = ref.search_query
                            return [
                              _c(
                                "li",
                                {
                                  staticClass:
                                    "list-group-item d-flex justify-content-between align-items-center",
                                  attrs: { title: item.full_room }
                                },
                                [
                                  _c("span", [
                                    _c("span", {
                                      domProps: {
                                        innerHTML: _vm._s(
                                          _vm.$options.filters.highlight(
                                            item.full_name,
                                            search_query
                                          )
                                        )
                                      }
                                    }),
                                    _vm._v(
                                      " - " +
                                        _vm._s(item.full_room) +
                                        " " +
                                        _vm._s(item.house) +
                                        " "
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _vm.$can("manage_roles")
                                    ? _c(
                                        "button",
                                        {
                                          staticClass: "close text-danger",
                                          attrs: {
                                            type: "button",
                                            "aria-label": "Retract",
                                            title: "Retract"
                                          },
                                          on: {
                                            click: function($event) {
                                              _vm.retractRole(item, role)
                                            }
                                          }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              attrs: { "aria-hidden": "true" }
                                            },
                                            [_vm._v("×")]
                                          )
                                        ]
                                      )
                                    : _vm._e()
                                ]
                              )
                            ]
                          }
                        }
                      ])
                    })
                  : _c(
                      "p",
                      {
                        staticClass:
                          "list-group-item col-md-6 col-xxl-4 offset-xxl-1"
                      },
                      [
                        _vm._v(
                          "Role is not assigned to any\n                    resident."
                        )
                      ]
                    ),
                _vm._v(" "),
                _vm.$can("manage_roles")
                  ? _c(
                      "div",
                      { staticClass: "col-md-6 col-xxl-4 offset-xxl-2" },
                      [
                        _c("autocomplete", {
                          attrs: {
                            data: _vm.fetchUsers,
                            searchAttr: "full_name",
                            "button-text": "assign",
                            placeholder: "Assign to...",
                            onButtonClick: _vm.userSelected,
                            additionalProps: { role: role }
                          },
                          scopedSlots: _vm._u([
                            {
                              key: "default",
                              fn: function(ref) {
                                var suggestion = ref.suggestion
                                var search_query = ref.search_query
                                return [
                                  _c("span", {
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.$options.filters.highlight(
                                          suggestion.full_name,
                                          search_query
                                        )
                                      )
                                    }
                                  })
                                ]
                              }
                            }
                          ])
                        })
                      ],
                      1
                    )
                  : _vm._e()
              ],
              1
            )
          ]
        )
      ])
    }),
    0
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/assets/js/app.js":
/*!************************************!*\
  !*** ./resources/assets/js/app.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-moment */ "./node_modules/vue-moment/dist/vue-moment.js");
/* harmony import */ var vue_moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var vue_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-i18n */ "./node_modules/vue-i18n/dist/vue-i18n.esm.js");
/* harmony import */ var _vue_i18n_locales_generated__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vue-i18n-locales.generated */ "./resources/assets/js/vue-i18n-locales.generated.js");
/* harmony import */ var _vendor_tightenco_ziggy_src_js_route__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../vendor/tightenco/ziggy/src/js/route */ "./vendor/tightenco/ziggy/src/js/route.js");
/* harmony import */ var vue_flash_message__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-flash-message */ "./node_modules/vue-flash-message/dist/vue-flash-message.min.js");
/* harmony import */ var vue_flash_message__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vue_flash_message__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _plugins_VueFilter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plugins/VueFilter */ "./resources/assets/js/plugins/VueFilter.js");
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
__webpack_require__(/*! ./bootstrap */ "./resources/assets/js/bootstrap.js");

 // Vue Extensions





 // Vue components

 //const lang = navigator.language;



var lang = document.documentElement.lang.substr(0, 2);
moment__WEBPACK_IMPORTED_MODULE_7___default.a.locale(lang);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('user-component', __webpack_require__(/*! ./components/UserComponent.vue */ "./resources/assets/js/components/UserComponent.vue").default);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('profile-component', __webpack_require__(/*! ./components/ProfileComponent.vue */ "./resources/assets/js/components/ProfileComponent.vue").default);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('roles-component', __webpack_require__(/*! ./components/RolesComponent.vue */ "./resources/assets/js/components/RolesComponent.vue").default);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('plugins-component', __webpack_require__(/*! ./components/PluginsComponent.vue */ "./resources/assets/js/components/PluginsComponent.vue").default);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('mails-component', __webpack_require__(/*! ./components/MailsComponent.vue */ "./resources/assets/js/components/MailsComponent.vue").default);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('modal', __webpack_require__(/*! ./components/ModalComponent.vue */ "./resources/assets/js/components/ModalComponent.vue").default); // Alert components for vue

vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vue_flash_message__WEBPACK_IMPORTED_MODULE_6___default.a, {
  messageOptions: {
    timeout: 4000,
    pauseOnInteract: true
  }
}); // moment.js for vue

vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vue_moment__WEBPACK_IMPORTED_MODULE_1___default.a, {
  moment: moment__WEBPACK_IMPORTED_MODULE_7___default.a
}); // Translation helper for vue

vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vue_i18n__WEBPACK_IMPORTED_MODULE_3__["default"]);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vee_validate__WEBPACK_IMPORTED_MODULE_2__["default"], {
  errorBagName: 'validationErrors'
});
var i18n = new vue_i18n__WEBPACK_IMPORTED_MODULE_3__["default"]({
  locale: lang,
  messages: _vue_i18n_locales_generated__WEBPACK_IMPORTED_MODULE_4__["default"]
}); // Laravel routes helper for vue

vue__WEBPACK_IMPORTED_MODULE_0___default.a.mixin({
  methods: {
    route: _vendor_tightenco_ziggy_src_js_route__WEBPACK_IMPORTED_MODULE_5__["default"]
  }
}); // Laravel permissions and role mixins

vue__WEBPACK_IMPORTED_MODULE_0___default.a.mixin({
  methods: {
    $can: function $can(permission) {
      var user_id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return window.laravel.roles.includes('admin') || window.laravel.permissions.includes(permission) || window.laravel.user_id === user_id;
    },
    $is: function $is(role) {
      var user_id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return window.laravel.roles.includes('admin') || window.laravel.roles.includes(role) || window.laravel.user_id === user_id;
    }
  }
});
vue__WEBPACK_IMPORTED_MODULE_0___default.a.mixin({
  methods: {
    $tv: function $tv(key) {
      var newKey = "vendor.".concat(key.replace('::', '.'));
      return this.$t(newKey);
    }
  }
});
vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(_plugins_VueFilter__WEBPACK_IMPORTED_MODULE_8__["default"]);
var app = new vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  el: '#app',
  i18n: i18n
});

/***/ }),

/***/ "./resources/assets/js/bootstrap.js":
/*!******************************************!*\
  !*** ./resources/assets/js/bootstrap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */
try {
  window.Popper = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js").default;
  window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

  __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
} catch (e) {}
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */


window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
// import Echo from 'laravel-echo'
// window.Pusher = require('pusher-js');
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });

/***/ }),

/***/ "./resources/assets/js/components/AutoCompleteComponent.vue":
/*!******************************************************************!*\
  !*** ./resources/assets/js/components/AutoCompleteComponent.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AutoCompleteComponent_vue_vue_type_template_id_56a234a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoCompleteComponent.vue?vue&type=template&id=56a234a4&scoped=true& */ "./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=template&id=56a234a4&scoped=true&");
/* harmony import */ var _AutoCompleteComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutoCompleteComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _AutoCompleteComponent_vue_vue_type_style_index_0_id_56a234a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AutoCompleteComponent.vue?vue&type=style&index=0&id=56a234a4&scoped=true&lang=css& */ "./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=style&index=0&id=56a234a4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AutoCompleteComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AutoCompleteComponent_vue_vue_type_template_id_56a234a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AutoCompleteComponent_vue_vue_type_template_id_56a234a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "56a234a4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/AutoCompleteComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AutoCompleteComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=style&index=0&id=56a234a4&scoped=true&lang=css&":
/*!***************************************************************************************************************************!*\
  !*** ./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=style&index=0&id=56a234a4&scoped=true&lang=css& ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteComponent_vue_vue_type_style_index_0_id_56a234a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./AutoCompleteComponent.vue?vue&type=style&index=0&id=56a234a4&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=style&index=0&id=56a234a4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteComponent_vue_vue_type_style_index_0_id_56a234a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteComponent_vue_vue_type_style_index_0_id_56a234a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteComponent_vue_vue_type_style_index_0_id_56a234a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteComponent_vue_vue_type_style_index_0_id_56a234a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteComponent_vue_vue_type_style_index_0_id_56a234a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=template&id=56a234a4&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=template&id=56a234a4&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteComponent_vue_vue_type_template_id_56a234a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AutoCompleteComponent.vue?vue&type=template&id=56a234a4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AutoCompleteComponent.vue?vue&type=template&id=56a234a4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteComponent_vue_vue_type_template_id_56a234a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteComponent_vue_vue_type_template_id_56a234a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/EditUserComponent.vue":
/*!**************************************************************!*\
  !*** ./resources/assets/js/components/EditUserComponent.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditUserComponent_vue_vue_type_template_id_3039b261_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditUserComponent.vue?vue&type=template&id=3039b261&scoped=true& */ "./resources/assets/js/components/EditUserComponent.vue?vue&type=template&id=3039b261&scoped=true&");
/* harmony import */ var _EditUserComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditUserComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/EditUserComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _EditUserComponent_vue_vue_type_style_index_0_id_3039b261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditUserComponent.vue?vue&type=style&index=0&id=3039b261&scoped=true&lang=css& */ "./resources/assets/js/components/EditUserComponent.vue?vue&type=style&index=0&id=3039b261&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _EditUserComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditUserComponent_vue_vue_type_template_id_3039b261_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditUserComponent_vue_vue_type_template_id_3039b261_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3039b261",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/EditUserComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/EditUserComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/assets/js/components/EditUserComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditUserComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/EditUserComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/EditUserComponent.vue?vue&type=style&index=0&id=3039b261&scoped=true&lang=css&":
/*!***********************************************************************************************************************!*\
  !*** ./resources/assets/js/components/EditUserComponent.vue?vue&type=style&index=0&id=3039b261&scoped=true&lang=css& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_style_index_0_id_3039b261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditUserComponent.vue?vue&type=style&index=0&id=3039b261&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/EditUserComponent.vue?vue&type=style&index=0&id=3039b261&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_style_index_0_id_3039b261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_style_index_0_id_3039b261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_style_index_0_id_3039b261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_style_index_0_id_3039b261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_style_index_0_id_3039b261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/EditUserComponent.vue?vue&type=template&id=3039b261&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/js/components/EditUserComponent.vue?vue&type=template&id=3039b261&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_template_id_3039b261_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditUserComponent.vue?vue&type=template&id=3039b261&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/EditUserComponent.vue?vue&type=template&id=3039b261&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_template_id_3039b261_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_template_id_3039b261_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/InputTagComponent.vue":
/*!**************************************************************!*\
  !*** ./resources/assets/js/components/InputTagComponent.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InputTagComponent_vue_vue_type_template_id_2b1d27c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputTagComponent.vue?vue&type=template&id=2b1d27c6&scoped=true& */ "./resources/assets/js/components/InputTagComponent.vue?vue&type=template&id=2b1d27c6&scoped=true&");
/* harmony import */ var _InputTagComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InputTagComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/InputTagComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _InputTagComponent_vue_vue_type_style_index_0_id_2b1d27c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InputTagComponent.vue?vue&type=style&index=0&id=2b1d27c6&scoped=true&lang=css& */ "./resources/assets/js/components/InputTagComponent.vue?vue&type=style&index=0&id=2b1d27c6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _InputTagComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _InputTagComponent_vue_vue_type_template_id_2b1d27c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _InputTagComponent_vue_vue_type_template_id_2b1d27c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2b1d27c6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/InputTagComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/InputTagComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/assets/js/components/InputTagComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputTagComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./InputTagComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/InputTagComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputTagComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/InputTagComponent.vue?vue&type=style&index=0&id=2b1d27c6&scoped=true&lang=css&":
/*!***********************************************************************************************************************!*\
  !*** ./resources/assets/js/components/InputTagComponent.vue?vue&type=style&index=0&id=2b1d27c6&scoped=true&lang=css& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InputTagComponent_vue_vue_type_style_index_0_id_2b1d27c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./InputTagComponent.vue?vue&type=style&index=0&id=2b1d27c6&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/InputTagComponent.vue?vue&type=style&index=0&id=2b1d27c6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InputTagComponent_vue_vue_type_style_index_0_id_2b1d27c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InputTagComponent_vue_vue_type_style_index_0_id_2b1d27c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InputTagComponent_vue_vue_type_style_index_0_id_2b1d27c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InputTagComponent_vue_vue_type_style_index_0_id_2b1d27c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InputTagComponent_vue_vue_type_style_index_0_id_2b1d27c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/InputTagComponent.vue?vue&type=template&id=2b1d27c6&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/js/components/InputTagComponent.vue?vue&type=template&id=2b1d27c6&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InputTagComponent_vue_vue_type_template_id_2b1d27c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./InputTagComponent.vue?vue&type=template&id=2b1d27c6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/InputTagComponent.vue?vue&type=template&id=2b1d27c6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InputTagComponent_vue_vue_type_template_id_2b1d27c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InputTagComponent_vue_vue_type_template_id_2b1d27c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/ListPaginationComponent.vue":
/*!********************************************************************!*\
  !*** ./resources/assets/js/components/ListPaginationComponent.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ListPaginationComponent_vue_vue_type_template_id_47d0489e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ListPaginationComponent.vue?vue&type=template&id=47d0489e&scoped=true& */ "./resources/assets/js/components/ListPaginationComponent.vue?vue&type=template&id=47d0489e&scoped=true&");
/* harmony import */ var _ListPaginationComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListPaginationComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/ListPaginationComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ListPaginationComponent_vue_vue_type_style_index_0_id_47d0489e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ListPaginationComponent.vue?vue&type=style&index=0&id=47d0489e&scoped=true&lang=css& */ "./resources/assets/js/components/ListPaginationComponent.vue?vue&type=style&index=0&id=47d0489e&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ListPaginationComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ListPaginationComponent_vue_vue_type_template_id_47d0489e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ListPaginationComponent_vue_vue_type_template_id_47d0489e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "47d0489e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/ListPaginationComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/ListPaginationComponent.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/assets/js/components/ListPaginationComponent.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPaginationComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListPaginationComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ListPaginationComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPaginationComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/ListPaginationComponent.vue?vue&type=style&index=0&id=47d0489e&scoped=true&lang=css&":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/assets/js/components/ListPaginationComponent.vue?vue&type=style&index=0&id=47d0489e&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPaginationComponent_vue_vue_type_style_index_0_id_47d0489e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListPaginationComponent.vue?vue&type=style&index=0&id=47d0489e&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ListPaginationComponent.vue?vue&type=style&index=0&id=47d0489e&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPaginationComponent_vue_vue_type_style_index_0_id_47d0489e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPaginationComponent_vue_vue_type_style_index_0_id_47d0489e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPaginationComponent_vue_vue_type_style_index_0_id_47d0489e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPaginationComponent_vue_vue_type_style_index_0_id_47d0489e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPaginationComponent_vue_vue_type_style_index_0_id_47d0489e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/ListPaginationComponent.vue?vue&type=template&id=47d0489e&scoped=true&":
/*!***************************************************************************************************************!*\
  !*** ./resources/assets/js/components/ListPaginationComponent.vue?vue&type=template&id=47d0489e&scoped=true& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPaginationComponent_vue_vue_type_template_id_47d0489e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListPaginationComponent.vue?vue&type=template&id=47d0489e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ListPaginationComponent.vue?vue&type=template&id=47d0489e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPaginationComponent_vue_vue_type_template_id_47d0489e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPaginationComponent_vue_vue_type_template_id_47d0489e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/MailsComponent.vue":
/*!***********************************************************!*\
  !*** ./resources/assets/js/components/MailsComponent.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MailsComponent_vue_vue_type_template_id_4e6d1838_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MailsComponent.vue?vue&type=template&id=4e6d1838&scoped=true& */ "./resources/assets/js/components/MailsComponent.vue?vue&type=template&id=4e6d1838&scoped=true&");
/* harmony import */ var _MailsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MailsComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/MailsComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _MailsComponent_vue_vue_type_style_index_0_id_4e6d1838_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MailsComponent.vue?vue&type=style&index=0&id=4e6d1838&scoped=true&lang=css& */ "./resources/assets/js/components/MailsComponent.vue?vue&type=style&index=0&id=4e6d1838&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MailsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MailsComponent_vue_vue_type_template_id_4e6d1838_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MailsComponent_vue_vue_type_template_id_4e6d1838_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4e6d1838",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/MailsComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/MailsComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/assets/js/components/MailsComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MailsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./MailsComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/MailsComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MailsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/MailsComponent.vue?vue&type=style&index=0&id=4e6d1838&scoped=true&lang=css&":
/*!********************************************************************************************************************!*\
  !*** ./resources/assets/js/components/MailsComponent.vue?vue&type=style&index=0&id=4e6d1838&scoped=true&lang=css& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MailsComponent_vue_vue_type_style_index_0_id_4e6d1838_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./MailsComponent.vue?vue&type=style&index=0&id=4e6d1838&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/MailsComponent.vue?vue&type=style&index=0&id=4e6d1838&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MailsComponent_vue_vue_type_style_index_0_id_4e6d1838_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MailsComponent_vue_vue_type_style_index_0_id_4e6d1838_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MailsComponent_vue_vue_type_style_index_0_id_4e6d1838_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MailsComponent_vue_vue_type_style_index_0_id_4e6d1838_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MailsComponent_vue_vue_type_style_index_0_id_4e6d1838_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/MailsComponent.vue?vue&type=template&id=4e6d1838&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/assets/js/components/MailsComponent.vue?vue&type=template&id=4e6d1838&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MailsComponent_vue_vue_type_template_id_4e6d1838_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./MailsComponent.vue?vue&type=template&id=4e6d1838&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/MailsComponent.vue?vue&type=template&id=4e6d1838&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MailsComponent_vue_vue_type_template_id_4e6d1838_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MailsComponent_vue_vue_type_template_id_4e6d1838_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/ModalComponent.vue":
/*!***********************************************************!*\
  !*** ./resources/assets/js/components/ModalComponent.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalComponent_vue_vue_type_template_id_465fd2c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalComponent.vue?vue&type=template&id=465fd2c7&scoped=true& */ "./resources/assets/js/components/ModalComponent.vue?vue&type=template&id=465fd2c7&scoped=true&");
/* harmony import */ var _ModalComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/ModalComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ModalComponent_vue_vue_type_style_index_0_id_465fd2c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ModalComponent.vue?vue&type=style&index=0&id=465fd2c7&scoped=true&lang=css& */ "./resources/assets/js/components/ModalComponent.vue?vue&type=style&index=0&id=465fd2c7&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ModalComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalComponent_vue_vue_type_template_id_465fd2c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalComponent_vue_vue_type_template_id_465fd2c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "465fd2c7",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/ModalComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/ModalComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/assets/js/components/ModalComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ModalComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/ModalComponent.vue?vue&type=style&index=0&id=465fd2c7&scoped=true&lang=css&":
/*!********************************************************************************************************************!*\
  !*** ./resources/assets/js/components/ModalComponent.vue?vue&type=style&index=0&id=465fd2c7&scoped=true&lang=css& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_style_index_0_id_465fd2c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalComponent.vue?vue&type=style&index=0&id=465fd2c7&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ModalComponent.vue?vue&type=style&index=0&id=465fd2c7&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_style_index_0_id_465fd2c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_style_index_0_id_465fd2c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_style_index_0_id_465fd2c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_style_index_0_id_465fd2c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_style_index_0_id_465fd2c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/ModalComponent.vue?vue&type=template&id=465fd2c7&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/assets/js/components/ModalComponent.vue?vue&type=template&id=465fd2c7&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_template_id_465fd2c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalComponent.vue?vue&type=template&id=465fd2c7&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ModalComponent.vue?vue&type=template&id=465fd2c7&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_template_id_465fd2c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_template_id_465fd2c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/NewMailComponent.vue":
/*!*************************************************************!*\
  !*** ./resources/assets/js/components/NewMailComponent.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewMailComponent_vue_vue_type_template_id_09b4367d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewMailComponent.vue?vue&type=template&id=09b4367d&scoped=true& */ "./resources/assets/js/components/NewMailComponent.vue?vue&type=template&id=09b4367d&scoped=true&");
/* harmony import */ var _NewMailComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewMailComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/NewMailComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _NewMailComponent_vue_vue_type_style_index_0_id_09b4367d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NewMailComponent.vue?vue&type=style&index=0&id=09b4367d&scoped=true&lang=css& */ "./resources/assets/js/components/NewMailComponent.vue?vue&type=style&index=0&id=09b4367d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NewMailComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewMailComponent_vue_vue_type_template_id_09b4367d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewMailComponent_vue_vue_type_template_id_09b4367d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "09b4367d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/NewMailComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/NewMailComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/NewMailComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewMailComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewMailComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/NewMailComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewMailComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/NewMailComponent.vue?vue&type=style&index=0&id=09b4367d&scoped=true&lang=css&":
/*!**********************************************************************************************************************!*\
  !*** ./resources/assets/js/components/NewMailComponent.vue?vue&type=style&index=0&id=09b4367d&scoped=true&lang=css& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewMailComponent_vue_vue_type_style_index_0_id_09b4367d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewMailComponent.vue?vue&type=style&index=0&id=09b4367d&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/NewMailComponent.vue?vue&type=style&index=0&id=09b4367d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewMailComponent_vue_vue_type_style_index_0_id_09b4367d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewMailComponent_vue_vue_type_style_index_0_id_09b4367d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewMailComponent_vue_vue_type_style_index_0_id_09b4367d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewMailComponent_vue_vue_type_style_index_0_id_09b4367d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewMailComponent_vue_vue_type_style_index_0_id_09b4367d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/NewMailComponent.vue?vue&type=template&id=09b4367d&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/js/components/NewMailComponent.vue?vue&type=template&id=09b4367d&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewMailComponent_vue_vue_type_template_id_09b4367d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewMailComponent.vue?vue&type=template&id=09b4367d&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/NewMailComponent.vue?vue&type=template&id=09b4367d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewMailComponent_vue_vue_type_template_id_09b4367d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewMailComponent_vue_vue_type_template_id_09b4367d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/PluginsComponent.vue":
/*!*************************************************************!*\
  !*** ./resources/assets/js/components/PluginsComponent.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PluginsComponent_vue_vue_type_template_id_1ba5dcf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PluginsComponent.vue?vue&type=template&id=1ba5dcf4&scoped=true& */ "./resources/assets/js/components/PluginsComponent.vue?vue&type=template&id=1ba5dcf4&scoped=true&");
/* harmony import */ var _PluginsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PluginsComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/PluginsComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _PluginsComponent_vue_vue_type_style_index_0_id_1ba5dcf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PluginsComponent.vue?vue&type=style&index=0&id=1ba5dcf4&scoped=true&lang=css& */ "./resources/assets/js/components/PluginsComponent.vue?vue&type=style&index=0&id=1ba5dcf4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PluginsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PluginsComponent_vue_vue_type_template_id_1ba5dcf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PluginsComponent_vue_vue_type_template_id_1ba5dcf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1ba5dcf4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/PluginsComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/PluginsComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/PluginsComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PluginsComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PluginsComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/PluginsComponent.vue?vue&type=style&index=0&id=1ba5dcf4&scoped=true&lang=css&":
/*!**********************************************************************************************************************!*\
  !*** ./resources/assets/js/components/PluginsComponent.vue?vue&type=style&index=0&id=1ba5dcf4&scoped=true&lang=css& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginsComponent_vue_vue_type_style_index_0_id_1ba5dcf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./PluginsComponent.vue?vue&type=style&index=0&id=1ba5dcf4&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PluginsComponent.vue?vue&type=style&index=0&id=1ba5dcf4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginsComponent_vue_vue_type_style_index_0_id_1ba5dcf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginsComponent_vue_vue_type_style_index_0_id_1ba5dcf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginsComponent_vue_vue_type_style_index_0_id_1ba5dcf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginsComponent_vue_vue_type_style_index_0_id_1ba5dcf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginsComponent_vue_vue_type_style_index_0_id_1ba5dcf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/PluginsComponent.vue?vue&type=template&id=1ba5dcf4&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/js/components/PluginsComponent.vue?vue&type=template&id=1ba5dcf4&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginsComponent_vue_vue_type_template_id_1ba5dcf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PluginsComponent.vue?vue&type=template&id=1ba5dcf4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PluginsComponent.vue?vue&type=template&id=1ba5dcf4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginsComponent_vue_vue_type_template_id_1ba5dcf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginsComponent_vue_vue_type_template_id_1ba5dcf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/ProfileComponent.vue":
/*!*************************************************************!*\
  !*** ./resources/assets/js/components/ProfileComponent.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProfileComponent_vue_vue_type_template_id_1891bcea_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProfileComponent.vue?vue&type=template&id=1891bcea&scoped=true& */ "./resources/assets/js/components/ProfileComponent.vue?vue&type=template&id=1891bcea&scoped=true&");
/* harmony import */ var _ProfileComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProfileComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/ProfileComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ProfileComponent_vue_vue_type_style_index_0_id_1891bcea_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProfileComponent.vue?vue&type=style&index=0&id=1891bcea&scoped=true&lang=css& */ "./resources/assets/js/components/ProfileComponent.vue?vue&type=style&index=0&id=1891bcea&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ProfileComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProfileComponent_vue_vue_type_template_id_1891bcea_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ProfileComponent_vue_vue_type_template_id_1891bcea_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1891bcea",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/ProfileComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/ProfileComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/ProfileComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ProfileComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ProfileComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/ProfileComponent.vue?vue&type=style&index=0&id=1891bcea&scoped=true&lang=css&":
/*!**********************************************************************************************************************!*\
  !*** ./resources/assets/js/components/ProfileComponent.vue?vue&type=style&index=0&id=1891bcea&scoped=true&lang=css& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileComponent_vue_vue_type_style_index_0_id_1891bcea_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ProfileComponent.vue?vue&type=style&index=0&id=1891bcea&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ProfileComponent.vue?vue&type=style&index=0&id=1891bcea&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileComponent_vue_vue_type_style_index_0_id_1891bcea_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileComponent_vue_vue_type_style_index_0_id_1891bcea_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileComponent_vue_vue_type_style_index_0_id_1891bcea_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileComponent_vue_vue_type_style_index_0_id_1891bcea_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileComponent_vue_vue_type_style_index_0_id_1891bcea_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/ProfileComponent.vue?vue&type=template&id=1891bcea&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/js/components/ProfileComponent.vue?vue&type=template&id=1891bcea&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileComponent_vue_vue_type_template_id_1891bcea_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ProfileComponent.vue?vue&type=template&id=1891bcea&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ProfileComponent.vue?vue&type=template&id=1891bcea&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileComponent_vue_vue_type_template_id_1891bcea_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileComponent_vue_vue_type_template_id_1891bcea_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/RoleAbilitiesComponent.vue":
/*!*******************************************************************!*\
  !*** ./resources/assets/js/components/RoleAbilitiesComponent.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RoleAbilitiesComponent_vue_vue_type_template_id_2f19ff22_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RoleAbilitiesComponent.vue?vue&type=template&id=2f19ff22&scoped=true& */ "./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=template&id=2f19ff22&scoped=true&");
/* harmony import */ var _RoleAbilitiesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoleAbilitiesComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _RoleAbilitiesComponent_vue_vue_type_style_index_0_id_2f19ff22_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RoleAbilitiesComponent.vue?vue&type=style&index=0&id=2f19ff22&scoped=true&lang=css& */ "./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=style&index=0&id=2f19ff22&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _RoleAbilitiesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RoleAbilitiesComponent_vue_vue_type_template_id_2f19ff22_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RoleAbilitiesComponent_vue_vue_type_template_id_2f19ff22_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2f19ff22",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/RoleAbilitiesComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleAbilitiesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RoleAbilitiesComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleAbilitiesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=style&index=0&id=2f19ff22&scoped=true&lang=css&":
/*!****************************************************************************************************************************!*\
  !*** ./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=style&index=0&id=2f19ff22&scoped=true&lang=css& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleAbilitiesComponent_vue_vue_type_style_index_0_id_2f19ff22_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./RoleAbilitiesComponent.vue?vue&type=style&index=0&id=2f19ff22&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=style&index=0&id=2f19ff22&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleAbilitiesComponent_vue_vue_type_style_index_0_id_2f19ff22_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleAbilitiesComponent_vue_vue_type_style_index_0_id_2f19ff22_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleAbilitiesComponent_vue_vue_type_style_index_0_id_2f19ff22_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleAbilitiesComponent_vue_vue_type_style_index_0_id_2f19ff22_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleAbilitiesComponent_vue_vue_type_style_index_0_id_2f19ff22_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=template&id=2f19ff22&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=template&id=2f19ff22&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleAbilitiesComponent_vue_vue_type_template_id_2f19ff22_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./RoleAbilitiesComponent.vue?vue&type=template&id=2f19ff22&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RoleAbilitiesComponent.vue?vue&type=template&id=2f19ff22&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleAbilitiesComponent_vue_vue_type_template_id_2f19ff22_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleAbilitiesComponent_vue_vue_type_template_id_2f19ff22_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/RolesComponent.vue":
/*!***********************************************************!*\
  !*** ./resources/assets/js/components/RolesComponent.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RolesComponent_vue_vue_type_template_id_83734e92_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RolesComponent.vue?vue&type=template&id=83734e92&scoped=true& */ "./resources/assets/js/components/RolesComponent.vue?vue&type=template&id=83734e92&scoped=true&");
/* harmony import */ var _RolesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RolesComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/RolesComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _RolesComponent_vue_vue_type_style_index_0_id_83734e92_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RolesComponent.vue?vue&type=style&index=0&id=83734e92&scoped=true&lang=css& */ "./resources/assets/js/components/RolesComponent.vue?vue&type=style&index=0&id=83734e92&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _RolesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RolesComponent_vue_vue_type_template_id_83734e92_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RolesComponent_vue_vue_type_template_id_83734e92_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "83734e92",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/RolesComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/RolesComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/assets/js/components/RolesComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RolesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RolesComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RolesComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RolesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/RolesComponent.vue?vue&type=style&index=0&id=83734e92&scoped=true&lang=css&":
/*!********************************************************************************************************************!*\
  !*** ./resources/assets/js/components/RolesComponent.vue?vue&type=style&index=0&id=83734e92&scoped=true&lang=css& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RolesComponent_vue_vue_type_style_index_0_id_83734e92_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./RolesComponent.vue?vue&type=style&index=0&id=83734e92&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RolesComponent.vue?vue&type=style&index=0&id=83734e92&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RolesComponent_vue_vue_type_style_index_0_id_83734e92_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RolesComponent_vue_vue_type_style_index_0_id_83734e92_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RolesComponent_vue_vue_type_style_index_0_id_83734e92_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RolesComponent_vue_vue_type_style_index_0_id_83734e92_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RolesComponent_vue_vue_type_style_index_0_id_83734e92_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/RolesComponent.vue?vue&type=template&id=83734e92&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/assets/js/components/RolesComponent.vue?vue&type=template&id=83734e92&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RolesComponent_vue_vue_type_template_id_83734e92_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./RolesComponent.vue?vue&type=template&id=83734e92&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RolesComponent.vue?vue&type=template&id=83734e92&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RolesComponent_vue_vue_type_template_id_83734e92_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RolesComponent_vue_vue_type_template_id_83734e92_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/TagComponent.vue":
/*!*********************************************************!*\
  !*** ./resources/assets/js/components/TagComponent.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TagComponent_vue_vue_type_template_id_8480fa8c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagComponent.vue?vue&type=template&id=8480fa8c&scoped=true& */ "./resources/assets/js/components/TagComponent.vue?vue&type=template&id=8480fa8c&scoped=true&");
/* harmony import */ var _TagComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/TagComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _TagComponent_vue_vue_type_style_index_0_id_8480fa8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TagComponent.vue?vue&type=style&index=0&id=8480fa8c&scoped=true&lang=css& */ "./resources/assets/js/components/TagComponent.vue?vue&type=style&index=0&id=8480fa8c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TagComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TagComponent_vue_vue_type_template_id_8480fa8c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TagComponent_vue_vue_type_template_id_8480fa8c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "8480fa8c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/TagComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/TagComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/assets/js/components/TagComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TagComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./TagComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/TagComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TagComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/TagComponent.vue?vue&type=style&index=0&id=8480fa8c&scoped=true&lang=css&":
/*!******************************************************************************************************************!*\
  !*** ./resources/assets/js/components/TagComponent.vue?vue&type=style&index=0&id=8480fa8c&scoped=true&lang=css& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TagComponent_vue_vue_type_style_index_0_id_8480fa8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./TagComponent.vue?vue&type=style&index=0&id=8480fa8c&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/TagComponent.vue?vue&type=style&index=0&id=8480fa8c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TagComponent_vue_vue_type_style_index_0_id_8480fa8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TagComponent_vue_vue_type_style_index_0_id_8480fa8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TagComponent_vue_vue_type_style_index_0_id_8480fa8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TagComponent_vue_vue_type_style_index_0_id_8480fa8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TagComponent_vue_vue_type_style_index_0_id_8480fa8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/TagComponent.vue?vue&type=template&id=8480fa8c&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/assets/js/components/TagComponent.vue?vue&type=template&id=8480fa8c&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagComponent_vue_vue_type_template_id_8480fa8c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./TagComponent.vue?vue&type=template&id=8480fa8c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/TagComponent.vue?vue&type=template&id=8480fa8c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagComponent_vue_vue_type_template_id_8480fa8c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagComponent_vue_vue_type_template_id_8480fa8c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/ToggleComponent.vue":
/*!************************************************************!*\
  !*** ./resources/assets/js/components/ToggleComponent.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToggleComponent_vue_vue_type_template_id_01a442bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToggleComponent.vue?vue&type=template&id=01a442bc&scoped=true& */ "./resources/assets/js/components/ToggleComponent.vue?vue&type=template&id=01a442bc&scoped=true&");
/* harmony import */ var _ToggleComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToggleComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/ToggleComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ToggleComponent_vue_vue_type_style_index_0_id_01a442bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToggleComponent.vue?vue&type=style&index=0&id=01a442bc&scoped=true&lang=css& */ "./resources/assets/js/components/ToggleComponent.vue?vue&type=style&index=0&id=01a442bc&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ToggleComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ToggleComponent_vue_vue_type_template_id_01a442bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ToggleComponent_vue_vue_type_template_id_01a442bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "01a442bc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/ToggleComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/ToggleComponent.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/assets/js/components/ToggleComponent.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ToggleComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ToggleComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/ToggleComponent.vue?vue&type=style&index=0&id=01a442bc&scoped=true&lang=css&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/assets/js/components/ToggleComponent.vue?vue&type=style&index=0&id=01a442bc&scoped=true&lang=css& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleComponent_vue_vue_type_style_index_0_id_01a442bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ToggleComponent.vue?vue&type=style&index=0&id=01a442bc&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ToggleComponent.vue?vue&type=style&index=0&id=01a442bc&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleComponent_vue_vue_type_style_index_0_id_01a442bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleComponent_vue_vue_type_style_index_0_id_01a442bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleComponent_vue_vue_type_style_index_0_id_01a442bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleComponent_vue_vue_type_style_index_0_id_01a442bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleComponent_vue_vue_type_style_index_0_id_01a442bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/ToggleComponent.vue?vue&type=template&id=01a442bc&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/assets/js/components/ToggleComponent.vue?vue&type=template&id=01a442bc&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleComponent_vue_vue_type_template_id_01a442bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ToggleComponent.vue?vue&type=template&id=01a442bc&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ToggleComponent.vue?vue&type=template&id=01a442bc&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleComponent_vue_vue_type_template_id_01a442bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleComponent_vue_vue_type_template_id_01a442bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/UserComponent.vue":
/*!**********************************************************!*\
  !*** ./resources/assets/js/components/UserComponent.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserComponent_vue_vue_type_template_id_ebaad86a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserComponent.vue?vue&type=template&id=ebaad86a& */ "./resources/assets/js/components/UserComponent.vue?vue&type=template&id=ebaad86a&");
/* harmony import */ var _UserComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/UserComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserComponent.vue?vue&type=style&index=0&lang=css& */ "./resources/assets/js/components/UserComponent.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserComponent_vue_vue_type_template_id_ebaad86a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserComponent_vue_vue_type_template_id_ebaad86a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/UserComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/UserComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/assets/js/components/UserComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/UserComponent.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************!*\
  !*** ./resources/assets/js/components/UserComponent.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserComponent.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserComponent.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/UserComponent.vue?vue&type=template&id=ebaad86a&":
/*!*****************************************************************************************!*\
  !*** ./resources/assets/js/components/UserComponent.vue?vue&type=template&id=ebaad86a& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserComponent_vue_vue_type_template_id_ebaad86a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserComponent.vue?vue&type=template&id=ebaad86a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserComponent.vue?vue&type=template&id=ebaad86a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserComponent_vue_vue_type_template_id_ebaad86a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserComponent_vue_vue_type_template_id_ebaad86a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/UserRolesComponent.vue":
/*!***************************************************************!*\
  !*** ./resources/assets/js/components/UserRolesComponent.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserRolesComponent_vue_vue_type_template_id_74de073c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserRolesComponent.vue?vue&type=template&id=74de073c&scoped=true& */ "./resources/assets/js/components/UserRolesComponent.vue?vue&type=template&id=74de073c&scoped=true&");
/* harmony import */ var _UserRolesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserRolesComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/UserRolesComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserRolesComponent_vue_vue_type_style_index_0_id_74de073c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserRolesComponent.vue?vue&type=style&index=0&id=74de073c&scoped=true&lang=css& */ "./resources/assets/js/components/UserRolesComponent.vue?vue&type=style&index=0&id=74de073c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserRolesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserRolesComponent_vue_vue_type_template_id_74de073c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserRolesComponent_vue_vue_type_template_id_74de073c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "74de073c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/UserRolesComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/UserRolesComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/assets/js/components/UserRolesComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserRolesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserRolesComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserRolesComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserRolesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/UserRolesComponent.vue?vue&type=style&index=0&id=74de073c&scoped=true&lang=css&":
/*!************************************************************************************************************************!*\
  !*** ./resources/assets/js/components/UserRolesComponent.vue?vue&type=style&index=0&id=74de073c&scoped=true&lang=css& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserRolesComponent_vue_vue_type_style_index_0_id_74de073c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserRolesComponent.vue?vue&type=style&index=0&id=74de073c&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserRolesComponent.vue?vue&type=style&index=0&id=74de073c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserRolesComponent_vue_vue_type_style_index_0_id_74de073c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserRolesComponent_vue_vue_type_style_index_0_id_74de073c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserRolesComponent_vue_vue_type_style_index_0_id_74de073c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserRolesComponent_vue_vue_type_style_index_0_id_74de073c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserRolesComponent_vue_vue_type_style_index_0_id_74de073c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/UserRolesComponent.vue?vue&type=template&id=74de073c&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./resources/assets/js/components/UserRolesComponent.vue?vue&type=template&id=74de073c&scoped=true& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserRolesComponent_vue_vue_type_template_id_74de073c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserRolesComponent.vue?vue&type=template&id=74de073c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/UserRolesComponent.vue?vue&type=template&id=74de073c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserRolesComponent_vue_vue_type_template_id_74de073c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserRolesComponent_vue_vue_type_template_id_74de073c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/plugins/VueFilter.js":
/*!**************************************************!*\
  !*** ./resources/assets/js/plugins/VueFilter.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var VueFilter = {
  install: function install(Vue) {
    Vue.filter('capitalize', function (value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    });
    Vue.filter('highlight', function (value, query) {
      if (!query) {
        return value;
      }

      var iQuery = new RegExp(query, "ig");
      return value.toString().replace(iQuery, function (matchedTxt, a, b) {
        return '<span class=\'font-weight-bold\'>' + matchedTxt + '</span>';
      });
    });
    Vue.filter('transform-role', function (value) {
      if (!value) return '';
      return value.toString().replace('_', ' ');
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (VueFilter);

/***/ }),

/***/ "./resources/assets/js/vue-i18n-locales.generated.js":
/*!***********************************************************!*\
  !*** ./resources/assets/js/vue-i18n-locales.generated.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  "en": {
    "auth": {
      "failed": "These credentials do not match our records.",
      "throttle": "Too many login attempts. Please try again in {seconds} seconds."
    },
    "general": {
      "register": "register",
      "home": "home",
      "contact": "contact",
      "filter": "filter | filter",
      "dorm": "dorm | dorms",
      "role": "role | roles",
      "ability": "ability | abilities",
      "mail": "mail | mails",
      "plugin": "plugin | plugins",
      "or": "or",
      "and": "and"
    },
    "mail": {
      "sender": "sender",
      "to": "recipients",
      "toAll": "Send to all residents.",
      "moreReceiverOptions": "more options",
      "lessReceiverOptions": "less options",
      "cc": "cc",
      "bcc": "bcc",
      "subject": "subject",
      "message": "message",
      "send": "send"
    },
    "pagination": {
      "previous": "&laquo; Previous",
      "next": "Next &raquo;"
    },
    "passwords": {
      "password": "Passwords must be at least six characters and match the confirmation.",
      "reset": "Your password has been reset!",
      "sent": "We have e-mailed your password reset link!",
      "token": "This password reset token is invalid.",
      "user": "We can't find a user with that e-mail address."
    },
    "user": {
      "user": "resident | residents",
      "profile": "profile",
      "first_name": "first name",
      "last_name": "last name",
      "username": "username",
      "email": "email",
      "password": "password",
      "floor": "floor",
      "room": "room",
      "house": "house",
      "created_at": "created at",
      "deleted_at": "deleted at",
      "confirmed": "confirmed",
      "subtenant": "subtenant | subtenants",
      "main_tenant": "main tenant | main tenants",
      "former_tenant": "former tenant | former tenants",
      "current_tenant": "current tenant | current tenants"
    },
    "validation": {
      "accepted": "The {attribute} must be accepted.",
      "active_url": "The {attribute} is not a valid URL.",
      "after": "The {attribute} must be a date after {date}.",
      "after_or_equal": "The {attribute} must be a date after or equal to {date}.",
      "alpha": "The {attribute} may only contain letters.",
      "alpha_dash": "The {attribute} may only contain letters, numbers, and dashes.",
      "alpha_num": "The {attribute} may only contain letters and numbers.",
      "array": "The {attribute} must be an array.",
      "before": "The {attribute} must be a date before {date}.",
      "before_or_equal": "The {attribute} must be a date before or equal to {date}.",
      "between": {
        "numeric": "The {attribute} must be between {min} and {max}.",
        "file": "The {attribute} must be between {min} and {max} kilobytes.",
        "string": "The {attribute} must be between {min} and {max} characters.",
        "array": "The {attribute} must have between {min} and {max} items."
      },
      "boolean": "The {attribute} field must be true or false.",
      "confirmed": "The {attribute} confirmation does not match.",
      "date": "The {attribute} is not a valid date.",
      "date_format": "The {attribute} does not match the format {format}.",
      "different": "The {attribute} and {other} must be different.",
      "digits": "The {attribute} must be {digits} digits.",
      "digits_between": "The {attribute} must be between {min} and {max} digits.",
      "dimensions": "The {attribute} has invalid image dimensions.",
      "distinct": "The {attribute} field has a duplicate value.",
      "email": "The {attribute} must be a valid email address.",
      "exists": "The selected {attribute} is invalid.",
      "file": "The {attribute} must be a file.",
      "filled": "The {attribute} field must have a value.",
      "image": "The {attribute} must be an image.",
      "in": "The selected {attribute} is invalid.",
      "in_array": "The {attribute} field does not exist in {other}.",
      "integer": "The {attribute} must be an integer.",
      "ip": "The {attribute} must be a valid IP address.",
      "ipv4": "The {attribute} must be a valid IPv4 address.",
      "ipv6": "The {attribute} must be a valid IPv6 address.",
      "json": "The {attribute} must be a valid JSON string.",
      "max": {
        "numeric": "The {attribute} may not be greater than {max}.",
        "file": "The {attribute} may not be greater than {max} kilobytes.",
        "string": "The {attribute} may not be greater than {max} characters.",
        "array": "The {attribute} may not have more than {max} items."
      },
      "mimes": "The {attribute} must be a file of type: {values}.",
      "mimetypes": "The {attribute} must be a file of type: {values}.",
      "min": {
        "numeric": "The {attribute} must be at least {min}.",
        "file": "The {attribute} must be at least {min} kilobytes.",
        "string": "The {attribute} must be at least {min} characters.",
        "array": "The {attribute} must have at least {min} items."
      },
      "not_in": "The selected {attribute} is invalid.",
      "numeric": "The {attribute} must be a number.",
      "present": "The {attribute} field must be present.",
      "regex": "The {attribute} format is invalid.",
      "required": "The {attribute} field is required.",
      "required_if": "The {attribute} field is required when {other} is {value}.",
      "required_unless": "The {attribute} field is required unless {other} is in {values}.",
      "required_with": "The {attribute} field is required when {values} is present.",
      "required_with_all": "The {attribute} field is required when {values} is present.",
      "required_without": "The {attribute} field is required when {values} is not present.",
      "required_without_all": "The {attribute} field is required when none of {values} are present.",
      "same": "The {attribute} and {other} must match.",
      "size": {
        "numeric": "The {attribute} must be {size}.",
        "file": "The {attribute} must be {size} kilobytes.",
        "string": "The {attribute} must be {size} characters.",
        "array": "The {attribute} must contain {size} items."
      },
      "string": "The {attribute} must be a string.",
      "timezone": "The {attribute} must be a valid zone.",
      "unique": "The {attribute} has already been taken.",
      "uploaded": "The {attribute} failed to upload.",
      "url": "The {attribute} format is invalid.",
      "custom": {
        "attribute-name": {
          "rule-name": "custom-message"
        }
      },
      "attributes": []
    }
  }
});

/***/ }),

/***/ "./resources/assets/sass/app.scss":
/*!****************************************!*\
  !*** ./resources/assets/sass/app.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./vendor/tightenco/ziggy/src/js/UrlBuilder.js":
/*!*****************************************************!*\
  !*** ./vendor/tightenco/ziggy/src/js/UrlBuilder.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UrlBuilder =
/*#__PURE__*/
function () {
  function UrlBuilder(name, absolute, ziggyObject) {
    _classCallCheck(this, UrlBuilder);

    this.name = name;
    this.ziggy = ziggyObject;
    this.route = this.ziggy.namedRoutes[this.name];

    if (typeof this.name === 'undefined') {
      throw new Error('Ziggy Error: You must provide a route name');
    } else if (typeof this.route === 'undefined') {
      throw new Error("Ziggy Error: route '".concat(this.name, "' is not found in the route list"));
    }

    this.absolute = typeof absolute === 'undefined' ? true : absolute;
    this.domain = this.setDomain();
    this.path = this.route.uri.replace(/^\//, '');
  }

  _createClass(UrlBuilder, [{
    key: "setDomain",
    value: function setDomain() {
      if (!this.absolute) return '/';
      if (!this.route.domain) return this.ziggy.baseUrl.replace(/\/?$/, '/');
      var host = (this.route.domain || this.ziggy.baseDomain).replace(/\/+$/, '');
      if (this.ziggy.basePort && host.replace(/\/+$/, '') === this.ziggy.baseDomain.replace(/\/+$/, '')) host = this.ziggy.baseDomain + ':' + this.ziggy.basePort;
      return this.ziggy.baseProtocol + '://' + host + '/';
    }
  }, {
    key: "construct",
    value: function construct() {
      return this.domain + this.path;
    }
  }]);

  return UrlBuilder;
}();

/* harmony default export */ __webpack_exports__["default"] = (UrlBuilder);

/***/ }),

/***/ "./vendor/tightenco/ziggy/src/js/route.js":
/*!************************************************!*\
  !*** ./vendor/tightenco/ziggy/src/js/route.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return route; });
/* harmony import */ var _UrlBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UrlBuilder */ "./vendor/tightenco/ziggy/src/js/UrlBuilder.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Router =
/*#__PURE__*/
function (_String) {
  _inherits(Router, _String);

  function Router(name, params, absolute) {
    var _this;

    var customZiggy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, Router);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Router).call(this));
    _this.name = name;
    _this.absolute = absolute;
    _this.ziggy = customZiggy ? customZiggy : Ziggy;
    _this.template = _this.name ? new _UrlBuilder__WEBPACK_IMPORTED_MODULE_0__["default"](name, absolute, _this.ziggy).construct() : '', _this.urlParams = _this.normalizeParams(params);
    _this.queryParams = _this.normalizeParams(params);
    return _this;
  }

  _createClass(Router, [{
    key: "normalizeParams",
    value: function normalizeParams(params) {
      if (typeof params === 'undefined') return {}; // If you passed in a string or integer, wrap it in an array

      params = _typeof(params) !== 'object' ? [params] : params; // If the tags object contains an ID and there isn't an ID param in the
      // url template, they probably passed in a single model object and we should
      // wrap this in an array. This could be slightly dangerous and I want to find
      // a better solution for this rare case.

      if (params.hasOwnProperty('id') && this.template.indexOf('{id}') == -1) {
        params = [params.id];
      }

      this.numericParamIndices = Array.isArray(params);
      return Object.assign({}, params);
    }
  }, {
    key: "with",
    value: function _with(params) {
      this.urlParams = this.normalizeParams(params);
      return this;
    }
  }, {
    key: "withQuery",
    value: function withQuery(params) {
      Object.assign(this.queryParams, params);
      return this;
    }
  }, {
    key: "hydrateUrl",
    value: function hydrateUrl() {
      var _this2 = this;

      var tags = this.urlParams,
          paramsArrayKey = 0,
          params = this.template.match(/{([^}]+)}/gi),
          needDefaultParams = false;

      if (params && params.length != Object.keys(tags).length) {
        needDefaultParams = true;
      }

      return this.template.replace(/{([^}]+)}/gi, function (tag, i) {
        var keyName = tag.replace(/\{|\}/gi, '').replace(/\?$/, ''),
            key = _this2.numericParamIndices ? paramsArrayKey : keyName,
            defaultParameter = _this2.ziggy.defaultParameters[keyName];

        if (defaultParameter && needDefaultParams) {
          if (_this2.numericParamIndices) {
            tags = Object.values(tags);
            tags.splice(key, 0, defaultParameter);
          } else {
            tags[key] = defaultParameter;
          }
        }

        paramsArrayKey++;

        if (typeof tags[key] !== 'undefined') {
          delete _this2.queryParams[key];
          return tags[key].id || encodeURIComponent(tags[key]);
        }

        if (tag.indexOf('?') === -1) {
          throw new Error("Ziggy Error: '".concat(keyName, "' key is required for route '").concat(_this2.name, "'"));
        } else {
          return '';
        }
      });
    }
  }, {
    key: "matchUrl",
    value: function matchUrl() {
      var tags = this.urlParams,
          paramsArrayKey = 0;
      var windowUrl = window.location.hostname + (window.location.port ? ':' + window.location.port : '') + window.location.pathname;
      var searchTemplate = this.template.replace(/(\{[^\}]*\})/gi, '[^\/\?]+').split('://')[1];
      var urlWithTrailingSlash = windowUrl.replace(/\/?$/, '/');
      return new RegExp("^" + searchTemplate + "\/$").test(urlWithTrailingSlash);
    }
  }, {
    key: "constructQuery",
    value: function constructQuery() {
      if (Object.keys(this.queryParams).length === 0) return '';
      var queryString = '?';
      Object.keys(this.queryParams).forEach(function (key, i) {
        if (this.queryParams[key] !== undefined && this.queryParams[key] !== null) {
          queryString = i === 0 ? queryString : queryString + '&';
          queryString += key + '=' + encodeURIComponent(this.queryParams[key]);
        }
      }.bind(this));
      return queryString;
    }
  }, {
    key: "current",
    value: function current() {
      var _this3 = this;

      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var routeNames = Object.keys(this.ziggy.namedRoutes);
      var currentRoute = routeNames.filter(function (name) {
        if (_this3.ziggy.namedRoutes[name].methods.indexOf('GET') === -1) {
          return false;
        }

        return new Router(name, undefined, undefined, _this3.ziggy).matchUrl();
      })[0];

      if (name) {
        var pattern = new RegExp(name.replace('*', '.*').replace('.', '\.'), 'i');
        return pattern.test(currentRoute);
      }

      return currentRoute;
    }
  }, {
    key: "parse",
    value: function parse() {
      this.return = this.hydrateUrl() + this.constructQuery();
    }
  }, {
    key: "url",
    value: function url() {
      this.parse();
      return this.return;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.url();
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.url();
    }
  }]);

  return Router;
}(_wrapNativeSuper(String));

function route(name, params, absolute, customZiggy) {
  return new Router(name, params, absolute, customZiggy);
}
;

/***/ }),

/***/ 0:
/*!***************************************************************************!*\
  !*** multi ./resources/assets/js/app.js ./resources/assets/sass/app.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\Web-Projekte\dms\resources\assets\js\app.js */"./resources/assets/js/app.js");
module.exports = __webpack_require__(/*! D:\Web-Projekte\dms\resources\assets\sass\app.scss */"./resources/assets/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);