import ImageGallery from './ImageGallery';

const images = [
    'https://img.freepik.com/premium-vector/business-meeting-vector-illustration-professional-collaboration-design_1301270-11849.jpg?semt=ais_hybrid',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0wbQKpf2iNTaf9kQBTdpl1PrLqXHCNNO3qg&s',
];

const MediaBody = () => {
    return (
        <div className="flex items-center justify-center p-4">
            <ImageGallery images={images} />
        </div>
    );
}

export default MediaBody;