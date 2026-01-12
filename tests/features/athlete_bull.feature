Feature: Bull Athlete Profile

    Scenario Outline: Viewing a bull's profile page
        Given the user is on the Athlete's page bulls section
        When the user selects "<bull_name>"
        Then the bull's profile page is displayed
        And the page heading shows "<bull_name>"

        Examples:
        | bull_name   |
        | Man Hater   |
        | Buck Nasty  |

    Scenario Outline: Viewing bull statistics by tab
        Given the user is on a bull's profile page
        When the user selects the "<stat_tab>" tab
        Then the "<stat_tab>" statistics are displayed

        Examples:
        | stat_tab |
        | Event    |
        | Rides    |