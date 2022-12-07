export const deviceAccessTime = '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>';
// export const imageTimer = '<svg viewBox="0 0 24 24" style="display: inline-block; color: rgba(0, 0, 0, 0.870588); fill: rgb(178, 223, 219); height: 24px; width: 24px; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; -webkit-user-select: none;"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg>';
export const imageTimer = '<path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>';
export const notificationTimeToLeave = '<path d="M18.92 5.01C18.72 4.42 18.16 4 17.5 4h-11c-.66 0-1.21.42-1.42 1.01L3 11v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 15c-.83 0-1.5-.67-1.5-1.5S5.67 12 6.5 12s1.5.67 1.5 1.5S7.33 15 6.5 15zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 10l1.5-4.5h11L19 10H5z"></path>';

export const imageTimelapse = '<path d="M16.24 7.76C15.07 6.59 13.54 6 12 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0 2.34-2.34 2.34-6.14-.01-8.48zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>';
export const placesAcUnit = '<path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z"></path>';
//color: rgba(0, 0, 0, 0.870588); fill: rgb(178, 223, 219);
export const localGasStation = '<path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>';
// export const localGasStation = '';

export function makeStaticLableSVG(inPath) {
  return '<svg viewBox="0 0 24 24" style="display:inline-block;height:16px;width:16px;-webkit-user-select:none;fill:rgb(178, 223, 219);">'
  + inPath
  + '</svg>';
}

export const timeIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="37" height="37" viewBox="0 0 37 37"><defs><linearGradient id="h" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#5856D6"/><stop offset="100%" stop-color="#C644FC"/></linearGradient></defs><path fill="url(#h)" d="M18.038 0C28 0 36.075 8.088 36.075 18.064c0 9.977-8.075 18.065-18.037 18.065S0 28.041 0 18.064C0 8.088 8.076 0 18.038 0z"/><g fill="#FFF"><path d="M18.03 10.537c-4.148 0-7.508 3.372-7.508 7.527s3.36 7.527 7.508 7.527a7.526 7.526 0 0 0 7.523-7.527 7.526 7.526 0 0 0-7.523-7.527zm.008 13.549a6.015 6.015 0 0 1-6.013-6.022 6.015 6.015 0 0 1 6.013-6.021 6.015 6.015 0 0 1 6.012 6.021 6.015 6.015 0 0 1-6.012 6.022z"/><path d="M18.414 14.301h-1.128v4.516l3.946 2.37.564-.925-3.382-2.01z"/></g></svg>';

export const speedIcon = '<svg width="37" height="37" viewBox="0 0 37 37"><defs><linearGradient id="g" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#5856D6"/><stop offset="100%" stop-color="#C644FC"/></linearGradient></defs><path fill="url(#g)" d="M17.906 0c9.89 0 17.906 8.064 17.906 18.012s-8.017 18.013-17.906 18.013C8.016 36.025 0 27.96 0 18.012 0 8.064 8.017 0 17.906 0z"/><path d="M13.789 15.761a.246.246 0 0 0-.06-.177l-1.924-2.204a.242.242 0 0 0-.342-.022 10.063 10.063 0 0 0-2.18 2.742.246.246 0 0 0 .096.332l2.556 1.407a.24.24 0 0 0 .33-.098 6.653 6.653 0 0 1 1.442-1.812.244.244 0 0 0 .082-.168zm.857-.816a.242.242 0 0 0 .329.101 6.506 6.506 0 0 1 2.19-.71.244.244 0 0 0 .209-.275l-.392-2.906a.243.243 0 0 0-.273-.21 9.876 9.876 0 0 0-3.327 1.078.245.245 0 0 0-.1.33l1.365 2.592zm-3.127 3.933l-2.811-.768a.242.242 0 0 0-.298.172 10.163 10.163 0 0 0-.337 3.113.243.243 0 0 0 .253.233l2.91-.135a.242.242 0 0 0 .232-.256 6.73 6.73 0 0 1 .222-2.059.245.245 0 0 0-.17-.3zm10.884-7.03a9.876 9.876 0 0 0-3.365-.947.245.245 0 0 0-.265.22l-.28 2.92a.244.244 0 0 0 .217.266 6.506 6.506 0 0 1 2.217.624.241.241 0 0 0 .324-.114l1.265-2.643a.245.245 0 0 0-.113-.326zm4.279 4.101a.246.246 0 0 0-.027-.185 10.06 10.06 0 0 0-2.283-2.656.242.242 0 0 0-.342.036l-1.838 2.275a.246.246 0 0 0 .035.344 6.652 6.652 0 0 1 1.51 1.757.242.242 0 0 0 .333.084l2.5-1.505a.245.245 0 0 0 .112-.15zm.928 1.962a.242.242 0 0 0-.304-.16l-2.78.876a.245.245 0 0 0-.16.307 6.695 6.695 0 0 1 .294 2.303.245.245 0 0 0 .231.255l2.91.136h.012a.244.244 0 0 0 .242-.233 10.166 10.166 0 0 0-.445-3.484zm-9.554 2.495c-.043 0-.084.001-.126.004l-3.943-2.343a.248.248 0 0 0-.3.035c-.081.078-.1.2-.048.3l2.151 4.06a2.286 2.286 0 0 0 2.265 2.53 2.286 2.286 0 0 0 2.277-2.293 2.286 2.286 0 0 0-2.277-2.293z" fill="#FFF"/></svg>';