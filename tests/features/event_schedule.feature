Feature: Event

Scenario: Test Scenario
    Given
    When
    Then

    Examples:
    | General Tickets |
    | Event Details | Premium Tickets |
    | Group Tickets

Feature: Filtering

Scenario: Selecting a filter only displays events related to the filter
    Given user is on the event schedule page
    When the user selects a filter
    Then only events related to that filter are displayed

    Examples:
    | All | Unleash the Beast | Team Series |
    | Pendleton | Challenger | Touring Pro |
    | Special Events