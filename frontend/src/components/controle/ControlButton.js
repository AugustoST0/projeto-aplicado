import styles from './ControlButton.module.css'

function ControlButton({ variant, handleClick, text }) {
    return (
        <button className={styles[variant]} onClick={handleClick}>{text}</button>
    )
}

export default ControlButton;