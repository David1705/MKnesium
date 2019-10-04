var mslogged = ![];
var wbxlogged = ![];

var msloggedmsg = "Conectado con Microsoft Teams.";
var wbxloggedmsg = "Conectado con Webex Teams.";

var mslogurl = "https://login.microsoftonline.com/common/oauth2/authorize?client_id=767463ad-b648-41dd-8453-7746c6e7e313&response_type=token&redirect_uri=https%3A%2F%2Fc2aca703.ngrok.io%2Fteams.html&response_mode=fragment&scope=User.ReadWrite.All&resource=https%3A%2F%2Fgraph.microsoft.com%2F&state=12345&nonce=678910";
var wbxlogurl = "https://api.ciscospark.com/v1/authorize?client_id=Cf3374560f615d1a7ab11d3b74e7032df6448ac0a45712a75303b8e6000389553&response_type=code&redirect_uri=https%3A%2F%2Fc2aca703.ngrok.io%2Fwebex&scope=spark-compliance%3Amemberships_read%20spark-admin%3Aresource_groups_read%20spark%3Aall%20spark-compliance%3Amemberships_write%20spark-admin%3Apeople_write%20spark-admin%3Aroles_read%20spark-admin%3Aorganizations_read%20spark-admin%3Aresource_group_memberships_read%20spark-compliance%3Aevents_read%20spark-admin%3Aresource_group_memberships_write%20spark-compliance%3Arooms_read%20spark-compliance%3Ateam_memberships_read%20spark-admin%3Acall_qualities_read%20spark-compliance%3Amessages_write%20spark-compliance%3Ateam_memberships_write%20spark%3Akms%20spark-compliance%3Ateams_read%20spark-admin%3Alicenses_read%20spark-compliance%3Amessages_read%20spark-admin%3Apeople_read";

var loading = false;

window.onload = function () {
    var url = new URL(window.location.href);
    if (url.searchParams.get("ms") != undefined) {
        mslogged = url.searchParams.get("ms");
        if (url.searchParams.get("wbx") != undefined) {
            this.wbxlogged = url.searchParams.get("wbx").split("%");
        }
    }
    if (mslogged) {
        $("#msmsg").text(msloggedmsg);
        $("#step0").addClass("completed");
        $("#track1").addClass("completed-track");
    }
    if (wbxlogged) {
        $("#wbxmsg").text(wbxloggedmsg);
        $("#step1").addClass("completed");
        $("#track2").addClass("completed-track");
        $("#track1").addClass("finished-track");
    }
    console.log(url.searchParams.get("ms"));
}

function MicrosoftTeamsLogin() {
    //if (!mslogged)
    //    window.location.href = mslogurl;

    
    $("#msmsg").text(msloggedmsg);
        $("#step0").addClass("completed");
        $("#track1").addClass("completed-track");

        mslogged = !![];
}

function WebexTeamsLogin() {
    //if (mslogged && !wbxlogged) 
    //    window.location.href = wbxlogurl;

    if(mslogged){
    $("#wbxmsg").text(wbxloggedmsg);
        $("#step1").addClass("completed");
        $("#track2").addClass("completed-track");
        $("#track1").addClass("finished-track");
        wbxlogged = !![];    
    }
}
function checkAuthentication() {
    if(mslogged && wbxlogged){
        loading = true;
    startMigrationAnimation();
    setTimeout(() => {
        loading = false;
        setTimeout(() => endLoadingAnimation(), 1000);
    }, 10000);
    }
    
    /*
    var req = new XMLHttpRequest();
    req.open('GET', 'https://c2aca703.ngrok.io/check', true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200)
                if (req.responseText == 'true') {
                    loading = true;
                    startMigrationAnimation();
                    migrate();
                }

        }
    };
    req.send(null);*/
}

function migrate() {
    var req = new XMLHttpRequest();
    req.open('GET', 'https://c2aca703.ngrok.io/migrate', true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200)
                loading = (req.responseText == 'true');
        }
    };
    req.send(null);
}

function startMigrationAnimation() {
    if (wbxlogged && mslogged) {
        $("#step2").addClass("completed");
        $("#track2").addClass("finished-track");
        $("#step0").animate({
            left: "101.5%"
        }, 0, function () {
            // Animation complete.
        });
        $("#step2").animate({
            left: "-101%"
        }, 0, function () {
            setTimeout(hideBubbles, 1000);
        });
        $("#shadow0").animate({
            left: "101.5%",
            opacity: "0"
        }, 0, function () {
            // Animation complete.
        });
        $("#shadow1").animate({
            opacity: "0"
        }, 0, function () {
            // Animation complete.
        });
        $("#shadow2").animate({
            left: "-101%",
            opacity: "0"
        }, 0, function () {
            // Animation complete.
        });
        $("#track2").animate({
            width: "0"
        }, 0, function () {
            // Animation complete.
        });
        $("#track1").animate({
            width: "0"
        }, 0, function () {
            // Animation complete.
        });
        $("#step-text-container").animate({
            opacity: "0"
        }, 0, function () {
            // Animation complete.
        });
    }

    function hideBubbles() {
        $("#step0").animate({
            opacity: "0"
        }, 0, function () {
            // Animation complete.
        });
        $("#step0").css({ '-webkit-transform': 'scale(0.1)' });
        $("#step1").css({ '-webkit-transform': 'scale(0.1)' });
        $("#step2").css({ '-webkit-transform': 'rotate(180deg) scale(0.3)', 'background': 'white', '-moz-transform': 'rotate(180deg)' });
        $("#webex-icon").css('opacity', '0');
        $("#mst-icon").css('opacity', '0');
        $("#mig-icon").animate({
            opacity: "0"
        }, 0, function () {
            // Animation complete.
        });
        $("#step1").animate({
            opacity: "0"
        }, 0, function () {
            setTimeout(() => {
                $("#step0").css({ 'background': '#f8fa4b', 'opacity': "1" });
                $("#step1").css({ 'background': '#faa94b', 'opacity': "1" });

                setTimeout(() => {
                    $("#step1").animate({
                        left: "24%"
                    }, 0);
                    $("#step0").animate({
                        left: "76%"
                    }, 0);
                    $("#step1").addClass('triangle');
                    $("#step0").css({ 'border-radius': '20px'});
                    setTimeout(() => {
                        $("#step2").css({ 'background': '#a54bfa', 'opacity': "1" });
                        $("#step0").css({ '-webkit-transform': 'scale(0.35)' });
                        $("#step2").css({ '-webkit-transform': 'scale(0.35)' });
                        $("#step1").css({ '-webkit-transform': 'scale(0.35)' });
                        //$("#step0").addClass('loading-yellow'); 
                        //$("#step2").addClass('loading-magent');
                        //$("#step1").addClass('loading-orange');
                        
                        setTimeout(() => {
                            //loadingAnimation(0);
                            setTimeout(()=>{
                                loadingAnimation(0);
                                $('#loading-text').css({'opacity' : '1'});
                            }, 1250);
                        }, 100);
                    }, 500);
                }, 250);
            }, 500);
        });
        $("#shadow0").animate({
            opacity: "0"
        }, 0, function () {
            // Animation complete.
        });
        $("#shadow1").animate({
            opacity: "0"
        }, 0, function () {
            // Animation complete.
        });
    }
}

var degrees = 0;

function loadingAnimation(num) {
    switch (num) {
        case 0:
            $("#step0").css({ '-webkit-transform': 'scale(0.15) rotate('+(degrees+=90)+'deg)'});
            break;
        case 1:
            $("#step2").css({ '-webkit-transform': 'scale(0.15)' });
            break;
        case 2:
            $("#step1").css({ '-webkit-transform': 'scale(0.15) rotate('+(degrees)+'deg)' });
            break;
    }
    setTimeout(() => {
        if (num < 2)
            loadingAnimation(num + 1);
        else if (loading) desloadingAnimation(num);
    }, 500);

}



function desloadingAnimation(num) {
    switch (num) {
        case 2:
            $("#step0").css({ '-webkit-transform': 'scale(0.35) rotate('+(degrees+=90)+'deg)' });
            break;
        case 1:
            $("#step2").css({ '-webkit-transform': 'scale(0.35)' });
            break;
        case 0:
            $("#step1").css({ '-webkit-transform': 'scale(0.35) rotate('+(degrees)+'deg)' });
            break;
    }
    setTimeout(() => {
        if (num > 0)
            desloadingAnimation(num - 1);
        else if (loading) loadingAnimation2(num);
    }, 500);

}

function loadingAnimation2(num) {
    switch (num) {
        case 0:
            $("#step0").css({ '-webkit-transform': 'scale(0.15) rotate('+(degrees+=90)+'deg)' });
            break;
        case 1:
            $("#step2").css({ '-webkit-transform': 'scale(0.15)' });
            break;
        case 2:
            $("#step1").css({ '-webkit-transform': 'scale(0.15) rotate('+(degrees)+'deg)' });
            break;
    }
    if (num > 0)
        switch (num) {
            case 1:
                $("#step0").css({ '-webkit-transform': 'scale(0.35) rotate('+(degrees+=90)+'deg)' });
                break;
            case 2:
                $("#step2").css({ '-webkit-transform': 'scale(0.35)' });
                break;
            case 3:
                $("#step1").css({ '-webkit-transform': 'scale(0.35) rotate('+(degrees)+'deg)' });
                break;
        }
    setTimeout(() => {
        if (num == 3)
            loadingAnimation(0);
        else if (loading) loadingAnimation2(num + 1);
    }, 500);

}

function endLoadingAnimation() {
    $('#loading-text').css('opacity', '0');
    $("#step0").css({ '-webkit-transform': 'scale(0)' });
    $("#step1").css({ '-webkit-transform': 'scale(0)' });
    $("#step2").css({ '-webkit-transform': 'scale(0)' });
    setTimeout(()=>{
        $("#resul-res").addClass('resul-text');
        setTimeout(()=>{
            $("#resul-res").addClass('resul-text-expanded');
            setTimeout(()=>$("#resul-text").css({'transition' : 'all 1s ease-in-out','opacity': '1', 'color': '#00bceb'}), 500);
        },1000);
    }, 500);
}
