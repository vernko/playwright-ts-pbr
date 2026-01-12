Feature: Results and Standings

    Scenario Outline: Navigating to standings from results
        Given the user is on the PBR home page
        When the user clicks the "Results" tab
        And the user selects "<standing_type>" standings
        Then the "<standing_type>" standings page is displayed

        Examples:
        | standing_type       |
        | MVP                 |
        | Bull                |
        | Rookie of the Year  |

    Scenario Outline: Viewing standings from All Tour Standings page
        Given the user is on the All Tour Standings page
        When the user selects "<standing_type>" standings
        Then the "<standing_type>" standings page is displayed

        Examples:
        | standing_type        |
        | PBR Teams            |
        | Unleash the Beast    |
        | Pendleton Velocity   |
        | MVP                  |
        | Bull                 |
        | Rookie of the Year   |