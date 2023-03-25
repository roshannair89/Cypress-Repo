class BookRoom{

    meetingTitle = "#name";//Define Meeting title element
    meetingURL= "#meetingUrl";//Meeting Url element
    searchInputField="#autoCompleterInput"//Search input field
    btnBook= ".sc-ff1d4c70-0 > .sc-8ea21711-0 > .src__Button-sc-4i4sor-0"// Book Button
    meetingDescription='[placeholder="Add description"]'

    setMeetingTitle(){

        cy.get(this.meetingTitle).type("New Testing-Please ignore");
    }
    searchPerson(){
        cy.get(this.searchInputField).type("Matthew Powaschuk");
    }

    clickBook(){
        cy.get(this.btnBook).click();
    }

    addMeetingDesc(){
        cy.get(this.meetingDescription).type("This is a Test script for Edit-Meeting event");
    }
}
export default BookRoom;