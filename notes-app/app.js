//const validator = require('validator')

const yargs = require("yargs");
const chalk = require("chalk");
const notes = require("./notes.js");

//Customize app version
yargs.version("1.1.0");

// Add Command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Content of your note",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

// Remove Command
yargs.command({
  command: "remove",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNote(argv.title)
  }
});

// List Command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    notes.listNotes()
  }
});
// Read Command
yargs.command({
  command: "read",
  describe: "Reading a note",
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNote(argv.title)
  }
});

yargs.parse();
