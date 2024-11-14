function enableValidation(setOfClasses) {
  const formList = Array.from(
    document.querySelectorAll(setOfClasses.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, setOfClasses);
  });
}

function setEventListeners(formElement, setOfClasses) {
  const inputList = Array.from(
    formElement.querySelectorAll(setOfClasses.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    setOfClasses.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, setOfClasses);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      toggleButtonState(inputList, buttonElement, setOfClasses);
      checkInputValidity(formElement, inputElement, setOfClasses);
    });
  });
}

function toggleButtonState(inputList, buttonElement, setOfClasses) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(setOfClasses.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(setOfClasses.inactiveButtonClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function checkInputValidity(formElement, inputElement, setOfClasses) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      setOfClasses,
      inputElement.validationMessage
    );
  } else {
    hideInputError(formElement, inputElement, setOfClasses);
  }
}

function showInputError(formElement, inputElement, setOfClasses, errorMessage) {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add(setOfClasses.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setOfClasses.errorClass);
}

function hideInputError(formElement, inputElement, setOfClasses) {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove(setOfClasses.inputErrorClass);
  errorElement.classList.remove(setOfClasses.errorClass);
  errorElement.textContent = "";
}

function clearValidation(profileForm, validationConfig) {
  console.log('!!!');
}

export { enableValidation, clearValidation };
