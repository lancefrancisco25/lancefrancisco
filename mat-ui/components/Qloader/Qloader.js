import css from './Qloader.module.css'

function Qloader({display}) {
    return(
        <div className={`${css.Qloader} ${(display)? css.displayLoader : ''}`}></div>
    )
}

export default Qloader