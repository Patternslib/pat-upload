# Changelog



## [3.1.0](https://github.com/patternslib/pat-upload/compare/3.0.0...3.1.0) (2022-09-20)


### Features


* Allow to pass additional request headers. ([79ab753](https://github.com/patternslib/pat-upload/commit/79ab75337109d45cffc00770a868002b1593265f))

* Support pat-subform and do a seperate submit on it after a successful upload. ([3c6cced](https://github.com/patternslib/pat-upload/commit/3c6cced414c9018ac366c8fcce6d04186646418e))


### Maintenance


* Add bundle-pre step to unlink all linked depenencies before building. ([e53c9a6](https://github.com/patternslib/pat-upload/commit/e53c9a6805a58a579f62739007d9c366e8a4186f))

* Documentation and example for form protection with plone.protect style tokens. ([d301e61](https://github.com/patternslib/pat-upload/commit/d301e618b26dea219b62443f67f6e6b9b6a92832))

* Fix URL to bundle. ([cc21ae0](https://github.com/patternslib/pat-upload/commit/cc21ae09836c54e7fa612a5baeaa58901a9c1ff6))

* Update webpack config. ([41702c0](https://github.com/patternslib/pat-upload/commit/41702c034e600655a045bb27cac77072d4e2a143))

* Upgrade dependencies. ([6e890de](https://github.com/patternslib/pat-upload/commit/6e890de6a3f68ee2ba38b711934fd1af6ea7306b))


## [3.0.0](https://github.com/patternslib/pat-upload/compare/3.0.0-alpha.0...3.0.0) (2022-06-28)


### Maintenance


* @patternslib/patternslib needs to be installed. Adding to devDependencies to avoid version clashes with other packages depending on it. ([f97ed43](https://github.com/patternslib/pat-upload/commit/f97ed436c7b24db7d0784227bfab52402827c016))

* Upgrade to @patternslib/dev 2.2.0 and adapt module federation config. ([fc0636a](https://github.com/patternslib/pat-upload/commit/fc0636a9e7f4fafc18adc05bb4ab75b27e3b63ee))

## [3.0.0-alpha.0](https://github.com/patternslib/pat-upload/compare/2.0.1...3.0.0-alpha.0) (2022-06-15)


### Features


* **Build:** Build module federation enabled bundles. ([238851b](https://github.com/patternslib/pat-upload/commit/238851b84cf70013fd8490825e5d5c8f1bd3570e))


### Breaking Changes


* Depend on @patternslib/dev and extend config from there. ([8b09ef9](https://github.com/patternslib/pat-upload/commit/8b09ef9c50b183e5bf3a14bf2c2222aa0e36c4e4))

* Extend babel config from @patternslib/dev. ([94d3fee](https://github.com/patternslib/pat-upload/commit/94d3fee33cbeff62b07b8bf8a47b255abcdacb34))

* Extend commitlint config from @patternslib/dev. ([2cf3415](https://github.com/patternslib/pat-upload/commit/2cf3415e144b39f61b610f7b64dc347276dadefb))

* Extend eslint config from @patternslib/dev. ([9f003cb](https://github.com/patternslib/pat-upload/commit/9f003cb11b19e01f5dc4b023eaab122bd95c5ba4))

* Extend jest config from @patternslib/dev. ([954886a](https://github.com/patternslib/pat-upload/commit/954886ab685d609b5df716e9d3979404ca07ae1e))

* Extend Makefile from @patternslib/dev. ([fbf02a0](https://github.com/patternslib/pat-upload/commit/fbf02a03b2630dc5d6de2ed52ea3e79456b52bc5))

* Extend prettier config from @patternslib/dev. ([5e10973](https://github.com/patternslib/pat-upload/commit/5e10973e96a9302333e73e9b4d361cc5533f48c5))

* Extend release-it config from @patternslib/dev. ([fede4a3](https://github.com/patternslib/pat-upload/commit/fede4a321d803284681d5b441e188d4836ee1ea2))

* Extend webpack config from @patternslib/dev. ([42cbbbf](https://github.com/patternslib/pat-upload/commit/42cbbbfe40ddb64ce837a4d0b0793140d716a5cc))


### Maintenance


* **build:** Add build:dev script to package.json to create a unminified development build. ([2e92cd9](https://github.com/patternslib/pat-upload/commit/2e92cd9c706b3e838f370fa2ec0d8990114b6080))

* **Build:** @patternslib/patternslib as peerDependency. ([08df858](https://github.com/patternslib/pat-upload/commit/08df858fe69e2efda13229e8108984fc0ed1412f))Move @patternslib/patternslib dependency to peerDependencies and set to any version to avoid version conflicts when this package is a dependency of another Patternslib based package.

* **Build:** Add @patternslib/patternslib also to devDependencies so that we get it installed. ([9ef94fa](https://github.com/patternslib/pat-upload/commit/9ef94fa288f1afd88fbd066d3dc17f87316c7ed2))

* **Build:** Add keyword "patternslib" to package.json. ([73b2947](https://github.com/patternslib/pat-upload/commit/73b2947f87752737cc8ce763ee12af5718584e0e))

* **Build:** Explicitly add jquery as a dependency. ([048d018](https://github.com/patternslib/pat-upload/commit/048d018c76c72ec277f88b633a51bb87f2a8011c))

* **Build:** Keep yarn.lock in repository. ([3875933](https://github.com/patternslib/pat-upload/commit/387593391f977f5630aefd388cd3aeaff1441113))

* **Build:** Makefile - Allow OTP when publishing to npm, build bundles and publish them on GitHub, add pre-release targets. ([1b2b433](https://github.com/patternslib/pat-upload/commit/1b2b43387f8ad1f3f91d5c3234210c89c7ab9021))

* **Build:** Remove dependency regenerator-runtime except from test setup. The async/await runtime handling is already built-in in current Babel. ([c770bf9](https://github.com/patternslib/pat-upload/commit/c770bf97e1dc6713d931785692543b4837c95d9a))

* **Build:** Remove dependency regenerator-runtime except from test setup. The async/await runtime handling is already built-in in current Babel. ([88ee7f0](https://github.com/patternslib/pat-upload/commit/88ee7f079094b573ef646bae89eadc2998b31e79))

* **Build:** Update GitHub actions setup. ([bd5b539](https://github.com/patternslib/pat-upload/commit/bd5b539fe00ddbe45d4aed2af21b88cc0e1a2e37))

* **Build:** Upgrade and cleanup dependencies. ([3ab50b6](https://github.com/patternslib/pat-upload/commit/3ab50b6df49afc14e2687a6a2b8c83a31f3fd49a))

* **Build:** Upgrade underscore. ([a50e37f](https://github.com/patternslib/pat-upload/commit/a50e37ff7d0588aa412edd1cfd06a46f5a8ddbfe))

### [2.0.1](https://github.com/patternslib/pat-upload/compare/2.0.0...2.0.1) (2022-03-24)


### Bug Fixes

* Add missing dependency underscore. ([a153ff2](https://github.com/patternslib/pat-upload/commit/a153ff2ab9b6cb1114e1d1be5034503a2c3ed347))



### Maintenance

* **webpack:** Configure devServer static directory. ([8c9a4fb](https://github.com/patternslib/pat-upload/commit/8c9a4fbbc2984849a946d08e57ac2ac4cfffff93))

## [2.0.0](https://github.com/patternslib/pat-upload/compare/1.2.0...2.0.0) (2021-11-18)


### Breaking Changes

* Upgrade to Webpack 5. ([a906da6](https://github.com/patternslib/pat-upload/commit/a906da65eea70b1c380e4f4cc6464e94872a41e5))



### Maintenance

* **build:** Extend Patternslib release-it config file. ([203da44](https://github.com/patternslib/pat-upload/commit/203da4454e9984da76580a3ea811dadcec449ea6))

* **build:** Release on GitHub releases. ([b09a639](https://github.com/patternslib/pat-upload/commit/b09a639a24d9ecd32dd6b455f82305f328f086ef))

* **dependencies:** Upgrade Dropzone to 5.9.3. ([4de872c](https://github.com/patternslib/pat-upload/commit/4de872c0d210e379e3e24f86f4bc37a61076ab7f))

## [1.2.0](https://github.com/patternslib/pat-upload/compare/1.1.0...1.2.0) (2021-11-18)


### Features

* Export parser to align with Patternslib. This allows for overriding default options. ([68f496f](https://github.com/patternslib/pat-upload/commit/68f496f14d1df080d81de04f3f850557f3224deb))


### Maintenance

* Modernize code. ([b50f672](https://github.com/patternslib/pat-upload/commit/b50f672c084610172c1fb8afb3f715430af64586))
* Remove Safari patch as it is already fixed upstream. See: https://github.com/dropzone/dropzone/issues/1640 ([67bcab9](https://github.com/patternslib/pat-upload/commit/67bcab9458ab38e5b839cd15ed8fa7aca74ea04b))
* Upgrade up to minor versions. ([5ac5edb](https://github.com/patternslib/pat-upload/commit/5ac5edbf91752ec936385d2839624b43201ca502))
* Use logging framework. ([2ca82d9](https://github.com/patternslib/pat-upload/commit/2ca82d967d7fbf835b529b378c9f29c8badc8c76))
* We're using DropzoneJS, not Fine Uploader. ([5aac53c](https://github.com/patternslib/pat-upload/commit/5aac53cd0d5c85fe7d379520dfd03fac6df49289))

## [1.1.0](https://github.com/patternslib/pat-upload/compare/1.0.0...1.1.0) (2021-06-15)


### Maintenance

* Test updates after jest upgrade. ([4f4c3a3](https://github.com/patternslib/pat-upload/commit/4f4c3a354021c3760440f265417f41fad32ad799))
* **dependencies:** Depend on Patternslib v4.4.0. ([642faf2](https://github.com/patternslib/pat-upload/commit/642faf226a63b30eb1e392f387f84194f133de9d))
* **dependencies:** Upgrade dependencies on minor+patch level. ([474c8b3](https://github.com/patternslib/pat-upload/commit/474c8b3623bfb9755b872e843ae742b2ba41adbf))
* **make release-patch:** Add missing patch for patch level releases. ([0b3e227](https://github.com/patternslib/pat-upload/commit/0b3e22782d3f65f824b33b51b83b7f8059f74994))
* **Release:** Remove the release-web target. Only Patternslib releases are pushed to Patterns-releases on Github. ([87716f2](https://github.com/patternslib/pat-upload/commit/87716f2f412ebb38f028f4d240c607b53575c4f4))
* **Release process:** Do not include the release commit in the changelog. ([783c5b2](https://github.com/patternslib/pat-upload/commit/783c5b2bb499a29c9725ef79a302d6106363feb8))
* **webpack:** Adapt start script to recent dependency changes. ([97ec5ef](https://github.com/patternslib/pat-upload/commit/97ec5ef4c10de8ce3173baeffe5c9cbe1bece5d3))
* **webpack:** Simplify webpack. ([e6d366b](https://github.com/patternslib/pat-upload/commit/e6d366b975ad4495d8a052b43027396b24b6f8a6))

## 1.0.0 (2021-04-20)


### Features

* Import basic dropzone styles if window.__patternslib_import_styles is set. ([b98385d](https://github.com/patternslib/pat-upload/commit/b98385d80510c0efa2f336aec1e906ee0bc888f3))


### Maintenance

* Add basic test. ([98d7c83](https://github.com/patternslib/pat-upload/commit/98d7c837297858883d48877dcef4127cfbd10457))
* Cleanup and maintainance tasks. ([1b9a308](https://github.com/patternslib/pat-upload/commit/1b9a3088f973fc2b04633899bde30b35afa435a3))
* Upgrade dropzone library to 5.9.2. ([4ff25a5](https://github.com/patternslib/pat-upload/commit/4ff25a5fd6d02b492320bdc8541e54ea4ac8d21b))
* Upgrade to Patternslib v4 final - upload customizations. ([3f70c64](https://github.com/patternslib/pat-upload/commit/3f70c64f6c12126549399aa745e5cc16463d877c))
* Upgrade to Patternslib v4 final. ([b73cdf6](https://github.com/patternslib/pat-upload/commit/b73cdf666faf585773259541cbdca8f3d3930d1b))


## 1.0.0 - unreleased

- Upgrade to ES6.
- Implenent lazy loading for external libraries via dynamic imports.
- Depend on latest Dropzone 5.7.2.
