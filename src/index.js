import express, { request } from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Note from './modules/note.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.get('/notes',(request,response) => {
  Note.find({}).then(notes => {
    console.log(notes)
    response.json(notes)
  })
})

app.get('/notes/:id',(request,response) => {
  Note.findById(request.params.id).then(res => {
    response.json(res)
  }).catch(error => {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
  })
})

app.post('/notes',(request,response) => {
  const body = request.body;
  if(!body) {
    const note = new Note({
      content: body.content,
      important: body.important || false
    })
    note.save().then(result => {
      response.json(result)
    })
  } else {
    return response.status(400).json({ error: 'content missing' })
  }
})

app.delete('/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001;

app.listen(PORT,() => {
  console.log(`server is running in server ${PORT}`);
})


