import { Link } from "react-router-dom";

const CarsItem = ({ cars }) => {
  var color = cars.car_color;
  var carAvab = "";

  if (cars.availability === true) {
    carAvab = "Yes";
  } else {
    carAvab = "No";
  }
  return (
    <div className="car-item">
      <img className="car-img" src={cars.imgUrl} />
      <div className="car-cont">
        <div className="des-cont">
          <h5 className="car-title">{cars.car}</h5>
          <h5 className="car-title">{cars.car_model}</h5>
        </div>
        <div className="des-cont">

        <p className="car-des">{cars.car_model_year}</p>
        <p className="car-color" style={{ color: `${color}` }}>
          {cars.car_color}
        </p>
        <p className="car-des">{cars.price}</p>
        <p className="car-des">
          Available = <span className="car-avb">{carAvab}</span>
        </p>
        </div>
      </div>
    </div>
  );
};
export default CarsItem;
