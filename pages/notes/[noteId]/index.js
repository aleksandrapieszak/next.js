import NoteContent from "../../../components/notes/note-detail/note-content";
import {getAllNotes, getNotesById} from "../../../helpers/api-utils";
import {useContext} from "react";

function NoteDetailPage (props){
    

    const note = props.note;

    return (
    <NoteContent note={note}/>
    )
}

export async function getStaticProps(context){
    const id = context.params.noteId;

    const note = await getNotesById(id);

    return{
        props: {
            note: note
        },
        revalidate: 30

    }

}

export async function getStaticPaths(){
    const notes = await getAllNotes();

    const paths = notes.map(notes=>({
        params:{noteId: notes.id.toString()}
    }))
    return{
        paths: paths,
        fallback: false
    };
}
export default NoteDetailPage;
