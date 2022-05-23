import classes from './note-form.module.css'
import {useContext, useRef, useState} from "react";
import Notification from "../ui/notification";
import notificationContext from "../../store/notification-context";
import {sendNoteData} from "../../helpers/api-utils";

function NoteForm(props) {

    const [isInvalid, setIsInvalid] = useState(false);

    const notificationCtx = useContext(notificationContext);

    const titleInputRef = useRef();
    const descriptionInputRef = useRef();

    async function addNoteHandler(event) {

        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        //sprawdzenie
        if (!enteredTitle || enteredTitle.trim() === '' ||
            !enteredDescription || enteredDescription.trim() === ''
        ) {
            setIsInvalid(true);
            //błąd
            notificationCtx.showNotification({
                title: 'Błędy w formularzu!',
                message: 'Sprawdź czy wszystkie pola są uzupełnione!',
                status: 'error'
            });
            return;
        }

        //jak się zgadza
        notificationCtx.showNotification({
            title: 'Zapisywanie...',
            message: 'Trwa zapisywanie notatki...',
            status: 'pending'
        })

        //próba zapisu notatki
        const noteData = {enteredTitle, enteredDescription}
        try {
            await sendNoteData(enteredTitle, enteredDescription);
            notificationCtx.showNotification({
                title: 'Success!',
                message: 'Zapisywanie notatki przebiegło pomyslnie',
                status: 'success'
            })

            //reset pół formularza
            titleInputRef.current.value = ''
            descriptionInputRef.current.value = ''

        } catch (error) {
            //bład
            notificationCtx.showNotification({
                title: 'Błąd!',
                message: error.message,
                status: 'error'
            })
        }
    }


    return (
            <section className={classes.note}>
                <h1> Dodaj notatkę</h1>
                <form className={classes.form} onSubmit={addNoteHandler}>
                    <div className={classes.controls}>
                        <div className={classes.control}>
                            <label htmlFor="title"> Tytuł</label>
                            <input type="text" id="title" required ref={titleInputRef}
                                   />
                        </div>
                        <div className={classes.control}>
                            <label htmlFor="description"> Opis</label>
                            <textarea type="text" id="description" rows='5'
                                      required ref={descriptionInputRef}
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
export default NoteForm;