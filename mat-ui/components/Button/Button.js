import {useRef, useEffect, useState} from 'react'
import css from './Button.module.css'
import Link from 'next/link'

function Button({children, mainRootInput, disabled, onClick, link, fitWidth, globalStyle, type}) {
    const rippleDiv = useRef(null), buttonEl = useRef(null);

    function onClickF(e){
        rippleDiv.current.style.opacity = 0;
        if(onClick && disabled === false) onClick(e)
    }
    function onMouseDownF(e){
        if(disabled) return
        const x = (e.clientX - buttonEl.current.getBoundingClientRect().left);
        const y = (e.clientY - buttonEl.current.getBoundingClientRect().top);
        rippleDiv.current.style.transition =  'none';
        rippleDiv.current.style.opacity = '';
        rippleDiv.current.style.transform =  '';
        setTimeout(()=>{
            rippleDiv.current.style.transition =  '';
            rippleDiv.current.style.top = y + 'px'
            rippleDiv.current.style.left = x + 'px'
            rippleDiv.current.style.height =  buttonEl.current.offsetWidth+ 'px';
            rippleDiv.current.style.width = buttonEl.current.offsetWidth +  'px';
            rippleDiv.current.style.transform =  'translate(-50%, -50%) scale(2.3)';
        }, 1)
    }
    function onMouseUpF(){
        rippleDiv.current.style.opacity = 0;
    }
    return (
        <div className={globalStyle} style={{userSelect: (disabled)?"none": ""}}>
        {(link) ? 
            <Link href={link} passHref prefetch={false}>
            <div className={mainRootInput}>
                <button type={type} ref={buttonEl} style={{width: (fitWidth)? '100%': '', cursor: "not-allowed"}} className={`${css.matUiButtonElMin} ${css.matUiButtonEl}`} onPointerDown={(e)=> onMouseDownF(e)} onMouseDown={(e)=>onMouseDownF(e)} onMouseUp={(e)=> onMouseUpF(e)} onClick={(e)=> onClickF(e)}>
                    <span className={css.matUibuttonColorText}>
                        {children}               
                    </span>
                    <div className={css.matUiButtonRipple} ref={rippleDiv}/>
                </button>
            </div>
        </Link>
        : 
        <div className={mainRootInput}>
            <button type={type} ref={buttonEl} style={{width: (fitWidth)? '100%': '', cursor: (disabled)?"not-allowed":""}} className={`${css.matUiButtonElMin} ${css.matUiButtonEl}`} onPointerDown={(e)=> onMouseDownF(e)} onMouseDown={(e)=>onMouseDownF(e)} onMouseUp={(e)=> onMouseUpF(e)} onClick={(e)=> onClickF(e)}>
                <span className={css.matUibuttonColorText}>
                    {children}               
                </span>
                <div className={css.matUiButtonRipple} ref={rippleDiv}/>
            </button>
        </div>
        }
    </div>
    )
}

Button.defaultProps = {
    mainRootInput: css.mainRootInput,
    globalStyle: css.globalStyle
}

export default Button
