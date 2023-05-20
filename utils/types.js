// ImageProps interface
const ImageProps = {
    id: 0,
    height: '',
    width: '',
    public_id: '',
    format: '',
    blurDataUrl: '',
  };
  
  // SharedModalProps interface
  const SharedModalProps = {
    index: 0,
    images: [ImageProps],
    currentPhoto: ImageProps,
    changePhotoId: function(newVal) {},
    closeModal: function() {},
    navigation: false,
    direction: 0,
  };
  