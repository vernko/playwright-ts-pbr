Feature: Default Landing

Scenario: Bull standings load with the default tour and year selected
    Given the user navigates to the bull standings page
    When the page finishes loading
    Then the default tour is "Unleash the Beast"
    And the default year is "2026"
    And the top 3 bulls are displayed
    And the standings table is displayed

Feature: Filter bull standings by year

Scenario: Viewing bull standings for a selected year
    Given the user is on the bull standings page
    When the user selects year <year>
    And the user selects the "Unleash the Beast" tour
    Then only standings from <year> are displayed

Examples:
    | year |
    | 2025 |
    | 2020 |
    | 2015 |

Feature: Tour Carousel

Scenario Outline: Selecting a tour filters the bull standings by tour
    Given the user is on the bull standings page
    And the has selected the year "2020"
    When the user selects the "World" tour from the carousel
    And the user selects the "Pendelton Whiskey Velocity Tour" tour from the carousel
    Then the standings display different bulls than the previous tour

Examples:
    | tour                |
    | Unleash the Beast   |
    | Velocity Tour       |
    | Challenger Series   |
