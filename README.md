#pat-upload

A pattern that creates a drop area for uploading multiple files.

Based on [DropzoneJS](https://www.dropzonejs.com/).

##demo

To view a demo of how this pattern works, clone the repository:

    git clone https://github.com/Patternslib/pat-upload.git

The run the Makefile:

    make

And then in your browser open: http://localhost:4001


## Form protection

Some systems allow to pass a authentication token to protect against CSRF attacks.
You can do this with pat-upload by adding a URL parameter, even if the upload happens in a POST request.
This is a valid practice, see: https://stackoverflow.com/a/1592446/1337474

For example, for a plone.protect style token, do:

      <fieldset class="pat-upload"
                data-pat-upload="url: https://example.com/upload?_authenticator=TOKEN"
      >
      </fieldset>


## Documentation

Property | Value | Default | Type | Description
---------|-------|---------|------|------------
ajax-upload | `true`, `false` | `true` | boolean | For letting the widget upload the files via ajax. If false the form will act like a normal form.
post-upload | `true`, `false` | `true` | boolean | Condition value for the file preview in div element to fadeout after file upload is completed.
base-url | _url string_ | _null_ | string | To be used in conjunction with relative-path to.
class-name | _class name_ | `upload` | string | Value for class attribute in the form element.
clickable | `true`, `false` | `false` | boolean | If you can click on container to also upload.
current-path | _path string_ | _null_ | string | Current path related items is starting with.
label | *string* | `Drop files here…` | string | Label text to show on the upload zone.
name | _name attr_ | `file` | string | Value for name attribute in the file input element.
previews-container | | `.previews` | selector | JavaScript selector for file preview in div element.
trigger | _trigger name_ | `button` | string | What triggers the upload.  'button' expects user to click upload button, 'auto' starts uploading automatically after the user drags something, and always hides the upload button.
url | _url string_ | _null_ | string | If not used with a form, this option must provide the URL to submit to.
