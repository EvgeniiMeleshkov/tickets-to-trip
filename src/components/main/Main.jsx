import {useEffect, useState} from "react";
import s from './Main.module.scss'

export const Main = () => {


    function addHours(numOfH, date = new Date()) {
        const newDate = new Date(date.getTime() + numOfH * 60 * 60 * 1000)

        return newDate;
    }


    const scheduleTo = [
        new Date('7/4/2013 18:00:00 UTC'),
        new Date('7/4/2013 18:30:00 UTC'),
        new Date('7/4/2013 18:45:00 UTC'),
        new Date('7/4/2013 19:00:00 UTC'),
        new Date('7/4/2013 19:15:00 UTC'),
        new Date('7/4/2013 21:00:00 UTC')
    ]
    const scheduleFrom = [
        new Date('7/4/2013 18:30:00 UTC'),
        new Date('7/4/2013 18:45:00 UTC'),
        new Date('7/4/2013 19:00:00 UTC'),
        new Date('7/4/2013 19:15:00 UTC'),
        new Date('7/4/2013 19:35:00 UTC'),
        new Date('7/4/2013 21:50:00 UTC'),
        new Date('7/4/2013 21:55:00 UTC'),
    ]

    let date = new Date('7/4/2013 4:52:48 UTC');
    console.log(((addHours(1, date)) - date.getTime()))

    console.log(addHours(1, date).toTimeString())
    console.log(date.toTimeString())

    const [error, setError] = useState(null)
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
        if (val > 0) {
            setTrip({...trip, ticketsAmount: val})
            setError(null)
        }

    }


    const choseDirection = (value) => {
        const selected = value.target.value
        setTrip({...trip, backTime: null, ticketsAmount: '', toTime: null})

        if (selected === 'Выбери направление') {
            setTrip({...trip, direction: '', toTime: null, backTime: null, ticketsAmount: ''})
            return
        }
        if (selected === 'из A в B и обратно в А') {
            setTrip({
                ...trip,
                direction: selected,
                toTime: scheduleTo[0],
                backTime: scheduleFrom[0],
                ticketsAmount: ''
            })
        }
        if (selected === 'из A в B') {
            setTrip({
                ...trip,
                direction: selected,
                toTime: scheduleTo[0],
                backTime: null
            })
        }
        if (selected === 'из B в A') {
            setTrip({
                ...trip,
                direction: selected,
                toTime: null,
                backTime: scheduleFrom[0]
            })
        }

    }


    const tripBack = (value) => {
        const selected = value.target.value
        setFrom(selected)
        if (from === null) {
            setTrip({...trip, backTime: null})
            setError("Выберите время отправления")
            return
        }
        setTrip({...trip, backTime: from})
        setError(null)
    }


    const tripTo = (value) => {
        const selected = value.target.value
        setTo(selected)
        if (to === null) {
            setTrip({...trip, toTime: null})
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
        if (trip.ticketsAmount <= 0) {
            setError('Укажите количество билетов')
            return;
        }
        setSubmit(true)
        setError(null)

        //Logic to interpolate result:
        console.log({...trip})

    }


    const back = () => {
        setSubmit(false)
        setTrip({...trip, backTime: null, toTime: null, ticketsAmount: '', direction: ''})
    }

    useEffect(() => {
        if(trip.direction === 'из A в B и обратно в А') {
            const toTime = new Date(to).getTime()
            const fromTime = new Date(from).getTime()
            const res = fromTime - toTime
            console.log(res)
            if (res <= 3600000) {
                setError('Вы не успеете на обратный рейс')
            }
        }
    }, [trip.direction, to, from])

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
                                        <select value={to.toTimeString()} className={s.select} onChange={tripTo}>
                                            {scheduleTo.map((el, idx) => {
                                                return (
                                                    <option key={idx} value={el.toTimeString()}>{el.toTimeString()} (из
                                                        A в B)</option>
                                                )
                                            })}
                                        </select>
                                    }
                                </div>
                                <div>
                                    {trip.direction !== 'из A в B' &&
                                        <select value={from.toTimeString()} className={s.select} onChange={tripBack}>
                                            {scheduleFrom.map((el, idx) => {
                                                return (
                                                    <option key={idx} value={el.toTimeString()}>{el.toTimeString()} (из
                                                        B в A)</option>
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




