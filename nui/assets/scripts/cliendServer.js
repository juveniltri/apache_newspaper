var ClientServer = (function() {
	retrieveData = function(mocked = false) {
		return mocked ? { adData, adData2 } : fetchData();
	}

	retrieveAnnouncementData = function(mocked = false) {
		return mocked ? announcements : fetchData();
	}

    fetchData = function() {
        return null;
    }

	return {
		retrieveData: retrieveData,
		retrieveAnnouncementData: retrieveAnnouncementData
	}
})();