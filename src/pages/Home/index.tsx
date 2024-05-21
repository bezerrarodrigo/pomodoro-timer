import { zodResolver } from '@hookform/resolvers/zod'
import { Play } from '@phosphor-icons/react'
import { differenceInSeconds } from 'date-fns/differenceInSeconds'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Report the task.'),
  minuteAmount: zod
    .number()
    .min(5)
    .max(60, 'Number must be less than or equal to 60.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
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

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minuteAmount,
      startDate: new Date(),
    }

    setCycles((actualState) => [...actualState, newCycle])
    setActiveCycleId(newCycle.id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    if (activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }
  }, [activeCycle])

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

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            list="task-suggestion"
            id="task"
            type="text"
            placeholder="Give your project a name here"
            {...register('task')}
          />

          <datalist id="task-suggestion">
            <option value="Project 01" />
            <option value="Project 02" />
            <option value="Project 03" />
          </datalist>

          <label htmlFor="minuteAmount">for</label>
          <MinutesAmountInput
            type="number"
            placeholder="00"
            step={5}
            min={5}
            // max={60}
            {...register('minuteAmount', { valueAsNumber: true })}
          />
          <span>minutes</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisable}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
