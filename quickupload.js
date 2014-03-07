define([
    "jquery",
    "pat-registry",
    "pat-parser",
    "pat-inject",
    "fine-uploader"
], function($, registry, Parser, inject) {

    var parser = new Parser("quickupload");
    parser.add_argument("dropzone-text");
    parser.add_argument("ie-fallback-button-text");
    parser.add_argument("load-content");
    parser.add_argument("refresh");
    parser.add_argument("tags");
    parser.add_argument("tags-autocomplete");
    parser.add_argument("upload-button-text");
    parser.add_argument("url");

    var quickupload = {
        name: "quickupload",
        trigger: '.pat-quickupload',
        init: function($el, opts) {
            var $original = $el.clone();
            var cfgs = parser.parse($el, opts, true);

            // Disable 'Drag files here' text on IE < 10 where drag&drop upload is not
            // supported.
            var dropzoneText = cfgs[0].dropzoneText;
            var uploadButton = cfgs[0].uploadButtonText;
            if ($.browser.msie && parseInt($.browser.version, 10) < 10) {
                dropzoneText = '';
                uploadButton = cfgs[0].ieFallbackButtonText || 'Upload a file';
            }

            var options = {
                debug: false, // XXX: This flag should be controlled via Patterns logging
                autoUpload: false,
                maxConnections: 1,
                request: {
                    endpoint: cfgs[0].url
                },
                dragAndDrop: {
                    hideDropzones: false
                },
                display: {
                    fileSizeOnSubmit: true
                },
                text: {
                    dragZone: dropzoneText,
                    uploadButton: uploadButton,
                    waitingForResponse: " Processing..."
                }
            };

            var modal_template =
                '<div class="meta-panel pat-modal" style="display:none">'+
                    '<h4>Metadata</h4>'+
                    '<div class="wizard-box">'+
                        '<div class="panel-body">' +
                            '<span class="qq-drop-processing">'+
                                '<span>&nbsp;{dropProcessingText}</span>'+
                                '<span class="qq-drop-processing-spinner"></span>'+
                            '</span>' +
                            '<ul class="qq-upload-list"></ul>'+
                        '</div>'+
                        '<div class="button-bar panel-footer">'+
                            '<button class="trigger-upload">Upload</button>'+
                            '<button type="button" class="close-panel">Cancel</button>'+
                        '</div>'+
                    '</div>'+
                '</div>';
            options.template =
                '<div class="qq-uploader">' +
                    '<div class="qq-upload-drop-area"><span>{dragZoneText}&nbsp;'+
                        '<div class="qq-upload-button button"><div>{uploadButtonText}</div></div>' +
                    '</span></div>' + modal_template +
                '</div>';
            options.fileTemplate = '<li>' +
                '<div class="qq-progress-bar"></div>' +
                '<span class="qq-upload-spinner"></span>' +
                '<span class="qq-upload-finished"></span>' +
                '<span class="qq-edit-filename-icon"></span>' +
                '<span class="qq-upload-file"></span>' +
                '<input class="qq-edit-file-name" placeholder="Title" type="text">' +
                '<input class="qq-edit-tags pat-autosuggest" placeholder="Enter tag(s)" type="text">' +
                '<textarea class="qq-edit-description" rows="3" placeholder="Description"></textarea>' +
                '<span class="qq-upload-size"></span>' +
                '<a class="qq-upload-cancel" href="#">{cancelButtonText}</a>' +
                '<a class="qq-upload-retry" href="#">{retryButtonText}</a>' +
                '<a class="qq-upload-delete" href="#">{deleteButtonText}</a>' +
                '<span class="qq-upload-status-text">{statusText}</span>' +
                '</li>';
            $el.fineUploader(options);

            var refresh = function () {
                /* Manually call the inject pattern to refresh a specified
                 * area.
                 * The element descriptor is via the "refresh"
                 * data-pat-quickupload attr and the URL via "load-content"
                 */
                var $target = $el.closest(cfgs[0].refresh);
                var url = cfgs[0].loadContent;
                var components = url.split("#"),
                    base_url = components[0],
                    id = components[1] ? "#" + components[1] : "body",
                    opts = [{
                        url: base_url,
                        source: id,
                        $target: $target,
                        dataType: "html"
                    }];
                inject.execute(opts, $el);
                // Refresh the position/size of any modals that might be
                // hovering about.
                $(window).trigger('resize.pat-modal-position');
            };

            var closeModal = function (ev) {
                // Event handler that closes the modal by refreshing the tag
                // contents area
                // XXX STAR FIX!! Reset the overflow information again on the sidebar
                $('aside.sidebar').css('overflow', 'auto').css('overflow-x', 'hidden').css('overflow-y', 'auto');
                if (ev && ev.type === "keyup" && ev.which !== 27) {
                    return;
                }
                ev.preventDefault();
                ev.stopPropagation();
                var $parent = $el.parent();
                $el.replaceWith($original);
                $parent.trigger('patterns-injected.patterns');
            };

            $el.on("click", ".trigger-upload", function (ev) {
                ev.preventDefault();
                $el.fineUploader('uploadStoredFiles');
            });

            $el.on('upload', function (ev, id, name) {
                var dropped_items = $el.find('ul.qq-upload-list').children('li');
                for (i=0; i<dropped_items.length; i++) {
                    if (dropped_items[i].qqFileId === id) {
                        $el.fineUploader('setParams',
                            {   'qq-edit-file-name': $(dropped_items[i]).find('.qq-edit-file-name').val(),
                                'qq-edit-tags': $(dropped_items[i]).find('input.qq-edit-tags').val(),
                                'qq-edit-description': $(dropped_items[i]).find('.qq-edit-description').val()
                            }, id);
                    }
                }
            });

            $el.on('submitted', function (ev, id, name, response) {
                var i;
                var $panel = $el.find('div.meta-panel');
                var dropped_items = $el.find('ul.qq-upload-list').children('li');
                for (i=0; i<dropped_items.length; i++) {
                    if (dropped_items[i].qqFileId === id) {
                        $target = $(dropped_items[i]);
                        $target.find('input.qq-edit-tags')
                            .attr('data-pat-autosuggest',
                                'pre-fill: '+cfgs[0].tags+'; words: '+cfgs[0].tagsAutocomplete);
                        $target.find('.qq-edit-file-name').val(name);
                        break;
                    }
                }
                if (!$panel.is(':visible')) {
                    // XXX STAR FIX: Modal cannot show while overflow is active. Disable temporarily
                    $('aside.sidebar').css('overflow', 'visible').css('overflow-x', 'visible').css('overflow-y', 'visible');
                    $panel.show(function () {
                        $panel.trigger('patterns-injected.patterns');
                        $(document).on("keyup.pat-modal", function (ev) {
                            closeModal(ev);
                        });
                        $(this).on("click", ".close-panel", function (ev) {
                            closeModal(ev);
                        });
                    });
                } else {
                    $target.trigger('patterns-injected.patterns');
                }
            });

            $el.on('complete', function (ev, id, name, response, xhr) {
                var hide_and_remove_item = function ($item) {
                    $item.hide('slow', function () {
                        $(this).remove();
                        var num_items = $el.find('ul.qq-upload-list').children('li').length;
                        if (num_items === 0) {
                            // this is the last item, so refresh the tag area,
                            // this will close the modal.
                            refresh();
                        }
                    });
                };
                if (response.success === true) {
                    var dropped_items = $el.find('ul.qq-upload-list').children('li');
                    for (i=0; i<dropped_items.length; i++) {
                        if (dropped_items[i].qqFileId === id) {
                            hide_and_remove_item($(dropped_items[i]));
                        }
                    }
                } else {
                    if (response.error == null) {
                        if (xhr.status == 504) {
                            response.error = 'timeout';
                        } else if (xhr.status == 413) {
                            response.error = 'File too large';
                        }
                    }
                    $('.qq-upload-status-text', $el).text(' Upload failed: ' + response.error);
                }
            });

            var scroll_to_bottom = function() {
                var diff = $sidebar.children().toArray().reduce(function(acc, el) {
                    return acc + $(el).outerHeight(true);
                }, 0) - $sidebar.innerHeight();
                $sidebar.animate({
                    scrollTop: diff
                });
            };
            $el.on('onSubmit', scroll_to_bottom);
            $el.on('onError', scroll_to_bottom);
        }
    };
    registry.register(quickupload);

    $(document).on('qqSuccess', '#sidebar-content', function() {
        // make sure untagged is open and reload it's content if already open
        $('#sidebar-content .label-group-template').prev('.open')
            .patternCollapsible('loadContent');
        $('#sidebar-content .label-group-template').prev('.closed')
            .patternCollapsible('open');
    });
});
