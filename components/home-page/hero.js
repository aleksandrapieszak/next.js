import classes from "./hero.module.css";
import Image from "next/image";
function Hero(){

    return(
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/images.jpg"
                       alt="An image showing Max"
                       width={400}
                       height={400}

                />
            </div>
            <h1> Notatki </h1>
            <p> Blablablabla</p>
        </section>
    )
}
export default Hero;
