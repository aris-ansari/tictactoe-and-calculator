import { ACTIONS } from "./Calculator";

function OperationButton({ dispatch, operation }) {
  return (
    <button
      className="text-2xl h-16 w-24 bg-slate-900 hover:bg-slate-800"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}

export default OperationButton;
