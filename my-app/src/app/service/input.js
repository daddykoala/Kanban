
import DOMPurify from "dompurify";

export const sanitizedValue = (value) => {
    const sanitized = DOMPurify.sanitize(value);
    return sanitized;
};

