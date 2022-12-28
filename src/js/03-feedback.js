import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = form.querySelector('input');
const message = form.querySelector('textarea');

form.addEventListener('input', throttle(OnInput, 500));
form.addEventListener('submit', OnSubmit);

const LOCALSTORAGE_KEY = 'feedback-form-state';

const formData = {};

populateForm();

function OnInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function OnSubmit(evt) {
    evt.preventeDefault();

    const savedFormParams = localStorage.getItem(LOCALSTORAGE_KEY);
    const parsFormParams = JSON.parse(savedFormParams);
    console.log(parsFormParams);

    evt.target.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
}

function populateForm() {
    const savedFormParams = localStorage.getItem(LOCALSTORAGE_KEY);
    const parsFormParams = JSON.parse(savedFormParams);

    if(parsFormParams) {
        input.value = parsFormParams.email || "";
        message.value = parsFormParams.message || "";
    }
}