import fallbackImg from "../image/default.jpg"

const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackImg;
}

export default handleImageError;