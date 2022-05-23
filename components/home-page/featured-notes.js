import classes from './featured-notes.module.css'
import NotesGrid from "../notes/notes-grid";
import {getNotesCreatedToday} from "../../helpers/api-utils";

function FeaturedNotes(props){

    return(
        <section className={classes.latest}>
            <h2> Ostatnie notatki </h2>
            <NotesGrid notes = {props.notes}/>
        </section>
    )
}

export default FeaturedNotes;


