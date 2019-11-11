const apiResponse = document.getElementById('api-response')
console.log(`apiResponse object is ${apiResponse}`)

var team

async function callApi(team) {
    const response = await fetch(`http://localhost:3000/nfl/${team}`)
    const myJson = await response.json()
    var teamName = myJson.Team_Name
    var teamDescription = myJson.Team_Description
    var teamLogo = myJson.Team_Logo
    document.getElementById('team-name-div').innerHTML = teamName
    document.getElementById('team-des-div').innerHTML = teamDescription
    document.getElementById('team-logo-div').src = teamLogo
    console.log(JSON.stringify(myJson))
}

const dropDown = (selectedTeam) => {
    team = selectedTeam
    console.log(`Team selected is ${team}`)
    callApi(team)
}