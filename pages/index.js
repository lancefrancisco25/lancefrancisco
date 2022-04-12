import {useState} from "react";
import Image from 'next/image'
import Link from 'next/link'
import Header from '../Components/Header/header'
import css from '../styles/Home.module.css'
import lancefranciscoPFP from '../public/Lance Francisoc Profile.png'
import yassified from '../public/Yassified lahat wide.jpg'

function Index() {
    return (
        <div>
            <Header/>
            <div className={css.topDiv}>
                <div className={css.topGradientImageHeading}>
                    <h2>Recent Projects</h2>
                    <h1>Leni Kiko Artworks and Edits</h1>
                    <Link href="/projects/lenikiko" passHref>
                        <button className={css.button}>
                            Check it out
                        </button>
                    </Link>
                </div>
                {/*<video onPlay={()=>{setVideoLoaded(true)}} onPause={()=>{setVideoLoaded(false)}} className={`${(videoLoaded)? css.videoLoadedOpen : ''} ${css.videoSetHead}`} src="https://res.cloudinary.com/quizpy/video/upload/v1649483052/1st_sample_loop_mzfkat.mp4" autoPlay muted/>*/}
                <Image src={yassified} priority layout="fill" alt="Leni Kiko Paglaem Peoples Rally" objectFit="cover"/>
            </div>
            <div className={css.mainCont}>
                <div className={css.profileCont}>
                    <Image src={lancefranciscoPFP} width="139" height="139" className={css.profilePicture}/>
                    <div>
                        <h2>Lance Francisco</h2>
                        <div className="linCont" style={{margin: "3px 0 7px"}}>
                            <a href= "mailto:lancefrancisco@quizpy.live">lancefrancisco@quizpy.live</a>
                        </div>
                        <p>Photo and video editor, graphics designer, UI and UX designer, animator, 3d artist, Programmer, musician, video and photo - grapher, live stream producer.</p>
                    </div>
                </div>

                <div>
                    <div>
                        <div>
                            <Image src="/thumbnail/lenikikothumbnail.png"/>
                        </div>
                        <div>
                            <h2>Leni Kiko Rally</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index