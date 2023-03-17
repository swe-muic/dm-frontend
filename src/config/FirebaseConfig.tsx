import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
	apiKey: 'AIzaSyCHKIG8TlMKSMXeuQfnUgIXGR-wfDiclTM',
	authDomain: 'deezmoz.firebaseapp.com',
	projectId: 'deezmoz',
	storageBucket: 'deezmoz.appspot.com',
	messagingSenderId: '159633620626',
	appId: '1:159633620626:web:aa81c48c502b1a785db04b',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
