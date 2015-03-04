require.config({
    baseUrl: 'src',
    paths: {
        "dropzone":             "bower_components/dropzone/downloads/dropzone",
        "i18n":                 "bower_components/patternslib/src/core/i18n",
        "jquery":               "bower_components/jquery/dist/jquery",
        "jquery.browser":       "bower_components/jquery.browser/dist/jquery.browser",
        "logging":              "bower_components/logging/src/logging",
        "mockup-parser":        "bower_components/mockup-core/js/parser",
        "mockup-patterns-base": "bower_components/mockup-core/js/pattern",
        "pat-compat":           "bower_components/patternslib/src/core/compat",
        "pat-jquery-ext":       "bower_components/patternslib/src/core/jquery-ext",
        "pat-logger":           "bower_components/patternslib/src/core/logger",
        "pat-parser":           "bower_components/patternslib/src/core/parser",
        "pat-registry":         "bower_components/patternslib/src/core/registry",
        "pat-utils":            "bower_components/patternslib/src/core/utils",
        "patterns":             "bower_components/patternslib/bundle",
        "preview":              "templates/preview.xml",
        "text":                 "bower_components/requirejs-text/text",
        "underscore":           "bower_components/underscore/underscore",
        "upload":               "templates/upload.xml",
    },

    "shim": {
        "logging": { "exports": "logging" },
    }
});

require(["pat-registry", "pat-upload", "jquery.browser"], function(registry, upload) {
    window.patterns = registry;
    // workaround this MSIE bug :
    // https://dev.plone.org/plone/ticket/10894
    if ($.browser.msie) {
        $("#settings").remove();
    }
    window.Browser = {};
    window.Browser.onUploadComplete = function () {};
    registry.init();
    return;
});

