import {useRef, useEffect, useState} from 'react'
import LineInput from '../LineInput/LineInput'
import css from './Sliders.module.css';

function Sliders({min, max, snap, value, marks, pixelAccurate, input}) {
    const minC = parseInt(min), maxC = parseInt(max);
    const [coodinates, setCoordinates] = useState([0, 0]);
    const [press, setPress] = useState(false);
    const [hover, setHover] = useState(false);
    const [curVal, setCurVal] = useState((value) ? value : min);
    const [widthSelected, setWidthSelected] = useState(0);
    const slideCont = useRef(null), slideBarBg = useRef(null), slideBgWidth = useRef(null),
        tooltipSlider = useRef(null);

    useEffect(()=>{
        let mouseDown, touchDevice = false;

        window.addEventListener('touchmove', handleCursor, touchDevice = true)
        window.addEventListener('mousemove', handleCursor, touchDevice = false)
        slideCont.current.addEventListener('touchstart', function(e){onPress()})
        slideCont.current.addEventListener('mousedown', function(e){mouseDownE(e)})
        window.addEventListener('touchend', (function(){mouseDown = false, onHoverOut(false)}))
        window.addEventListener('mouseup', (function(){mouseDown = false, onHoverOut(false)}))

        function mouseDownE(e){
            console.log(e)
            slideBgWidth.current.style.transition= ''
            mouseDown = true;
            const elbounding = slideBarBg.current.getBoundingClientRect();
            const formula = (e.pageX - elbounding.left) / elbounding.width * 100,
                roundedFormula = ((formula < 0) ? 0 : (formula > 100) ? 100 : formula);
            setCoordinates([e.clientX,e.clientY]);
            setWidthSelected(snap ?Math.round((maxC - minC) * (roundedFormula/100))/ (maxC - minC) * 100 : roundedFormula)
            if(pixelAccurate && !snap){
                setCurVal(((maxC - minC)*(((formula < 0)? 0 : (formula > 100)? 100: formula)/100)) + minC)
            }else if(snap && !pixelAccurate){
                setCurVal(Math.round(((maxC - minC)*(((formula < 0)? 0 : (formula > 100)? 100: formula)/100)) + minC))                    
            }
        }

        function handleCursor(e){
            if(mouseDown){
                const userX = e.pageX,
                    userY = e.pageY;
                slideBgWidth.current.style.transition= 'none'
                const elbounding = slideBarBg.current.getBoundingClientRect();
                const formula = (userX - elbounding.left) / elbounding.width * 100,
                    roundedFormula = ((formula < 0) ? 0 : (formula > 100) ? 100 : formula);
                setCoordinates([userX,userY]);
                setWidthSelected((snap) ?(Math.round((maxC - minC) * (roundedFormula/100))/ (maxC - minC) * 100) : roundedFormula)
                if(pixelAccurate && !snap){
                    setCurVal(((maxC - minC)*(((formula < 0)? 0 : (formula > 100)? 100: formula)/100)) + minC)
                }else if(snap && !pixelAccurate){
                    setCurVal(Math.round(((maxC - minC)*(((formula < 0)? 0 : (formula > 100)? 100: formula)/100)) + minC))                    
                }
            }
        }
    },[])

    function onHover(e){
        tooltipSlider.current.style.transform = 'translate(50%, -100%) scale(1)'
        setHover(true)
    }
    function onHoverOut(e){
        if(!press || !e){
            tooltipSlider.current.style.transform = ''
        }
    }

    function onPress(){
        tooltipSlider.current.style.transform = 'translate(50%, -120%) scale(1.05)'
        setPress(true)
    }
    function onPressOut(){
        if(hover){
            tooltipSlider.current.style.transform = 'translate(50%, -100%) scale(1)'
        }
        setPress(false)
        onHoverOut(false)
    }
    
    function marks(){
        var ele = []
        for(var i = minC - 1; i < maxC; i++){
            var form = ((i / (maxC - 1))* 100).toFixed(2);  
            ele.push(<span key={`sliderMarks${maxC}${i}`} className={`${css.matUiSlideBarMicroMarks} ${(Math.round((i / (maxC - 1))* 100)> (Math.round((maxC - minC) * (widthSelected/100))/ (maxC - minC) * 100))?css.matUiSlideBarMicroMarksUnselect:''}`} style={{left: `${form}%`}}></span>)
            if(i== maxC - 1){
                return(ele)
            }
        }
    }

    return (
        <div className={css.matUiSlideBarContOuter}>
            <div ref={slideCont} onMouseDown={onPress} onMouseUp={onPressOut} className={css.matUiSlideBarClickCont}>
                <span className={css.matUiSlideBarBg} ref={slideBarBg}>
                    <span className={css.matUiSlideBarSelect} style={{width: `${widthSelected}%`}} ref={slideBgWidth}>
                        <span className={css.matUiSlideBarTooltip} ref={tooltipSlider}>
                            <span>{curVal}</span>
                        </span>
                        <span className={css.matUiSlideBarHandle}>
                        </span>
                        <span className={css.matUiSlideBarRipple} onMouseOver={onHover} onMouseOut={onHoverOut} />
                    </span>
                    {marks &&
                            <span className={css.spanMarksContGrid}>
                                {marks()}
                            </span>
                    }
                </span>
            </div>
            {input &&
                <div style={{width: '50px'}}>
                    <LineInput type="number" value={curVal} onChange={(e)=>{setCurVal(e.value), setWidthSelected((((e.value / (maxC - 1))* 100).toFixed(2)))}}/>
                </div>
            }
        </div>
    )
}

Sliders.defaultProps = {
    snap: false
}

export default Sliders
