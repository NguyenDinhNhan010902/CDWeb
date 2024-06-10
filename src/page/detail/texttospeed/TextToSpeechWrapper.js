import React from 'react';
import DOMPurify from 'dompurify';
import TextToSpeech from '/TextToSpeech';

const TextToSpeechWrapper = ({ html }) => {
    const sanitizedHtml = DOMPurify.sanitize(html);

    return (
        <TextToSpeech text={sanitizedHtml } />
    );
};

export default TextToSpeechWrapper;