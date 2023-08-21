import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import Card from "./components/card/Card";
import "./components/card/card.css";
import axios from "axios";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [newPin, setNewPin] = useState({});
  const [newPlace, setNewPlace] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 29.94617202149277,
    latitude: 31.131459514321477,
    zoom: 3.5,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const handleView = useCallback((evt) => {
    setViewState(evt.viewState);
  }, []);
  const handleMarkerClick = useCallback((id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, longitude: long, latitude: lat });
  }, []);
  const handleAddClick = (e) => {
    console.log(e);
    const latitude = e.lngLat.lat;
    const longitude = e.lngLat.lng;
    setNewPlace({ latitude: latitude, longitude: longitude });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewPin({
      username: currentUser,
      title: title,
      desc: desc,
      rating: rating,
      lat: newPlace.latitude,
      long: newPlace.longitude,
    });
    try {
      const res = await axios.post("/api/pin", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const getPins = async () => {
      const res = await axios.get("/api/pin");
      setPins(res.data);
    };
    getPins();
  }, []);
  console.log(newPlace);
  return (
    <div>
      <Map
        {...viewState}
        mapboxAccessToken='pk.eyJ1IjoiZm91YWRoYXNzYW43NCIsImEiOiJjbGxjZnI0YmIwMHczM2RsZGN5cjFuczdmIn0.zRzOAqWsyGFQfMgP9XtRDg'
        onMove={(evt) => {
          handleView(evt);
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle='mapbox://styles/mapbox/satellite-streets-v12'
        onDblClick={handleAddClick}
        transitionDuration='200'
      >
        {pins.map((pin) => {
          return (
            <div key={pin._id} style={{ zIndex: 4 }}>
              <Marker longitude={pin.long} latitude={pin.lat} anchor='bottom'>
                <RoomIcon
                  style={{
                    fontSize: viewState.zoom * 7,
                    color:
                      pin.username === currentUser ? "tomato" : "slateblue",
                    cursor: "pointer",
                  }}
                  onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
                />
              </Marker>
              {pin._id === currentPlaceId && (
                <Popup
                  key={pin._id}
                  longitude={pin.long}
                  latitude={pin.lat}
                  anchor='left'
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                >
                  <Card
                    username={pin.username}
                    title={pin.title}
                    rating={pin.rating}
                    time={pin.createdAt}
                    desc={pin.desc}
                  />
                </Popup>
              )}
              )
            </div>
          );
        })}
        {newPlace && (
          <Popup
            longitude={newPlace.longitude}
            latitude={newPlace.latitude}
            anchor='left'
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
          >
            <div className='form'>
              <from onSubmit={handleSubmit}>
                <div className='inputForm'>
                  {" "}
                  <label className='labelForm'>title</label>
                  <input
                    className='inputForm'
                    type='text'
                    name='title'
                    placeholder='enter the title'
                    autofocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className='textareaForm'>
                  {" "}
                  <label className='labelForm'>Description</label>
                  <textarea
                    className='textarea'
                    placeholder='Say us something about this place.'
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <label className='labelForm'>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
                <button type='submit' className='submitButton'>
                  Add Pin
                </button>
              </from>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button
            onClick={() => setCurrentUser(false)}
            className='button logout'
          >
            Log out
          </button>
        ) : (
          <>
            <button onClick={() => setShowLogin(true)} className='button login'>
              Login
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className='button register'
            >
              Register
            </button>
          </>
        )}
        {showRegister && currentUser && (
          <Register
            setCurrentUser={setCurrentUser}
            setShowRegister={setShowRegister}
          />
        )}
        {showLogin && (
          <Login setCurrentUser={setCurrentUser} setShowLogin={setShowLogin} />
        )}
      </Map>
    </div>
  );
}

export default App;
