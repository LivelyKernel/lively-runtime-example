# How to combine external JS projects with Lively

1. Put a file `lively-runtime.js` in the root folder of the project

2. Make sure that the directory menu bar entry is loaded:
`lively.Config.add("menuBarEntries",
"lively.ide.tools.CurrentDirectoryMenuBarEntry")` it ensures that the
lively-runtime.js module gets run when you enter a project directory.

3. Then, simply by switching into the project directory, `lively-runtime.js`
will be loaded. If it adds a project with a `reloadAll` method, this method is
run.`

4. When project files are changed using Lively's text editor and
`lively-runtime.js` defines a file handler for a file, this handler will be
called and can then define how to re-load the changed file.
