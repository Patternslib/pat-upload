/* Upload pattern */
define([
  "jquery",
  "underscore",
  "dropzone",
  "pat-base",
  "pat-registry",
  "pat-parser",
  "i18n",
  "text!upload",
  "text!preview",
], function($, _, Dropzone, Base, registry, Parser, _t, UploadTemplate, PreviewTemplate) {
    "use strict";

    var parser = new Parser("upload");
    parser.add_argument("ajax-upload", true);           //boolean: true or false for letting the widget upload the files via ajax. If false the form will act like a normal form. (true)
    parser.add_argument("post-upload", true);           //boolean: condition value for the file preview in div element to fadeout after file upload is completed. (true)
    parser.add_argument("base-url");                    //string: to be used in conjunction with relative-path to generate submission urls based on related items (null)
    parser.add_argument("className", "upload");         //string: value for class attribute in the form element ('upload')
    parser.add_argument("clickable", "true");           //boolean: If you can click on container to also upload (true)
    parser.add_argument("container", "");               //selector: JavaScript selector for where to put upload stuff into in case of form. If not provided it will be placed before the first submit button. ('')
    parser.add_argument("current-path");                //string: Current path related items is starting with (null)
    parser.add_argument("initial-folder");              //string: UID of initial folder related items widget should have selected (null)
    parser.add_argument("label", "Drop files here…");   //string: Text to show instead of the default ('Drop files here…')
    parser.add_argument("name", "file");                //string: value for name attribute in the file input element ('file')
    parser.add_argument("previews-container", ".previews");  //selector: JavaScript selector for file preview in div element. (.previews)
    parser.add_argument("related-items");               //object: Related items pattern options. Will only use only if relative-path is used to use correct upload destination ({ attributes: ["UID", "Title", "Description", "getURL", "Type", "path", "ModificationDate"], batchSize: 20, basePath: "/", vocabularyUrl: null, width: 500, maximumSelectionSize: 1, placeholder: "Search for item on site..." })
    parser.add_argument("relative-path");               //string: again, to be used with base-url to create upload url (null)
    parser.add_argument("result-template");             //string: HTML template for the element that will contain file information. ('<div class="dz-notice"><p>Drop files here...</p></div><div class="upload-previews"/>')
    parser.add_argument("title", true);                 //boolean: show/hide the h1 title (true)
    parser.add_argument("trigger", "button");           //string: What triggers the upload.  'button' expects user to click upload button, 'auto' starts uploading automatically after the user drags something, and always hides the upload button. ('button')
    parser.add_argument("url");                         //string: If not used with a form, this option must provide the URL to submit to or base-url with relative-path needs to be used (null)
    parser.add_argument("wrap", false);                 //boolean: true or false for wrapping this element using the value of wrapperTemplate. (false)
    parser.add_argument("wrapper-template", '<div class="upload-wrapper"/>'); //string: HTML template for wrapping around with this element. ('<div class="upload-container"/>')

    /* we do not want this plugin to auto discover */
    Dropzone.autoDiscover = false;

    return Base.extend({
        name: 'upload',
        trigger: '.pat-upload',
        parser: 'patternslib',
        defaults: {
            addRemoveLinks: false,
            fileaddedClassName: 'dropping',
            maxFiles: null,
            maxFilesize: 99999999, // let's not have a max by default...
            previewTemplate: null,
            useTus: false,
            relatedItems: {
                // UID attribute is required here since we're working with related items
                attributes: ['UID', 'Title', 'Description', 'getURL', 'Type', 'path', 'ModificationDate'],
                basePath: '/',
                batchSize: 20,
                maximumSelectionSize: 1,
                placeholder: _t('Search for item on site...'),
                vocabularyUrl: null,
                width: 500
            }
        },

        //placeholder: 'Search for item on site...'
        init: function($el, opts) {
            this.cfgs = _.extend(_.clone(this.defaults), parser.parse($el, opts, true)[0]);

            // values that will change current processing
            this.currentPath = this.cfgs.currentPath;
            this.numFiles = 0;
            this.currentFile = 0;

            this.$el.addClass(this.cfgs.className);
            this.$el.append(_.template(UploadTemplate)({_t: _t, label: _t(this.cfgs.label)}));
            this.$progress = $('.progress-bar-success', this.$el);

            if (!this.cfgs.title) {
                this.$el.find('h2.title').hide();
            }

            if (!this.cfgs.ajaxUpload) {
                // no ajax upload, drop the fallback
                $('.fallback', this.$el).remove();
                if (this.$el.hasClass('.upload-container')) {
                    this.$el.addClass('no-ajax-upload');
                } else {
                    this.$el.closest('.upload-container').addClass('no-ajax-upload');
                }
            }

            if (this.cfgs.wrap) {
                this.$el.wrap(this.cfgs.wrapperTemplate);
                this.$el = this.$el.parent();
            }

            if (this.cfgs.baseUrl && this.cfgs.relativePath){
                // only use related items if we can generate paths based urls
                this.$pathInput = $('input[name="location"]', this.$el);
                this.relatedItems = this.setupRelatedItems(this.$pathInput);
            } else {
                $('input[name="location"]', this.$el).parent().remove();
                this.relatedItems = null;
            }

            this.$dropzone = $('.upload-area', this.$el);

            var dzoneOptions = this.getDzoneOptions();
            try {
                // if init of Dropzone fails it says nothing and
                // it fails silently. Using this block we make sure
                // that if you break it w/ some weird or missing option
                // you can get a proper log of it
                //
                this.dropzone = new Dropzone(this.$dropzone[0], dzoneOptions);
            } catch (e) {
                if (window.DEBUG) {
                    // log it!
                    console.log(e);
                }
                throw e;
            }
            this.hideControls();

            $('button.browse', this.$el).click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                // we trigger the dropzone dialog!
                this.dropzone.hiddenFileInput.click();
            }.bind(this));

            this.dropzone.on('addedfile', function(file) {
                if (this.cfgs.trigger === 'button')
                    this.showControls();
                if (this.cfgs.trigger === 'auto')
                    this.processUpload({
                        finished: function() {
                            this.$progress.attr('aria-valuenow', 0).css('width', '0%');
                        }.bind(this)
                    });
            }.bind(this));

            this.dropzone.on('removedfile', function() {
                if (this.dropzone.files.length < 1) {
                    this.hideControls();
                }
            }.bind(this));

            if (this.cfgs.postUpload) {
                this.dropzone.on('complete', function(file) {
                    setTimeout(function() {
                        $(file.previewElement).fadeOut();
                    }, 3000);
                }.bind(this));
            }

            this.dropzone.on('complete', $.proxy(function(file) {
                if (this.dropzone.files.length < 1) {
                    this.hideControls();
                }
            }, this));

            this.dropzone.on('totaluploadprogress', $.proxy(function(pct) {
                // need to caclulate total pct here in reality since we're manually
                // processing each file one at a time.
                pct = ((((this.currentFile - 1) * 100) + pct) / (this.numFiles * 100)) * 100;
                this.$progress.attr('aria-valuenow', pct).css('width', pct + '%');
            }, this));

            $('.upload-all', this.$el).click($.proxy(function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.processUpload({
                    finished: function() {
                        this.$progress.attr('aria-valuenow', 0).css('width', '0%');
                    }.bind(this)
                });
            }, this));
        },

        showControls: function() {
            $('.controls', this.$el).fadeIn('slow');
        },

        hideControls: function() {
            $('.controls', this.$el).fadeOut('slow');
        },

        pathJoin: function() {
            var parts = [];
            _.each(arguments, function(part) {
                if (!part) {
                    return;
                }
                if (part[0] === '/'){
                    part = part.substring(1);
                }
                if (part[part.length - 1] === '/'){
                    part = part.substring(0, part.length - 1);
                }
                parts.push(part);
            });
            return parts.join('/');
        },

        getUrl: function() {
            var $form;
            var url = this.cfgs.url;
            if (!url) {
                if (this.cfgs.baseUrl && this.cfgs.relativePath) {
                    url = this.cfgs.baseUrl;
                    if (url[url.length - 1] !== '/'){
                        url = url + '/';
                    }
                    url = url + this.pathJoin(this.currentPath, this.cfgs.relativePath);
                } else {
                    $form = this.$el.parents('form');
                    if ($form.length > 0){
                        url = $form.attr('action');
                    } else {
                        url = window.location.href;
                    }
                }
            }
            return url;
        },

        getDzoneOptions: function() {
            // clickable option
            if (typeof(this.cfgs.clickable) === 'string') {
                if (this.cfgs.clickable === 'true') {
                    this.cfgs.clickable = true;
                } else {
                    this.cfgs.clickable = false;
                }
            }
            var options = $.extend({}, this.cfgs);
            options.url = this.getUrl();
            // XXX force to only upload one at a time,
            // right now we don't support multiple for backends
            options.uploadMultiple = false;

            delete options.wrap;
            delete options.wrapperTemplate;
            delete options.resultTemplate;
            delete options.postUpload;
            delete options.fileaddedClassName;
            delete options.useTus;

            if (this.cfgs.previewsContainer) {
                /*
                * if they have a select but it's not an id, let's make an id selector
                * so we can target the correct container. dropzone is weird here...
                */
                var $preview = this.$el.find(this.cfgs.previewsContainer);
                if ($preview.length > 0) {
                options.previewsContainer = $preview[0];
                }
            }

            // XXX: do we need to allow this?
            options.autoProcessQueue = false;
            // options.addRemoveLinks = true;  // we show them in the template
            options.previewTemplate = PreviewTemplate;

            // if our element is a form we should force some values
            // https://github.com/enyo/dropzone/wiki/Combine-normal-form-with-Dropzone
            return options;
        },

        processUpload: function(options) {
            if (!options){ options = {}; }

            var self = this,
                processing = false,
                useTus = this.cfgs.useTus,
                fileaddedClassName = this.cfgs.fileaddedClassName,
                finished = options.finished;

            self.numFiles = self.dropzone.files.length;
            self.currentFile = 0;

            function process() {
                processing = true;
                if (self.dropzone.files.length === 0) {
                    processing = false;
                    self.$el.removeClass(fileaddedClassName);
                    if (finished !== undefined && typeof(finished) === 'function'){
                        finished();
                    }
                    return;
                }
                var file = self.dropzone.files[0];
                if ([Dropzone.SUCCESS, Dropzone.ERROR, Dropzone.CANCELED]
                    .indexOf(file.status) !== -1) {
                    // remove it
                    self.dropzone.removeFile(file);
                    process();
                } else if (file.status !== Dropzone.UPLOADING) {
                    // start processing file
                    if (useTus && window.tus) {
                        // use tus upload if installed
                        self.handleTusUpload(file);
                    } else {
                        // otherwise, just use dropzone to process
                        self.currentFile += 1;
                        self.dropzone.processFile(file);
                    }
                    setTimeout(process, 100);
                } else {
                    // currently processing
                    setTimeout(process, 100);
                }
            }
            process();
        },

        handleTusUpload: function(file) {
            /* this needs fixing... */
            var self = this,
                $preview = $(file.previewElement),
                chunkSize = 1024 * 1024 * 5; // 5mb chunk size

            file.status = Dropzone.UPLOADING;

            window.tus.upload(file, {
                endpoint: self.dropzone.options.url,
                headers: {
                'FILENAME': file.name
                },
                chunkSize: chunkSize
            }).fail(function() {
                if(window.DEBUG){
                console.alert('Error uploading with TUS resumable uploads');
                }
                file.status = Dropzone.ERROR;
            }).progress(function(e, bytesUploaded, bytesTotal) {
                var percentage = (bytesUploaded / bytesTotal * 100);
                self.$progress.attr('aria-valuenow', percentage).css('width', percentage + '%');
                self.$progress.html(_t('uploading...<br />') +
                                    self.formatBytes(bytesUploaded) +
                                    ' / ' + self.formatBytes(bytesTotal));
            }).done(function(url, file) {
                file.status = Dropzone.SUCCESS;
                self.dropzone.emit('success', file);
                self.dropzone.emit('complete', file);
            });
        },

        formatBytes: function(bytes) {
            var kb = Math.round(bytes / 1024);
            if (kb < 1024) {
                return kb + ' KiB';
            }
            var mb = Math.round(kb / 1024);
            if (mb < 1024) {
                return mb + ' MB';
            }
            return Math.round(mb / 1024) + ' GB';
        },

        setupRelatedItems: function($input) {
            var options = this.cfgs.relatedItems;
            if (this.cfgs.initialFolder){
                $input.attr('value', this.cfgs.initialFolder);
            }
            var ri = new RelatedItems($input, options);
            ri.$el.on('change', $.proxy(function() {
                var result = $(this).select2('data');
                if (result.length > 0){
                    this.currentPath = result[0].path;
                } else {
                    this.currentPath = null;
                }
                this.cfgs.url = this.dropzone.options.url = this.getUrl();
            }, this));
            return ri;
        }
    });
});
