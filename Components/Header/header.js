import css from './Header.module.css'
import Link from 'next/link'

function Header(){
    return(
        <div className={css.headerCont}>
            <Link href="/" passHref>
                <div className={css.logoConts}>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 0H0V23H23V0Z" fill="#1D1B1B"/>
                        <path d="M7.12246 16.3581H14.0147V18.9146H4.00048V4.08584H7.12246V16.3581Z" fill="white"/>
                        <path d="M19 4.08584V18.9146H16.3035V12.7785H9.71066V10.222H16.3035V6.64238H9.71066V4.08584H19Z" fill="white"/>
                    </svg>
                    <p>Lance Francisco</p>
                </div>
            </Link>
        </div>
    )
}

export default Header