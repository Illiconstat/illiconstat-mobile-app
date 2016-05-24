var fs = require('fs'),
    glob = require('glob'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    args = process.argv.splice(2);

if (args.length !== 2)
    return console.log('Incorrect usage. "node concat [glob] [output file]"');

var outputFile = args[1];
if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
}
mkdirp(path.dirname(outputFile), function (err) {
    if (err) {
        console.log(err);
        return;
    }
    glob.sync(args[0]).forEach(function (file) {
        fs.appendFileSync(outputFile, fs.readFileSync(file, 'utf-8'));
    });
});
