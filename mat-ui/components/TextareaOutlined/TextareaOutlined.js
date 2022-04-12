import {useRef, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import css from './TextareaOutlined.module.css';

function OutlinedInput({type, placeholder, rootInactive, rootActive, onFocus, onBlur, isSelected, helperText, error, onChange, rootError, pattern, maxLenth, trailingIcon, leadingIcon, value, disabled, disabledCss, inputId, getRef, required, globalStyles, rows}) {
    const label = useRef(null), legacyLabel = useRef(null), input = useRef(null), leadingIconRef = useRef(null),
        trailIconRef = useRef(null);
    const [inputState, setInputState] = useState('inactive');
    const [currentLength, setCurrentLength] = useState(0);

    function inputFocus(){
        setInputState('active')
        if(onFocus) onFocus(input.current);
        label.current.style.top = '0px';
        label.current.style.transform = `translate(0, -50%) scale(0.75)`;
        legacyLabel.current.style.maxWidth = ''
    }

    function inputBlur(){
        if(onBlur) onBlur(input.current);
        if(!input.current.value){
            label.current.style.top = '49%';
            if(leadingIcon){
                label.current.style.left = `${leadingIconRef.current.offsetWidth + 15}px`;
            }
            label.current.style.transform = `translate(0, -50%) scale(1)`;
            legacyLabel.current.style.maxWidth = '0.01px'
        }
        setInputState('inactive')
    }

    if(getRef) getRef(input);

    useEffect(() => {
        (isSelected)? input.current.select(): inputBlur()
    }, [isSelected])

    useEffect(() => {
        if(value){input.current.value = value,  inputFocus(), setCurrentLength(input.current.value.length)}
    }, [value])

    useEffect(() => {
        (leadingIcon)? input.current.style.padding = `16.5px 15px 16.5px ${leadingIconRef.current.offsetWidth + 30}px` : ''
    }, [leadingIcon])

    useEffect(() => {
        (trailingIcon)? input.current.style.padding = `16.5px ${trailIconRef.current.offsetWidth + 30}px 16.5px 15px` : ''
    }, [trailingIcon])

    useEffect(()=>{
        input.current.style.maxHeight = rows* 18 + 'px'
    },[rows])

    function onChangeL(e){
        (onChange)?onChange(input.current):''
        setCurrentLength(input.current.value.length)
        input.current.value.split(/\r\n|\r|\n/).length
        input.current.style.height = input.current.value.split(/\r\n|\r|\n/).length * 18 + 'px'
    }
    return (
        <div className={`${globalStyles} ${css.matUiInput} ${(inputState === 'active')? rootActive : (inputState === 'inactive') ? rootInactive : ''} ${(error == true)? rootError: ''} ${(disabled === true)? disabledCss: ''}`}>
                <div className={css.matUiinputCont}>
                    {trailingIcon && 
                        <div className={css.matUiInputTrailingIcon} ref={trailIconRef}>{trailingIcon} </div>                    
                    }
                    {leadingIcon && 
                        <div className={css.matUiInputLeadingIcon} ref={leadingIconRef}>{leadingIcon}</div>                    
                    }
                    <textarea required={required} id={inputId} type={type} onFocus={inputFocus} disabled={disabled} maxLength={maxLenth} onBlur={inputBlur} ref={input} onChange={onChangeL} />
                    <label className={css.matUiInputLabel} ref={label}>{placeholder}</label>
                    <fieldset aria-hidden={true} className={css.matUiInputBorderCont}>
                        <legend className={css.matUiInputLegendCont} ref={legacyLabel}><span className={css.matUiInputSpanSeparator}>{placeholder}</span></legend>
                    </fieldset>
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

OutlinedInput.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string
};

OutlinedInput.defaultProps = {
    type: 'text',
    rootInactive: css.rootInactive,
    rootActive: css.rootActive,
    rootError: css.rootError,
    isSelected: false,
    pattern: '',
    globalStyles: css.globalStyle,
    disabledCss: css.disabledCss
};

export default OutlinedInput
