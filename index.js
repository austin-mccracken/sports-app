const apiResponse = document.getElementById('api-response')
console.log(`apiResponse object is ${apiResponse}`)

//var team

async function callApi(team) {
    const response = await fetch(`http://localhost:3000/nfl/${team}`)
    console.log(`Request sent to http://localhost:3000/nfl/${team}`)
    const responseBody = await response.json()
    document.getElementById('team-name-div').innerHTML = responseBody.teamName
    document.getElementById('team-des-div').innerHTML = responseBody.teamDescription
    document.getElementById('team-logo-div').src = responseBody.teamLogo
    document.getElementById('team-badge-div').src = responseBody.teamBadge
    document.getElementById('team-jersey-div').src = responseBody.teamJersey
    document.getElementById('team-banner-div').src = responseBody.teamBanner
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