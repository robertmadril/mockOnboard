/* To-do:

isPyxPal (check invitation table)?
Yes: pyxPalT&C—Home
No: DOB input, MID Check

MID Check (verify if it's even an ID): Yes: Network T&C—Home
No: HiFriend T&C—Home

Nice to haves:
(login modal)
 */

//This function emptys fields needed for DRY code
function emptyFields() {
    $("#moving-screen").empty();
    $("#process-view").empty();
};

//This function creates a new button in the JQuery populating functions
function createBtn(idName, className, txt) {
    var newBtn = $("<button>");
    newBtn.addClass(className);
    newBtn.attr("id", idName);
    newBtn.text(txt);

    return newBtn
}

//Displays the first onboard page
function startPage() {
    emptyFields();
    $("#screen-prompt").empty();

    var newUser = createBtn("new-user", "btn btn-info col-sm-4", "Let's get started");
    var returnUser = createBtn("returning-user", "btn btn-info col-sm-4", "Have an account?");

    $("#moving-screen").append(newUser);
    $("#moving-screen").append(returnUser);
    $("#process-view").text('This is the first screen. New users will click "Let\'s get started." Returning users will click "Have an account?"');
    $("#screen-prompt").append("Welcome to Pyx");

    //don't need on click functions here because they were used at the bottom of the file at initial page load

};

//first page for returning users
function loginPage() {
    emptyFields();

    var loginBtn = createBtn("return-login", "btn btn-info col-sm-3", "Log In")

    var forgotBtn = createBtn("forgot-btn", "btn btn-info col-sm-6", "Forgot Name or Password?")

    var loginProcess = $("<p>");
    loginProcess.text("Returning users will have the option to enter their log-in credentials or try to retrieve a forgotten account name/password. If log-in credentials are incorrect, they will return to this page.")

    $("#moving-screen").append(loginBtn);
    $("#moving-screen").append(forgotBtn);
    $("#process-view").append(loginProcess);

    $(document).on("click", "#forgot-btn", function () {
        forgotAccount();
    });
    $(document).on("click", "#return-login", function () {
        verifyPhone()
    });
};

//verify phone number for returning users with proper credentials
function verifyPhone() {
    emptyFields();
    $("#screen-prompt").empty();

    var yesBtn = createBtn("yes-exists", "btn btn-info col-sm-3", "Yes");
    var noBtn = createBtn("no-exists", "btn btn-info col-sm-3", "No");

    var newPhoneWhoDis = $("<p>");
    newPhoneWhoDis.text("Users will be prompted to verify the last four of their current phone number. If yes, user has proper credentials and same phone number, they're good to go.");

    $("#moving-screen").append(yesBtn);
    $("#moving-screen").append(noBtn);
    $("#screen-prompt").text("Does your phone number still end in 1234?");
    $("#process-view").append(newPhoneWhoDis);

    $(document).on("click", "#yes-exists", function () {
        pyxHome();
    });

    $(document).on("click", "#no-exists", function () {
        inputNewPhone();
    });
};

//page for returning users with a new phone #
function inputNewPhone() {
    emptyFields();
    $("#screen-prompt").empty();

    var inputPhone = createBtn("input-phone", "btn btn-info col-sm-6", "New Phone Who Dis");

    $("#process-view").html("<p>Users will OTP their phone before being able to land on the dashboard.</p>");
    $("#moving-screen").append(inputPhone);
    $("#screen-prompt").text("Please enter your new phone number.");

    $(document).on("click", "#input-phone", function () {
        pyxHome();
    });
}

//forgot account page, basically just redirects them to call support
function forgotAccount() {

    emptyFields();

    var startOver = createBtn("restart", "btn btn-info col-sm-6", "Call Support and Start Over");

    var callSupport = $("<p>");
    callSupport.text("The current plan of action is for the user to call support to verify account name. Password authentication will need to be discussed moving forward");

    $("#process-view").append(callSupport);
    $("#moving-screen").append(startOver);

    $(document).on("click", "#restart", function () {
        startPage()
    });
};

//This function will be where the user inputs their e-mail/MID, password and OTP phone (lack of OTP will redirect to this page)
function createNew() {

    emptyFields();
    $("#screen-prompt").empty();

    var inputAll = createBtn("input-create", "btn btn-info col-sm-6", "Complete Input");

    $("#screen-prompt").text("Please input a Medicaid/Medicare ID or e-mail address (maybe Google and Facebook?), Create a Password, and Input Phone Number.");
    $("#moving-screen").append(inputAll);
    $("#process-view").html("<p>Users will ask to input three fields in this section: Account Name (Medicaid/Medicare ID or e-mail), create a password, then input phone number. OTP will be prompted from here, as well. If there is no valid OTP, users will be redireced to this page.</p>");

    $(document).on("click", "#input-create", function () {
        isPyxPal();
    });

};

//This function will outline the behind-the scenes check for a pyxpal (change button color to denote non-user input)
function isPyxPal() {
    
    emptyFields();
    $("#screen-prompt").empty();

    var ppConfirm = createBtn("yes-pyxpal", "btn btn-secondary col-sm-4", "Is a PyxPal");
    var ppDeny = createBtn("no-pyxpal", "btn btn-secondary col-sm-4", "Is not a PyxPal");

    $("#screen-prompt").text("Is this a PyxPal?");
    $("#moving-screen").append(ppConfirm);
    $("#moving-screen").append(ppDeny);
    $("#process-view").html("<p>This screen is a back-end function that checks the invitation table against the phone number to check if there is an invite for a PyxPal. This may be replaced or enhaced by universal deep linking.</p>");

    $(document).on("click", "#yes-pyxpal", function () {
        pyxPalTC();
    });

    $(document).on("click", "#no-pyxpal", function () {
        inputDOB();
    });
};

//This ends the pyxpal route and returns the dashboard page as the only exit route.
function pyxPalTC() {
    emptyFields();
    $("#screen-prompt").empty();

    var signPPTC = createBtn("pp-tc", "btn btn-info col-sm-6", "Sign PyxPal T's and C's");
    $("#moving-screen").append(signPPTC);
    $("#screen-prompt").text("PyxPal Terms and Conditions go here.");
    $("#process-view").html("<p>Terms and Conditions screen for PyxPals to prompt user to sign PyxPal-specific documents</p>");

    $(document).on("click", "#pp-tc", function () {
        pyxHome();
    });

}

//This assumes that this is a HiFriend or Network member, so user will be prompted for date of birth
function inputDOB() {
    emptyFields();
    $("#screen-prompt").empty();

    var dobField = createBtn("input-dob", "btn btn-info col-sm-6", "Input Date of Birth");

    $("#moving-screen").append(dobField);
    $("#screen-prompt").text("Please enter your date of birth.");
    $("#process-view").html("<p>Since we are not asking PyxPals for a DOB, this is prompted after it is determined that there is no active invitation for this user.</p>")

    $(document).on("click", "#input-dob", function () {
        idCheck();
    });
}

//This function is the check for medicaid/medicare ID (change button color to denote non-user input)
function idCheck() {
    emptyFields();
    $("#screen-prompt").empty();

    var idConfirm = createBtn("yes-id", "btn btn-secondary col-sm-4", "ID Match");
    var idDeny = createBtn("no-id", "btn btn-secondary col-sm-4", "No Match");

    $("#moving-screen").append(idConfirm);
    $("#moving-screen").append(idDeny);
    $("#screen-prompt").text("Does the account name match a network profile?");
    $("#process-view").html("<p>This is another back-end check that initiall parses out ID's as the account name. Any non-ID account is placed into a HiFriend profile. An ID that matches will be placed into a network profile. An ID that does not match will be placed into a HiFriend profile</p>");

    $(document).on("click", "#yes-id", function () {
        networkTC();
    });

    $(document).on("click", "#no-id", function () {
        hifriendTC();
    });
};

//This is the in-network terms and conditions
function networkTC() {

    emptyFields();
    $("#screen-prompt").empty();

    var signPPTC = createBtn("n-tc", "btn btn-info col-sm-6", "Sign Network T's and C's");
    $("#moving-screen").append(signPPTC);
    $("#screen-prompt").text("Network Terms and Conditions go here.");
    $("#process-view").html("<p>Terms and Conditions screen for in-network members to prompt user to sign network-specific documents</p>");

    $(document).on("click", "#n-tc", function () {
        pyxHome();
    });

};

//This is the hifriend terms and conditions page
function hifriendTC() {

    emptyFields();
    $("#screen-prompt").empty();

    var signPPTC = createBtn("hf-tc", "btn btn-info col-sm-6", "Sign HiFriend T's and C's");
    $("#moving-screen").append(signPPTC);
    $("#screen-prompt").text("HiFriend Terms and Conditions go here.");
    $("#process-view").html("<p>Terms and Conditions screen for PyxPals to prompt user to sign PyxPal-specific documents</p>");

    $(document).on("click", "#hf-tc", function () {
        pyxHome();
    });

};

//dashboard page, wave that checkered flag
function pyxHome() {

    emptyFields();
    $("#screen-prompt").empty();

    var startOver = createBtn("restart", "btn btn-info col-sm-6", "Start Over");
    var dashboard = $("<p>");
    dashboard.text("Welcome to the Pyx Dashboard");

    $("#moving-screen").append(startOver);
    $("#screen-prompt").append(dashboard);
    $("#process-view").text("This is the Pyx landing page. The user is now onboarded");

    $(document).on("click", "#restart", function () {
        startPage();
    });
}

//initiating functions from first load
$(document).on("click", "#returning-user", function () {
    loginPage();
});

$(document).on("click", "#new-user", function () {
    createNew();
});