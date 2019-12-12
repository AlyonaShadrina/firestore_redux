const cropText = (string = '', length = 300) => {
    const cropString = string.length > length;
    if (cropString) {
        return `${string.substr(0, length)}...`;
    }
    return string;
};

export default cropText;
