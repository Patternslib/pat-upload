import "regenerator-runtime/runtime"; // needed for ``await`` support
import $ from "jquery";
import _ from "underscore";
import _t from "@patternslib/patternslib/src/core/i18n";
import Base from "@patternslib/patternslib/src/core/base";
import logging from "@patternslib/patternslib/src/core/logging";
import Parser from "@patternslib/patternslib/src/core/parser";

const log = logging.getLogger("pat-upload");

export const parser = new Parser("upload");
parser.add_argument("concurrent-uploads", "multiple", ["multiple", "single"]); // Only one upload at a time, or multiple ones simultaneously?
parser.add_argument("ajax-upload", true); //boolean: true or false for letting the widget upload the files via ajax. If false the form will act like a normal form. (true)
parser.add_argument("post-upload", true); //boolean: condition value for the file preview in div element to fadeout after file upload is completed. (true)
parser.add_argument("class-name", "upload"); //string: value for class attribute in the form element ('upload')
parser.add_argument("clickable", "true"); //boolean: If you can click on container to also upload (true)
parser.add_argument("current-path"); //string: Current path related items is starting with (null)
parser.add_argument("label", "Drop files here…"); //string: Text to show instead of the default ('Drop files here…')
parser.add_argument("name", "file"); //string: value for name attribute in the file input element ('file')
parser.add_argument("previews-container", ".previews"); //selector: JavaScript selector for file preview in div element. (.previews)
parser.add_argument("timeout", 120000);
parser.add_argument("trigger", "button"); //string: What triggers the upload.  'button' expects user to click upload button, 'auto' starts uploading automatically after the user drags something, and always hides the upload button. ('button')
parser.add_argument("url"); //string: If not used with a form, this option must provide the URL to submit to (null)

export default Base.extend({
    name: "upload",
    trigger: ".pat-upload",
    parser: "patternslib",
    defaults: {
        addRemoveLinks: false,
        maxFiles: null,
        maxFilesize: 99999999, // let's not have a max by default...
        previewTemplate: null,
    },
    template_preview: null,

    async init($el, opts) {
        if (window.__patternslib_import_styles) {
            import("dropzone/dist/basic.css");
        }

        const Dropzone = (await import("dropzone")).default;
        Dropzone.autoDiscover = false; // we do not want this plugin to auto discover
        this.template_preview = (await import("./templates/preview.html")).default;
        const template_upload = (await import("./templates/upload.html")).default;

        this.cfgs = _.extend(_.clone(this.defaults), parser.parse($el, opts, true)[0]);
        this.$el.addClass(this.cfgs.className);
        this.$el.append(
            _.template(template_upload)({ _t: _t, label: _t(this.cfgs.label) })
        );

        if (!this.cfgs.ajaxUpload) {
            // no ajax upload, drop the fallback
            $(".fallback", this.$el).remove();
        }
        try {
            // if init of Dropzone fails it says nothing and
            // it fails silently. Using this block we make sure
            // that if you break it w/ some weird or missing option
            // you can get a proper log of it
            this.dropzone = new Dropzone(
                $(".upload-area", this.$el)[0],
                this.getDzoneOptions()
            );
        } catch (e) {
            log.error(e);
            throw e;
        }
        this.registerHandlers();
    },

    refresh() {
        var $form = this.$el.closest("form");
        if ($form.hasClass("pat-inject")) {
            $form.submit();
        }
    },

    registerHandlers() {
        this.dropzone.on(
            "complete",
            $.proxy(function (file) {
                if (this.cfgs.postUpload) {
                    setTimeout(function () {
                        $(file.previewElement).fadeOut();
                    }, 1000);
                }
                if (
                    _.filter(this.dropzone.files, function (f) {
                        return f.status !== "success";
                    }).length === 0
                ) {
                    this.refresh();
                }
            }, this)
        );
    },

    getUrl() {
        var $form;
        var url = this.cfgs.url;
        if (!url) {
            $form = this.$el.closest("form");
            url = $form.length > 0 ? $form.attr("action") : window.location.href;
        }
        return url;
    },

    getDzoneOptions() {
        if (typeof this.cfgs.clickable === "string") {
            this.cfgs.clickable = this.cfgs.clickable === "true" ? true : false;
        }
        var options = $.extend({}, this.cfgs);
        delete options.postUpload;
        if (this.cfgs.previewsContainer) {
            /* If they have a select but it's not an id, let's make an id selector
             * so we can target the correct container. dropzone is weird here...
             */
            var $preview = this.$el.find(this.cfgs.previewsContainer);
            if ($preview.length > 0) {
                options.previewsContainer = $preview[0];
            }
        }
        options.url = this.getUrl();
        options.uploadMultiple = options.concurrentUploads === "multiple" ? true : false;
        options.previewTemplate = this.template_preview;
        // if our element is a form we should force some values
        // https://github.com/enyo/dropzone/wiki/Combine-normal-form-with-Dropzone
        return options;
    },
});
