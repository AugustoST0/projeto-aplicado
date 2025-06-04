import styles from './DatePicker.module.css';

function DatePicker({ selectedDate, setSelectedDate, hour, setHour, minute, setMinute }) {

    const today = new Date();
    const daysAhead = 30;

    const generateDateOptions = () => {
        const options = [];
        for (let i = 0; i <= daysAhead; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);

            const value = date.toISOString().slice(0, 10);
            const label = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });

            options.push({ value, label });
        }
        return options;
    };

    const dateOptions = generateDateOptions();

    return (
        <div className={styles.date_picker}>
            <label className="form-label">Selecione a data de entrega</label>
            <select
                className="form-select"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
            >
                <option value="">Selecione...</option>
                {dateOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <div className="d-flex align-items-center gap-2 mt-3">
                <div>
                    <label className="form-label">Selecione o horário de entrega</label>
                    <div className="d-flex gap-2">
                        <input
                            type="number"
                            className="form-control"
                            style={{ width: '80px' }}
                            min={8}
                            max={20}
                            value={hour}
                            onChange={(e) => {
                                let value = parseInt(e.target.value);
                                if (value < 8) value = 8;
                                if (value > 20) value = 20;
                                setHour(value);
                            }}
                        />
                        <span className="fs-4">:</span>
                        <input
                            type="number"
                            className="form-control"
                            style={{ width: '80px' }}
                            min={0}
                            max={55}
                            step={5}
                            value={minute}
                            onChange={(e) => {
                                let value = parseInt(e.target.value);
                                if (value < 0) value = 0;
                                if (value > 55) value = 55;
                                setMinute(Math.round(value / 5) * 5);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DatePicker;