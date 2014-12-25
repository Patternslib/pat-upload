## Description

A pattern that creates a drop area for uploading multiple files in a prototype or production website, without the need for programming JavaScript.

Based on fineuploader.  -http://fineuploader.com/


## Documentation

Property | Value | Default | Type | Description
---------|-------|---------|------|------------
ajaxUpload | `true`, `false` | `true` | boolean | For letting the widget upload the files via ajax. If false the form will act like a normal form.
autoCleanResults | `true`, `false` | `true` | boolean | Condition value for the file preview in div element to fadeout after file upload is completed.
baseUrl | _url string_ | _null_ | string | To be used in conjunction with relativePath to generate submission urls based on related items.
className | _class name_ | `upload` | string | Value for class attribute in the form element.
clickable | `true`, `false` | `false` | boolean | If you can click on container to also upload.
container | | `''` | selector | JavaScript selector for where to put upload stuff into in case of form. If not provided it will be place before the first submit button.
currentPath | _path string_ | _null_ | string | Current path related items is starting with.
initialFolder | _UID string_ | _null_ | string | UID of initial folder related items widget should have selected.
label | *string* | `Drop files here…` | string | Label text to show on the upload zone.
paramName | _name attr_ | `file` | string | Value for name attribute in the file input element.
previewsContainer | | `.previews` | selector | JavaScript selector for file preview in div element.
relatedItems | _JS object_ | `{ attributes: ["UID", "Title", "Description", "getURL", "Type", "path", "ModificationDate"], batchSize: 20, basePath: "/", vocabularyUrl: null, width: 500, maximumSelectionSize: 1, placeholder: "Search for item on site..." }` | object | Related items pattern options. Will only use only if relativePath is used to use correct upload destination.
relativePath | _path string_ | _null_ | string | Again, to be used with baseUrl to create upload url.
resultTemplate | _html string_ | `<div class="dz-notice"><p>Drop files here...</p></div><div class="upload-previews"/>` | string | HTML template for the element that will contain file information. 
showTitle | `true`, `false` | `true` | boolean | Show/hide the h1 title.
trigger | _trigger name_ | `button` | string | What triggers the upload.  'button' expects user to click upload button, 'auto' starts uploading automatically after the user drags something, and always hides the upload button.
url | _url string_ | _null_ | string | If not used with a form, this option must provide the URL to submit to or baseUrl with relativePath needs to be used.
wrap | `true`, `false` | `false` | boolean | True or false for wrapping this element using the value of wrapperTemplate.
wrapperTemplate | _html string_ | `<div class="upload-container"/>`| string | HTML template for wrapping around with this element.


Property | Value | Default | Type | Description
---------|-------|---------|------|------------
post-upload | `clean`, `leave` | `clean` | mutually exclusive | Condition value for the file preview in div element to fadeout (clean) after file upload is completed.
base-url | *string* |  | string | To be used in conjunction with relative-path to generate submission urls based on related items.
class-name | *string* | `upload` | string | Value for class attribute in the form element.
file-selection | `drag` and or `click` | `drag click` | multiple values | If you can click on container to also upload and or drag files for upload.
container | | `''` | selector | JavaScript selector for where to put upload stuff into in case of form. If not provided it will be place before the first submit button.
current-path | *string* |  | string | Current path related items is starting with.
initial-folder | *string* |  | string | UID of initial folder related items widget should have selected.
label | *string* | `Drop files here…` | string | Label text to show on the upload zone.
name | *string* | `file` | string | Value for name attribute in the file input element.
previews-container | *string* | `.previews` | selector | JavaScript selector for file preview in div element.
related-items | *string* | `{ attributes: ["UID", "Title", "Description", "getURL", "Type", "path", "ModificationDate"], batchSize: 20, basePath: "/", vocabularyUrl: null, width: 500, maximumSelectionSize: 1, placeholder: "Search for item on site..." }` | object | Related items pattern options. Will only use only if relativePath is used to use correct upload destination.
relative-path | *string* |  | string | Again, to be used with baseUrl to create upload url.
result-template | *string* | `<div class="dz-notice"><p>Drop files here…</p></div><div class="upload-previews"/>` | string | HTML template for the element that will contain file information. 
title | *string*, `none` | `none` | mutually exclusive | Populate or hide the h1 title.
trigger | `button`, `auto` | `button` | mutually exclusive | Defaulting to value `button` which allows the user to check the upload list before clicking a button that reads 'Upload', before uploading the selected files. A value `auto` always hides the upload button and start uploading automatically after the user drags some files on.
url | *string* |  | string | If not used with a form, this option must provide the URL to submit to or base-url with relative-path needs to be used.


