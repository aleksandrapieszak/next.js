import classes from './all-notes.module.css'
import notes from "../../pages/notes";
import NotesGrid from "./notes-grid";


function AllNotes(props){

    return (
        <section className={classes.notes}>

            <h1> Wszystkie notatki</h1>
            <NotesGrid notes={props.notes}/>
        </section>
    )

}
export default AllNotes;