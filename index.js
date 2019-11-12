const apiResponse = document.getElementById('api-response')
console.log(`apiResponse object is ${apiResponse}`)

async function callApi(team) {
    const response = await fetch(`http://localhost:3000/nfl/${team}`)
    console.log(`Request sent to http://localhost:3000/nfl/${team}`)
    const responseBody = await response.json()
    document.getElementById('team-name-div').innerHTML = responseBody.resultObject[0].strTeam
    document.getElementById('team-des-div').innerHTML = responseBody.resultObject[0].strDescriptionEN
    document.getElementById('stadium-name-div').innerHTML = responseBody.resultObject[0].strStadium
    document.getElementById('team-location').innerHTML = responseBody.resultObject[0].strStadiumLocation

    var fb = document.getElementById('facebook');
    fb.href = "https://" + responseBody.resultObject[0].strFacebook

    var twit = document.getElementById('twitter');
    twit.href = "https://" + responseBody.resultObject[0].strTwitter

    var insta = document.getElementById('instagram');
    insta.href = "https://" + responseBody.resultObject[0].strInstagram

    var site = document.getElementById('team-site');
    site.href = "https://" + responseBody.resultObject[0].strWebsite

    var findOut = document.getElementById('find-out-more');
    findOut.href = "https://" + responseBody.resultObject[0].strWebsite

    document.getElementById('team-banner-div').src = responseBody.resultObject[0].strTeamBanner
    document.getElementById('team-badge-div').src = responseBody.resultObject[0].strTeamBadge
    document.getElementById('team-jersey-div').src = responseBody.resultObject[0].strTeamJersey
    document.getElementById('team-stadium-div').src = responseBody.resultObject[0].strStadiumThumb
    console.log(responseBody)
}

const dropDown = (team) => {
    if (team == 'default') {
        console.log(`Call voided due to ${team} selection`)
        return
    }
    console.log(`Team selected is ${team}`)
    callApi(team)
}