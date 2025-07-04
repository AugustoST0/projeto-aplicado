import { Form, InputGroup, Row, Col } from 'react-bootstrap';
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
            <Form.Group className="mb-3" controlId="selectDate">
                <Form.Label>Selecione a data de entrega</Form.Label>
                <Form.Select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                >
                    <option value="">Selecione...</option>
                    {dateOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="selectTime" className="mt-3">
                <Form.Label>Selecione o horário de entrega</Form.Label>
                <InputGroup style={{ maxWidth: '180px' }}>
                    <Form.Control
                        type="number"
                        min={8}
                        max={20}
                        value={hour}
                        onChange={(e) => {
                            let value = parseInt(e.target.value);
                            if (isNaN(value)) value = 8;
                            if (value < 8) value = 8;
                            if (value > 20) value = 20;
                            setHour(value);
                        }}
                    />
                    <InputGroup.Text>:</InputGroup.Text>
                    <Form.Control
                        type="number"
                        min={0}
                        max={55}
                        step={5}
                        value={minute}
                        onChange={(e) => {
                            let value = parseInt(e.target.value);
                            if (isNaN(value)) value = 0;
                            if (value < 0) value = 0;
                            if (value > 55) value = 55;
                            setMinute(Math.round(value / 5) * 5);
                        }}
                    />
                </InputGroup>
            </Form.Group>
        </div>
    )
}

export default DatePicker;
