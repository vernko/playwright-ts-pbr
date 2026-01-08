Feature: Selecting

Scenario: Selecting a bull displays their page
    Given user is on the bull pane of the Athlete's page
    When the user selects a bull
    Then they can view that bull's page

    Examples:
    | Man Hater | Buck Nasty

Feature: Selecting a stat tab

Scenario: Selecting a stat displays the stats for that tab
    Given user is on the Athlete's page
    When the user selects a event or rides stat tab
    Then they can view that bull's stats

    Examples:
    | Event | Rides