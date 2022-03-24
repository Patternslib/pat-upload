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

# Changelog


## 1.0.0 - unreleased

- Upgrade to ES6.
- Implenent lazy loading for external libraries via dynamic imports.
- Depend on latest Dropzone 5.7.2.
