import { useReducer } from "react";

const backgroundStyle = {
  background: "#c31432",
  background: "-webkit-linear-gradient(to bottom, #240b36, #c31432)",
  background: "linear-gradient(to bottom, #240b36, #c31432)",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.75)",
};

const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
  CLEAR: "clear",
};

function reducer(state, { type, payload }) {
  console.log(state.currentOperand);
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state;

      if (payload.digit === ".") {
        if (
          state.currentOperand != null &&
          state.currentOperand.includes(".")
        ) {
          return state;
        }
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null)
        return state;

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      )
        return state;

      return {
        ...state,
        operation: null,
        previousOperand: null,
        currentOperand: evaluate(state),
        overwrite: true,
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: null,
          overwrite: false,
        };
      }
      if (state.currentOperand == null) return state;

      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.CLEAR:
      return {};
  }
}

function evaluate({ previousOperand, currentOperand, operation }) {
  let prev = parseFloat(previousOperand);
  let current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

const INTEGAR_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integar, decimal] = operand.split(".");
  if (decimal == null) return INTEGAR_FORMATTER.format(integar);
  return `${INTEGAR_FORMATTER.format(integar)}.${decimal}`;
}

function Calculator() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="w-full h-screen bg-[#240b36] flex justify-center items-center">
      <div className="w-[320px] h-[420px] rounded-lg" style={backgroundStyle}>
        <div className="rounded-t-lg p-2">
          <div className="text-right px-4 text-white font-light text-md opacity-75">
            {formatOperand(previousOperand || "0")} {operation}
          </div>
          <div className="text-right px-4 text-white font-light text-2xl">
            {formatOperand(currentOperand || "0")}
          </div>
        </div>
        <div className="grid grid-cols-4 px-2">
          <button
            className="h-full w-[150px] text-2xl text-white font-light my-4"
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            AC
          </button>
          <button></button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4"
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          >
            DEL
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4"
            onClick={() =>
              dispatch({
                type: ACTIONS.CHOOSE_OPERATION,
                payload: { operation: "÷" },
              })
            }
          >
            ÷
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4 bg-white bg-opacity-20 rounded-md scale-90"
            onClick={() =>
              dispatch({
                type: ACTIONS.ADD_DIGIT,
                payload: { digit: "7" },
              })
            }
          >
            7
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4 bg-white bg-opacity-20 rounded-md scale-90"
            onClick={() =>
              dispatch({
                type: ACTIONS.ADD_DIGIT,
                payload: { digit: "8" },
              })
            }
          >
            8
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4 bg-white bg-opacity-20 rounded-md scale-90"
            onClick={() =>
              dispatch({
                type: ACTIONS.ADD_DIGIT,
                payload: { digit: "9" },
              })
            }
          >
            9
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4"
            onClick={() =>
              dispatch({
                type: ACTIONS.CHOOSE_OPERATION,
                payload: { operation: "x" },
              })
            }
          >
            x
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4 bg-white bg-opacity-20 rounded-md scale-90"
            onClick={() =>
              dispatch({
                type: ACTIONS.ADD_DIGIT,
                payload: { digit: "4" },
              })
            }
          >
            4
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4 bg-white bg-opacity-20 rounded-md scale-90"
            onClick={() =>
              dispatch({
                type: ACTIONS.ADD_DIGIT,
                payload: { digit: "5" },
              })
            }
          >
            5
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4 bg-white bg-opacity-20 rounded-md scale-90"
            onClick={() =>
              dispatch({
                type: ACTIONS.ADD_DIGIT,
                payload: { digit: "6" },
              })
            }
          >
            6
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4"
            onClick={() =>
              dispatch({
                type: ACTIONS.CHOOSE_OPERATION,
                payload: { operation: "-" },
              })
            }
          >
            -
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4 bg-white bg-opacity-20 rounded-md scale-90"
            onClick={() =>
              dispatch({
                type: ACTIONS.ADD_DIGIT,
                payload: { digit: "1" },
              })
            }
          >
            1
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4 bg-white bg-opacity-20 rounded-md scale-90"
            onClick={() =>
              dispatch({
                type: ACTIONS.ADD_DIGIT,
                payload: { digit: "2" },
              })
            }
          >
            2
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4 bg-white bg-opacity-20 rounded-md scale-90"
            onClick={() =>
              dispatch({
                type: ACTIONS.ADD_DIGIT,
                payload: { digit: "3" },
              })
            }
          >
            3
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4"
            onClick={() =>
              dispatch({
                type: ACTIONS.CHOOSE_OPERATION,
                payload: { operation: "+" },
              })
            }
          >
            +
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4 bg-white bg-opacity-20 rounded-md scale-90"
            onClick={() =>
              dispatch({
                type: ACTIONS.ADD_DIGIT,
                payload: { digit: "0" },
              })
            }
          >
            0
          </button>
          <button
            className="h-full w-full text-2xl text-white font-light my-4 bg-white bg-opacity-20 rounded-md scale-90"
            onClick={() =>
              dispatch({
                type: ACTIONS.ADD_DIGIT,
                payload: { digit: "." },
              })
            }
          >
            .
          </button>
          <button
            className="h-full w-[150px] text-2xl text-white font-light my-4"
            onClick={() =>
              dispatch({
                type: ACTIONS.EVALUATE,
              })
            }
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
export default Calculator;
