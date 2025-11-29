Feature: Event Details

Scenario: User can view event details
    Given a user navigates to the event schedule page
    When a user views event details
    Then the user is taken to the detail page for that event

    Examples:
    | Ultimate Bullfighters: Cowtown Coliseum |
    | PBR St. Louis |

Feature: Get tickets

Scenario: User can order tickets when on the event page
    Given a user is on the event schedule page
    When they click on the General Tickets (or Premium if available)
    Then a new tab is opened so a user can get tickets.

    Examples:
    | General Tickets | Premium Tickets |

Feature: Filtering

Scenario: Selecting a filter only displays events related to the filter
    Given user is on the event schedule page
    When the user selects a filter
    Then only events related to that filter are displayed

    Examples:
    | All | Unleash the Beast | Team Series |
    | Pendleton | Challenger | Touring Pro |
    | Special Events