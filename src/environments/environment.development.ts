export const environment = {
	production: false,
	backendUrl: "http://localhost:8090",
	firebaseConfig: {
		apikey: "AIzaSyBfbjhjHur2mitTlN_WZ09dogvL-XqZMbM",
		authDomain: "torressansebastian.firebaseapp.com",
		projectId: "torressansebastian",
		storageBucket: "torressansebastian.appspot.com",
		messagingSenderId: "1080311338183",
		appId: "1:1080311338183:android:db62459c5bc0e025f19ae2",
		messager:{
			messageUrl: "https://localhost:8090/api/send-fcm",
		},
		token:{
			url: "https://localhost:8090/api/login/create",
		}
	}
};
