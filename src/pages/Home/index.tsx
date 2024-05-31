import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from '@phosphor-icons/react'
import { differenceInSeconds } from 'date-fns/differenceInSeconds'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import Countdown from './components/Countdown'
import NewCycleForm from './components/NewCycleForm'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Report the task.'),
  minuteAmount: zod
    .number()
    .min(1)
    .max(60, 'Number must be less than or equal to 60.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

export function Home() {
  // states
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minuteAmount: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const activeCycleTotalSeconds = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0
  const currentSeconds = activeCycle
    ? activeCycleTotalSeconds - amountSecondsPassed
    : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisable = !task

  // effects
  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const differenceSeconds = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (differenceSeconds >= activeCycleTotalSeconds) {
          setCycles((prevState) =>
            prevState.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          setAmountSecondsPassed(activeCycleTotalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(differenceSeconds)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, activeCycleTotalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  // functions
  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minuteAmount,
      startDate: new Date(),
    }
    setCycles((actualState) => [...actualState, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    setCycles((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
    document.title = 'Ignite Timer'
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisable}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
