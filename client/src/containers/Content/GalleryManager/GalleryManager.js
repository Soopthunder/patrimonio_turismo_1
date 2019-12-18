import React, { useState, useEffect } from 'react';

import ImageUploader from 'react-images-upload';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';

import Button from '../../../components/UI/Button/Button';
import Toast from '../../../components/UI/Toast/toast';

export default props => {
    const [gallery, setGallery] = useState([]);
    const [images, setImages] = useState([]);
    const [toastMessage, setToastMessage] = useState("");
    const [resetUploader, setResetUploader] = useState(false);

    const onDrop = (pictureFiles) => {
        setGallery(pictureFiles);
    };

    useEffect(() => {
        axios.get('/api/galeria')
            .then(res => {
                setImages(res.data)
            })
            .catch(error => {
                setToastMessage(error.response.data.message)
            })
    }, [])

    async function uploadGallery() {
        try {
            const payload = new FormData();
            gallery.forEach(file => {
                payload.append("gallery", file)
            });
            const response = await axios.post('/api/subir-galeria', payload);
            setResetUploader(true);
            setResetUploader(false);
            setToastMessage("Se ha subido la galería");
            setImages(response.data);
            setGallery([]);
        } catch (error) {
            setToastMessage(error.response.data.message)
        }
    }

    async function deleteGalleryImage(id) {
        try{
            const response = await axios.delete('/api/eliminar-imagen-galeria/'+ id);
            setImages( images.filter(image => image._id !==id));
            setToastMessage(response.data);
        }catch(error) {
            setToastMessage(error.response.data.message)
        }
    }

    return (
        <div>
            <div style={{ minHeight: '250px' }}>
                {!resetUploader ?
                    <ImageUploader
                        withIcon={true}
                        withPreview={true}
                        label="Tamaño maximo 5 MB. Extensiones jpg, jpeg y png"
                        buttonText='Elige tus imagenes'
                        onChange={onDrop}
                        imgExtension={['.jpg', ".jpeg", '.png']}
                        fileTypeError="Formato no permitido"
                        maxFileSize={5242880}
                        fileSizeError="Iamgen demasiado grande"
                    /> : null 
                }
            </div>
            <Carousel showThumbs={false}>
                {images.map(({ _id, imageUrl }, index) => (
                    <div key={_id}>
                        <img src={imageUrl} alt={imageUrl} />
                        <div className="legend d-flex align-items-center justify-content-between">
                            <h6 className="ml-3 mb-0"> Imagen: {index+1} </h6>
                            <Button
                                clicked={() => deleteGalleryImage(_id)}
                                type="Icon">
                                <i className="fas fa-trash-alt"></i>
                            </Button>
                        </div>
                    </div>
                ))}
            </Carousel>
            <div className="d-flex justify-content-end mt-3">
                <Button
                    type="Danger"
                    clicked={uploadGallery}>
                    Enviar
                </Button>
            </div>
            <Toast message={toastMessage} setMessage={setToastMessage} />
        </div>
    );
};