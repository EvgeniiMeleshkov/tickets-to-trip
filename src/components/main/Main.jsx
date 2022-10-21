import {useState} from "react";

export const Main = () => {

    const [error, setError] = useState(null)
    const [isOneWay, setIsOneWay] = useState(true)
    const [submit, setSubmit] = useState(false)

    const [trip, setTrip] = useState({
        direction: null,
        toTime: null,
        backTime: null,
        ticketsAmount: 0
    })

    const onNumOfPaxChangeHandler = (value) => {
        const val = value.currentTarget.value

        setTrip({...trip, ticketsAmount: val})
    }


    const choseDirection = (value) => {
        const selected = value.target.value
        if (selected === 'Выбери направление') {
            setTrip({...trip, direction: null, time: null, backTime: null, ticketsAmount: 0})
            return
        }
        if (selected === 'из A в B и обратно в А') {
            setIsOneWay(false)
            setTrip({...trip, direction: selected})
        }
        setIsOneWay(true)
        setTrip({...trip, direction: selected})
    }


    const tripBack = (value) => {
        const selected = value.target.value
        if (selected === 'отправления') return
        setTrip({...trip, backTime: selected})
    }


    const tripTo = (value) => {
        const selected = value.target.value
        if (selected === 'отправления') return
        setTrip({...trip, toTime: selected})
    }

    const onSubmit = () => {
        if (trip.direction === 'из A в B и обратно в А') {
            if (trip.ticketsAmount <= 0) {
                setError('Количество мест не может быть меньше нуля')
            }
            if (trip.toTime === null) {
                setError('Выберите время отправления')
            }
            if (trip.backTime === null) {
                setError('Выберите время обратного отправления')
            }
            if (trip.ticketsAmount > 0 && trip.toTime !== null && trip.backTime !== null) {
                setSubmit(true)
                setError(null)
            }
        } else {
            if (trip.ticketsAmount <= 0) {
                setError('Количество мест не может быть меньше нуля')
            }
            if (trip.toTime === null) {
                setError('Выберите время отправления')
            }
            if (trip.ticketsAmount > 0 && trip.toTime !== null) {
                setSubmit(true)
                setError(null)
            }
        }

    }

    const back = () => {
        setSubmit(false)
        setTrip({...trip, backTime: null, toTime: null, ticketsAmount: 0, direction: null})
    }

    return (
        <div>
            {!submit && <div>
                <div>{error}</div>
                <div>
                    <select onChange={choseDirection}>
                        <option value='Выбери направление'>Выбери направление</option>
                        <option value="из A в B">из A в B</option>
                        <option value="из B в A">из B в A</option>
                        <option value="из A в B и обратно в А">из A в B и обратно в А</option>
                    </select>
                </div>

                {trip.direction &&
                    <div>
                        <label>Выберите время</label>
                        {trip.direction !== 'из B в A' &&
                            <select onChange={tripTo}>
                                <option value="отправления">отправления</option>
                                <option value="18:00(из A в B)">18:00(из A в B)</option>
                                <option value="18:30(из A в B)">18:30(из A в B)</option>
                                <option value="18:45(из A в B)">18:45(из A в B)</option>
                                <option value="19:00(из A в B)">19:00(из A в B)</option>
                                <option value="19:15(из A в B)">19:15(из A в B)</option>
                                <option value="21:00(из A в B)">21:00(из A в B)</option>
                            </select>
                        }
                        {trip.direction !== 'из A в B' &&
                            <select onChange={tripBack}>
                                <option value="отправления">отправления</option>
                                <option value="18:30(из B в A)">18:30(из B в A)</option>
                                <option value="18:45(из B в A)">18:45(из B в A)</option>
                                <option value="19:00(из B в A)">19:00(из B в A)</option>
                                <option value="19:15(из B в A)">19:15(из B в A)</option>
                                <option value="19:35(из B в A)">19:35(из B в A)</option>
                                <option value="21:50(из B в A)">21:50(из B в A)</option>
                                <option value="21:55(из B в A)">21:55(из B в A)</option>
                            </select>
                        }
                        <input
                            onChange={onNumOfPaxChangeHandler}
                            value={trip.ticketsAmount}
                            placeholder={'Количество мест'}
                            inputMode={"numeric"}
                            type={"number"}
                        />
                        <button onClick={onSubmit}>Рассчитать</button>
                        <h2></h2>
                    </div>
                }
            </div>}
            {submit &&
                <div>
                    <div>
                        <button onClick={back}>Назад</button>
                    </div>
                    <div>
                        <p>Вы выбрали <b>{trip.ticketsAmount}</b> билета по маршруту</p>
                        <p><b>{trip.direction}</b> стоимостью 4000р.</p>
                        <p>Это путешествие займет у вас 40 минут.</p>
                        <p>Теплоход отправляется в 12-00,</p>
                        <p>а прибудет в 18-00.</p>
                    </div>
                </div>
            }
        </div>
    );
};




