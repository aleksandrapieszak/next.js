import AllNotes from "../../components/notes/all-notes";
import {getAllNotes} from "../../helpers/api-utils";



function AllNotesPage (props){
    const {notes} = props;

    return (
        <AllNotes notes={notes}/>
    )
}

export async function getStaticProps(){
    const notes = await getAllNotes();

    return{
        props:{
            notes: notes
        },
        revalidate: 60
    }


}
export default AllNotesPage;
