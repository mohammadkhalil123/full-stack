const Note = ({note,toggleImportance}) => {
    return (
        <div>
            <li>{note.content}</li>
            <button onClick={toggleImportance}>
                {note.important?"make it not important":"make it important"}
            </button>
        </div>   
    )
}

export default Note;