Feature: Selecting

Scenario: Selecting a rider displays their page
    Given user is on the Rider pane of the Athlete's page
    When the user selects a rider
    Then they can view that rider's page

    Examples:
    | Jose Vitor Leme | Kaique Pacheco

Feature: Selecting a stat tab

Scenario: Selecting a stat displays the stats for that tab
    Given user is on the Athlete's page
    When the user selects a career or season stat tab
    Then they can view that rider's stats

    Examples:
    | Career | Season

Feature: Filter year tab

Scenario: Selecting a year displays the stats for that tab
    Given user has selected the season tab on the Athlete's page
    When the user selects a year
    Then the stats are updated to the stats for that year

    Examples:
    | 2024 | 2017