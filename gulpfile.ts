let gulp = require('gulp')
// import {splitStream} from './plugin'
// export {splitStream} from './plugin';
import {saveState} from './plugin';

function build_plumber(callback: any) {
  let result
  result =
    gulp.src('./testdata/*',{ buffer: false } )//
      //.src('./testdata/*') // buffer is true by default
      //        .pipe(plumber({errorHandler:false}))
      //.pipe(lineH.splitStream({fileName:'state.json', removeState:true}))
      .pipe(saveState({removeState:true}))
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
        console.log('end')
        callback()
      })
      .on('error', function (err: any) {
        console.error(err)
        callback(err)
      })

  return result;
}

exports.default = gulp.series(build_plumber)