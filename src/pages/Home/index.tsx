import { Play } from '@phosphor-icons/react'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

export function Index() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            list="task-suggestion"
            id="task"
            type="text"
            placeholder="Give your project a name here"
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
            max={60}
          />
          <span>minutes</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
