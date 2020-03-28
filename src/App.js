import React, { useState } from "react";
import "./App.scss";
import Modal from "./Modal";
import { phoneNumbers } from "./phone_numbers";

function App() {
  const dialNumber = (e, phoneNumber) => {
    e.preventDefault();
    window.location.href = `tel:${phoneNumber}`;
  };
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectingState, setSelectingState] = useState(false);
  const activeState = phoneNumbers.find(
    number => number.state === selectedState
  );
  return (
    <div className="app">
      <div className="app__header">
        <div>
          <div className="app__header__title">Coronumbers</div>
          <div className="app__header__subtitle">
            A list of corona virus emergency numbers
          </div>
          {!navigator.share && (
            <button className="app__header__icon" onClick={() => shareApp()}>
              <ShareIcon height={20} color={"#fff"} />
            </button>
          )}
          {activeState && (
            <button
              className="app__header__country"
              onClick={() => setSelectingState(true)}
            >
              <div className="app__header__country__flag"></div>
              <div className="app__header__country__name">
                {activeState.state}
              </div>
              <div className="app__header__country__arrow">
                <DownArrowIcon height={11} color={"#1976d2"} />
              </div>
            </button>
          )}
        </div>
      </div>
      <div className="app__body">
        {phoneNumbers
          .filter(phoneNumber => phoneNumber.state === selectedState)
          .map((phoneNumber, i) => (
            <a
              className="card mb-20 flex flex__aligncenter"
              key={phoneNumber.number}
              href={`tel:${phoneNumber.number}`}
              onClick={e => dialNumber(e, phoneNumber.number)}
            >
              <span className="phone__icon flex">
                <PhoneIcon height={20} width={20} color={"#43BA2A"} />
              </span>
              <span className="phone__number flex">{phoneNumber.number}</span>
            </a>
          ))}
      </div>
      <div className="app__button">
        <button
          onClick={e =>
            dialNumber(
              e,
              phoneNumbers.find(
                phoneNumber => phoneNumber.state === selectedState
              ).number
            )
          }
        >
          <PhoneIcon height={25} width={25} color={"#ffffff"} />
        </button>
      </div>
      <div className="app__footer">
        Built with{" "}
        <span role="img" aria-label={"heart"}>
          ❤️
        </span>{" "}
        by{" "}
        <a
          href="https://twitter.com/engrtitus"
          target="_blank"
          rel="noopener noreferrer"
        >
          Titus
        </a>
      </div>
      {selectingState && (
        <Modal close={() => setSelectingState(false)}>
          <div className="app__select">
            {removeStateDuplicates(phoneNumbers, "state").map((number, i) => (
              <div
                className="app__select__option flex flex__aligncenter flex__justifycenter"
                key={i}
                onClick={() => {
                  setSelectedState(number.state);
                }}
              >
                <div className="app__select__option__name">{number.state}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

const PhoneIcon = props => {
  return (
    <svg viewBox="0 0 512 512" {...props}>
      <path
        fill={props.color}
        d="M436.992 74.953c-99.989-99.959-262.08-99.935-362.039.055s-99.935 262.08.055 362.039 262.08 99.935 362.039-.055a256 256 0 00-.055-362.039zm-49.289 281.652l-.034.034v-.085l-12.971 12.885a68.267 68.267 0 01-64.427 18.432 226.834 226.834 0 01-65.877-29.525 304.371 304.371 0 01-51.968-41.899 306.71 306.71 0 01-38.827-47.104 238.907 238.907 0 01-29.184-59.051 68.265 68.265 0 0117.067-69.717l15.189-15.189c4.223-4.242 11.085-4.257 15.326-.034l.034.034 47.957 47.957c4.242 4.223 4.257 11.085.034 15.326l-.034.034-28.16 28.16c-8.08 7.992-9.096 20.692-2.389 29.867a329.334 329.334 0 0033.707 39.339 327.314 327.314 0 0044.373 37.291c9.167 6.394 21.595 5.316 29.525-2.56l27.221-27.648c4.223-4.242 11.085-4.257 15.326-.034l.034.034 48.043 48.128c4.243 4.222 4.258 11.083.035 15.325z"
      />
    </svg>
  );
};

const ShareIcon = props => {
  return (
    <svg viewBox="-21 0 512 512" {...props}>
      <path
        fill={props.color}
        d="M389.332 160c-44.094 0-80-35.883-80-80s35.906-80 80-80c44.098 0 80 35.883 80 80s-35.902 80-80 80zm0-128c-26.453 0-48 21.523-48 48s21.547 48 48 48 48-21.523 48-48-21.547-48-48-48zm0 0M389.332 512c-44.094 0-80-35.883-80-80s35.906-80 80-80c44.098 0 80 35.883 80 80s-35.902 80-80 80zm0-128c-26.453 0-48 21.523-48 48s21.547 48 48 48 48-21.523 48-48-21.547-48-48-48zm0 0M80 336c-44.098 0-80-35.883-80-80s35.902-80 80-80 80 35.883 80 80-35.902 80-80 80zm0-128c-26.453 0-48 21.523-48 48s21.547 48 48 48 48-21.523 48-48-21.547-48-48-48zm0 0"
      />
      <path
        fill={props.color}
        d="M135.703 240.426c-5.57 0-10.988-2.903-13.91-8.063-4.375-7.68-1.707-17.453 5.973-21.824L325.719 97.684c7.656-4.414 17.449-1.727 21.8 5.976 4.376 7.68 1.708 17.45-5.972 21.824L143.594 238.336a16.03 16.03 0 01-7.89 2.09zm0 0M333.633 416.426c-2.688 0-5.399-.684-7.895-2.11L127.785 301.461c-7.68-4.371-10.344-14.145-5.972-21.824 4.351-7.7 14.125-10.367 21.804-5.973l197.95 112.852c7.68 4.375 10.347 14.144 5.976 21.824-2.945 5.183-8.363 8.086-13.91 8.086zm0 0"
      />
    </svg>
  );
};

const DownArrowIcon = props => {
  return (
    <svg viewBox="0 0 512 512" {...props}>
      <path
        fill={props.color}
        d="M506.157 132.386c-7.803-7.819-20.465-7.831-28.285-.029l-207.73 207.299c-7.799 7.798-20.486 7.797-28.299-.015L34.128 132.357c-7.819-7.803-20.481-7.79-28.285.029-7.802 7.819-7.789 20.482.029 28.284l207.701 207.27c11.701 11.699 27.066 17.547 42.433 17.547 15.358 0 30.719-5.846 42.405-17.533L506.128 160.67c7.818-7.802 7.831-20.465.029-28.284z"
      />
    </svg>
  );
};

const shareApp = () => {
  navigator
    .share({
      title: "Be safe",
      text: "Check out this emergency corona virus lines",
      url: window.location.href
    })
    .then(() => console.log("Successful share"))
    .catch(error => console.log("Error sharing", error));
};

const removeStateDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

export default App;
