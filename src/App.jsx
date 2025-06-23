import { useState,useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {

  const [notes,setNotes]=useState([]);
  const [newNote,setNewNote]=useState("new note ...");
  const [showAll,setShowAll]=useState(true);

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, []);

  console.log("render ",notes.length," notes");

  const showNotes=showAll?notes:notes.filter(note=>note.important===true);

  const addNote = (event)=> {
    event.preventDefault();

    const newObject = {
      content:newNote,
      important:Math.random()<0.5,
    }

    axios
      .post("http://localhost:3001/notes",newObject)
      .then(response=>{
        setNotes(notes.concat(response.data))
        setNewNote("")
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const toggleImportance = (id) => {
    const note=notes.find(n=>n.id===id)
    const changedNote={...note,important:!note.important}
    const url = `http://localhost:3001/notes/${id}`

    axios
      .put(url,changedNote)
      .then(response=>{
        console.log(response.data);
        setNotes(notes.map(note=>note.id!==id?note:response.data))
      })
  }

  return (
    <div>
      <ul>
        {showNotes.map(showNote=><Note toggleImportance={()=>toggleImportance(showNote.id)} key={showNote.id} note={showNote}/>)}  
      </ul>
      <button onClick={()=>setShowAll(!showAll)}> 
        show {showAll?"all":"important"}
      </button>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">add Note</button>
      </form>
    </div>
  )
  
}

export default App