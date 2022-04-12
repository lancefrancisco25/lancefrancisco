import {useRef, useState, useEffect} from 'react'
import React from 'react'

function InputForm({children, error, required, keyu, css, title, radioCss}) {
    var cont = useRef(null);
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {error});
        }
        return child;
    });

    return (
        <div className={`${css.perQuestions} ${(error)? css.contShake: ''}`} key={keyu} ref={cont} style={{animationDelay: `${keyu}s`}}>
            <h1 className={css.questionTitle} style={{color: `${(error)? '#BE0000': ''}`}}>{(required)?title + '*': title}</h1>
            <div className={radioCss}>
                {childrenWithProps}
            </div>
        </div>
    )
}


export default InputForm
