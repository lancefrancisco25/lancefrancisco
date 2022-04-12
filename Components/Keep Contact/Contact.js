import css from "./Contact.module.css";
import {OutlinedInput, Select, Button} from "../../mat-ui/mat-ui";
import {useRef, useState, useCallback} from 'react'
import axios from "axios"

function Contact({}){
    const selectMethod = useRef([{label: "Email", value: "em"},{ label: "Telegram", value: "tg"}, {label: "Messenger Facebook", value: "ms"}, {label: "Discord", value:"ds"}])

    const selectMethodIdeas = useRef([{label: "Video Editing", value: "ve"},{ label: "Photo Editing", value: "pe"}, {label: "Website Development", value: "wd"},{label: "UI/UX Design", value: "uiux"}])
    const [sendRequestStat, setSendRequestStat] = useState("Your ticket is sent in your email. Check it out")
    const [requestStat, setRequestStat] = useState(false)
    const [errors, checkErrors] = useState([false, false, false, false])
    //forms value
    const userName = useRef("");
    const [userMethodContact, setUserMethodContact] = useState({label: "Email", value: "em"});
    const userContactDet = useRef("")
    const userContactOptionalEmail = useRef("")
    const userWorkService = useRef({label: "Video Editing", value: "ve"})
    const userWorkDet = useRef("")
    const [backupEmailErr, setBackupEmailErr] = useState(false)
    function getNameMethod(){
        let res = userMethodContact.label;
        if(res === "Email"){
            res+= " Address"
        }else if(res === "Telegram" || res === "Messenger Facebook"){
            res+= " username"
        }
        return res
    }

    const checkForm = useCallback(()=>{
        const emailRegexp = new RegExp(
            /^[a-zA-Z0-9][\-_.+!#$%&'*\/=?^`{|]?([a-zA-Z0-9][\-_.+!#$%&'*\/=?^`{|]?)*[a-zA-Z0-9]@[a-zA-Z0-9][-.]?([a-zA-Z][-.]?)*[a-zA-Z0-9]\.[a-zA-Z0-9]+([.\-]?[a-zA-Z])*[a-zA-Z0-9]*$/i
        )
        let newErr = [false, false, false, false]
        if(userName.current.length === 0){
            newErr[0] = true
        }
        if(userContactDet.current.length === 0){
            newErr[1] = true
        }
        if(userWorkDet.current.length === 0){
            newErr[2] = true
        }
        const emailSender = userMethodContact.label === "Email"? userContactDet.current : userContactOptionalEmail.current
        if(userMethodContact.label === "Email"){
            if(!emailRegexp.test(userContactDet.current)){
                newErr[1] = 'invalid_email'
            }
        }
        if(userContactOptionalEmail.current.length > 0){
            if(!emailRegexp.test(userContactOptionalEmail.current)){
                setBackupEmailErr('invalid_email')
            }else{
                setBackupEmailErr(false)
            }
        }else{
            setBackupEmailErr(false)
        }
        checkErrors(newErr)
        if(newErr.indexOf(true) >= 0 || (backupEmailErr === false || backupEmailErr === "invalid_email")) return;
        newErr[3] = true;
        checkErrors(newErr)
        axios.post("/api/client",{name: userName.current, contactMethod: userMethodContact.label, contactDet: userContactDet.current, emailAddress: emailSender, service: userWorkService.current.label, serviceDet: userWorkDet.current}).then(e=>{
            console.log(e.data)
            if(!e.data.success){
                if(e.data.error === "timeout"){
                    setSendRequestStat("You've just send a request earlier. Try it again later.")
                }else{
                    setSendRequestStat("Request received on my side but can't send it to your email.")
                }
            }else{
                setSendRequestStat("Your request is received and sent in your email.\"")
            }
            setRequestStat(true)
            setTimeout(function(){
                setRequestStat(false)
            },6000)
            newErr[3] = false;
            checkErrors(newErr)
        })
    },[backupEmailErr, userMethodContact.label])

    return(
        <div className={css.getEmailsInquiry}>
            <div className={css.getEmailConf} style={{opacity: (requestStat)? 1 : 0, visibility: (requestStat)?"visible":'hidden'}}>
                <h2>{sendRequestStat}</h2>
            </div>
            <h2>You need someone to make your ideas? Let me help you</h2>
            <div className={css.contactItem}>
                <h3>Contact Infos</h3>
                <div>
                    <OutlinedInput type="text" onChange={e=>{userName.current = e.value;}} error={errors[0]} placeholder="Full Name*" helperText="Use the name in your social media" globalStyle={css.inputGlobalStyle}/>
                    <Select data={selectMethod.current} onChange={(e)=>{setUserMethodContact(e)}} placeholder="Your Preferred Contact Method"  globalStyle={css.inputGlobalStyle}/>
                    <OutlinedInput onChange={e=>{userContactDet.current = e.value;}} error={errors[1]} placeholder={`Your ${getNameMethod()}*`} helperText={(errors[1] === "invalid_email"? "Invalid Email":"")} globalStyle={css.inputGlobalStyle}/>
                    {userMethodContact.label !== "Email" &&
                        <OutlinedInput type="email" error={backupEmailErr} helperText={backupEmailErr === "invalid_email"?"Invalid Email":""} onChange={e => {userContactOptionalEmail.current = e.value;}} placeholder={`Enter Email as backup`} globalStyle={css.inputGlobalStyle}/>
                    }
                </div>
            </div>
            <div className={css.contactItem}>
                <h3>Your Idea</h3>
                <div>
                    <Select data={selectMethodIdeas.current} onChange={(e)=>{userWorkService.current = e}} placeholder="Your Preferred Contact Method" globalStyle={css.inputGlobalStyle}/>
                    <OutlinedInput onChange={e=>{userWorkDet.current = e.value;}} error={errors[2]}  placeholder={`Short Description of your idea`} rows={3} globalStyle={css.inputGlobalStyle}/>
                    <Button disabled={errors[3]} onClick={checkForm}>Let{"'"}s Work!</Button>
                    <p className={css.helperText}>By Partnering, Walang libre teh so may bayad ito</p>
                </div>
            </div>
        </div>
    )
}

export default Contact