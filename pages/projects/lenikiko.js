import css from '../../styles/projects/lenikiko.module.css'
import Image from 'next/image'
import PopUpImage from '../../mat-ui/ui-comp/PopUpImage'
import bglenikiko from '../../public/lenikiko bg.png'
import {useState, useRef, useEffect} from "react";
import Contact from "../../Components/Keep Contact/Contact"
import Header from "../../Components/Header/header"

function LeniKiko(){
    const [cloneElementClick, setCloneElementClick] = useState()
    const [imageLinkClick, setImageLinkClick] = useState()
    const bgElement = useRef();
    useEffect(()=>{
        const videos = document.getElementsByTagName("video")
        for(let i = 0; i < videos.length; i++){
            videos[i].controlsList = 'noplaybackrate nodownload nofullscreen'
            videos[i].disablePictureInPicture = true;}
    },[])

    function onScroll(e){
        const scroll = ((window.innerHeight - window.scrollY) / (window.innerHeight - 200));
        const scrollAlt = ((window.scrollY) / (window.innerHeight - 200));
        function upTo100(cur){
            if(cur < 0){cur = 0}else if(cur >= 1){cur = 1}
            return cur
        }
        function  currScroll(){
            let cur = scroll;
            if(cur < 0.8){cur = 0.8}else if(cur >= 1){cur = 1}
            return cur
        }
        bgElement.current.style.filter = `brightness(${(currScroll())}) blur(${5 * upTo100(scrollAlt)}px)`
        bgElement.current.style.transform = `scale(${1 + (0.06 * upTo100(scrollAlt))}) `
    }

    useEffect(e=>{
        document.addEventListener("scroll", onScroll)
        return (function(){document.removeEventListener("scroll", onScroll)})
    },[])
    return(
        <div>
            <Header/>
            <PopUpImage cloneElement={cloneElementClick} setCloneElement={setCloneElementClick} imageLink={imageLinkClick}/>
            <div className={css.topDiv} ref={bgElement}>
                <div className={css.textCenter}>
                    <h1>Leni Kiko Artworks and Edits</h1>
                    <h3>By Lance Francisco</h3>
                </div>
                <div style={{width: '100%', height: '100%', position: 'relative', zIndex: "-1"}}>
                    <Image src={bglenikiko} layout="fill" alt="BG" objectFit="cover"/>
                </div>
            </div>
            <div className={css.mainContent}>
                <div className={css.topHandler}>
                    <p className="toolsText">Scroll Down</p>
                </div>
                <div>
                    <h3>Yassified Lahat</h3>
                    <div className={css.mainContImageCont} onClick={(e)=>{setCloneElementClick(e.target); setImageLinkClick('/Yassified lahat.jpg')}}>
                        <Image src='/Yassified lahat.jpg' layout="fill" alt="Sa Gobyernong Tapat, Yassified Lahat" objectFit="cover"/>
                    </div>
                </div>
                <div>
                    <h3>Leni Kiko Solos Wallpaper</h3>
                    <div className="linCont" style={{margin: 'auto', padding: '3px 10px'}}><a target="_blank" href="https://photos.app.goo.gl/vPPkK9cTj57m1vVS7" rel="noreferrer">Download Wallpaper</a></div>
                    <div className={css.fourItemRow}>
                        <div className={css.mainContImageCont} onClick={(e)=>{setCloneElementClick(e.target); setImageLinkClick('/Leni Kiko Wallpaper/Minify/Leni 1.jpg')}}>
                            <Image src='/Leni Kiko Wallpaper/Minify/Leni 1.jpg' layout="fill" alt="Leni Robredo Wallpaper" objectFit="cover"/>
                        </div>
                        <div className={css.mainContImageCont} onClick={(e)=>{setCloneElementClick(e.target); setImageLinkClick('/Leni Kiko Wallpaper/Minify/Leni 2.jpg')}}>
                            <Image src='/Leni Kiko Wallpaper/Minify/Leni 2.jpg' layout="fill" alt="Sa Gobyernong Tapat, Yassified Lahat" objectFit="cover"/>
                        </div>
                        <div className={css.mainContImageCont} onClick={(e)=>{setCloneElementClick(e.target); setImageLinkClick('/Leni Kiko Wallpaper/Minify/Kiko design 1.jpg')}}>
                            <Image src='/Leni Kiko Wallpaper/Minify/Kiko design 1.jpg' layout="fill" alt="Sa Gobyernong Tapat, Yassified Lahat" objectFit="cover"/>
                        </div>
                        <div className={css.mainContImageCont} onClick={(e)=>{setCloneElementClick(e.target); setImageLinkClick('/Leni Kiko Wallpaper/Minify/Kiko design 2.jpg')}}>
                            <Image src='/Leni Kiko Wallpaper/Minify/Kiko design 2.jpg' layout="fill" alt="Sa Gobyernong Tapat, Yassified Lahat" objectFit="cover"/>
                        </div>
                    </div>
                </div>
                <div className={css.innerSection}>
                    <div>
                        <h3>Paglaem Peoples Rally Pre-wait Loop</h3>
                        <p>Collaboration With Joshua Tuonan</p>
                        <div className="linCont" style={{margin: 'auto', padding: '3px 10px'}}><a target="_blank" href="https://www.linkedin.com/in/joshologie" rel="noreferrer">Joshua Tuonan Profile</a></div>
                        <video controls autoPlay muted src="https://res.cloudinary.com/quizpy/video/upload/v1649746241/Paglaem_palawan_loop_aqvzm0.mp4" />
                        <h3>Paglaem Live Scene Transition</h3>
                        <p>Collaboration With Joshua Tuonan</p>
                        <video controls autoPlay muted src="https://res.cloudinary.com/quizpy/video/upload/v1649746244/Paglaem_palawan_Transition_w83l48.mp4" />
                    </div>
                </div>
                <div>
                    <h3>RPC Rose Animation</h3>
                    <video controls style={{width: '100%', height: 'auto', padding: '20px 50px', borderRadius: '10px'}} autoPlay muted src="https://res.cloudinary.com/quizpy/video/upload/v1649509288/Logo_Animation_Wave_pqppak.mp4" />
                </div>
                <Contact/>
            </div>
        </div>
    )
}

export default LeniKiko