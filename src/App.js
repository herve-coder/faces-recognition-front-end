import React, { Component } from "react";
import Particles from "react-particles-js";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import SignIn from "./components/SignIn/SignIn";
import Navigation from "./components/navigation/Navigation";
import Register from "./components/Register/Register";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      boxes: [],
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    };
  }

  loadUser = user => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    });
  };

  calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions;
    // console.log(clarifaiFace);

    const boxesArray = clarifaiFace.map(region => {
      const box = region.region_info.bounding_box;

      const image = document.getElementById("inputimage");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        topRow: box.top_row * height,
        leftCol: box.left_col * width,
        bottomRow: height - box.bottom_row * height,
        rightCol: width - box.right_col * width
      };
    });
    return boxesArray;
  };

  displayFaceBox = boxesArray => {
    this.setState({ boxes: boxesArray });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };
  onRouteChange = route => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else if (route === "signin" || route === "register") {
      this.setState(initialState);
    }
    this.setState({ route: route });
  };

  onSubmitPicture = () => {
    this.setState({ imageUrl: this.state.input });
    // "https://secure-gorge-53800.herokuapp.com/"
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.outputs) {
          this.displayFaceBox(this.calculateFaceLocation(data));
          if (this.state.boxes.length) {
            fetch("http://localhost:3000/image", {
              method: "put",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(
                  Object.assign(this.state.user, { entries: count })
                ); //entries should be updated after faces detection
              })
              .catch(err => {
                console.log("Unable to get entries");
              });
          }
        }
      })

      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { route, isSignedIn, imageUrl, boxes } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />

        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              inputChange={this.onInputChange}
              submitPicture={this.onSubmitPicture}
            />
            <FaceDetection imageUrl={imageUrl} boxes={boxes} />
          </div>
        ) : this.state.route === "signin" ? (
          <div>
            <SignIn
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        ) : (
          <div>
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        )}
      </div>
    );
  }
}
export default App;
