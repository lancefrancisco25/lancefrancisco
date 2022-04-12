import {useRef, useEffect, useState} from 'react'
import css from './Checkboxes.module.css'

function Checkboxes({label, name, value, insideFormCont, checkedValue, setCheckedValue, cssName, onChange}) {
    var [checked, setChecked] = useState(false);
    var [lengthForCont, setLengthFormCont] = useState();
    var inputCheckbox = useRef(null), inputRipple = useRef(null), labelRef= useRef(null)
    function onClickF(e){
        if(insideFormCont && !checkedValue.includes(inputCheckbox.current)){
            setCheckedValue([...checkedValue, inputCheckbox.current]);
        }
        if(!inputCheckbox.current.checked && insideFormCont){
                const newArr = [...checkedValue];
                for(var i = newArr.length - 1; i >= 0; i--) {
                    if(newArr[i] === inputCheckbox.current) {
                        newArr.splice(i, 1);
                    }
                }
                setCheckedValue(newArr)
        }
        setChecked(inputCheckbox.current.checked)
        onChange([inputCheckbox.current])
    }

    function mouseDown(){
        var el = inputRipple.current.style;
        el.transition = 'none';
        el.transform = 'translate(-50%,-50%) scale(0)';
        el.opacity = '0';
        setTimeout(()=>{
            el.transition = '0.2s';
            el.transform = 'translate(-50%,-50%) scale(2)';
            el.opacity = '0.2';
        },1)
    }

    function mouseUp(){
        var el = inputRipple.current.style;
        el.transition = 'none';
        el.transform = 'translate(-50%,-50%) scale(0)';
        el.opacity = '0.6';
        setTimeout(()=>{
            el.transition = '';
            el.transform = '';
            el.opacity = '';
        },1)
    }
    return (
        <div className={`${(!checked)? css.unselectedCheckbox: css.selectedCheckbox} ${cssName}`}>
            <label className={css.matUiCheckboxLabel} ref={labelRef} onClick={(e)=> onClickF(e)} onMouseDown={mouseDown} onMouseUp={mouseUp}>
                
                <span className={css.matUiInputCheckboxSpan}>
                    <input ref={inputCheckbox} className={css.matUiInputCheckbox} type="checkbox" name={name} value={(value)? value : label}/>
                    <span className={css.matUiCheckboxRipple} ref={inputRipple}></span>
                        <span className={css.matUiInputCheckboxBorder}>
                        </span>
                        <span className={css.matUiCheckboxBackgroundCheck}>
                            <div className={css.matUiCheckboxCropCheck}>
                                <div className={css.matUiCheckboxCheckCont}>
                                    <div style={{position: 'relative', position: 'relative', width: '100%', height: '7px'}}>
                                        <div className={css.matUiCheckboxCheckLineShort}></div>
                                        <div className={css.matUiCheckboxCheckLineLong}></div>
                                    </div>
                                </div>
                            </div>
                        </span>
                </span>

                <span>{label}</span>
            </label>
        </div>
    )
}

Checkboxes.defaultProps = {
    cssName: css.inputCheckboxDefault
}

export default Checkboxes
