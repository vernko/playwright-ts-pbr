Feature: Events

Scenario: User can navigate the results tab
    Given a user is on the pbr home page
    When they click on results tab
    Then they can select a standing and view the page

    Examples:
    | MVP | Bull | Rookie of the year

Feature: Events

Scenario: User can navigate the all tour standings page
    Given a user is on the all tour standings page
    When they click on a standing
    Then they can view the page

    Examples:
    | PBR Teams | Unleash the Beast | Pendleton Velocity |
    | MVP | Bull | Rookie of the year |