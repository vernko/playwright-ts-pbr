# playwright-ts-pbr
### Purpose
The purpose of this project is to automate UI tests of the website, https://www.pbr.com/ using TypeScript & Playwright.

##
### FRAMEWORK INFORMATION
This framework uses the following:

#### Languages
- Typescript

#### Dependencies


#### Design Pattern
- Page Object Model - if you haven't used the Page Object Model before, check out the Page Object Model section below.

##
### GETTING STARTED
You will need the following on your computer in order to work on this project:
* Playwright - [Playwright's Webpage](https://playwright.dev)
* Typescript

1. Open the terminal
2. Navigate to the directory you want to store this project
3. Run this command ```git clone https://github.com/vernko/playwright-ts-pbr.git```
4. Once it has cloned the repo, you should see something like ```pbr git:(main)```
5. Now you now you have the code for the repo on your machine
6. Open this project in the code editor of your choice(VS Code is a nice choice)

##
### NAMING CONVENTIONS
- Functions - camelCase
- Feature & Spec files - page.spec.ts (if it the page is multiple words use multiple_word_page.spec.ts)


##
### ORGANIZATION - PAGE OBJECTS
#### Page Object Classes
You'll find any Page Objects under the "tests" directory in the "pages" directory.

Essentially, for each page you create a new class. You can use that class object anywhere in the automation.
We use these classes to put any browser-related operations such as:
- Locators
- Clicks
- Sending keys/inputs

Add methods & locators related to that page inside this class.

I prefer to organize these in a hybrid alphabetical/functionality order.
- If there is no related functionality, order it alphabetically.
- If there is related functionality, put that in order of occurrence.

##
### ORGANIZATION - TESTS
You'll find any tests under the "tests/specs" directory. 
- Each page is a separate spec file.
- All tests are separate methods within the spec file. 

##
### CREATING TESTS
Playwright comes with a test class already built in. You import that class, then have access to it.
Just like with methods in a Page Object class, I organize these in a hybrid alphabetical/functionality order.
- If there is no related functionality, order it alphabetically.
- If there is related functionality, put that in order of occurrence.

#### Test Structure
- A descriptive name for the test
- Test data/info needed for validation of tests
- Clean descriptive steps (aka methods from page object class)
- Assertion - whatever you are validating to ensure the test passes as you expect.

#### Assert
Playwright provides an "expect" class with a variety of asserts including:
- toBeVisible
- toBeTruthy
- toContain

#### Example of Creating a New Test
If you need to create new tests related to a group of tests already created, go to that spec class/file, and add the new test there.

If you need to create a test that does not relate to a current test. Add a new spec file for that particular page, then add the new test.

For example, if you need to add a test for viewing a selected rider from a standings page. We might do something like this.
1. Go to tests -> specs
2. Create a ```standings.spec.ts``` file
3. Create a ```test``` function, with a good description for the test
4. Add test steps
5. Verify you can view the rider you selected from the standings page
```
test('a user can select a rider from the standings and view their page', async({ page }) => {
# Go to a Standings page
# Select a rider
# Go to their page
# Verify you can view their page
})
```

##
### RUNNING TESTS
#### Individual Tests
From IDE
1. Go to the spec file of the test you want to run
2. Find the test (aka test function) you want to run
3. Click the play button next to the test

From Command Line

- Check out playwright's docs for a good list of ways to run tests from the Command Line, [Run Tests from Command Line](https://playwright.dev/docs/test-cli)


##
### ADDITIONAL RESOURCES

##
#### Playwright
Playwright has excellent documentation on their website, [Playwright's Webpage](https://playwright.dev). There are also some good courses available at Test Automation University's website, [TAU](https://testautomationu.applitools.com/learningpaths.html?id=playwright-path)

##
#### Page Object Model
The article below from BrowserStack provides good info about the POM - [Article on POM](https://www.browserstack.com/guide/page-object-model-in-selenium)
