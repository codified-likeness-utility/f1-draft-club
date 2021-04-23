document.addEventListener('DOMContentLoaded', () => {
    console.log('Content Loaded')
    fetchDrivers()
    fetchTeamDrivers()
    fetchSchedule()
    fetchUserFantasyTeam()
    // setupEditTeamName()
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
                    driverInfo.innerText = 'Information about each driver. This is jus a quick example to fill up some space.'

                  const addDriver = document.createElement('button') 
                    addDriver.className =  "btn btn-primary"
                    addDriver.innerText = "Add Driver"
                    addDriver.addEventListener('click', (e) => {
                        e.preventDefault()
                        createTeamPick(e, driver)
                    })

                const toggleDiv = document.createElement('div')
                    toggleDiv.classList.add("form-check", "form-switch")

                    const turboToggle = document.createElement('input')
                        turboToggle.className = "form-check-input"
                        turboToggle.setAttribute("type", "checkbox")                     
                        turboToggle.id = "flexSwitchCheckCheck"
                        turboToggle.addEventListener('click', (e) => {
                            e.preventDefault()
                            console.log('turbo toggled!')
                            if (driver.turbo_driver == false) {
                                driver.turbo_driver = true
                                const tdPoints = document.querySelector('#td-points')
                                    tdPoints.innerHTML = driver.standings[0].points * 2
                                 
                            } else {
                                driver.turbo_driver = false 
                            }

                            createTurboDriver(driver)                                                                           

                        })

                    const label = document.createElement('label')
                        label.className = "form-check-label"
                        label.setAttribute("for", "flexSwitchCheckCheck")
                        label.innerText = "Turbo Driver"



    driverContainer.append(driverCard)
        driverCard.append(driverCardImage, driverCardBody) 
        driverCardBody.append(driverName, driverSalary, driverInfo, addDriver, toggleDiv)
        toggleDiv.append(turboToggle, label)
}

const createTurboDriver = (driver) => {
    fetch(`http://localhost:3000/drivers/${driver.id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            turbo_driver: driver.turbo_driver
        })
    })
    .then(response => response.json())
    .then(data => {console.log(data)})
}


const createTeamPick = (e, driver) => {
    e.preventDefault()
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
            user_fantasy_team_id: 7

        })
    })
    .then(response => response.json())
    .then(newPick => {
        fetchTeamDrivers()
    })
}


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
                    tableDataPoints.id = 'td-points'
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

const fetchSchedule = () => {
    fetch('http://localhost:3000/schedules')
    .then(response => response.json())
    .then(schedules => {
        schedules.forEach(schedule => {
            renderSchedule(schedule)
        })
    })
}

const renderSchedule = (schedule) => {
    const cName = schedule.circuit
    const tableBody = document.querySelector('.schedule-body')
            const tableRow = document.createElement('tr')

                const circuitName = document.createElement('td')
                    circuitName.innerHTML = `<strong>${schedule.circuitName}</strong>`

                const circuitCountry = document.createElement('td')
                    // circuitCountry.innerHTML = `${schedule.country}`

                    const countryFlag = document.createElement('img')
                        countryFlag.src = `https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Flags%2016x9/${schedule.country.toLowerCase()}-flag.png.transform/2col/image.png`
                        circuitCountry.append(countryFlag)

                const circuitLocality = document.createElement('td')
                    circuitLocality.innerHTML = `${schedule.locality}`

                const circuitRaceDate = document.createElement('td')
                    circuitRaceDate.innerHTML = `${schedule.date}`

                const circuitDetails = document.createElement('button')
                    circuitDetails.className = "btn btn-outline-success btn-sm"
                    circuitDetails.innerHTML = "Map"
                    
                        circuitDetails.addEventListener('click', (e) => {
                            
                            renderNewCircuitMap(e, schedule)
                        })

    tableBody.append(tableRow)
        tableRow.append(circuitName, circuitCountry, circuitLocality, circuitRaceDate, circuitDetails)
            
}

const renderNewCircuitMap = (e, schedule) => {
    e.preventDefault()

    const circuitDivContainer = document.getElementById('circuit-info')
        circuitDivContainer.innerHTML = ""
        const circuitTitle = document.createElement('h1')
            circuitTitle.innerHTML = schedule.circuitName
                const circuitMap = document.createElement('img')
                    circuitMap.src = `https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/${schedule.country}_Circuit.png.transform/8col/image.png`
                        
    circuitDivContainer.append(circuitTitle, circuitMap)   
}

const fetchUserFantasyTeam = () => {
    fetch('http://localhost:3000/user_fantasy_teams')
    .then(response => response.json())
    .then(teams => {
        renderUserFantasyTeam(teams)
    })
}

const renderUserFantasyTeam = (teams) => {

const driverContainer = document.querySelector('.driver-container')

    const teamNameContainer = document.createElement('div')
        teamNameContainer.className = "container p-3 my-3 border text-white"
        teamNameContainer.id = "team-container"

        const teamName = document.createElement('h1')
            teamName.innerHTML = teams[0].name

        const teamForm = document.createElement('div')
            teamForm.className = 'form-container p-5 mx-auto col-4'

            const editButton = document.createElement('a')
                editButton.className = "btn btn-dark"
                editButton.setAttribute("data-toggle", "collapse")
                editButton.href = "#team-form"
                editButton.setAttribute("role", "button")
                editButton.setAttribute("aria-expanded", "false")
                editButton.setAttribute("aria-controls", "collapseFormButton")
                editButton.innerText = "Edit Team Name"

            const editForm = document.createElement('form')
                editForm.id = "team-form"
                editForm.className = "collapse multi-collapse"

                const br = document.createElement('br')

                const formGroup = document.createElement('div')
                    formGroup.className = "form-group"

                    const inputLabel = document.createElement('label')
                        inputLabel.setAttribute("for", "Name")
                        inputLabel.innerText = "Name"

                    const nameInput = document.createElement('input')
                        nameInput.type = "text"
                        nameInput.className = "form-control"
                        nameInput.id = "name"
                        nameInput.setAttribute("aria-describedby", "nameInput")

                const submitButton = document.createElement('button')
                    submitButton.type = "submit"
                    submitButton.className = "btn btn-primary"
                    submitButton.innerText = "Submit"

        editForm.addEventListener('submit', (e) => {
            e.preventDefault()
            updateTeamName(e, teams)
        })
                    

            const remainingBudget = document.createElement('h4')
                remainingBudget.innerHTML = `Remaining Budget: ${teams[0].budget}`

            const progressBarDiv = document.createElement('div')
                progressBarDiv.className = "progress"

                const progressBar = document.createElement('div')
                    progressBar.className = "progress-bar bg-success progress-bar-striped"
                    progressBar.setAttribute("role", "progressbar")
                    progressBar.style = "width: 63%;"
                    progressBar.setAttribute("aria-valuenow", "0")
                    progressBar.setAttribute("aria-valuemin", "0")
                    progressBar.setAttribute("aria-valuemax", "100")
                    progressBar.innerText = teams[0].budget

        const circuitInfo = document.createElement('div')
            circuitInfo.className = "container p-3 my-3 bg-dark text-white"
            circuitInfo.id = "circuit-info"
    
driverContainer.append(teamNameContainer, circuitInfo)
    teamNameContainer.append(teamName, teamForm)
        teamForm.append(editButton, editForm, remainingBudget, progressBarDiv)
            editForm.append(br, formGroup)
                formGroup.append(inputLabel, nameInput, submitButton)
                    progressBarDiv.append(progressBar)
}

const updateTeamName = (e, teams) => {
    e.preventDefault()
    debugger
    fetch(`http://localhost:3000/user_fantasy_teams/${team[0].id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            name: e.target[0].value
        })
    })
    .then(response)
}
// const setupEditTeamName = () => {

//     const teamForm = document.getElementById('team-form')
//         teamForm.addEventListener('submit', (e) => {
//             e.preventDefault()
//             console.log(e)
//             // editTeamName(teamForm)
//         })
// }

// const editTeamName = () => {

//     fetch()
// }