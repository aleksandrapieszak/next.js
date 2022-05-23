import {Fragment} from "react";
import Hero from "../components/home-page/hero";
import FeaturedNotes from "../components/home-page/featured-notes";
import {getAllNotes, getNotesCreatedToday} from "../helpers/api-utils";



function HomePage (props){

    return (
        <Fragment>
            <Hero/>
            <FeaturedNotes notes={props.notes}/>
        </Fragment>
    )

}

export async function getStaticProps(){
    const notes = await getNotesCreatedToday();

    return{
        props: {
            notes: notes
        }
    }
}

export default HomePage;
