import NoteHeader from "./note-header";
import classes from './note-content.module.css'
import ReactMarkdown from "react-markdown";
import {redirect} from "next/dist/server/api-utils";
import {deleteNote} from "../../../helpers/api-utils";


function NoteContent(props){
    const { note } = props;

    const id = note.id;


    return(

        <article className={classes.content}>
            <NoteHeader title={note.title} />
            <ReactMarkdown>{note.description}</ReactMarkdown>
        </article>
    )
}
export default NoteContent;

