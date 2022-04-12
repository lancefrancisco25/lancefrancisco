import React from 'react'
import css from './Dialogs.module.css'
import ButtonText from '../Button/ButtonText'

function Dialogs({title, description, outFocus, option1, option2, variant, children, opt1funct, opt2funct}) {
    return (
        <div className={css.outerPosCont}>
            <div className={css.mainDialog}>
                <div>
                {children &&
                        {children}
                    }
                    <h1 className={css.titleDialogs}>{title}</h1>
                </div>
                <p>{description}</p>
                <div className={`${css.optionsCont} ${(variant == 'flex')? css.flexOptions : (variant == 'stacked')? css.stackedOptions: ''}`}>
                    <p onClick={opt1funct}>{option1}</p>
                    <p onClick={opt2funct}>{option2}</p>
                    {
                        // <ButtonText>{option1}</ButtonText>
                        // <ButtonText>{option2}</ButtonText>
                    }
                </div>
            </div>
            <div onClick={outFocus} className={css.darkBgClick}></div>
        </div>
    )
}

Dialogs.defaultProps = {
    variant: 'flex'
}

export default Dialogs
