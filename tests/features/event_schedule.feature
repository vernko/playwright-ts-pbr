Feature: Event Schedule

    Scenario Outline: Filtering events by tour
        Given the user is on the event schedule page
        When the user selects the "<filter>" filter
        Then only events from "<filter>" are displayed

        Examples:
        | filter              |
        | All                 |
        | Unleash the Beast   |
        | Team Series         |
        | Pendleton           |
        | Challenger          |
        | Touring Pro         |
        | Special Events      |
    
    Scenario Outline: Viewing event details
        Given the user is on the event schedule page
        When the user clicks on "<event_name>" event details
        Then the event detail page is displayed
        And the page heading shows "<event_name>"

        Examples:
        | event_name                                  |
        | Ultimate Bullfighters: Cowtown Coliseum     |
        | PBR St. Louis                               |

    Scenario Outline: Accessing ticket purchasing
        Given the user is on the event schedule page
        When the user clicks "<ticket_type>" for an event
        Then a new tab opens with the ticket purchase page

        Examples:
        | ticket_type      |
        | General Tickets  |
        | Premium Tickets  |