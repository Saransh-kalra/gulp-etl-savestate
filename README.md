# gulp-etl-savestate #

Extract STATE record from the Message Stream and (optionally) save it to a State File. 

### Usage

**gulp-etl** plugins accept a configObj as its first parameter. The configObj
will contain any info the plugin needs.

This plugin will check for the following parameters in the configObj:

- `fileName: string` - optionally pass in a path to save the state state, default does not save state
- `removeState: boolean` - remove the State from the pipeline or keep, defaults to `true`



Example `gulpfile` below:

```
const _etl = require('gulp-etl-savestate');

function build_plumber(callback: any) {
  let result
  result =
    gulp.src('./testdata/*', { buffer: false })
      .pipe(_etl.saveState({fileName:'state.json', removeState:true}))
      .pipe(gulp.dest('./output/processed'))
      .on('end', function () {
        console.log('end')
        callback()
      })
      .on('error', function (err: any) {
        console.error(err)
        callback(err)
      })

  return result;
}
```



This is a **[gulp-etl](https://gulpetl.com/)** plugin, and as such it is a [gulp](https://gulpjs.com/) plugin. **gulp-etl** plugins processes [ndjson](http://ndjson.org/) data streams/files which we call **Message Streams** and which are compliant with the [Singer specification](https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#output). Message Streams look like this:

```
{"type": "SCHEMA", "stream": "users", "key_properties": ["id"], "schema": {"required": ["id"], "type": "object", "properties": {"id": {"type": "integer"}}}}
{"type": "RECORD", "stream": "users", "record": {"id": 1, "name": "Chris"}}
{"type": "RECORD", "stream": "users", "record": {"id": 2, "name": "Mike"}}
{"type": "SCHEMA", "stream": "locations", "key_properties": ["id"], "schema": {"required": ["id"], "type": "object", "properties": {"id": {"type": "integer"}}}}
{"type": "RECORD", "stream": "locations", "record": {"id": 1, "name": "Philadelphia"}}
{"type": "STATE", "value": {"users": 2, "locations": 1}}
```



### Model Plugin

This plugin is intended to be a model **gulp-etl** plugin, usable as a template to be forked to create new plugins for other uses. It is compliant with [best practices for gulp plugins](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md#what-does-a-good-plugin-look-like), and it properly handles both [buffers](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/using-buffers.md) and [streams](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/dealing-with-streams.md).

### Quick Start

- Dependencies:

  - [git](https://git-scm.com/downloads)
  - [nodejs](https://nodejs.org/en/download/releases/) - At least v6.3 (6.9 for Windows) required for TypeScript debugging
  - npm (installs with Node)
  - typescript - installed as a development dependency

- Clone this repo and run `npm install` to install npm packages

- Debug: with [VScode](https://code.visualstudio.com/download) use `Open Folder` to open the project folder, then hit F5 to debug. This runs without compiling to javascript using [ts-node](https://www.npmjs.com/package/ts-node)

- Test: `npm test` or `npm t`

- Compile to javascript: `npm run build`

- Run using included test data (be sure to build first): `gulp --gulpfile debug/gulpfile.ts`

### Testing

We are using [Jest](https://facebook.github.io/jest/docs/en/getting-started.html) for our testing. Each of our tests are in the `test` folder.

- Run `npm test` to run the test suites

### Notes

Note: This document is written in [Markdown](https://daringfireball.net/projects/markdown/). We like to use [Typora](https://typora.io/) and [Markdown Preview Plus](https://chrome.google.com/webstore/detail/markdown-preview-plus/febilkbfcbhebfnokafefeacimjdckgl?hl=en-US) for our Markdown work.