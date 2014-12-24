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
label | _label text_ | `Drop files here...` | string | Text to show instead of the default
paramName | _name attr_ | `file` | string | Value for name attribute in the file input element.
previewsContainer | | `.previews` | selector | JavaScript selector for file preview in div element.
relatedItems | _JS object_ | `{ attributes: ["UID", "Title", "Description", "getURL", "Type", "path", "ModificationDate"], batchSize: 20, basePath: "/", vocabularyUrl: null, width: 500, maximumSelectionSize: 1, placeholder: "Search for item on site..." }` | object | Related items pattern options. Will only use only if relativePath is used to use correct upload destination.
relativePath | _path string_ | _null_ | string | Again, to be used with baseUrl to create upload url.
resultTemplate | _html string_ | `<div class="dz-notice"><p>Drop files here...</p></div><div class="upload-previews"/>` | string | HTML template for the element that will contain file information. 
showTitle | `true`, `false` | `true` | boolean | Show/hide the h1 title.
url | _url string_ | _null_ | string | If not used with a form, this option must provide the URL to submit to or baseUrl with relativePath needs to be used.
wrap | `true`, `false` | `false` | boolean | True or false for wrapping this element using the value of wrapperTemplate.
wrapperTemplate | _html string_ | `<div class="upload-container"/>`| string | HTML template for wrapping around with this element.


