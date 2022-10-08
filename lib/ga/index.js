export const pageview = url => {
  window.gtag('config', process.env.GOOGLE_ANALYTICS, {
    page_path: url
  })
}

export const event = ({ action, params }) => {
  window.gtag('event', action, params)
}