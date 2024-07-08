import { useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// import SearchBar from "./components/SearchBar/SearchBar";
import SearchBar from "../SearchBar/SearchBar";
// import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageGallery from "../ImageGallery/ImageGallery";
// import Loader from "./components/Loader/Loader";
import Loader from "../Loader/Loader";
// import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
// import ImageModal from "./components/ImageModal/ImageModal";
import ImageModal from "../ImageModal/ImageModal";
import { Image } from "./App.types";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import "./App.css";
const ACCESS_KEY = "FzG5qD0HVMRBUhSh_8lpjbDu2i6ByAX9c3NYbWpe3rU";

const App = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  // const perPage = 12;
  // const accessKey = "FzG5qD0HVMRBUhSh_8lpjbDu2i6ByAX9c3NYbWpe3rU";

  // useEffect(() => {
  //   if (!query) return;

  const fetchImages = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<{ results: Image[] }>(
        "https://api.unsplash.com/search/photos",
        // `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${query}&client_id=${accessKey}`

        //       if (page === 1) {
        //         setImages(response.data.results);
        //       } else {
        //         setImages((prevImages) => [...prevImages, ...response.data.results]);
        //       }
        //     } catch (err) {
        //       setError("Failed to fetch images. Please try again.");
        //     } finally {
        //       setIsLoading(false);
        //     }
        //   };

        //   fetchImages();
        // }, [query, page]);
        {
          params: {
            query,
            page,
            per_page: 12,
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );
      setImages((prevImages) => [...prevImages, ...response.data.results]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query, page, fetchImages]);

  // const handleSearchSubmit = (newQuery) => {
  //   if (newQuery === query) return;

  //   setQuery(newQuery);
  //   setPage(1);
  //   setImages([]);
  // };
  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() === "") {
      toast.error("Please enter a search term.");
      return;
    }

    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
      setError(null);
      setSelectedImage(null);
    }
  };

  // const handleImageClick = (image) => {
  //   setSelectedImage(image);
  // };

  // const handleCloseModal = () => {
  //   setSelectedImage(null);
  // };

  // const handleLoadMore = () => {
  //   setPage((prevPage) => prevPage + 1);
  // };
  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
  };

  return (
    <div className={style.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {error && <ErrorMessage message={error} />}
      {!error && images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {isLoading && <Loader />}
      {!error && images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
      <ImageModal
        isOpen={Boolean(selectedImage)}
        onRequestClose={closeModal}
        image={selectedImage}
      />
      {/* {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )} */}
    </div>
  );
};

export default App;
