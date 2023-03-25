class Desk{

    startTime = "#startTimeHours";//Define Meeting title element
    endTime= "#endTimeHours";//Meeting Url element
    searchInputField="#autoCompleterInput"//Search input field
    btnBook= ".sc-ff1d4c70-0 > .sc-8ea21711-0 > .src__Button-sc-4i4sor-0"// Book Button
    meetingDescription='[placeholder="Add description"]'//Meeting Description
    reservationTitle='#name'//Desk Reservation Title

    setTime(){

        cy.get(this.startTime).clear().type("8");
        cy.get(this.endTime).clear().type("5")
    }
    searchPerson(){
        cy.get(this.searchInputField).type("Matthew Powaschuk");
    }

    clickBook(){
        cy.get(this.btnBook).click();
    }

    addMeetingDesc(){
        cy.get(this.meetingDescription).type("This is a Test script for Edit-Desk event");
    }

    editTitle(){

        cy.get(this.reservationTitle).clear().type("Update Desk Reservation");

    }

}
export default Desk;