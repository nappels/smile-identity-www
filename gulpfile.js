// Node modules
// ----------------------------------------------------------------------------
var gulp   = require('gulp');
var git    = require('gulp-git');
var deploy = require('gulp-gh-pages');

// Get TimeStamp
// ----------------------------------------------------------------------------
var timestamp = function() {
  var date = new Date();

  var year   = date.getFullYear().toString();
  var month  = ('0' + (date.getMonth() + 1)).slice(-2);
  var day    = ('0' + date.getDate()).slice(-2);
  var hour   = ('0' + date.getHours()).slice(-2);
  var minute = ('0' + date.getMinutes()).slice(-2);
  var second = ('0' + date.getSeconds()).slice(-2);

  return year+'-'+month+'-'+day+'_'+hour+':'+minute+':'+second;
};

// Variables
// ----------------------------------------------------------------------------
var repositoryUrl = 'git@github.com:USER/REMOTEREPO.git';
var remoteAlias   = 'origin';
var sourceBranch  = 'master';
var webBranch     = 'gh-pages';
var commitMessage = 'Update_' + timestamp();

// Tasks
// ----------------------------------------------------------------------------
gulp.task('add', function(){
  return gulp.src('./git-test/*')
    .pipe(git.add({args: '-A'}));
});

gulp.task('commit', ['add'], function(){
  var timestamp = new Date();
  return gulp.src('./git-test/*')
    .pipe(git.commit(commitMessage));
});

gulp.task('push', ['commit'], function(){
  git.push(remoteAlias, sourceBranch, {args: " -f"}, function (err) {
    if (err) throw err;
  });
});

// Task for automatic push
gulp.task('default', ['add', 'commit', 'push']);

// Task for automatic website deployment
gulp.task('deploy', function() {
  return gulp.src('./www/**/*')
    .pipe(deploy({
      "remoteUrl": repositoryUrl,
      "origin": remoteAlias,
      "branch": webBranch,
      "message": commitMessage,
      "push": true
  }));
});
