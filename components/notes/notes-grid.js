import NoteItem from './note-item'
import classes from "./notes-grid.module.css";

function NotesGrid(props){
    const {notes} = props;

    return (
        <ul className={classes.grid}>
            {notes.map(note => (
                <NoteItem
                    key={note.id}
                    note={note}
            />))}
        </ul>
    )

}
export default NotesGrid;