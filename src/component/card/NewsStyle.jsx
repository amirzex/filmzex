import { useNavigate } from "react-router-dom";
import star from "../../assets/landing/icons8-rating-50.png";
import backup from "../../assets/landing/backup.jpg";
const NewsStyle = ({ item }) => {
  const navigate = useNavigate();
  console.log("navigate", navigate);
  return (
    <div
      onClick={() => navigate("/team/" + item.id)}
      className="relative flex flex-col  w-full transition-all duration-300"
    >
      <img
        src={item.poster || item.poster_url}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = backup;
        }}
        className="w-full h-64 sm:h-96 md:h-130 object-cover"
        alt="Film Poster"
      />
      <div className="w-full h-auto flex flex-col items-start gap-3 sm:gap-5 p-4 sm:p-5 bg-gray/80 backdrop-blur-md absolute bottom-0 ">
        <h3 className="text-lg sm:text-2xl">
          <b>{item.title}</b>
        </h3>
        <h3 className=" text-rose-400">{Array.isArray(item.genre) ? item.genre[0] : (item.category || item.genre)}</h3>
      </div>
    </div>
  );
};

export { NewsStyle };
