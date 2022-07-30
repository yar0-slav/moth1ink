const {Translate} = require('@google-cloud/translate').v2;

const translate = new Translate();

export async function detectLanguage(text) {

        let response = await translate.detect(text);
        return response[0].language;


};


export async function translateTex(text, targetLanguage) {

        let [response] = await translate.translate(text, targetLanguage);
        return response;

};