const fs = require("fs");
const chalk = require("chalk");


const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => notes.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green("New Note added!"))
  } else {
    console.log(chalk.red("Note title used!"))
  }
  saveNotes(notes);
};

const removeNote = (title) => {
  const notes = loadNotes()
  const keepNotes = notes.filter((note) => note.title !== title)
  if (notes.length > keepNotes.length) {
    console.log(chalk.green("Note removed!"))
    saveNotes(keepNotes);
  } else {
    console.log(chalk.red("Note not found!"))
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)

  console.log(chalk.inverse('Your Notes'))

  if (note) {
    console.log(chalk.bold(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse('Note not found!'))
  }


}
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  console.log(chalk.inverse('Your Notes'))
  const notes = loadNotes()
  notes.forEach((note) => {
    console.log(note.title)
  })
}

module.exports = {
  readNote: readNote,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
};
