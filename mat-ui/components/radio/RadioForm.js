import {useRef, useEffect, useState, Children} from 'react'
import React from 'react'

function RadioForm({children, onChange, name, cssName,disabled, canUnselect, rows}) {
    (!name) ? console.error('Name tag is Needed inside <RadioForm/>') : ''
    const [checkedValue, setCheckedValue] = useState('');
    const insideFormCont = true;
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            if(disabled){
                return React.cloneElement(child, {setCheckedValue, insideFormCont, name, onChange});
            }else{
                return React.cloneElement(child, {checkedValue, setCheckedValue, insideFormCont, name, canUnselect, onChange});
            }
        }
        return child;
    });

    useEffect(e=>{
        (!name) ? console.error('Name tag is Needed inside <RadioForm/>'):''
    },[name])

    return(
        <div className={`${cssName}`}>
            {childrenWithProps}
            {(!name)? <p style={{color: 'red', fontStyle: 'italic'}}>Add a name prop so it will not cause error and it will disappear this message</p>: ''}
        </div>
    )
}

export default RadioForm
