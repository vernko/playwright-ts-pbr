Feature: MVP Race Standings

    Scenario Outline: Viewing MVP standings for a specific year
        Given the user is on the MVP Race page
        When the user selects year "<year>"
        Then the MVP standings for "<year>" are displayed

        Examples:
        | year |
        | 2024 |
        | 2023 |
    
    Scenario Outline: Filtering MVP standings by season type
        Given the user is on the MVP Race page
        When the user selects the "<tab>" tab
        Then only "<tab>" standings are displayed

        Examples:
        | tab              |
        | Regular Season   |
        | Championship     |