import Link from "next/link";
import classes from "./note-item.module.css";
import Button from "../ui/button";
import {deleteNote} from "../../helpers/api-utils";
import noteId from "../../pages/notes/[noteId]";
import notificationContext from "../../store/notification-context";
import {useContext} from "react";
import ButtonError from "../ui/button-error";

function NoteItem(props) {
    const {title, description, id} = props.note;

    const linkPath = `/notes/${id}`;
    const notificationCtx = useContext(notificationContext);

    async function deleteNoteHandler(noteId){
        if (!noteId) {
            notificationCtx.showNotification({
                title: 'Błąd formularza',
                message: "Błędne ID elementu",
                status: 'error'
            });
            return;
        }

        notificationCtx.showNotification({
            title: 'Wysyłanie...',
            message: "Usuwam notatkę",
            status: 'info'
        });
        try {
            await deleteNote(id);
            notificationCtx.showNotification({
                title: 'Sukces!',
                message: 'Usunięto notatkę',
                status: 'success'
            });
            document.getElementById(id).remove();
        } catch (error) {
            //console.log(error.message);
            notificationCtx.showNotification({
                title: 'Błąd API',
                message: error.message,
                status: 'error'
            });
        }
    }


    return (
        <li id={id} className={classes.note}>
            <Link href={linkPath}>
                <a>
                    <div className={classes.content}>
                        <h3>tytuł:  {title} </h3>
                        <p> opis: {description} </p>
                    </div>
                </a>
            </Link>

            <Button>
                <Link href={`/notes/${id}/edit`}> Edytuj </Link>
            </Button>
            <ButtonError onClick={()=>{
                window.confirm("Usunąć notatkę?") && deleteNoteHandler(id)
            }}> Usuń

            </ButtonError>
        </li>
    )
}
export default NoteItem;