Feature: Filtering

Scenario: Selecting a tab only displays standings related to the tab
    Given user is on the MVP race page
    When the user selects a tab
    Then only standings related to that tab are displayed

    Examples:
    | Regular Season | Championship | 2024