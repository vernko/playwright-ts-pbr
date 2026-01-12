Feature: Team Information

    Scenario Outline: Viewing team's official website
        Given the user is on the "<team_name>" team page
        When the user clicks "View Official Site"
        Then a new page opens showing the team's official website

        Examples:
        | team_name             |
        | Arizona Ridge Riders  |

    Scenario Outline: Viewing team roster
        Given the user is on the "<team_name>" team page
        When the user views the roster section
        Then the team's roster is displayed with rider names and photos

        Examples:
        | team_name             |
        | Arizona Ridge Riders  |