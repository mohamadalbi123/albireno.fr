/** Contact enquiries are independent of authorisation to sell installation work. */
export function canSendContact(config:{enabled?:string;from?:string;resendKey?:string;turnstileSecret?:string;siteKey?:string;hosts?:string}){
 return config.enabled==='true'&&!!config.from?.trim()&&!!config.resendKey?.trim()&&!!config.turnstileSecret?.trim()&&!!config.siteKey?.trim()&&!!config.hosts?.split(',').some(host=>host.trim());
}
