import {useRef, useEffect, useState, useCallback} from 'react'
import PropTypes from 'prop-types';
import css from './Input.module.css';

/*.globalStyle{
    --inputHeight: 1.4375em;
}*/

function OutlinedInput({type, placeholder, rootInactive, rootActive, onFocus, onBlur, isSelected, helperText, error, onChange, rootError, pattern, maxLenth, trailingIcon, leadingIcon, value, disabled, disabledCss, inputId, storeRef, required, globalStyle}) {
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

    const inputBlur = useCallback(() => {
        if (onBlur) onBlur(input.current);
        if (!input.current.value) {
            label.current.style.top = '49%';
            if (leadingIcon) {
                label.current.style.left = `${leadingIconRef.current.offsetWidth + 15}px`;
            }
            label.current.style.transform = `translate(0, -50%) scale(1)`;
            legacyLabel.current.style.maxWidth = '0.01px'
        }
        setInputState('inactive')
    }, [leadingIcon, onBlur]);

    if(storeRef) storeRef.current = input.current;

    useEffect(() => {
        (isSelected)? input.current.select(): inputBlur()
    }, [inputBlur, isSelected])

    useEffect(() => {
        if(value){input.current.value = value,  inputFocus(), setCurrentLength(input.current.value.length)}
    }, [inputFocus, value])

    useEffect(() => {
        (leadingIcon)? input.current.style.padding = `16.5px 15px 16.5px ${leadingIconRef.current.offsetWidth + 30}px` : ''
    }, [leadingIcon])

    useEffect(() => {
        (trailingIcon)? input.current.style.padding = `16.5px ${trailIconRef.current.offsetWidth + 30}px 16.5px 15px` : ''
    }, [trailingIcon])

    function onChangeL(){
        (onChange)?onChange(input.current):''
        setCurrentLength(input.current.value.length)
    }

    return (
        <div className={`${globalStyle} ${css.matUiInput} ${(inputState === 'active')? rootActive : (inputState === 'inactive') ? rootInactive : ''} ${(error)? (rootError)?rootError:css.rootError: ''} ${(disabled === true)? disabledCss: ''}`}>
                <div className={css.matUiinputCont}>
                    {trailingIcon && 
                        <div className={css.matUiInputTrailingIcon} ref={trailIconRef}>{trailingIcon} </div>                    
                    }
                    {leadingIcon && 
                        <div className={css.matUiInputLeadingIcon} ref={leadingIconRef}>{leadingIcon}</div>                    
                    }
                    <input required={required} id={inputId} type={type} onFocus={inputFocus} disabled={disabled} maxLength={maxLenth} onBlur={inputBlur} ref={input} onChange={onChangeL} />
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
    globalStyle: css.globalStyle,
    disabledCss: css.disabledCss
};

export default OutlinedInput
