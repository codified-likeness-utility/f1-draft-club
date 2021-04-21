document.addEventListener('DOMContentLoaded', () => {
    console.log('Content Loaded')
    fetchDrivers()
    renderTeamDrivers()
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
                driverCardImage.src = 'https://f1imageuploads.s3.amazonaws.com/whitelabel/f1/production/season_4_2021/players/profile/12/Hamilton-Profile.png'
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
                    addDriver.addEventListener('click', () => {
                        console.log("driver added!")
                    })

    driverContainer.append(driverCard)
        driverCard.append(driverCardImage, driverCardBody) 
        driverCardBody.append(driverName, driverInfo, addDriver)
}

const renderTeamDrivers = (userFantasyTeamDriver) => {
    const teamDriverContainer = document.querySelector('.left-container')

        const teamTable = document.querySelector('.table table-striped')
            const tableBody = document.querySelector('#tbody')
                const tableRow = document.createElement('tr')
                    const tableDataRank = document.createElement('td')
                        tableDataRank.innerText = `${userFantasyTeamDriver.rank}`
                    const tableDataFirstName = document.createElement('td')
                        tableDataFirstName.innerText = `${userFantasyTeamDriver.rank}`
                    const tableDataLastName = document.createElement('td')
                        tableDataLastName.innerText = `${userFantasyTeamDriver.rank}`
                    

        const saveTeamDrivers = document.createElement('button')
            saveTeamDrivers.className = '"btn btn-primary"'
            saveTeamDrivers.innerText = "Save Team"

                saveTeamDrivers.addEventListener('click', () => {
                    const driverCard = document.querySelector('.card')
                    // debugger
                    
                    if (driverCard.attributes.value.value == "false") {
                        console.log('deleted')
                    } else {
                        console.log('saved to team')
                    }
                })

    teamDriverContainer.append(saveTeamDrivers)
}