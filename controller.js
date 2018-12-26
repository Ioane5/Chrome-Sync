// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
db.settings({
	timestampsInSnapshots: true
});

chrome.tabs.onUpdated.addListener(function (tabId, info) {
	if (info.status === 'complete') {
		chrome.tabs.get(tabId, function (tab) {
			var url = tab.url;
			if (!shouldIgnoreUrl(url)) {
				handleUrl(tab.url);
			}
		});
	}
});

function shouldIgnoreUrl(url) {
	return url.includes('chrome://');
}

function handleUrl(url) {
	db.collection("links").add({
		'url': url
	})
}