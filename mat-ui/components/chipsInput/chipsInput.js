import React, {useRef, useState, useEffect, useCallback} from 'react'
import css from './chipsInput.module.css'
import PropTypes from 'prop-types';
import _ from 'underscore'

function ChipsInput({data, disabledCss, addDatas, placeholder,value, globalCSS, rootActive, rootInactive, error, rootError, disabled, onChange, inputOnChange}) {
    const label = useRef()
    const legacyLabel = useRef()
    const fieldSet = useRef()
    
    const timerInput = useRef()
    const [itemSearch, setItemSearch]= useState([...data])
    const [inputFocus, setInputFocus] = useState()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [addedOrg, setAddedOrg] = useState((value)?value: [])
    const [onErase, setOnErase] = useState(undefined)
    const inputRef = useRef()
    const deleteBS = useRef(0)
    const [inputVal, setInputVal] = useState('')
    const inputContainer = useRef();

    const handleChange = useCallback((e)=>{
        clearTimeout(timerInput.current)
        setInputVal(e.value)
        timerInput.current = setTimeout(()=>{
            setSelectedIndex(0)
            const dataOrg = data.filter(e => {return e !== undefined})
            const matches = _.filter(dataOrg, function (s) {
                return s.name.toLowerCase().indexOf(e.value.toLowerCase()) !== -1;
            });
            if(e.value.length === 0){
                setOnErase(-1)
            }else{
                deleteBS.current = 0
                setOnErase(undefined)
            }
            setItemSearch(matches)
        },100)
    },[data])

    function onSubmit(e){
        e.preventDefault(); 
        enterAdd()
        handleChange(inputRef.current)
        inputRef.current.value = ''
    }

    const enterAdd = useCallback(()=>{
        let selIn = selectedIndex;
        const newArr = [...addedOrg];
        console.log(itemSearch[selIn]);
        if(itemSearch.length - 1 < selIn)selIn = 0
        if(itemSearch.length !== 0){
            if(!newArr.some(e=>{return e.id === itemSearch[selIn].id})){
                newArr.push(itemSearch[selIn])
            }
        }
        (onChange)? onChange(newArr):''
        setAddedOrg(newArr)
    },[addedOrg, itemSearch, onChange, selectedIndex])

    const keyHandler = useCallback(e=>{
        if(!inputFocus){return}
        const unicode = e.keyCode ? e.keyCode : e.charCode;
        switch(unicode) {
            case 40:
                if(selectedIndex < itemSearch.length - 1){
                    setSelectedIndex(selectedIndex+ 1)
                }else{
                    setSelectedIndex(0)
                }
                break;
            case 38:
                if(selectedIndex > 0){
                    setSelectedIndex(selectedIndex - 1)
                }else{
                    setSelectedIndex(itemSearch.length - 1)
                }
                break;
            case 8:
                if(deleteBS.current === 1){
                    removeElArr(onErase)
                    setOnErase(addedOrg.length - 1)
                }
                if(onErase === -1){
                    setOnErase(addedOrg.length - 1)
                    deleteBS.current = 1
                }
                break;
        }
    },[addedOrg, inputFocus, itemSearch, selectedIndex, onErase])

    const removeElArr = useCallback((index)=>{
        console.log(index)
        const newArr = [...addedOrg];
        if (index > -1) {
            newArr.splice(index, 1);
        }
        setAddedOrg(newArr);
        (onChange)? onChange(newArr):''
    },[addedOrg, onChange])

    const onOutFocus = useCallback((e)=>{
        // console.log(!inputContainer.current.contains(e.target))
        if(!inputFocus)return
        setInputFocus(inputFocus && inputContainer.current.contains(e.target))
    },[inputFocus])

    useEffect(()=>{
        window.addEventListener('keyup', keyHandler)
        return ()=>{
            window.removeEventListener('keyup', keyHandler)
        }
    },[keyHandler])

    useEffect(()=>{
        window.addEventListener('click', onOutFocus)
        return ()=>{
            window.removeEventListener('click', onOutFocus)
        }
    },[onOutFocus])

    useEffect(()=>{
        const i = [...addDatas, ...itemSearch];
        const newR = [...i, ];
        setItemSearch(newR)
    },[addDatas])
    return (
        <div ref={inputContainer} className={`${globalCSS} ${css.matUiInput} ${(inputFocus)? rootActive : rootInactive} ${(error)? rootError: ''} ${(disabled)? disabledCss: ''}`}>
            <div className={css.outerCont} onClick={()=>{setInputFocus(true); inputRef.current.focus()}}>
	            <form onSubmit={onSubmit} className={css.formContPills}>
                    {addedOrg.map((e,i)=>{
                        if(!e) return
                        return(
                            <div key={i} className={`${(onErase === i)?css.pillOnSelect:''} ${css.pillElement}`}>
                                {e.name}
                                <svg onClick={()=>{removeElArr(i)}} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M9.00002 1L1 9.00002M1.00003 1L9.00005 9.00002" stroke="#1A73E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        )
                    })}
                    <input ref={inputRef} onClick={e=>{handleChange(e.target)}} className={css.input} type="text" id="searchInput" autoComplete="off" onChange={e=>{handleChange(e.target); inputOnChange ? inputOnChange(e.target): ''}}/>
	            </form>
                <label className={css.matUiInputLabel} style={{top: (inputFocus)? '0px': (addedOrg.length === 0 && inputVal.length === 0)? '49%': '0px', transform: (inputFocus)? 'translate(0, -50%) scale(0.75)': (addedOrg.length === 0 && inputVal.length === 0)? 'translate(0, -50%) scale(1)': 'translate(0, -50%) scale(0.75)'}} ref={label}>{placeholder}</label>
                <fieldset aria-hidden={true} className={css.matUiInputBorderCont} ref={fieldSet}>
                    <legend className={css.matUiInputLegendCont} style={{maxWidth: (!inputFocus)? (addedOrg.length === 0 && inputVal.length === 0)?'0.01px': '': ''}} ref={legacyLabel}><span className={css.matUiInputSpanSeparator}>{placeholder}</span></legend>
                </fieldset>
                <div className={css.dropDownCont} style={{transform: `${(inputFocus)? 'scale(1)': 'scale(0.8,0)'}`, opacity: `${(inputFocus)? '1': '0'}`, visibility: (inputFocus)? 'visible' : 'hidden'}}>
                    {itemSearch.map((e, i)=>{
                        return (
                            <div className={`${(selectedIndex === i)?css.itemDropdownSelected: ''} ${css.itemDropdown}`} onClick={()=>{enterAdd(i)}} key={i}>{e.name}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

ChipsInput.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

ChipsInput.defaultProps = {
    type: 'text',
    rootInactive: css.rootInactive,
    rootActive: css.rootActive,
    rootError: css.rootError,
    isSelected: false,
    pattern: '',
    globalCSS: css.globalStyle,
    disabledCss: css.disabledCss,
};


export default ChipsInput