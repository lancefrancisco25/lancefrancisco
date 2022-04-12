import {useState} from 'react'
import React from 'react'

function RadioForm({children, onChange, cssName}) {
    var [checkedValue, setCheckedValue] = useState([])
    var insideFormCont = true;
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { checkedValue, setCheckedValue, checkedValue, setCheckedValue,insideFormCont, onChange});
        }
        return child;
    });
    return(
    <div className={cssName} onClick={onChange(checkedValue)}>
            {childrenWithProps}
    </div>
    )
}

export default RadioForm
