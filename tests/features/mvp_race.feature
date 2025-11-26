Feature: Filtering

Scenario: Selecting a filter only displays standings related to the filter
    Given user is on the MVP race page
    When the user selects a filter
    Then only standings related to that filter are displayed

    Examples:
    | Regular Season | Championship |