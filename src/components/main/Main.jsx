import {useState} from "react";
import s from './Main.module.scss'

export const Main = () => {

    const scheduleTo = [
        "18:00(из A в B)",
        "18:30(из A в B)",
        "18:45(из A в B)",
        "19:00(из A в B)",
        "19:15(из A в B)",
        "21:00(из A в B)"
    ]
    const scheduleFrom = [
        "18:30(из B в A)",
        "18:45(из B в A)",
        "19:00(из B в A)",
        "19:15(из B в A)",
        "19:35(из B в A)",
        "21:50(из B в A)",
        "21:55(из B в A)"
    ]


    const [error, setError] = useState(null)
    const [isOneWay, setIsOneWay] = useState(true)
    const [submit, setSubmit] = useState(false)
    const [to, setTo] = useState(scheduleTo[0])
    const [from, setFrom] = useState(scheduleFrom[0])

    const [trip, setTrip] = useState({
        direction: '',
        toTime: scheduleTo[0],
        backTime: scheduleFrom[0],
        ticketsAmount: ''
    })

    const onNumOfPaxChangeHandler = (value) => {
        const val = value.currentTarget.value
        if(val > 0) {
            setTrip({...trip, ticketsAmount: val})
            setError(null)
        }

    }


    const choseDirection = (value) => {
        const selected = value.target.value
        setTrip({...trip, backTime: '', ticketsAmount: '', toTime: ''})

        if (selected === 'Выбери направление') {
            setTrip({...trip, direction: '', toTime: '', backTime: '', ticketsAmount: ''})
            return
        }
        if (selected === 'из A в B и обратно в А') {
            setIsOneWay(false)
            setTrip({...trip, direction: selected, toTime: scheduleTo[0], backTime: scheduleFrom[0], ticketsAmount: ''})
        }
        if(selected === 'из A в B'){
            setIsOneWay(true)
            setTrip({...trip, direction: selected, toTime: scheduleTo[0], backTime: ''})
        }
        if(selected === 'из B в A'){
            setIsOneWay(true)
            setTrip({...trip, direction: selected, toTime: '', backTime: scheduleFrom[0]})
        }

    }


    const tripBack = (value) => {
        const selected = value.target.value
        setFrom(selected)
        if (from === '') {
            setTrip({...trip, backTime: ''})
            setError("Выберите время отправления")
            return
        }
        setTrip({...trip, backTime: from})
        setError(null)
    }


    const tripTo = (value) => {
        const selected = value.target.value
        setTo(selected)
        if (selected === '') {
            setTrip({...trip, toTime: ''})
            setError("Выберите время отправления")
            return
        }
        setTrip({...trip, toTime: to})
        setError(null)
    }

    const onSubmit = () => {
        if (error) {
            return;
        }
        if(trip.ticketsAmount <= 0) {
            setError('Укажите количество билетов')
            return;
        }
            setSubmit(true)
            setError(null)
        console.log(trip)

    }


    const back = () => {
        setSubmit(false)
        setTrip({...trip, backTime: '', toTime: '', ticketsAmount: '', direction: ''})
    }

    return (
        <div>
            {!submit &&
                <div className={s.container}>
                    <div className={s.error}>{error}</div>
                    <div className={s.directionBlock}>
                        <select className={s.select} onChange={choseDirection}>
                            <option value='Выбери направление'>Выбери направление</option>
                            <option value="из A в B">из A в B</option>
                            <option value="из B в A">из B в A</option>
                            <option value="из A в B и обратно в А">из A в B и обратно в А</option>
                        </select>
                    </div>

                    {trip.direction &&
                        <div className={s.innerContainer}>
                            <div className={s.label}>
                                <label>Когда?</label>
                                <hr className={s.hr}/>
                            </div>
                            <div className={s.pickATimeBlock}>
                                <div>
                                    {trip.direction !== 'из B в A' &&
                                        <select value={to} className={s.select} onChange={tripTo}>
                                            {scheduleTo.map((el, idx) => {
                                                return (
                                                    <option key={idx} value={el}>{el}</option>
                                                )
                                            })}
                                        </select>
                                    }
                                </div>
                                <div>
                                    {trip.direction !== 'из A в B' &&
                                        <select value={from} className={s.select} onChange={tripBack}>
                                            {scheduleFrom.map((el, idx) => {
                                                return (
                                                    <option key={idx} value={el}>{el}</option>
                                                )

                                            })}
                                        </select>
                                    }
                                </div>
                            </div>
                            <div className={s.inpAndSubmitBlock}>
                                <label className={s.label}>Сколько вас?</label>
                                <input className={s.input}
                                       onChange={onNumOfPaxChangeHandler}
                                       value={trip.ticketsAmount}
                                       placeholder={'Количество мест'}
                                       inputMode={"numeric"}
                                       type={"number"}
                                />
                                <hr className={s.hr}/>

                                <span className={s.submit} onClick={onSubmit}>Рассчитать</span>
                            </div>
                        </div>}
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




