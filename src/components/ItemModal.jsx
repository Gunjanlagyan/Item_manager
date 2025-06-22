import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaArrowLeft, FaArrowRight, FaWindowClose } from "react-icons/fa";

const ItemModal = ({ item, onClose, getImageUrl }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-screen overflow-y-auto relative p-6 shadow-lg animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-2xl text-red-600 hover:text-red-800 transition"
          onClick={onClose}
        >
          <FaWindowClose />
        </button>

        <h2 className="text-3xl font-bold mb-2 text-center text-blue-900">
          {item.name}
        </h2>

        <p className="text-center text-gray-700 mb-2">
          <span className="font-semibold">Type:</span> {item.type}
        </p>

        {item.description && (
          <p className="text-sm text-gray-600 text-center mb-4 px-2">
            {item.description}
          </p>
        )}

        <div className="relative rounded-xl overflow-hidden mb-6">
          <Carousel
            showThumbs={false}
            infiniteLoop
            useKeyboardArrows
            autoPlay
            showStatus={false}
            renderArrowPrev={(clickHandler, hasPrev) =>
              hasPrev && (
                <button
                  onClick={clickHandler}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white z-10"
                >
                  <FaArrowLeft className="text-gray-800 text-lg" />
                </button>
              )
            }
            renderArrowNext={(clickHandler, hasNext) =>
              hasNext && (
                <button
                  onClick={clickHandler}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white z-10"
                >
                  <FaArrowRight className="text-gray-800 text-lg" />
                </button>
              )
            }
          >
            <div>
              <img
                src={getImageUrl(item.coverImage)}
                alt="Cover"
                className="object-contain max-w-full h-64 sm:h-72 md:h-80 mx-auto rounded-md"
              />
            </div>

            {item.additionalImages?.map((imgId, index) => (
              <div key={index}>
                <img
                  src={getImageUrl(imgId)}
                  alt={`Additional ${index + 1}`}
                  className="object-contain max-w-full h-64 sm:h-72 md:h-80 mx-auto rounded-md"
                />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="text-center">
          <button
            onClick={() => alert("Enquiry sent to static email")}
            className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Enquire
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
