Feature: Filtering

Scenario: Selecting a year only displays standings related to the tab
    Given user is on the Rookie of the Year page
    When the user selects a year
    Then only standings related to that tab are displayed

    Examples:
    | 2020 | 2017