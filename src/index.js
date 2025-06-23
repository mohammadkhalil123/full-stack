import express, { request } from "express";
import cors from "cors"; 

const app = express();
app.use(cors());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/',(request,response) => {
  response.send('<h1>Hello World</h1>');
})

app.get('/notes',(request,response) => {
  response.json(notes);
})

app.delete('/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001;

app.listen(PORT,() => {
  console.log(`server is running in server ${PORT}`);
})


