import React, { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./LoadButton/Button";
import api from './services/searchName-api';
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";

export function App () {
  const [searchName, setsearchName] = useState('');
  const [currentPage, setcurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {

    const fetchData = () => {
      if(searchName === '') {
        return;
      }
      setStatus('pending')

    api.fetchData(searchName, currentPage)
      .then(data => {
        setImages(prevImages => [...prevImages, ...data]); 
          setStatus('resolved');
        })
      .catch(error => {
        setStatus('idle')
        alert(error);
      });
  }
  
    fetchData();

  }, [searchName, currentPage])


  const showModel = (selectedImage) => {
    setshowModal(true)
    setSelectedImage(selectedImage)
  }

  const closeModal = () => {
    setshowModal(false)
    setSelectedImage(null)
  };

  const serchImageSubmit = (name) => {
    
    if(name === searchName) {
      return alert(`${name} already entered`)
    }

    setsearchName(name);
    setcurrentPage(1);
    setImages([]);
  }

  const serchImageLoadMore = () => {
    setcurrentPage(prevPage => (prevPage.currentPage + 1 ));
  }

    if(status === 'idle') {
      return(
        <div className="App">
          <Searchbar onSubmit={serchImageSubmit} />
        </div>
      );
    };

    if(status === 'pending') {
      return (
        <div className="App">
        <Loader />
      </div>
      );
    };

    if(status === 'resolved') {
      return (
        <div className="App">
          <Searchbar onSubmit={serchImageSubmit} />
          <ImageGallery images={images} onClick={showModel}/>
          {images.length - 1 !== currentPage && (<Button onClick={serchImageLoadMore} />)}
         
          {showModal && <Modal selectedImage={selectedImage} onClose={closeModal} />}
        </div>
      );
    }
  }