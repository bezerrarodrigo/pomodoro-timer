import { differenceInSeconds } from 'date-fns';
import { useContext, useEffect } from 'react';

import { CountdownContainer, Separator } from './styles';
import { CyclesContext } from '../../../../contexts/CyclesContext';

function Countdown() {
  // context
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext);

  // states
  const activeCycleTotalSeconds = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0;

  const currentSeconds = activeCycle
    ? activeCycleTotalSeconds - amountSecondsPassed
    : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const differenceSeconds = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        );

        if (differenceSeconds >= activeCycleTotalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(activeCycleTotalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(differenceSeconds);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    activeCycleId,
    activeCycleTotalSeconds,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}

export default Countdown;
