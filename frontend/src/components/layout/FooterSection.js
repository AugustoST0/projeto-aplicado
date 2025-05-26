import styles from './FooterSection.module.css';

function FooterSection({ title, p1, p2 }) {
    return (
        <div className={styles.footer_section}>
            <h3>{title}</h3>
            {p1 && <p>{p1}</p>}
            {p2 && <p>{p2}</p>}
        </div>
    )
}

export default FooterSection;