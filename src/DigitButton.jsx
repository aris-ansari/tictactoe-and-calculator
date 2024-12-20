import { ACTIONS } from "./Calculator";

function DigitButton({ dispatch, digit }) {
  return (
    <button
      className="text-2xl h-16 w-24 bg-slate-900 hover:bg-slate-800"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

export default DigitButton;
