import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormContainer, MinutesAmountInput, TaskInput } from './styles';
import { CyclesContext } from '../../../../contexts/CyclesContext';

function NewCycleForm() {
  // context
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">I will work on</label>
      <TaskInput
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        type="number"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register('minuteAmount', { valueAsNumber: true })}
      />
      <span>minutes</span>
    </FormContainer>
  );
}

export default NewCycleForm;
