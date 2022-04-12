import {useRef, useEffect, useState, useCallback} from 'react'
import PropTypes from 'prop-types';
import css from './Select.module.css';

function OutlinedInput({data, defValue, placeholder, helperText, rootInactive, rootActive, onFocus, onBlur, isSelected, error, onChange, rootError, disabled, disabledCss, inputId, getRef, required, globalStyle}) {
    const labelEl = useRef(null), legacyLabel = useRef(null), input = useRef(null);
    const [inputState, setInputState] = useState('inactive');
    const [label, setLabel] = useState(data[(data.findIndex(o => o.value === defValue) >= 0) ? data.findIndex(o => o.value === defValue) : 0].label);
    const [arrSelKey, setArrSelKey] = useState(0);

    const inputFocus = useCallback((drop) => {
            if (!drop) setInputState('active')
            if (onFocus) onFocus(input.current);
            labelEl.current.style.top = '0px';
            labelEl.current.style.transform = `translate(0, -50%) scale(0.75)`;
            legacyLabel.current.style.maxWidth = ''
        }
        , [onFocus]);

    const inputBlur = useCallback(() => {
            if (onBlur) onBlur(input.current);
            if (!input.current.value) {
                labelEl.current.style.top = '49%';
                labelEl.current.style.transform = `translate(0, -50%) scale(1)`;
                legacyLabel.current.style.maxWidth = '0.01px'
            }
            setInputState('inactive')
        }
        , [onBlur]);

    if(getRef) getRef(input);

    const onOutFocus = useCallback((e) => {
        if (e.target !== input.current && !input.current.contains(e.target)) {
            inputBlur()
        }
    }, [inputBlur]);

    useEffect(()=>{
        window.addEventListener('click', onOutFocus);
        return () =>window.removeEventListener('click', onOutFocus);
    },[onOutFocus])


    useEffect(() => {
        (isSelected)? input.current.select(): inputBlur()
    }, [inputBlur, isSelected])

    useEffect(() => {
        if(label){input.current.value = label, inputFocus(true)}
    }, [inputFocus, label])

    useEffect(()=>{
        setArrSelKey((data.findIndex(o => o.value === defValue) >= 0)? data.findIndex(o => o.value === defValue) : 0)
        setLabel(data[(data.findIndex(o => o.value === defValue) >= 0)? data.findIndex(o => o.value === defValue) : 0].label)
    },[data, defValue])
    //erase below
    return (
        <div className={`${globalStyle} ${css.matUiInput} ${(inputState === 'active')? rootActive : (inputState === 'inactive') ? rootInactive : ''} ${(error === true)? rootError: ''} ${(disabled === true)? disabledCss: ''}`}>
                <div className={css.matUiinputCont}>
                    <div className={css.selectContSel} style={{transform: `${(inputState === 'active')? 'scale(1)': 'scale(0.8,0)'}`, opacity: `${(inputState === 'active')? '1': '0'}`}}>
                        {data &&
                            data.map((e,i)=>{
                                return(
                                    <div key={i} className={`${(arrSelKey === i)? css.selectContSelHoverDiv: ''}`} onClick={()=>{setLabel(e.label); onChange? onChange({label: e.label,value: e.value}):''; setArrSelKey(i)}}>{e.label}</div>
                                )
                            })
                        }
                    </div>
                    <div className={css.matUiInputTrailingIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{transform: (inputState === 'active')? 'rotate(180deg)': ''}}>
                            <path d="M7 10L12 15L17 10H7Z" fill="black"/>
                        </svg>
                    </div>
                    <input readOnly required={required} id={inputId} onClick={() => {inputFocus()}} disabled={disabled} value={label} ref={input}/>
                    <label className={css.matUiInputLabel} ref={labelEl}>{placeholder}</label>
                    <fieldset aria-hidden={true} className={css.matUiInputBorderCont}>
                        <legend className={css.matUiInputLegendCont} ref={legacyLabel}>
                            {placeholder &&
                            <span className={css.matUiInputSpanSeparator}>{placeholder}</span>                            
                            }
                        </legend>
                    </fieldset>
                </div>
                <div className={css.matUiInputLowerMargin}>
                    {helperText &&
                        <p className={css.matUiHelperText}>{helperText}</p>
                    }
                </div>
        </div>
    )
}

OutlinedInput.propTypes = {
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
    disabledCss: css.disabledCss,
    label: String,
};

export default OutlinedInput
