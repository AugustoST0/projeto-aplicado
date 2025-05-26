import styles from './Input.module.css';

function Input({ type, placeholder, sideImg, setMethod }) {
    return (
        <div className={styles.input_container}>
            {sideImg}
            <input type={type} placeholder={placeholder} onChange={(e) => setMethod && setMethod(e.target.value)} required />
        </div>
    )
}

export default Input;