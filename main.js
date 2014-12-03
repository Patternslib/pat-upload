require.config({
    baseUrl: '../src',
    paths: {
        "dropzone":             "bower_components/dropzone/downloads/dropzone",
        "jquery":               "bower_components/jquery/jquery",
        "pat-parser":           "bower_components/patternslib/src/core/parser",
        "pat-registry":         "bower_components/patternslib/src/core/registry",
        "patterns":             "bower_components/patternslib/bundle",
        "text":                 "bower_components/requirejs-text/text",
        "underscore":           "bower_components/underscore/underscore",
        "pat-logger":           "bower_components/patternslib/src/core/logger",
        "pat-utils":            "bower_components/patternslib/src/core/utils",
        "pat-compat":           "bower_components/patternslib/src/core/compat",
        "pat-jquery-ext":       "bower_components/patternslib/src/core/jquery-ext",
        "upload":               "templates/upload.xml",
        "preview":              "templates/preview.xml",
        "logging":              "bower_components/logging/src/logging",
    },

    "shim": {
        "logging": { "exports": "logging" },
    }
});

require(["pat-registry", "pat-upload"], function(registry, upload) {
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

