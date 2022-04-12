import {useRef, useEffect, useState} from 'react'
import css from './Button.module.css'
import Link from 'next/link'

function Button({children, mainRootInput, onClick, onMouseDown, link}) {
    var rippleDiv = useRef(null), buttonEl = useRef(null)
    function onClickF(e){
        rippleDiv.current.style.opacity = 0;
        if(onClick) onClick(e)
    }
    function onMouseDownF(e){
        var x = (e.clientX - buttonEl.current.getBoundingClientRect().left) ; 
        var y = (e.clientY - buttonEl.current.getBoundingClientRect().top) ; 
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
        <div className={mainRootInput}>
        {(link) ? 

        <Link href={link} passHref>
                <button ref={buttonEl} className={`${css.matUiButtonElMin} ${css.matUiButtonElText}`} onPointerDown={(e)=> onMouseDownF(e)} onMouseDown={(e)=>onMouseDownF(e)} onMouseUp={(e)=> onMouseUpF(e)} onClick={(e)=> onClickF(e)}>
                    <span className={css.matUibuttonColorTextOnly}>
                        {children}               
                    </span>
                    <div className={css.matUiButtonRippleText} ref={rippleDiv}></div>
                </button>
        </Link>
        : 
            <button ref={buttonEl} className={`${css.matUiButtonElMin} ${css.matUiButtonElText}`} onPointerDown={(e)=> onMouseDownF(e)} onMouseDown={(e)=>onMouseDownF(e)} onMouseUp={(e)=> onMouseUpF(e)} onClick={(e)=> onClickF(e)}>
                <span className={css.matUibuttonColorTextOnly}>
                    {children}               
                </span>
                <div className={css.matUiButtonRippleText} ref={rippleDiv}></div>
            </button>
        }
    </div>
    )
}

Button.defaultProps = {
    mainRootInput: css.mainRootInput,
}

export default Button
