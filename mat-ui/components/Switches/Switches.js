import {useState, useRef, useCallback} from 'react'
import css from './Switches.module.css'

function Switches({label,children, globalCss, disabled, checked, onChange}) {
    const [checkedState, setChecked] = useState(checked)
    const rippleEl = useRef(null);

    function onChangef(e){
        (onChange)? onChange(e):''
        setChecked(e.target.checked)
    }

    const onRipple = useCallback(e => {
        let style = rippleEl.current.style, heyT;
        clearTimeout(heyT)
        style.transition = ''
        style.opacity = '0.3'
        style.transform = 'translate(-50%,-50%) scale(1)'
        heyT = setTimeout(e => {
            style.opacity = '0'
            setTimeout(() => {
                style.transition = 'none'
                style.transform = 'translate(-50%,-50%) scale(0)'
            }, 200);
        }, 200)
    }, []);

    return (
        <div>
            <label onClick={e=>{onRipple(true)}} className={`${css.label} ${globalCss} `}>
                <span>{children}</span>
                <div className={`${css.switchOuterCont} ${(disabled)? css.switchOuterContDisabled:''} ${(checkedState)? css.switchOuterContChecked:''}`}>
                    <input disabled={disabled} onChange={e=>{onChangef(e)}} defaultChecked={checked} className={css.inputCheckBoxInvi} type="checkbox"/>
                    <div className={`${css.switchCircle} ${(disabled)? css.switchCircleDisabled:''} ${(checkedState)? css.circleChecked:''}`}>
                        <div ref={rippleEl} className={css.rippleCircle}/>
                    </div>
                </div>
            </label>
        </div>
    )
}

Switches.defaultProps = {
    globalCss: css.globalCss
}

export default Switches
