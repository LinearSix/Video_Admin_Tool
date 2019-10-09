document.addEventListener('DOMContentLoaded', function() {

    // get the json file and assign it to videoArray
    let videoArray;

    function loadJSON(path, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    }

    // all client-side work with videoArray must be inside this function
    loadJSON('vimeo.json', function(data) {
         videoArray = (data); console.log(`videoArray: ${videoArray}`); 

        // Variables used for getting data from query string
        let urlParams = new URLSearchParams(window.location.search);
        let searchData = (urlParams.get(`add`));
        // let searchAdd = [];
        let searchAdd = (urlParams.get(`add`));
        let searchOld = [];
        let splitOld = [];
        searchOld = (urlParams.get(`old`));
        let searchRemove = (urlParams.get(`remove`));
        let tagsContainer = document.getElementById(`tags_container`)
        let tagButton;

        // render  tag buttons
        if (searchOld && searchAdd) {
            
            // create hidden field and tag buttons
            splitTemp = [];
            splitTemp = searchOld.split(",");
            splitTemp = [...new Set(splitTemp)]
            for (item in splitTemp) {
                if (splitTemp[item] !== "null" && splitTemp[item] !== searchRemove) {
                    splitOld.push(splitTemp[item]);
                    splitOld.push(searchAdd);
                    splitOld = [...new Set(splitOld)]
                    
                    // create tag buttons from old
                    tagButton = document.createElement('button');
                    tagButton.setAttribute('name', 'remove');
                    tagButton.setAttribute('value', splitTemp[item]);
                    // tagButton.setAttribute('class', 'btn');
                    tagButton.innerHTML = `${splitTemp[item]} X`;
                    tagsContainer.appendChild(tagButton);
                };
            };

            tagButton = document.createElement('button');
            tagButton.setAttribute('name', 'remove');
            tagButton.setAttribute('value', searchAdd);
            // tagButton.setAttribute('class', 'btn');
            tagButton.innerHTML = `${searchAdd} X`;
            tagsContainer.appendChild(tagButton);
            // also create a tag button from add
            // document.getElementById(`tags_container`).innerHTML = (`<button>${searchAdd} <a href="index?remove=${searchAdd}">X</a></button>`);
            searchOld = splitOld.join();
            console.log(searchOld);

            let hiddenAdd = document.createElement(`input`);
            hiddenAdd.type = `hidden`;
            hiddenAdd.name = `old`;
            hiddenAdd.value = searchOld;
            document.getElementById(`nfpSearchInput`).appendChild(hiddenAdd);

        } else if (searchOld) {
            
            // create hidden field and tag buttons
            splitTemp = [];
            splitTemp = searchOld.split(",");
            splitTemp = [...new Set(splitTemp)]
            for (item in splitTemp) {
                if (splitTemp[item] !== "null" && splitTemp[item] !== searchRemove) {
                    splitOld.push(splitTemp[item]);
                    
                    // create tag buttons from old
                    tagButton = document.createElement('button');
                    tagButton.setAttribute('name', 'remove');
                    tagButton.setAttribute('value', splitTemp[item]);
                    // tagButton.setAttribute('class', 'btn');
                    tagButton.innerHTML = `${splitTemp[item]} X`;
                    tagsContainer.appendChild(tagButton);
                };
            };

            searchOld = splitOld.join();
            console.log(searchOld);

            let hiddenAdd = document.createElement(`input`);
            hiddenAdd.type = `hidden`;
            hiddenAdd.name = `old`;
            hiddenAdd.value = searchOld;
            document.getElementById(`nfpSearchInput`).appendChild(hiddenAdd);

        } else if (searchAdd) {
            
            // create tag button
            document.getElementById(`tags_container`).innerHTML = (`<button>${searchAdd} <a href="index?remove=${searchAdd}">X</a></button>`);

            // create hidden field
            let hiddenAdd = document.createElement(`input`);
            hiddenAdd.type = `hidden`;
            hiddenAdd.name = `old`;
            hiddenAdd.value = searchAdd;
            document.getElementById(`nfpSearchInput`).appendChild(hiddenAdd);
            console.log(searchAdd);

        }

        // render the media list

        let varVideoTable = document.getElementById(`tableVideoList`);
        let varVideoList;
        let oldTemp = [];
        if (searchOld) {
            // break old search querystring into array
            oldTemp = searchOld.split(",");
            // add new search data into old search data array
            if (searchAdd) {
                oldTemp.push(searchAdd);
                oldTemp = [...new Set(oldTemp)];
            };
        };
        
        // iterate through media records
        for (let i=0; i<videoArray.length; i++) {
            
            // if there is new and old search data
            if (searchAdd && searchOld || searchOld) {
                // console.log(`both`)
                // console.log(`oldTemp ${i} ${oldTemp}`);

                let intersection = [];
                intersection = oldTemp.filter(x => videoArray[i].videoTags.includes(x));
                // console.log(`intersection ${intersection}`)

                // *** what am I finding out by checking lengths here?
                if (intersection.length === oldTemp.length) {
                    varVideoList = document.createElement(`tr`);
                    varVideoList.innerHTML = (`<td>${videoArray[i].videoName}</td><td>${videoArray[i].videoType}</td><td>${videoArray[i].videoTags}</td><td align="right">${videoArray[i].videoLength}</td><td>${videoArray[i].videoDesc}</td><td><a href="${videoArray[i].videoURL}" target="_blank">${videoArray[i].videoURL}</a></td><td><a href="/edit/${videoArray[i].videoID}">Edit</a></td>`)
                    varVideoTable.appendChild(varVideoList);
                };
            // if there is only new search data
            } else if (searchAdd) {
                // console.log(`add`)
                if (videoArray[i].videoTags.includes(searchData)) {
                    varVideoList = document.createElement(`tr`);
                    varVideoList.innerHTML = (`<td>${videoArray[i].videoName}</td><td>${videoArray[i].videoType}</td><td>${videoArray[i].videoTags}</td><td align="right">${videoArray[i].videoLength}</td><td>${videoArray[i].videoDesc}</td><td><a href="${videoArray[i].videoURL}" target="_blank">${videoArray[i].videoURL}</a></td><td><a href="/edit/${videoArray[i].videoID}">Edit</a></td>`)
                    varVideoTable.appendChild(varVideoList);
                };
            // there was no search data - render all records
            } else {
                // console.log(`There was no search criteria.`)
                varVideoList = document.createElement(`tr`);
                varVideoList.innerHTML = (`<td>${videoArray[i].videoName}</td><td>${videoArray[i].videoType}</td><td>${videoArray[i].videoTags}</td><td align="right">${videoArray[i].videoLength}</td><td>${videoArray[i].videoDesc}</td><td><a href="${videoArray[i].videoURL}" target="_blank">${videoArray[i].videoURL}</a></td><td><a href="/edit/${videoArray[i].videoID}">Edit</a></td>`)
                varVideoTable.appendChild(varVideoList);
            };
        };
    }, function(xhr) { console.error(xhr); });
});
