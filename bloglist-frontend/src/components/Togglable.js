import React, {useState, useImperativeHandle} from 'react'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, SETvisible] = useState(false)

    const hide = {display: visible ? 'none' : ''}
    const show = {display: visible ? '' : 'none'}

    const toggle = () => {
        SETvisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggle
        }
    })

    return (
    <div>
        <div style={hide} >
            <button onClick={toggle}>{props.buttonLabel}</button>
        </div>
        <div style={show}>
            {props.children}
            <button onClick={toggle}>cancel</button>
        </div>
    </div>
    )  
})

export default Togglable