document.addEventListener('DOMContentLoaded', () => {
    console.log('Content Loaded')
    fetchDrivers()
    fetchUserFantasyTeam()
});

const fetchDrivers = () => {
    fetch('http://localhost:3000/drivers')
    .then(response => response.json())
    .then(drivers => {
        drivers.forEach(driver => {
            renderDrivers(driver)
        })
    })
}

const renderDrivers = (driver) => {
    const driverContainer = document.querySelector('.right-container')

        const driverCard = document.createElement('div')
            driverCard.className = 'card'
            driverCard.style = 'width: 14rem;'
            driverCard.setAttribute('value', false)

            const driverCardImage = document.createElement('img')
                driverCardImage.src = `https://f1drivers.s3.us-east-2.amazonaws.com/profile-pics/${driver.familyName}.png`
                driverCardImage.className = 'card-img-top'

            const driverCardBody = document.createElement('div')
                driverCardBody.className = 'card-body'
            
                const driverName = document.createElement('h5')
                    driverName.className = 'card-title'
                    driverName.innerText = `${driver.givenName} ${driver.familyName}`

                const driverInfo = document.createElement('p')
                    driverInfo.className = 'card-text'
                    driverInfo.innerText = 'Information about each driver. This is jus a wuick example to fill up some space.'

                  const addDriver = document.createElement('button') 
                    addDriver.className =  "btn btn-primary"
                    addDriver.innerText = "Add Driver"
                    addDriver.addEventListener('click', (e) => {
                        e.preventDefault()
                        createTeamPick(driver)
                    })

    driverContainer.append(driverCard)
        driverCard.append(driverCardImage, driverCardBody) 
        driverCardBody.append(driverName, driverInfo, addDriver)
}

const createTeamPick = (driver) => {
    console.log("made it to create team")
    console.log(driver)
    fetch('http://localhost:3000/team_picks', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            driver_id: driver.id,
            standing_id: driver.standings[0].id,
            result_id: driver.results[0].id,
            user_fantasy_team_id: 1
        })
    })
    .then(response => response.json())
    .then(newPick => {
        fetchUserFantasyTeam()
    })
}

const fetchUserFantasyTeam = () => {
    fetch('http://localhost:3000/user_fantasy_teams')
    .then(response => response.json())
    .then(teamDrivers => {
        const tableBody = document.querySelector('.team-body')
            tableBody.innerHTML = ""

        teamDrivers.forEach(teamDriver => {
            renderTeamDrivers(teamDriver)
        })
    })
}

const renderTeamDrivers = (teamDriver) => {

    teamDriver.drivers.forEach(driver => {
        debugger
        const tableBody = document.querySelector('.team-body')
            const tableRow = document.createElement('tr')

                const tableDataRank = document.createElement('td')
                    tableDataRank.innerText = ''
                const tableDataFirstName = document.createElement('td')
                    tableDataFirstName.innerText = driver.givenName
                const tableDataLastName = document.createElement('td')
                    tableDataLastName.innerText = driver.familyName
            
    tableBody.append(tableRow)
        tableRow.append(tableDataRank, tableDataFirstName, tableDataLastName)
    })
}