import {useCallback, useEffect, useRef, useState} from "react";
import css from "./popUpImage.module.css";

function PopUpImage({cloneElement, setCloneElement, imageLink}) {
    const divClone = useRef();
    const divTargetEl = useRef();
    const [openImageTray, setOpenImageTray] = useState(false)
    const onclick = useCallback((e) => {
        const {left, top, width, height} = e.getBoundingClientRect();
        const styles = divClone.current.style;
        const divTarget = divTargetEl.current
        styles.display = "flex"
        divTarget.style.display = 'flex'
        setTimeout(()=>{
            styles.opacity = 1;
            styles.top = top + 'px';
            styles.left = left + 'px';
            styles.width = width + 'px';
            styles.height = height + 'px';
            setTimeout(() => {
                setOpenImageTray(true)
                divTarget.style.opacity = '1'
                styles.top = '0px';
                styles.left = '0px';
                styles.width = '100%';
                styles.height = '100%';
            }, 10)
        },1)
    }, [])

    const onclickaway = useCallback(() => {
        const styles = divClone.current.style;
        const {left, top, width, height} = cloneElement.getBoundingClientRect()
        styles.top = top + 'px';
        styles.left = left + 'px';
        styles.width = width + 'px';
        styles.height = height + 'px';

        const divTarget = divTargetEl.current
        divTarget.style.opacity = '0'
        setTimeout(() => {
            styles.opacity = 0;
            setTimeout(() => {
                divTarget.style.display = 'none'
                styles.display = 'none'
                setCloneElement("")
                setOpenImageTray(false)
            }, 200)
        }, 50)
    }, [cloneElement])


    useEffect(()=>{
        if(!cloneElement)return;
        onclick(cloneElement);
    },[cloneElement, onclick])
    return (
        <div>
            <div ref={divClone} className={css.divClone} onClick={onclickaway} style={{visibility: openImageTray? 'visible': 'hidden'}}>
                <img className={`${(!openImageTray) ? css.divCloneImage : ''}`} src={imageLink} alt=""/>
            </div>

            <div className={css.imagePreview} ref={divTargetEl}/>
        </div>
    )
}

export default PopUpImage