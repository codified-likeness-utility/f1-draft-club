document.addEventListener('DOMContentLoaded', () => {
    console.log('Content Loaded')
    fetchDrivers()
    fetchTeamDrivers()
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

    const salaryConversion = (driver.salary).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })

    const driverContainer = document.querySelector('.driver-container')

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

                const driverSalary = document.createElement('h6')
                    driverSalary.innerHTML = `<strong>Salary:</strong> ${salaryConversion}`

                const driverInfo = document.createElement('p')
                    driverInfo.className = 'card-text'
                    driverInfo.innerText = 'Information about each driver. This is jus a wuick example to fill up some space.'

                  const addDriver = document.createElement('button') 
                    addDriver.className =  "btn btn-primary"
                    addDriver.innerText = "Add Driver"
                    addDriver.addEventListener('click', (e) => {
                        e.preventDefault()
                        createTeamPick(e, driver)
                    })

    driverContainer.append(driverCard)
        driverCard.append(driverCardImage, driverCardBody) 
        driverCardBody.append(driverName, driverSalary, driverInfo, addDriver)
}

const createTeamPick = (e, driver) => {
    e.preventDefault()
    debugger
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
            user_fantasy_team_id: 3
        })
    })
    .then(response => response.json())
    .then(newPick => {
        fetchTeamDrivers()
    })
}

// const fetchUserFantasyTeam = () => {
//     fetch('http://localhost:3000/user_fantasy_teams')
//     .then(response => response.json())
//     .then(teamDrivers => {
//         const tableBody = document.querySelector('.team-body')
//             tableBody.innerHTML = ""

//         teamDrivers.forEach(teamDriver => {
//             console.log(teamDriver)
//         })
//     })
// }

const fetchTeamDrivers = () => {
    fetch('http://localhost:3000/team_picks')
    .then(response => response.json())
    .then(drivers => {
        const tableBody = document.querySelector('.team-body')
            tableBody.innerHTML = ""
        renderTeamDrivers(drivers)
    })
}

const renderTeamDrivers = (drivers) => {
    
    drivers.forEach(driver => {
        const tableBody = document.querySelector('.team-body')
            const tableRow = document.createElement('tr')
                tableRow.className = `${driver.driverId}`

                const tableDataRank = document.createElement('td')
                    tableDataRank.innerText = driver.driver.standings[0].racePosition
                const tableDataDriverName = document.createElement('td')
                    tableDataDriverName.innerText = `${driver.driver.givenName} ${driver.driver.familyName}`
                const tableDataPoints = document.createElement('td')
                    tableDataPoints.innerText = driver.driver.standings[0].points
                const driverWins = document.createElement('td')
                    driverWins.innerText = driver.driver.standings[0].wins

                const deleteButton = document.createElement('button')
                    deleteButton.className = "btn btn-outline-danger btn-sm"
                    deleteButton.innerHTML = "Remove"
                    
                    deleteButton.addEventListener('click', () => {
                        fetch(`http://localhost:3000/team_picks/${driver.id}`, {
                            method: 'DELETE'
                        })
                        tableRow.remove()
                    })

    tableBody.append(tableRow)
        tableRow.append(tableDataRank, tableDataDriverName, tableDataPoints, driverWins, deleteButton)
    })
}
