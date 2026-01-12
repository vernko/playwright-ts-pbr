Feature: Rider Athlete Profile

    Scenario Outline: Viewing a rider's profile page
        Given the user is on the Athlete's page riders section
        When the user selects "<rider_name>"
        Then the rider's profile page is displayed
        And the page heading shows "<rider_name>"

        Examples:
        | rider_name       |
        | Jose Vitor Leme  |
        | Kaique Pacheco   |

    Scenario Outline: Viewing rider statistics by tab
        Given the user is on a rider's profile page
        When the user selects the "<stat_tab>" tab
        Then the "<stat_tab>" statistics are displayed

        Examples:
        | stat_tab |
        | Career   |
        | Season   |

    Scenario Outline: Filtering season statistics by year
        Given the user is on a rider's profile page
        And the user has selected the "Season" tab
        When the user selects year "<year>"
        Then the statistics are updated to show "<year>" season data

        Examples:
        | year |
        | 2024 |
        | 2017 |