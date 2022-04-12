import {useRef, useEffect, useState, useCallback} from 'react'
//import PropTypes from 'prop-types';
import css from './radio.module.css';

function Radio({children, label, name, value, checked, setCheckedValue, tabIndex, alignItems, checkedValue, disabled, insideFormCont, cssName, onChange,canUnselect, TopElement}) {
    const [checkedE, setChecked] = useState(checked);
    const inputRadio = useRef(null), inputRipple = useRef(null);

    const onClickF = useCallback(e => {
        if (disabled) {
            return
        }
        if (!insideFormCont) {
            setChecked(!checkedE);
            (onChange) ? onChange({target: inputRadio.current, checkedE: !checkedE}) : ''
        }else{
            setChecked(!checkedE);
            if(!canUnselect) {
                onChange({target: inputRadio.current, checkedE: !checkedE})
                return setCheckedValue(inputRadio.current)
            }
            if(!checkedE){
                setCheckedValue(inputRadio.current)
                onChange({target: inputRadio.current, checkedE: !checkedE})
            }else{
                setCheckedValue('')
                onChange({target: {value: undefined}, checkedE: !checkedE})
            }
        }
    }, [checkedE, disabled, insideFormCont, onChange, setCheckedValue]);

    function mouseDown(){
        const el = inputRipple.current.style;
        el.transition = 'none';
        el.transform = 'translate(-50%,-50%) scale(0)';
        el.opacity = '0';
        setTimeout(()=>{
            el.transition = '6s';
            el.transform = 'translate(-50%,-50%) scale(2)';
            el.opacity = '0.2';
        },1)
    }

    function mouseUp(){
        const el = inputRipple.current.style;
        el.transition = 'none';
        el.transform = 'translate(-50%,-50%) scale(0)';
        el.opacity = '0.6';
        setTimeout(()=>{
            el.transition = '';
            el.transform = '';
            el.opacity = '';
        },1)
    }

    useEffect(()=>{
        (checkedValue)? setChecked(checkedValue == inputRadio.current): '';
    },[checkedValue,checkedE])

    return (
        <div className={`${(!checkedE)? css.unselectedRadio: css.selectedRadio} ${cssName}`} tabIndex={tabIndex}>
            {TopElement}
            <div className={css.matUiRadioLabel} style={{alignItems: alignItems}} onClick={(e)=> onClickF(e)} onMouseDown={mouseDown} onMouseUp={mouseUp}>
                <span className={css.matUiInputRadioSpan}>
                    <input checked={checked} ref={inputRadio} className={css.matUiInputRadio} type="radio" name={name} onChange={(e)=> onClickF(e)} value={(value)? value : label}/>
                    <span className={css.matUiInputRadioBorder}>
                        <span className={css.matUiRadioRipple} ref={inputRipple}/>
                        <span className={css.matUiInputRadioInnerFill}/>
                    </span>
                </span>
                <span className={css.matUiSpanLabel} style={{width: '100%'}}>{(children)? children: (label) ? label : ''}</span>
            </div>
        </div>
    )
}

export default Radio
