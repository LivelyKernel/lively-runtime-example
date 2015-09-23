lively.require("lively.lang.Runtime").toRun(function() {

  lively.lang.Runtime.Registry.addProject({

    name: "lively.lang",

    state: {window: {}},

    reloadAll: function(project, thenDo) {
      var files = ["index.js", "lib/foo.js","lib/bar.js", "tests/test-it.js"];
      lively.lang.Runtime.loadFiles(project, files, thenDo);
    },

    getDoitContext: function(project) { return project.state; },

    resources: {

      "index.js": {
        matches: /index\.js$/,
        changeHandler: function(change, project, resource) {
          // index.js might need some dependencies. Here is a place to inject them into
          // project.state.
          project.state.lively = lively;
          // Now let's load the file
  				lively.lang.Runtime.evalCode(project, change.newSource, project.state, change.resourceId);
  				// after the code is loaded we might want to export stuff from the project
  				// into the "real" Global to play around with stuff:
  				Global["lively-runtime-example"] = project.state.window["lively-runtime-example"];
  				alertOK(lively.lang.obj.inspect(resource) + " loaded");
        }
      },

      "lib code": {
        matches: /lib\/.*.js$/,
        changeHandler: function(change, project, resource) {
          // Here we just make sure we eval the code with the project's state
          lively.lang.Runtime.evalCode(project, change.newSource, project.state, change.resourceId);
          alertOK(resource + " loaded");
        }
      },

      "tests": {
        matches: /tests\/.*.js$/,
        changeHandler: function(change, project, resource) {
          // since the tests depend on mocha we make sure this is loaded:
          lively.lang.fun.composeAsync(
            function(next) {
              lively.require("lively.MochaTests").toRun(function() { next(); });
            },
            function(next) {
              JSLoader.forcedReload("http://cdnjs.cloudflare.com/ajax/libs/expect.js/0.2.0/expect.min.js");
              lively.lang.fun.waitFor(3000, function() { return typeof expect !== "undefined" && expect !== chai.expect; }, next);
            },
            function(next) {
              lively.lang.obj.extend(project.state, {mocha: Global.mocha,expect: Global.expect});
              lively.lang.Runtime.evalCode(project, change.newSource, project.state, change.resourceId);
              next();
            }
          )(function(err) {
            if (err) show(String(err));
            else alertOK("defining tests for " + change.resourceId);
          });
        },
      }

    }
  });

});
