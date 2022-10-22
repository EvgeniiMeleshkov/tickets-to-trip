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
    //
    // const localizeScheduleTo = scheduleTo.map(el => el.toTimeString())
    // const localizeScheduleFrom = scheduleFrom.map(el => el.toTimeString())

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
        const date = new Date(selected)
        setFrom(date)
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
        const date = new Date(selected)
        setTo(date)
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
                    <div className={s.errorBlock}>
                        <div className={s.error}>{error}</div>
                    </div>
                    <div >
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
                                        <select value={to.toString()} className={s.select} onChange={tripTo}>
                                            {scheduleTo.map((el, idx) => {
                                                return (
                                                    <option key={idx} value={el.toString()}>{el.toLocaleTimeString()} (из
                                                        A в B)</option>
                                                )
                                            })}
                                        </select>
                                    }
                                </div>
                                <div>
                                    {trip.direction !== 'из A в B' &&
                                        <select value={from.toString()} className={s.select} onChange={tripBack}>
                                            {scheduleFrom.map((el, idx) => {
                                                return (
                                                    <option key={idx} value={el.toString()}>{el.toLocaleTimeString()} (из
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
                        <span className={s.submit} onClick={back}>Назад</span>
                    </div>
                    <div className={s.info}>
                        <div className={s.infoRow}>
                            <p>Количество билетов: (<b>{trip.ticketsAmount}</b>).</p>
                        </div>
                        <div className={s.infoRow}>
                            <p>По маршруту: <b>{trip.direction}</b></p>
                        </div>
                        <div className={s.infoRow}>
                            <p>Cтоимостью: <b>{1000 * trip.ticketsAmount}р.</b></p>
                        </div>
                        <div className={s.infoRow}>
                            <p>Это путешествие займет у вас <b>45</b> минут.</p>
                        </div>
                        <div className={s.infoRow}>


                            <p>Отправление: <b>{
                                    trip.direction === 'из B в A' ?
                                        trip.backTime.toLocaleDateString() : trip.toTime.toLocaleDateString()
                            }</b>
                                в <b>{
                                    trip.direction === 'из B в A' ?
                                    trip.backTime.toLocaleTimeString() : trip.toTime.toLocaleTimeString()
                                }</b>,</p>

                        </div>
                        <div className={s.infoRow}>
                            <p>Прибытие: <b>{
                                trip.direction === 'из B в A' ?
                                addHours(1, trip.backTime).toLocaleDateString() :
                                    addHours(1, trip.toTime).toLocaleDateString()
                            }</b>
                                в <b>{
                                    trip.direction === 'из B в A' ?
                                    addHours(1, trip.backTime).toLocaleTimeString() :
                                        addHours(1, trip.toTime).toLocaleTimeString()
                                }</b>.</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};




