Feature: Navigation

Scenario: User can view team's official site
    Given a user is on the team page
    When a user clicks on "View Official Site"
    Then the user is taken to the official page for that team

    Examples:
    | Arizona Ridge Riders |

Feature: Roster

Scenario: User can view team's roster
    Given a user is on the team's page
    When a user views the page
    Then the user is able to view the team's roster

    Examples:
    | Arizona Ridge Riders |