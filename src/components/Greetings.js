import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGreetings } from '../redux/greetings/greetings';

export default function Greetings() {
  const dispatch = useDispatch();

  const getGreetings = () => {
    dispatch(fetchGreetings());
  };
  const dataArray = useSelector((state) => state.greetings);

  const greetings = dataArray.map((greeting) => (
    <li key={greeting.id}>{greeting.name}</li>
  ));

  return (
    <div>
      <h2>This app displays Hello World in different languages</h2>

      <p>Click the button below to test it</p>

      <br />

      <button type="button" onClick={getGreetings}>Get Greetings</button>
      <br />
      <ul>{greetings}</ul>
    </div>
  );
}
