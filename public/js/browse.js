




function reloadEventListener() {
    let reloadButton = document.querySelector('.reload-button');
    let profileCards = document.body.querySelectorAll('.profile-container');
    let cardsArr = Array.from(profileCards);
    let sampleTemplate = cardsArr[0];
    $(window).scroll(function() {

        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            console.log('bottom');
            $.get('http://localhost:5000/browse', (moreData) => {
                appendingData(moreData, sampleTemplate)
            });
        };
    });
};

function appendingData(data, exampleTemplate) {
    let container = $('.page-container');
    data.forEach(function(item) {
        console.log(item);
        let date = formatDate(item.join_date);
        let newDiv = document.createElement('div');
        newDiv.inenrHTML = '';
        newDiv.innerHTML = `            
            <div class="profile-container">
                <img class="app-avatar" src="${item.github_avatar_url}">
                <div class="profile-info">
                    <div class="field is-horizontal">
                        <div class="field-label">
                            <label class="label">Name</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div data-display>${item.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label">
                            <label class="label">Location</label>
                        </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <div data-display>${item.city}, ${item.state}</div>
                                        <input class="input is-hidden is-expanded" type="text" value="${item.city}" data-display></label>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <div class="select is-hidden" data-display>
                                            <select name="state">
                                                <option>State</option>
                                                <option value="AL">AL</option>
                                                <option value="AK">AK</option>
                                                <option value="AS">AS</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-hidden" type="text" value="{{zip}}" placeholder="Zip..." data-display></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label">
                                <label class="label">Employer</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <div data-display>${item.employer}</div>
                                        <input class="input is-hidden" type="text" value="{{employer}}" data-display></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label">
                                <label class="label">GitHub Alias</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <div data-display>${item.alias}}</div>
                                        <input class="input is-hidden" type="text" value="${item.alias}" data-display></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label">
                                <label class="label">Member since</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <div>${date}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href="/profile/${item.user_id}">
                            <button class="app-button">
                                More
                            </button>
                        </a>
                </div>
            </div>`;
            console.log(newDiv)
            document.body.appendChild(newDiv);
        })
};

function formatDate(dateTime) {
    let dateObject = new Date(dateTime);
    // let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = dateObject.toLocaleDateString('en-US', options);
    return dateString;
}




reloadEventListener();