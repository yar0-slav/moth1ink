import { firestore, postToJSON } from '../lib/firebase'

export async function mapReviews(data) {
  const response = (await data.get()).docs.map(postToJSON)

  await Promise.all(
    response.map(async data => {
      const translationField = data.translation
      const languageField = data.language

      const ref = firestore.collection('comments').doc(data.id)
      const doc = await ref.get()
      const docData = doc.data()

      if (languageField.length === 0) {
        const language = await detectLanguage(data.content)
        addLanguage(language, ref)
      }

      if (translationField.length === 0 && languageField !== 'en') {
        const getTranslation = await translate(data.content)
        addTranslation(getTranslation, ref)
        addBulletPointsTranslation(docData, ref)
      }
    })
  )

  return response
}

const addTranslation = async (data, document) => {
  await document.update({ translation: data })
}

const addLanguage = async (data, document) => {
  await document.update({ language: data })
}

const addBulletPointsTranslation = async (documentData, document) => {

  let dataArray = documentData.filteredValues;

  for (const [filterIndex,filteredVal] of documentData.filteredValues.entries()) {

    if (filteredVal.inputValues.length > 0) {
      for (const [inputIndex, input] of filteredVal.inputValues.entries()) {

        const translation = await translate(input.value)

        while (input.valueTranslation.length === 0) {
          dataArray[filterIndex].inputValues[inputIndex].valueTranslation = translation
        }

      }
    }

  }
  
  await document.update({ 'filteredValues': dataArray })
}

const detectLanguage = async text => {
  let url = `https://translation.googleapis.com/language/translate/v2/detect?key=AIzaSyAZWqMMcldSF0S348awGealtqPSKM0i-xo`
  url += '&q=' + encodeURI(text)

  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then(res => res.json())
    .then(response => {
      return response.data.detections[0][0].language
    })
    .catch(error => {
      console.log('There was an error with the translation request: ', error)
    })
}

const translate = async text => {
  let url = `https://translation.googleapis.com/language/translate/v2?key=AIzaSyAZWqMMcldSF0S348awGealtqPSKM0i-xo`
  url += '&q=' + encodeURI(text)
  url += '&target=en'

  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then(res => res.json())
    .then(response => {
      const res = response.data.translations[0].translatedText
      return decodeHtmlEntity(res)
    })
    .catch(error => {
      console.log('There was an error with the translation request: ', error)
    })
}

const decodeHtmlEntity = function (str) {
  return str.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec)
  })
}
