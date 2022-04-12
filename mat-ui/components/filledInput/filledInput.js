import {useRef, useEffect, useState, useCallback} from 'react'
import PropTypes from 'prop-types';
import css from './filledInput.module.css';

function FilledInput({type, placeholder, rootInactive, rootActive, onFocus, onBlur, isSelected, helperText, error, onChange, rootError, pattern, maxLenth, trailingIcon, leadingIcon, value, disabled, disabledCss, inputId, getRef, required, mainRootInput}) {
    var label = useRef(null), inputCenterBorder = useRef(null), input = useRef(null), leadingIconRef = useRef(null), trailIconRef = useRef(null), lineRipple = useRef(null);
    var [inputState, setInputState] = useState('inactive')
    var [currentLength, setCurrentLength] = useState(0)
    var inputFocus = useCallback((t)=>{
        if(t !== true){
            setInputState('active')
            lineRipple.current.style.transform = 'scaleX(1)'
        }
        if(onFocus) onFocus(input.current);
        label.current.style.top = `${label.current.offsetHeight/ 2}px`;
        label.current.style.transform = `translate(0, -50%) scale(1)`;
    },[onFocus])

    var inputBlur = useCallback(()=>{
        if(onBlur) onBlur(input.current);
        setInputState('inactive')
        if(!input.current.value){
            label.current.style.top = '49%';
            if(leadingIcon){
                label.current.style.left = `${leadingIconRef.current.offsetWidth + 15}px`;
            }
            label.current.style.transform = `translate(0, -50%) scale(1.143)`;
        }
        lineRipple.current.style.transform = 'scaleX(0)'
    },[leadingIcon, onBlur])

    if(getRef) getRef(input);

    useEffect(() => {
        (isSelected)? input.current.select(): inputBlur()
    }, [inputBlur, isSelected])

    useEffect(() => {
        if(value){input.current.value = value,  inputFocus(true), setCurrentLength(input.current.value.length)}
    }, [inputFocus, value])

    useEffect(() => {//20px 16px 6px
        (leadingIcon)? input.current.style.padding = `20px 16px 6px ${leadingIconRef.current.offsetWidth + 30}px` : ''
    }, [leadingIcon])

    useEffect(() => {
        (trailingIcon)? input.current.style.padding = `20px ${trailIconRef.current.offsetWidth + 30}px 6px 16px` : ''
    }, [trailingIcon])

    function onChangeL(e){
        (onChange)?onChange(input.current):''
        setCurrentLength(input.current.value.length)
    }
    return (
        <div className={`${css.matUiInput} ${mainRootInput} ${(inputState == 'active')? rootActive : (inputState == 'inactive') ? rootInactive : ''} ${(error == true)? rootError: ''} ${(disabled == true)? disabledCss: ''}`}>
                <div className={css.matUiinputCont}>
                    {trailingIcon && 
                        <div className={css.matUiInputTrailingIcon} ref={trailIconRef}>{trailingIcon} </div>                    
                    }
                    {leadingIcon && 
                        <div className={css.matUiInputLeadingIcon} ref={leadingIconRef}>{leadingIcon}</div>                    
                    }
                    <input required={required} id={inputId} type={type} onFocus={inputFocus} disabled={disabled} maxLength={maxLenth} pattern={pattern} onBlur={inputBlur} ref={input} onChange={onChangeL} ></input>
                    <div ref={lineRipple} className={css.matUiInputLineRripple}></div>
                    <div className={css.matUiInputBorderCont}>
                        <div className={css.matUiInputCenterBorder} ref={inputCenterBorder}><div><label ref={label} className={css.matUiInputLabel}>{(error) ? `${placeholder}*` : placeholder}</label></div></div>
                    </div>
                </div>
                    <div className={css.matUiInputLowerMargin}>
                    {helperText &&
                        <p className={css.matUiHelperText}>{helperText}</p>
                    }
                    {maxLenth &&
                        <p className={css.matUiCharCount}>{`${currentLength} / ${maxLenth}`}</p>
                    }
                    </div>
        </div>
    )
}

FilledInput.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string
};

FilledInput.defaultProps = {
    type: 'text',
    rootInactive: css.rootInactive,
    rootActive: css.rootActive,
    rootError: css.rootError,
    disabledCss: css.disabledCss,
    mainRootInput: css.mainRootInput
};

export default FilledInput
