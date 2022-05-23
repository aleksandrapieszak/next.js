import classes from './note-header.module.css'

function NoteHeader(props){
    const {title} = props

    return (
        <header className={classes.header}>
            <h1>Tytuł: {title}</h1>
        </header>

    )
}
export default NoteHeader;