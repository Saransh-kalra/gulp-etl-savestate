"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let gulp = require('gulp');
const lineH = require("./plugin");
var plugin_1 = require("./plugin");
exports.saveState = plugin_1.saveState;
const highland_1 = require("highland");
//import * as plumber from 'gulp-plumber'
const plumber = require('gulp-plumber');
function build(callback) {
    let result;
    result =
        highland_1.default(gulp.src('./testdata/*', { buffer: false }))
            //.src('./testdata/*') // buffer is true by default
            .through(lineH.saveState({ fileName: 'output/state.json', removeState: false }))
            .errors((err, push) => {
            // if (err.statusCode === 404) {
            //   // not found, return empty doc
            //   push(null, {});
            // }
            if (err) {
                // swallow error?
                console.log('gotcha!');
            }
            else {
                // otherwise, re-throw the error
                push(err);
            }
        })
            // .on('error', function(this:any,err: any) {
            //   console.error(err)
            //   err.showStack = true
            //   callback(err)
            //   // reconnect the pipe
            //   //this.pipe(plugins.addProperties({propsToAdd:{extraParam:1}}))
            // })
            .pipe(gulp.dest('./output/processed'))
            .on('end', function () {
            console.log('end');
            callback();
        })
            .on('error', function (err) {
            console.error(err);
            callback(err);
        });
    return result;
}
// handleLine could be the only needed piece to be replaced for most dataTube plugins
const handleLine = (lineObj) => {
    //console.log(lineObj)
    for (let propName in lineObj) {
        let obj = lineObj;
        if (typeof (obj[propName]) == "string")
            obj[propName] = obj[propName].toUpperCase();
    }
    return lineObj;
};
function build_plumber(callback) {
    let result;
    result =
        gulp.src('./testdata/*', { buffer: false }) //,
            //.src('./testdata/*') // buffer is true by default
            //        .pipe(plumber({errorHandler:false}))
            //.pipe(lineH.saveState({fileName:'state.json', removeState:true}))
            .pipe(lineH.saveState({ fileName: 'state.json', removeState: true }))
            .on('error', console.error.bind(console))
            // .on('error', function(this:any,err: any) {
            //   console.error(err)
            //   err.showStack = true
            //   callback(err)
            //   // reconnect the pipe
            //   //this.pipe(plugins.addProperties({propsToAdd:{extraParam:1}}))
            // })
            .pipe(gulp.dest('./output/processed'))
            .on('end', function () {
            console.log('end');
            callback();
        })
            .on('error', function (err) {
            console.error(err);
            callback(err);
        });
    return result;
}
exports.default = gulp.series(build_plumber);
//# sourceMappingURL=gulpfile.js.map