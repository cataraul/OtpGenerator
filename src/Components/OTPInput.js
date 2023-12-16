import React, { useMemo } from "react";
import "./OTPInput.css";

const OTPInput = ({ value, valueLength, onChange }) => {
  const regex_number = new RegExp(/^\d+$/);

  const valueItems = useMemo(() => {
    const valuesArr = value.split("");
    const items = [];
    for (let i = 0; i < valueLength; i++) {
      const char = valuesArr[i];

      if (regex_number.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }
    return items;
  }, [value, valueLength]);

  const goToNextSibling = (target) => {
    const nextElementSibling = target.nextElementSibling;

    //check for next element and focus it
    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const goToPreviousSibling = (target) => {
    const previousElementSibling = target.previousElementSibling;
    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const onChangeHandler = (e, index) => {
    let targetValue = e.target.value.trim();

    if (!regex_number.test(targetValue) && targetValue !== "") {
      return;
    }

    targetValue = regex_number.test(targetValue) ? targetValue : " ";

    //if 1 is not pasting
    if (targetValue.length === 1) {
      const newValue =
        value.substring(0, index) + targetValue + value.substring(index + 1);

      onChange(newValue);

      if (!regex_number.test(targetValue)) {
        return;
      }

      goToNextSibling(e.target);

      //if the copied value is the same as the length of the otp you can paste it
    } else if (targetValue.length === valueLength) {
      onChange(targetValue);
      //if pasted remove focus and blur
      e.target.blur();
    }
  };

  //When pressing delete button go to previous input box
  const onKeyDownInput = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      return goToPreviousSibling(e.target);
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      return goToNextSibling(e.target);
    }

    //keep the selection range position if the same digit was typed
    e.target.setSelectionRange(0, e.target.value.length);

    if (e.target.value !== "" || e.key !== "Backspace") {
      return;
    }
    goToPreviousSibling(e.target);
  };

  const onFocusInput = (e) => {
    e.target.setSelectionRange(0, e.target.value.length);
  };

  return (
    <div className="otp-container">
      {valueItems.map((digit, index) => {
        return (
          <input
            type="text"
            key={index}
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{1}"
            maxLength={valueLength}
            className="otp-input"
            value={digit}
            onChange={(e) => onChangeHandler(e, index)}
            onKeyDown={onKeyDownInput}
            onFocus={onFocusInput}
          />
        );
      })}
    </div>
  );
};

export default OTPInput;
