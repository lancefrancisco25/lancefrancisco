import {useRef, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import css from './TextAreaFilled.module.css';

function TextAreaFilled({type, placeholder, rootInactive, rootActive, onFocus, onBlur, isSelected, helperText, error, onChange, rootError, maxLenth, trailingIcon, leadingIcon, value, disabled, disabledCss, inputId, getRef, required, globalCSS, rows}) {
    const label = useRef(null), inputCenterBorder = useRef(null), input = useRef(null), leadingIconRef = useRef(null),
        trailIconRef = useRef(null), lineRipple = useRef(null);
    const [inputState, setInputState] = useState('inactive');
    const [currentLength, setCurrentLength] = useState(0);

    function inputFocus(){
        setInputState('active')
        if(onFocus) onFocus(input.current);
        label.current.style.top = `9.5px`;
        label.current.style.transform = `translate(0, -50%) scale(1)`;
        lineRipple.current.style.transform = 'scaleX(1)'
    }

    function inputBlur(){
        if(onBlur) onBlur(input.current);
        setInputState('inactive')
        if(!input.current.value){
            label.current.style.top = '50%';
            if(leadingIcon){
                label.current.style.left = `${leadingIconRef.current.offsetWidth + 15}px`;
            }
            label.current.style.transform = `translate(0, -50%) scale(1.143)`;
        }
        lineRipple.current.style.transform = 'scaleX(0)'
    }

    if(getRef) getRef(input);

    useEffect(() => {
        (isSelected)? input.current.select(): inputBlur()
    }, [isSelected])

    useEffect(() => {
        if(value){input.current.value = value;  inputFocus(); setCurrentLength(input.current.value.length)}
    }, [inputFocus, value])

    useEffect(() => {//20px 16px 6px
        (leadingIcon)? input.current.style.padding = `20px 16px 6px ${leadingIconRef.current.offsetWidth + 30}px` : ''
    }, [leadingIcon])

    useEffect(() => {
        (trailingIcon)? input.current.style.padding = `20px ${trailIconRef.current.offsetWidth + 30}px 6px 16px` : ''
    }, [trailingIcon])

    function onChangeL(){
        (onChange)?onChange(input.current):''
        setCurrentLength(input.current.value.length)
        const heightInput = Math.floor(input.current.scrollHeight / 23);
        if(heightInput === 1) return input.current.style.height = ''
        if(heightInput <= rows){
            // input.current.style.height = rowsNow* 27 + 'px'
            input.current.style.height = 'auto';
            input.current.style.height = input.current.scrollHeight + 'px';
        }
    }

    return (
        <div className={`${css.matUiInput} ${globalCSS} ${(inputState === 'active')? rootActive : (inputState === 'inactive') ? rootInactive : ''} ${(error === true)? rootError: ''} ${(disabled === true)? disabledCss: ''}`}>
                <div className={css.matUiinputCont} >
                    {trailingIcon && 
                        <div className={css.matUiInputTrailingIcon} ref={trailIconRef}>{trailingIcon} </div>
                    }
                    {leadingIcon && 
                        <div className={css.matUiInputLeadingIcon} ref={leadingIconRef}>{leadingIcon}</div>                    
                    }
                    <div className={css.textAreaMargin}>
                        <textarea required={required} id={inputId} type={type} onFocus={inputFocus} disabled={disabled} maxLength={maxLenth} onBlur={inputBlur} ref={input} onChange={onChangeL} />
                    </div>
                    <div ref={lineRipple} className={css.matUiInputLineRripple}/>
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

TextAreaFilled.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string
};

TextAreaFilled.defaultProps = {
    type: 'text',
    rootInactive: css.rootInactive,
    rootActive: css.rootActive,
    rootError: css.rootError,
    disabledCss: css.disabledCss,
    globalCSS: css.mainRootInput
};

export default TextAreaFilled
