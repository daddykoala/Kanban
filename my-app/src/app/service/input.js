
import DOMPurify from "dompurify";

export const sanitizedValue = (value) => {
    console.log('je suis pas nettoyé',value);
    const sanitized = DOMPurify.sanitize(value);
    console.log('je suis nettoyé',sanitized);
    return sanitized;
};

