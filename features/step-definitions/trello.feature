Feature: Trello

  @SuccessfulSignIn
  Scenario: User signs in with valid credentials
    Given the user is on the Trello sign-in page
    When the user enters a registered email and correct password
    And clicks on the "Sign In" button
    Then the user should be redirected to the dashboard
    And the user's boards should be displayed

  @UpdateProfileInfo
  Scenario: User updates their profile information
    Given the user is logged in and on their profile page
    When the user edits their display name and bio
    Then the profile should be updated with the new information
    And a success message should be displayed

  @CreateNewBoard
  Scenario: User creates a new board
    Given the user is on the Trello dashboard
    When the user clicks on the "Create new board" button
    And enters a board name and selects a background color
    Then a new board should be created and displayed on the dashboard


  @AddBoardList
  Scenario: User adds a new list to a board
    Given the user is on an open board
    When the user clicks on the "Add a list" button
    And enters a list name and hits "Enter"
    Then the new list should be added to the board

  @AddCardsToList
  Scenario: User adds a new card to a list
    Given the user is viewing a list on a board
    When the user clicks on the "Add a card" option under the list
    And enters card titles and hits "Enter"
    Then the new card should appear in the list

  @FilteringCards
  Scenario: User filters cards on a board
    Given the user is on an open board with multiple cards
    When the user clicks on the "Filter" button
    And enters a keyword or selects a label in the filter options
    Then only the cards matching the filter criteria should be displayed
    And non-matching cards should be hidden


  @SearchingForBoard
  Scenario: User searches for an existing board
    Given the user is on the Trello dashboard
    When the user types the board name in the search bar
    And presses the "Enter" key
    Then the board matching the search criteria should be displayed in the results
    
  @EditUserWorkspace
  Scenario: User edits the workspace name and description
    Given the user is on the workspace settings page
    When the user changes the workspace name and description
    And clicks on the "Save" button
    Then the workspace should be updated with the new name and description
    And a confirmation message should be displayed
