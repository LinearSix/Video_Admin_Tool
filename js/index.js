document.addEventListener('DOMContentLoaded', function() {

    let videoArray = [
        {
            "videoID": 1,
            "videoName": `Video 1`,
            "videoLength": `1:11`,
            "videoDesc": `Video 1 is all about the number 1.`,
            "videoURL": `https://vimeo.com/1`,
            "videoTags": [`animation`, `serious`, `Doug Hammond`, `Addiction Treatment`]
        },
        {
            "videoID": 2,
            "videoName": `Video 2`,
            "videoLength": `2:00`,
            "videoDesc": `Video 2 is all about the number 2.`,
            "videoURL": `https://vimeo.com/2`,
            "videoTags": [`animation`, `serious`, `Mike Goldman`, `Breweries`]
        },
        {
            "videoID": 3,
            "videoName": `Video 3`,
            "videoLength": `3:00`,
            "videoDesc": `Video 3 is all about the number 3.`,
            "videoURL": `https://vimeo.com/3`,
            "videoTags": [`animation`, `comedic`, `Doug Hammond`, `Cemeteries & Memorial Parks`]
        },
        {
            "videoID": 4,
            "videoName": `Video 4`,
            "videoLength": `4:00`,
            "videoDesc": `Video 4 is all about the number 4.`,
            "videoURL": `https://vimeo.com/4`,
            "videoTags": [`animation`, `comedic`, `Mike Goldman`, `Chemical`]
        },
        {
            "videoID": 5,
            "videoName": `Video 5`,
            "videoLength": `5:00`,
            "videoDesc": `Video 5 is all about the number 5.`,
            "videoURL": `https://vimeo.com/5`,
            "videoTags": [`interview`, `serious`, `Doug Hammond`, `Clubs & Golf Courses`]
        },
        {
            "videoID": 6,
            "videoName": `Video 6`,
            "videoLength": `6:00`,
            "videoDesc": `Video 6 is all about the number 6.`,
            "videoURL": `https://vimeo.com/6`,
            "videoTags": [`interview`, `serious`, `Mike Goldman`, `Communications, Media & Technology`]
        },
        {
            "videoID": 7,
            "videoName": `Video 7`,
            "videoLength": `7:00`,
            "videoDesc": `Video 7 is all about the number 7.`,
            "videoURL": `https://vimeo.com/7`,
            "videoTags": [`interview`, `comedic`, `Doug Hammond`, `Condominium Homeowners`]
        },
        {
            "videoID": 8,
            "videoName": `Video 8`,
            "videoLength": `8:00`,
            "videoDesc": `Video 8 is all about the number 8.`,
            "videoURL": `https://vimeo.com/8`,
            "videoTags": [`interview`, `comedic`, `Mike Goldman`, `Construction`]
        },
    ];

    // Variables used for getting data from query string
    let urlParams = new URLSearchParams(window.location.search);
    let searchData = (urlParams.get(`add`));
    let searchAdd = [];
    searchAdd = (urlParams.get(`add`));
    let searchRemove = (urlParams.get(`remove`));

    // control and format tags in querystring
    let splitAdd = [];
    let splitTemp;
    if (searchAdd && searchRemove) {
        splitTemp = [];
        splitTemp = searchAdd.split(",");
        for (item in splitTemp) {
            if (splitTemp[item] !== "null" && splitTemp[item] !== searchRemove) {
                splitAdd.push(splitTemp[item]);
            };
        };
        searchAdd = splitAdd.join();
    } else if (searchAdd) {
        splitTemp = [];
        splitTemp = searchAdd.split(",");
        for (item in splitTemp) {
            if (splitTemp[item] !== "null") {
                splitAdd.push(splitTemp[item]);
            };
        };
        searchAdd = splitAdd.join();
        console.log(searchAdd);
    };

    let addData = (searchAdd ? `<input type="hidden" name="add" value="${searchAdd}"></input>` : ``);
    let persistData = (searchData ? `<input type="hidden" name="search" value="${searchData}"></input>` : ``);

    // display tags from querystring
    for (let tagItem in searchAdd) {
        document.getElementById(`tags_container`).innerHTML = (`<button>${searchAdd} <a href="index.html?remove=${searchAdd}">X</a></button>`);
    };
    // (`
    // <form method="GET"><nobr>${data.data[coinObj].name}<button class="remove" type="submit">X</button></nobr>
    // ${limitData}
    // ${persistData}
    // ${addData}
    // <input type="hidden" name="remove" value="${data.data[coinObj].id}"></form>
    // `);

    let varVideoTable = document.getElementById(`tableVideoList`);
    let varVideoList;
    for (let i=0; i<videoArray.length; i++) {
        // console.log(videoArray[i].videoName);
        if (!searchAdd) {
            console.log(`There was no search criteria.`)
            varVideoList = document.createElement(`tr`);
            varVideoList.innerHTML = (`<td>${videoArray[i].videoName}</td><td>${videoArray[i].videoTags}</td><td>${videoArray[i].videoLength}</td><td>${videoArray[i].videoDesc}</td><td>${videoArray[i].videoURL}</td><td><a href="">Edit</a></td>`)
            varVideoTable.appendChild(varVideoList);
        } else {
            if (videoArray[i].videoTags.includes(searchData)) {
                varVideoList = document.createElement(`tr`);
                varVideoList.innerHTML = (`<td>${videoArray[i].videoName}</td><td>${videoArray[i].videoTags}</td><td>${videoArray[i].videoLength}</td><td>${videoArray[i].videoDesc}</td><td>${videoArray[i].videoURL}</td><td><a href="">Edit</a></td>`)
                varVideoTable.appendChild(varVideoList);
            };
        };
    };
});
