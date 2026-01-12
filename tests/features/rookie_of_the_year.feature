Feature: Rookie of the Year Standings

    Scenario Outline: Filtering rookie standings by year
        Given the user is on the Rookie of the Year page
        When the user selects year "<year>"
        Then only standings for year "<year>" are displayed

        Examples:
        | year |
        | 2020 |
        | 2017 |

    Scenario Outline: Viewing specific rookie riders' profiles
    Given the user is on the Rookie of the Year page
    When the user selects "<rider_name>" from the standings
    Then the rider's profile page displays "<rider_name>"

    Examples:
        | rider_name      |
        | Jose Vitor Leme |
        | Kaique Pacheco  |
