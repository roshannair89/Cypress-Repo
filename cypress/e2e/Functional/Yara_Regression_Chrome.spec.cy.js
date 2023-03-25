///<reference types="cypress"/>
import { exit } from "process"
import BookRoom from "../Functional/PageObjects/BookMeeting.js"
import Desk from "../Functional/PageObjects/ReserveDesk.js"


describe("Yaraworks-Functional TEST SUITE", () => {

    beforeEach(() => {

        cy.Prdlogin()
        cy.visit('/app')

    })


    it.skip('Book Mixer event', () => {

        //Create a Mixer event
        cy.contains('Meet for Coffee').click()//Click on Meet for Coffee
        cy.contains('View profile')//Check View Profile button
        cy.contains('Send request').should('have.attr', 'href')//Check Send Request button
        cy.get('.mYuyo').find('div').first().then(function (text) {

            const user = text.text()
            cy.log('User =' + user)

            if (user.includes("Mary Verissimo")) {

                cy.log("Test paused as the user found is Mary")
                cy.pause()

            }
        })

        cy.contains('Send request').click() //click on Send Request button
        //cy.contains("Got it").should('have.attr', 'type', 'button').click()//Check the Covid notification and click on Got it


        cy.contains("Back to Mixer").should('have.attr', 'type', 'button')
        //cy.contains("Confirm").should('have.attr','type','submit')
        //cy.get('#name').clear().type("Testing Mixer-Please ignore")


        //Below code is to ignore the ResolveObserve loop exception
        cy.on('uncaught:exception', (e, runnable) => {
            console.log('error', e)
            console.log('runnable', runnable)
            if (e.message.includes('ResizeObserver')) {
                // we expected this error, so let's ignore it
                // and let the test continue
                return false
            }
            // on any other error message the test fails
        })

        var current = new Date();
        cy.contains("Confirm").click() //Click  to Confirm the event
        //Below code is ensure the pop up modal displayed has the necessary details
        cy.contains("Meeting created")//Check Modal label
        //cy.contains("Meet for Coffee")//Check details displayed on pop up modal
        cy.contains("Okay").should('have.attr', 'type', 'button').click()//Check Okay button

        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })


    })

    it.skip('Edit Mixer event', () => {

        cy.wait(5000)
        cy.contains("Meet for Coffee -").click()
        //cy.contains("Testing Mixer- Please ignore")
        cy.contains("Edit Meeting").click({ force: true })
        //cy.contains("Got it").should('have.attr', 'type', 'button').click()//Check the Covid notification and click on Got it
        cy.wait(5000)
        cy.get('#meetingUrl').scrollIntoView().should('be.visible')
        cy.contains("Cancel Meeting")
        cy.contains('Looking forward to connecting.').type("This is a Test script for Edit Mixer event")
        cy.contains('Update Meeting').click()
        //Below code is to ignore the ResolveObserve loop exception
        cy.on('uncaught:exception', (e, runnable) => {
            console.log('error', e)
            console.log('runnable', runnable)
            if (e.message.includes('ResizeObserver')) {
                // we expected this error, so let's ignore it
                // and let the test continue
                return false
            }
            // on any other error message the test fails
        })

        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })


    })

    it.skip('Cancel Mixer event', () => {
        cy.wait(5000)
        //Below code is to cancel the booked mixer event
        //Click the first mixer event
        cy.contains("Meet for Coffee -").click()
        cy.wait(5000)
        //cy.contains("Testing Mixer-Please ignore")
        cy.contains("Cancel Meeting").click()
        cy.contains("Meeting Cancelled")
        cy.contains('Okay').click()

        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })

    })


    it("Book a meeting", () => {


        const br = new BookRoom() //Calling POM class BookRoom
        cy.contains("New Meeting").click()//click on New meeting quick access button
        //Below code is to ignore the ResolveObserve loop exception
        cy.on('uncaught:exception', (e, runnable) => {
            console.log('error', e)
            console.log('runnable', runnable)
            if (e.message.includes('ResizeObserver')) {
                // we expected this error, so let's ignore it
                // and let the test continue
                return false
            }
            // on any other error message the test fails
        })
        cy.contains("Create a meeting")//check meeting title is displayed
        br.setMeetingTitle();//Add Title to the meeting
        var current = new Date();
        cy.contains("Add people").click()//Add invitees
        br.searchPerson()//Search test to search for Matthew Powaschuk
        cy.contains("Matthew Powaschuk").click()//check if Matthew Powaschuk is returned in Search
        cy.contains('Okay').click()//Click Ok
        cy.wait(2000)

        cy.contains("Add location").click()//Add meeting location
        cy.contains("Floor 004").click()//Open Flor dropdown
        //cy.contains("Floor 00").click()
        cy.contains('004-', { timeout: 5000 }).click()//Select a Room
        br.clickBook()//Click on Book button
        //var tempStart = current.getHours() + 1
        //var tempEnd = current.getHours() + 2
        cy.wait(2000)
        cy.contains('Confirm').click({ force: true })
        cy.contains("Meeting created")
        cy.contains("New Testing-Please ignore")
        cy.contains("Okay").click()

        //Check event details screen
        // cy.wait(20000)
        // cy.contains("New Testing-Please ignore").click()
        // cy.contains("Meeting Details")
        // cy.contains("Location")
        // cy.contains("Room 005-")
        // cy.contains("Floor 005 • TELUS Sky")
        // cy.contains("Participants")
        // cy.contains("Organizer")
        // cy.contains("Roshan Nair")
        // cy.contains("Matthew Powaschuk")
        // cy.contains("Edit Meeting").should('have.attr', 'type', 'button')
        // cy.contains('Cancel Meeting').should('have.attr', 'type', 'button')

        //Check if the meeting time displayed is as per users time zone
        var d = new Date();
        var month = d.toLocaleString('default', { month: 'short' })
        var year = d.getFullYear()
        var date = d.getDate()
        var day = d.toLocaleDateString('default', { weekday: 'long' });
        var hour = d.getHours()
        var min = ('0' + d.getMinutes()).slice(-2)
        cy.log(day + ', ' + month + ' ' + date + ', ' + year + ' ' + (hour - 12) + ':' + min)

        if (hour <= 12) {

            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year
        }
        else if (hour == 12) {

            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year

        }
        else {
            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year
        }

        // cy.get('.llHneK').then(function (text) {

        //     cy.log("Displayed timestamp=" + text.text())
        //     expect(text.text()).to.include(timeStamp)


        // })

        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })

    })


    it('Edit Meeting ', () => {

        //cy.wait(20000)
        const br = new BookRoom() //Calling POM class BookRoom
        cy.contains("New Testing-Please ignore", { timeout: 100000 }).click()
        cy.contains('button', 'Edit Meeting').click()
        cy.contains("Cancel Meeting")
        cy.get('#meetingUrl').scrollIntoView().should('be.visible')
        br.addMeetingDesc();
        cy.contains('Update Meeting').click()

        //Below code is to ignore the ResolveObserve loop exception
        cy.on('uncaught:exception', (e, runnable) => {
            console.log('error', e)
            console.log('runnable', runnable)
            if (e.message.includes('ResizeObserver')) {
                // we expected this error, so let's ignore it
                // and let the test continue
                return false
            }
            // on any other error message the test fails
        })

        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })

    })


    it('Cancel Meeting', () => {

        //cy.wait(20000)

        //Below code is to cancel the booked meeting room
        cy.contains("New Testing-Please ignore", { timeout: 100000 }).click()//Click on Meeting event on Home feed
        cy.contains("Edit Meeting")//Check if Edit meeting is present on the page
        cy.contains("Cancel Meeting").click()//Click on Cancel meeting
        cy.contains("Meeting Cancelled")
        cy.contains('Okay').click()

        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })

    })


    it("Reserve a desk", () => {

        const rd = new Desk()
        cy.contains("Reserve a desk").click()//click on New Desk quick access button

        //Below code is to ignore the ResolveObserve loop exception
        cy.on('uncaught:exception', (e, runnable) => {
            console.log('error', e)
            console.log('runnable', runnable)
            if (e.message.includes('ResizeObserver')) {
                // we expected this error, so let's ignore it
                // and let the test continue
                return false
            }
            // on any other error message the test fails
        })
        var current = new Date();
        var year = current.getFullYear();
        cy.log("Current year=" + year)
        cy.contains("Add people")
        //cy.contains(year).click({ force: true })
        //cy.contains("Save").click({force: true})//Click Save button on Calendar'
        cy.contains("Add recurrence")
        cy.contains("Reserve near a colleague")//Check this option is visible
        cy.contains("Make your desk location public so team members can find a desk near you")//Check this toggle is visible
        cy.contains("Add location").click()//Click Add location to select a Desk
        cy.contains("Booking Details").click()//Click on Booking Details button
        rd.setTime()//Set reservation time from 8am to 5pm

        //Validation to check am/pm and change start time from pm to am
        cy.get('[data-testid="select-startTimeMeridian"] > .select__SelectField-sc-118hxxp-4 > .react-select-container__control > .react-select-container__value-container').then(function (text) {

            const ampm = text.text()
            cy.log('Time =' + ampm)

            if (ampm == 'p.m.') {

                cy.get('[data-testid="select-startTimeMeridian"] > .select__SelectField-sc-118hxxp-4 > .react-select-container__control > .react-select-container__value-container').click()
                cy.wait(500)
                cy.get('#react-select-6-option-0').click()
                //cy.contains('a.m.').click({force:true})
            }

            //Select Endtime to be p.m. if it is a.m.
            cy.get('[data-testid="select-endTimeMeridian"] > .select__SelectField-sc-118hxxp-4 > .react-select-container__control > .react-select-container__value-container').click()
            cy.wait(500)
            cy.get('#react-select-5-option-1').click({ force: true })


        })

        cy.contains("Add location").click()//Add meeting location
        cy.contains("Floor 004").click()
        cy.contains("Floor 007").click()//Open Floor dropdown
        cy.contains('007-', { timeout: 5000 }).click()

        //Click Book button
        rd.clickBook()
        cy.wait(5000)

        //Click confirm button

        cy.contains("Confirm").click({ force: true })
        cy.contains("Reservation Created")
        cy.contains("Okay").click()
        cy.wait(2000)
        //cy.contains("Desk Reservation")

        //Check Desk Reservation Details
        //cy.wait(2000)
        // cy.contains("Desk Reservation",{ timeout: 5000 }).click()
        // cy.contains("Reservation Details")
        // cy.contains("Location")
        // cy.contains("Desk 007-")
        // cy.contains("Floor 007 • TELUS Sky")
        // cy.contains("Participants")
        // cy.contains("Roshan Nair")
        // cy.contains("Edit Reservation").should('have.attr', 'type', 'button')
        // cy.contains('Cancel Reservation').should('have.attr', 'type', 'button')

        var d = new Date();
        var month = d.toLocaleString('default', { month: 'short' })
        var year = d.getFullYear()
        var date = d.getDate()
        var day = d.toLocaleDateString('default', { weekday: 'long' });
        var hour = d.getHours()
        var min = ('0' + d.getMinutes()).slice(-2)
        cy.log(day + ', ' + month + ' ' + date + ', ' + year + ' ' + (hour - 12) + ':' + min)

        if (hour <= 12) {

            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year
        }
        else if (hour == 12) {

            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year

        }
        else {
            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year
        }

        //Check to verify Reservation details including Timestamp
        // cy.get('.sc-78c4b0ff-18 > div').then(function (text) {

        //     cy.log("Displayed timestamp=" + text.text())
        //     expect(text.text()).to.include(timeStamp)


        // })


        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })
    })


    it('Edit Desk Reservation ', () => {

        cy.get('.MuiGrid-grid-md-7').then(function (text) {

            const text2 = text.text()
            cy.log("Text2= " + text2)
            if (text2.includes('Oooh, looks like you have some free time.')) {

                cy.log("Text2 in second if block= " + text2)
                cy.contains('Earlier today').click()
                cy.on('uncaught:exception', (e, runnable) => {
                    console.log('error', e)
                    console.log('runnable', runnable)
                    if (e.message.includes('ResizeObserver')) {
                        // we expected this error, so let's ignore it
                        // and let the test continue
                        return false
                    }
                    // on any other error message the test fails
                })


            }
            else {

                // element exists, do something
                cy.wait(10000)
                cy.contains("Desk Reservation").click()
                cy.contains("Reservation Details")
                cy.contains("Edit Reservation").click()
                //cy.contains("Got it").should('have.attr', 'type', 'button').click()//Check the Covid notification and click on Got it
                cy.wait(5000)
                cy.contains("Cancel Reservation")
                //cy.contains("Add location")
                // cy.get('.SLj').type("This is a Test script for Edit Meeting event")
                cy.contains('Update Reservation').click()
                //Below code is to ignore the ResolveObserve loop exception
                cy.on('uncaught:exception', (e, runnable) => {
                    console.log('error', e)
                    console.log('runnable', runnable)
                    if (e.message.includes('ResizeObserver')) {
                        // we expected this error, so let's ignore it
                        // and let the test continue
                        return false
                    }
                    // on any other error message the test fails
                })
            }


        })

        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })


    })


    it('Cancel Desk Reservation', () => {

        //Below code is to cancel the booked meeting room
        cy.get('.MuiGrid-grid-md-7').then(function (text) {

            // const text2 = text.text()
            // if (text2.includes('Oooh, looks like you have some free time.')) {

            //     cy.contains('Earlier today').click()
            //     cy.contains('Desk Reservation').click()
            //     cy.contains('Desk Reservation')
            //     cy.contains("Reservation Details")
            //     cy.contains("Cancel Reservation").click()
            //     cy.contains("Reservation Cancelled")
            //     cy.contains('Okay').click()
            // }

            // else {
            cy.wait(10000)
            cy.contains('Desk Reservation').click()
            cy.wait(5000)
            cy.contains('Desk Reservation')
            cy.contains("Reservation Details")
            cy.contains("Cancel Reservation").click()
            cy.contains("Reservation Cancelled")
            cy.contains('Okay').click()


            //}
        })

        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })

    })

    it.skip("Demo", () => {

        const rd = new Desk()

        // on any other error message the test fails

        cy.contains("Spaces").click()
        cy.contains("Floor 004").click()
        cy.contains("Floor 007").click()
        cy.get("#Desks").click()
        cy.contains("007-").click()
        rd.clickBook()
        //cy.contains(year).click({ force: true })
        //cy.contains("Save").click()//Click Save button on Calendar
        //rd.setTime()
        cy.get('.sc-6b1e53c6-0 > .sc-8ea21711-0 > .src__Button-sc-4i4sor-0').click()

        cy.on('uncaught:exception', (e, runnable) => {
            console.log('error', e)
            console.log('runnable', runnable)
            if (e.message.includes('ResizeObserver')) {
                // we expected this error, so let's ignore it
                // and let the test continue
                return false
            }

        })

    })

    it("Reserve a Book on behalf desk", () => {

        cy.contains("Reserve a desk").click()//click on New Desk quick access button
        //cy.wait(5000)
        const rd = new Desk()

        //Below code is to ignore the ResolveObserve loop exception
        cy.on('uncaught:exception', (e, runnable) => {
            console.log('error', e)
            console.log('runnable', runnable)
            if (e.message.includes('ResizeObserver')) {
                // we expected this error, so let's ignore it
                // and let the test continue
                return false
            }
            // on any other error message the test fails
        })

        cy.contains("Reserve a desk")//check Desk title is displayed
        var current = new Date();
        var year = current.getFullYear();
        cy.log("Current year=" + year)
        cy.contains("Add people").click()//Add invitees
        cy.get('#autoCompleterInput').type('Matthew Powasc')//Search test to search for Gaurav Shukla
        cy.contains("Matthew Powaschuk").click()//check if Gaurav Shukla is returned in Search
        cy.contains('Okay').click()//Click Ok
        //cy.contains(year).click({ force: true })
        //cy.contains("Save").click()//Click Save button on Calendar
        rd.setTime()

        //Validation to check am/pm and change start time from pm to am
        cy.get('[data-testid="select-startTimeMeridian"] > .select__SelectField-sc-118hxxp-4 > .react-select-container__control > .react-select-container__value-container').then(function (text) {

            const ampm = text.text()
            cy.log('Time =' + ampm)

            if (ampm == 'p.m.') {

                cy.get('[data-testid="select-startTimeMeridian"] > .select__SelectField-sc-118hxxp-4 > .react-select-container__control > .react-select-container__value-container').click()
                cy.wait(200)
                cy.get('#react-select-8-option-0').click()
                //cy.contains('a.m.').click({force:true})
            }

            //Select Endtime to be p.m. if it is a.m.
            cy.get('[data-testid="select-endTimeMeridian"] > .select__SelectField-sc-118hxxp-4 > .react-select-container__control > .react-select-container__value-container').click()
            cy.get('#react-select-5-option-1').click({ force: true })

        })

        cy.contains("Add location").click({ force: true })//Add meeting location
        cy.contains("Floor 004").click()//Open Floor dropdown
        //cy.contains("Floor 007").scrollIntoView().click()//Open Floor dropdown
        //cy.contains("Floor 004").scrollIntoView().click()
        cy.contains("Floor 007").scrollIntoView().click()
        cy.wait(2000)
        cy.contains('007-').click()

        //Click Book button
        rd.clickBook()

        //Remove Organizer from the participant list
        cy.get(':nth-child(2) > .src__IconWrap-sc-14x35bd-14 > .avatar-icon').click({ force: true })

        //Click confirm button

        cy.contains("Confirm").click({ force: true })
        cy.contains("Reservation Created")
        cy.contains("Okay").click()


        //Check Desk Reservation Details
        // cy.contains("Booked on Behalf").click()
        // cy.contains("Desk Reservation").click()
        // cy.contains("Reservation Details")
        // cy.contains("Location")
        // cy.contains("Desk 007-")
        // cy.contains("Floor 007 • TELUS Sky")
        // cy.contains("Participants")
        // cy.contains("Reserved By")
        // cy.contains("Roshan Nair")
        // cy.contains("Matthew Powaschuk")
        // cy.contains("Edit Reservation").should('have.attr', 'type', 'button')
        // cy.contains('Cancel Reservation').should('have.attr', 'type', 'button')

        var d = new Date();
        var month = d.toLocaleString('default', { month: 'short' })
        var year = d.getFullYear()
        var date = d.getDate()
        var day = d.toLocaleDateString('default', { weekday: 'long' });
        var hour = d.getHours()
        var min = ('0' + d.getMinutes()).slice(-2)
        cy.log(day + ', ' + month + ' ' + date + ', ' + year + ' ' + (hour - 12) + ':' + min)

        if (hour <= 12) {

            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year
        }
        else if (hour == 12) {

            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year

        }
        else {
            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year
        }

        // cy.get('.sc-78c4b0ff-18 > div').then(function (text) {

        //     cy.log("Displayed timestamp=" + text.text())
        //     expect(text.text()).to.include(timeStamp)


        // })


        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })



    })


    it('Edit Book on behalf Desk Reservation ', () => {

        const rd = new Desk()
        cy.wait(20000)
        cy.contains('Booked on Behalf', { timeout: 10000 }).click()
        cy.contains("Desk Reservation").click()
        cy.contains("Reservation Details")
        cy.contains("Edit Reservation").click()
        rd.editTitle()
        //cy.contains("Got it").should('have.attr', 'type', 'button').click()//Check the Covid notification and click on Got it
        cy.wait(3000)
        cy.contains("Cancel Reservation")
        cy.contains('Update Reservation').click()
        //Below code is to ignore the ResolveObserve loop exception
        cy.on('uncaught:exception', (e, runnable) => {
            console.log('error', e)
            console.log('runnable', runnable)
            if (e.message.includes('ResizeObserver')) {
                // we expected this error, so let's ignore it
                // and let the test continue
                return false
            }
            // on any other error message the test fails
        })



        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })


    })


    it('Cancel Book on behalf Desk Reservation', () => {


        //Below code is to cancel the booked meeting room
        cy.on('uncaught:exception', (e, runnable) => {
            console.log('error', e)
            console.log('runnable', runnable)
            if (e.message.includes('ResizeObserver')) {
                // we expected this error, so let's ignore it
                // and let the test continue
                return false
            }
            // on any other error message the test fails
        })
        cy.wait(20000)
        cy.contains("Booked on Behalf", { timeout: 10000 }).click()
        cy.contains('Update Desk Reservation').click()
        cy.wait(5000)
        cy.contains('Desk Reservation')
        cy.contains("Reservation Details")
        cy.contains("Cancel Reservation").click()
        cy.contains("Reservation Cancelled")
        cy.contains('Okay').click()


        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })

    })



    it("Book a Recurring meeting", () => {
        const rd = new BookRoom()

        cy.contains("New Meeting").click()//click on New meeting quick access button
        cy.wait(5000)
        //Below code is to ignore the ResolveObserve loop exception
        cy.on('uncaught:exception', (e, runnable) => {
            console.log('error', e)
            console.log('runnable', runnable)
            if (e.message.includes('ResizeObserver')) {
                // we expected this error, so let's ignore it
                // and let the test continue
                return false
            }
            // on any other error message the test fails
        })

        cy.wait(5000)
        cy.contains("Create a meeting")//check meeting title is displayed
        cy.get('#name').type("This is a Recurrence test meeting-Please ignore")//Add Title to the meeting
        //cy.contains("Add time").click()//Add time
        var current = new Date();
        cy.wait(5000)

        cy.get('#meetingUrl').scrollIntoView().should('be.visible')
        cy.contains("Add people").click()//Add invitees
        cy.get('#autoCompleterInput').type('Matthew Powasch')//Search test to search for Gaurav Shukla
        cy.contains("Matthew Powaschuk").click()//check if Gaurav Shukla is returned in Search
        cy.contains('Okay').click()//Click Ok
        cy.wait(2000)
        cy.contains("Add location(s)").click()//Add meeting location
        cy.wait(2000)
        cy.contains("Floor 004").scrollIntoView().click()
        cy.contains("Floor 006").click()//Open Flor dropdown
        cy.wait(2000)
        cy.contains('006-').click()//Select a Room
        cy.wait(2000)
        rd.clickBook()//Click on Book button
        var tempStart = current.getHours() + 1
        var tempEnd = current.getHours() + 2
        cy.wait(2000)
        cy.contains("Add recurrence").click()
        cy.contains("Does not repeat")
        cy.contains("Daily")
        cy.contains("Weekly")
        cy.contains("Monthly")
        cy.contains("Annually")
        cy.contains("Every weekday")

        cy.contains("Daily").click()
        cy.contains("End date")
        cy.contains("December 31")
        cy.contains("Note, 30 events will be created")
        cy.contains("After number of occurrences").click()
        cy.wait(5000)
        cy.get('.bizJBN').type("0")
        cy.contains("Okay").click()


        cy.contains('Confirm').click({ force: true })
        cy.wait(5000)//Confirm the meeting booking
        cy.contains("Meeting created")
        cy.contains("Okay").click()
        //Check event details screen

        cy.wait(5000)
        cy.contains("This is a Recurrence test meeting-Please ignore").click()
        cy.contains("Meeting Details")
        cy.contains("Participants")
        cy.contains("Organizer")
        cy.contains("Roshan Nair")
        cy.contains("Matthew Powaschuk")
        cy.contains("Daily")
        cy.contains("Edit Meeting").should('have.attr', 'type', 'button')
        cy.contains('Cancel Meeting').should('have.attr', 'type', 'button')

        var d = new Date();
        var month = d.toLocaleString('default', { month: 'short' })
        var year = d.getFullYear()
        var date = d.getDate()
        var day = d.toLocaleDateString('default', { weekday: 'long' });
        var hour = d.getHours()
        var min = ('0' + d.getMinutes()).slice(-2)
        cy.log(day + ', ' + month + ' ' + date + ', ' + year + ' ' + (hour - 12) + ':' + min)

        if (hour <= 12) {

            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year
        }
        else if (hour == 12) {

            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year

        }
        else {
            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year
        }

        cy.get('.llHneK').first().then(function (text) {

            cy.log("Displayed timestamp=" + text.text())
            expect(text.text()).to.include(timeStamp)


        })



        //Check if the event is created for the following days as well

        cy.get('.fQLJOi').click()//click on the 'x' button to close Meeting details screen
        var date = current.getDate()
        var day = current.toLocaleDateString('default', { weekday: 'short' });
        cy.contains(date)
        cy.contains(day)
        cy.contains(date + 1).click()//Click on the next calendar date
        cy.log("Date is CHECKED")
        cy.contains("This is a Recurrence test meeting-Please ignore", { timeout: 2000 }).click()//Check for the event
        cy.contains("Meeting Details")//Check the Details
        cy.contains("Participants")
        cy.contains("Organizer")
        cy.contains("Roshan Nair")
        cy.contains("Matthew Powaschuk")
        cy.contains("Daily")
        cy.contains("Edit Meeting").should('have.attr', 'type', 'button')
        cy.contains('Cancel Meeting').should('have.attr', 'type', 'button')
        cy.log("Following Day checked")
        //cy.get('.bgwodP').click()//Click the Month Year icon to collapse the calendar

        //Check for event on current day + 2

        cy.get('.fQLJOi').click()//click on the 'x' button to close Meeting details screen
        var date = current.getDate()
        var day = current.toLocaleDateString('default', { weekday: 'short' });
        cy.contains(date)
        cy.contains(day)
        cy.contains(date + 2).click()//Click on the next calendar date
        cy.log("Date is CHECKED")
        cy.contains("This is a Recurrence test meeting-Please ignore", { timeout: 2000 }).click()//Check for the event
        cy.contains("Meeting Details")//Check the Details
        cy.contains("Participants")
        cy.contains("Organizer")
        cy.contains("Roshan Nair")
        cy.contains("Matthew Powaschuk")
        cy.contains("Daily")
        cy.contains("Edit Meeting").should('have.attr', 'type', 'button')
        cy.contains('Cancel Meeting').should('have.attr', 'type', 'button')
        cy.log("Following Day + 1 also checked")

        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })




    })

    it("Recurring Desk Reservation", () => {
        const rd = new Desk()

        cy.contains("Reserve a desk").click()//click on New meeting quick access button
        //cy.wait(5000)
        //Below code is to ignore the ResolveObserve loop exception
        cy.on('uncaught:exception', (e, runnable) => {
            console.log('error', e)
            console.log('runnable', runnable)
            if (e.message.includes('ResizeObserver')) {
                // we expected this error, so let's ignore it
                // and let the test continue
                return false
            }
            // on any other error message the test fails
        })

        //cy.wait(5000)
        cy.contains("Reserve a desk", { timeout: 5000 })//check meeting title is displayed
        var current = new Date();
        cy.wait(5000)
        cy.contains("Add location").click()//Add meeting location
        cy.contains("Floor 004").click()
        cy.contains("Floor 007").click()//Open Flor dropdown
        cy.contains('007-', { timeout: 5000 }).click()//Select a Room
        cy.wait(2000)
        rd.clickBook()//Click on Book button
        var tempStart = current.getHours() + 1
        var tempEnd = current.getHours() + 2
        cy.wait(2000)
        cy.contains("Add recurrence").click()
        cy.contains("Does not repeat")
        cy.contains("Daily")
        cy.contains("Weekly")
        cy.contains("Monthly")
        cy.contains("Annually")
        cy.contains("Every weekday")

        cy.contains("Daily").click()
        cy.contains("End date")
        cy.contains("December 31")
        cy.contains("Note, 30 events will be created")
        cy.contains("After number of occurrences").click()
        cy.wait(5000)
        cy.get('.bizJBN').type("0")
        cy.contains("Okay").click()


        cy.contains('Confirm').click({ force: true })
        cy.wait(5000)//Confirm the meeting booking
        cy.contains("Reservation Created")
        cy.contains("Okay").click()
        //Check event details screen

        cy.wait(5000)
        cy.contains("Desk Reservation").click()
        cy.contains("Reservation Details")
        cy.contains("Participants")
        cy.contains("Roshan Nair")
        cy.get(':nth-child(3) > [data-testid="data-testid"]').should('be.visible')//Recurrence icon
        //cy.contains("Matthew Powaschuk")
        //cy.contains("Daily")
        cy.contains("Edit Reservation").should('have.attr', 'type', 'button')
        cy.contains('Cancel Reservation').should('have.attr', 'type', 'button')

        var d = new Date();
        var month = d.toLocaleString('default', { month: 'short' })
        var year = d.getFullYear()
        var date = d.getDate()
        var day = d.toLocaleDateString('default', { weekday: 'long' });
        var hour = d.getHours()
        var min = ('0' + d.getMinutes()).slice(-2)
        cy.log(day + ', ' + month + ' ' + date + ', ' + year + ' ' + (hour - 12) + ':' + min)

        if (hour <= 12) {

            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year
        }
        else if (hour == 12) {

            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year

        }
        else {
            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year
        }

        cy.get('.llHneK').first().then(function (text) {

            cy.log("Displayed timestamp=" + text.text())
            expect(text.text()).to.include(timeStamp)


        })



        //Check if the event is created for the following days as well

        cy.get('.fQLJOi').click()//click on the 'x' button to close Meeting details screen
        var date = current.getDate()
        var day = current.toLocaleDateString('default', { weekday: 'short' });
        cy.contains(date)
        cy.contains(day)
        cy.contains(date + 1).click()//Click on the next calendar date
        cy.log("Date is CHECKED")
        cy.contains("Desk Reservation").click()//Check for the event
        cy.contains("Reservation Details")//Check the Details
        cy.contains("Participants")
        cy.contains("Roshan Nair")
        cy.get(':nth-child(3) > [data-testid="data-testid"]').should('be.visible')//Recurrence icon
        //cy.contains("Matthew Powaschuk")
        //cy.contains("Daily")
        cy.contains("Edit Reservation").should('have.attr', 'type', 'button')
        cy.contains('Cancel Reservation').should('have.attr', 'type', 'button')
        cy.log("Following Day checked")
        //cy.get('.bgwodP').click()//Click the Month Year icon to collapse the calendar

        //Check for event on current day + 2

        cy.get('.fQLJOi').click()//click on the 'x' button to close Meeting details screen
        var date = current.getDate()
        var day = current.toLocaleDateString('default', { weekday: 'short' });
        cy.contains(date)
        cy.contains(day)
        cy.contains(date + 2).click()//Click on the next calendar date
        cy.log("Date is CHECKED")
        cy.contains("Desk Reservation").click()//Check for the event
        cy.contains("Reservation Details")//Check the Details
        cy.contains("Participants")
        cy.contains("Roshan Nair")
        cy.get(':nth-child(3) > [data-testid="data-testid"]').should('be.visible')//Recurrence icon
        //cy.contains("Matthew Powaschuk")
        //cy.contains("Daily")
        cy.contains("Edit Reservation").should('have.attr', 'type', 'button')
        cy.contains('Cancel Reservation').should('have.attr', 'type', 'button')
        cy.log("Following Day + 1 also checked")

        //Code to check all hyperlinks on the page except Email links
        cy.get("a:not([href*='mailto:'])").each(page => {
            cy.request(page.prop('href'))
        })

    })


    it.skip("Submit Feedback", () => {

        cy.contains("We're excited to see you. And we hope you enjoy Yara Works as much as we do. If you have questions or want to provide feedback, we're always happy to hear from you.")
        cy.contains("Share Feedback").click()
        cy.contains("Feedback form")
        cy.get('.css-1hwfws3').click()
        cy.contains('Report a Bug').click()
        cy.wait(5000)
        cy.get('#generalComment').type('This is Test feedback')
        cy.contains('Cancel')
        cy.contains('Send Feedback').click()
        cy.contains("Feedback Submitted")
        cy.contains("Okay").click()
        cy.wait(5000)
        cy.visit('/admin/feedback')

        //Code to get the Feedback Submission timestamp
        var d = new Date();
        var month = d.toLocaleString('default', { month: 'short' })
        var year = d.getFullYear()
        var date = d.getDate()
        var day = d.toLocaleDateString('default', { weekday: 'short' });
        var hour = d.getHours()
        var min = ('0' + d.getMinutes()).slice(-2)
        cy.log(day + ', ' + month + ' ' + date + ', ' + year + ' ' + (hour - 12) + ':' + min)

        if (hour <= 12) {

            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year + ' ' + hour + ':' + min
        }
        else if (hour == 12) {

            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year + ' ' + '12' + ':' + min

        }
        else {
            var timeStamp = day + ', ' + month + ' ' + date + ', ' + year + ' ' + (hour - 12) + ':' + min
        }


        //Code to check if the Feedback submitted on App appears on Admin as expected
        cy.visit('/admin/feedback')

        cy.get('[data-testid="table-body"] > :nth-child(1) > :nth-child(2)').then(function (text) {

            cy.log(text.text())
            expect(text.text()).to.include("Roshan Nair")
        })

        cy.get('[data-testid="table-body"] > :nth-child(1) > :nth-child(4)').then(function (text) {

            cy.log(text.text())
            expect(text.text()).to.include(timeStamp)
        })



    })


    it.skip('Test Profile screen', () => {

        cy.visit("/app/profile")

        //Test to check Follow/unFollow Feature
        cy.contains("Tamila").click()
        cy.wait(5000)
        var Original = 0;
        var newOriginal = 0;
        cy.get('.iTUOOn').first().then(function (text) {

            Original = text.text().trim('');
            cy.log("Original[0] before clicking follow=" + Original[0])
            cy.get(".PqtrL").should('have.attr', 'type', 'button').and('have.text', 'Follow').click() //Click Follow Button


        })

        cy.get('.iTUOOn').first().then(function (text) {
            newOriginal = text.text().trim('')
            cy.log("Original[0] after clicking follow=" + Original[0])
            cy.log("newOriginal[0] before clicking unfollow=" + newOriginal[0])
            expect(parseInt(newOriginal[0])).to.equal(parseInt(Original[0]) + 1)     //Check if Follower count increases by 1  
            cy.get(".PqtrL").should('have.attr', 'type', 'button').and('have.text', 'Unfollow').click()//Click Unfollow button
            cy.wait(5000)


        })
        cy.get('.iTUOOn').first().then(function (text) {
            newOriginal = text.text().trim('')
            cy.log("newOriginal[0] after clicking unfollow=" + newOriginal[0])
            expect(parseInt(newOriginal[0])).to.equal(parseInt(Original[0]))//Check if follower count decreases by 1
        })


        //Test to check Endorsements
        cy.get(".zuqoV").first().should('have.attr', 'type', 'button').and('have.text', 'Endorse').click()
        cy.get(".ekxfAv").first().should('have.attr', 'type', 'button').and('have.text', 'Endorsed')
        var endorsedColleagues = 0
        var newendorsedColleague = 0

        cy.get(".bXzxMJ").first().then(function (text) {

            cy.log(text.text())
            endorsedColleagues = text.text().trim('')
            cy.log("Original Endorsed colleagues" + endorsedColleagues[0])
            cy.get(".ekxfAv").first().should('have.attr', 'type', 'button').and('have.text', 'Endorsed').click()
            const newendorsedColleague = text.text().trim('')

        })

        cy.get(".bXzxMJ").first().then(function (text) {
            newendorsedColleague = text.text().trim('')
            cy.log("New EndoresedCollegue " + newendorsedColleague[0])
            expect(newendorsedColleague[0]).to.contain(endorsedColleagues[0] - 1)

        })

    })
})


