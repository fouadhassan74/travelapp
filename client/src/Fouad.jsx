import React from "react";

function Fouad() {
  console.log("i Am test is rendering");
  return (
    <div
      style={{
        fontSize: "300px",
        color: "yellow",
        margin: "30px auto",
        zIndex: "6 !important",
      }}
    >
      Fouad
    </div>
  );
}
// {pin._id === currentPlace && (
//   <>
//     {" "}
//     <Fouad />
//     <Popup
//       longitude={pin.long}
//       latitude={pin.lat}
//       anchor='bottom'
//       // onClose={() => setCurrentPlace(null)}
//     >
//       <Card
//         username={pin.username}
//         title={pin.title}
//         rating={pin.rating}
//         time={pin.createdAt}
//         desc={pin.desc}
//       />
//     </Popup>
//   </>
// )}
export default Fouad;
