import Logo from './logo'
import Link from "next/link";
import classes from './main-navigation.module.css'

function MainNavigation(){
    return <header className={classes.header}>
        <Link href="/">
            <a>
                <Logo/>
            </a>
        </Link>
        <nav>
            <ul>
                <li><Link href="/notes">Notatki</Link></li>
                <li><Link href="/notes/add">Dodaj notatkę</Link></li>

            </ul>
        </nav>
    </header>

}

export default MainNavigation;
