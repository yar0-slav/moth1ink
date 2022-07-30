const {Translate} = require('@google-cloud/translate').v2;

const translate = new Translate();

export async function detectLanguage(text) {
        return await translate.detect(text).then(r => r.json())
};

export async function translateTex(text, targetLanguage) {

        let [response] = await translate.translate(text, targetLanguage);
        return response;

};