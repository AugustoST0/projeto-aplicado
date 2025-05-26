import styles from './Button.module.css';

function Button({ value, type, handleClick }) {
    return (
        <div className={styles.button_container}>
            <button type={type} onClick={handleClick}>{value}</button>
        </div>
    )
}

export default Button;