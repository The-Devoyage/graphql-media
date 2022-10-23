# Changelog

## [v0.2.2]
- Remove requirements for Git Hub Personal Access Tokens

## [v0.2.1]

### Changed
- Update resolve reference resolver to include `src` property.
- Create media finds media from DB before returning.
- Move SRC Img Proxy Logic to reusable function.

## [v0.2.0]

### Added

- Scalars now defined in codegen config
- Ping route added - `/ping`
- Delete media deletes file in addition to mongoose document.
- ImgProxy Support to handle image transformations.
- URI Property added to Media type, to provide standardized file serving.

### Changed

- Inputs now use `query` and `payload` to define search params vs data
- Support for Federation 2
- GraphQL 16
- Support for multiple file uploads at once.
