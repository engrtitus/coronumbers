import React from "react";
import "./App.scss";

const getRandomColor = () => {
  let rgb = "#43BA2A";
  return rgb;
};

const phoneNumbers = [
  { number: "080097000010", iconColor: getRandomColor() },
  { number: "08000267662", iconColor: getRandomColor() },
  { number: "08023169485", iconColor: getRandomColor() },
  { number: "08033565529", iconColor: getRandomColor() },
  { number: "08052817243", iconColor: getRandomColor() }
];

function App() {
  const dialNumber = (e, phoneNumber) => {
    e.preventDefault();
    window.location.href = `tel:${phoneNumber}`;
  };
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
        </div>
      </div>
      <div className="app__body">
        {phoneNumbers.map((phoneNumber, i) => (
          <a
            className="card mb-20 flex flex__aligncenter"
            key={phoneNumber.number}
            href={`tel:${phoneNumber.number}`}
            onClick={e => dialNumber(e, phoneNumber.number)}
          >
            <span className="phone__icon flex">
              <PhoneIcon height={20} width={20} color={phoneNumber.iconColor} />
            </span>
            <span className="phone__number flex">{phoneNumber.number}</span>
          </a>
        ))}
      </div>
      <div className="app__button">
        <button onClick={e => dialNumber(e, "080097000010")}>
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

export default App;
