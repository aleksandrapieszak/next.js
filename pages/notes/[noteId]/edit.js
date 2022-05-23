import NoteContent from "../../../components/notes/note-detail/note-content";
import {editNote, getAllNotes, getNotesById} from "../../../helpers/api-utils";
import {useContext, useRef} from "react";
import notificationContext from "../../../store/notification-context";
import NoteForm from "../../../components/notes/note-form";
import classes from "../../../components/notes/note-form.module.css";
import Notification from "../../../components/ui/notification";
import NotificationContext from "../../../store/notification-context";

function EditNotePage (props){

    //notification
    const notificationCtx= useContext(NotificationContext);

    const note = props.note;

    //form
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();

    if (!note) {
        return (
            <div className="center">
                <p>Wczytuję...</p>
            </div>
        );
    }

    //edit function
    async function editNoteHandler(event) {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        if (
            !enteredTitle ||
            enteredTitle.trim() === '' ||
            !enteredDescription ||
            enteredDescription.trim() === ''
        ){
            //jeśli zle uzupełnione
            notificationCtx.showNotification({
                title: 'Źle wypełniony formularz',
                message: 'Sprawdź czy wszytskie pola są uzupełnione',
                status: 'error'
            })
            return
        }
        //zapisywanie formularza
        notificationCtx.showNotification({
            title: 'Zapisywnaie notatki',
            message: "Zapisuję.....",
            status: 'pending'
        });

        //próba zapisu
        try {
            await editNote(note.id, enteredTitle, enteredDescription);
            notificationCtx.showNotification({
                title: 'Success!',
                message: 'Zapisano zmiany',
                status: 'success'
            });
        } catch (error) {
            notificationCtx.showNotification({
                title: 'Błąd',
                message: error.message,
                status: 'error'
            });
        }
    }


    return (
        <section className={classes.note}>
            <h1> Edytuj notatkę</h1>
            <form className={classes.form} onSubmit={editNoteHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="title"> Tytuł</label>
                        <input type="text" id="title"
                               required
                               defaultValue={note.title}
                               ref={titleInputRef}
                               />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="description"> Opis</label>
                        <textarea type="text" id="description" rows='5'
                                  required
                                  defaultValue={note.description}
                                  ref={descriptionInputRef}
                        />
                    </div>
                </div>
                <div className={classes.actions}>
                    <button>Zapisz</button>
                </div>
            </form>
        </section>
    );
}

export async function getStaticProps(context){
    const notesId = context.params.noteId;

    const note = await getNotesById(notesId);

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
export default EditNotePage;
