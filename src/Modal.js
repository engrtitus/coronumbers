import React from "react";
import { Spring } from "react-spring/renderprops";
import "./modal.scss";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalContent = React.createRef();
    this.state = {
      animateFrom: "translateY(100px)",
      animateTo: "translateY(0px)",
      showContent: true
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.captureClick, false);
    document.addEventListener("keydown", this.captureEscape, false);
    document.querySelector("body").style.overflowY = "hidden";
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.captureClick, false);
    document.removeEventListener("keydown", this.captureEscape, false);
    document.querySelector("body").style.overflowY = "auto";
  }

  captureEscape = e => {
    if (e.keyCode === 27) {
      this.close();
    }
  };

  captureClick = e => {
    if (this.modalContent.current) {
      if (this.modalContent.current.contains(e.target)) {
        return;
      }
      this.close();
    }
  };

  close = () => {
    this.setState(
      {
        animateFrom: "translateY(0px)",
        animateTo: "translateY(200px)"
      },
      () => {
        this.setState({ showContent: false }, () => {
          this.setState({ showContent: true });
        });
      }
    );
    setTimeout(() => {
      this.props.close();
    }, 350);
  };

  render() {
    return (
      <div className="modal">
        {this.state.showContent && (
          <Spring
            from={{
              transform: this.state.animateFrom
            }}
            to={{
              transform: this.state.animateTo
            }}
          >
            {style => (
              <div style={style} className="modal-anim">
                <div className="modal-body" onClick={this.close}>
                  <div className="modal-body-content" ref={this.modalContent}>
                    <div
                      style={{
                        maxHeight: this.props.maxHeight || "",
                        overflowX: this.props.overflowX || ""
                      }}
                    >
                      {this.props.children}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Spring>
        )}
      </div>
    );
  }
}

export default Modal;
