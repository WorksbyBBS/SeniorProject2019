const scoreTableTemplate = `
<div class="container-fluid">
    <div class="panel">
        <div class="panel-head">
            <div class="row">
                <div class="col-md-6">
                    <span><h4><b>Trainee Name:</b> {{session.trainee_firstname}} {{session.trainee_lastname}}</h4></span>
                </div>

                <div class="col-md-6">
                    <span><h4><b>Trainer Name:</b> {{session.trainer_firstname}} {{session.trainer_lastname}}</h4></span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <span><h4><b>Course:</b> {{course_name}}</h4></span>
                </div>
                <div class="col-md-4">
                    <span><h4><b>Skill:</b> {{skill_name}}</h4></span>
                </div>
                <div class="col-md-4">
                    <span><h4><b>Session Type:</b> {{session.type}}</h4></span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <span><h4><b>Date:</b> {{sessionDate}}</h4></span>
                </div>
                <div class="col-md-4">
                    <span><h4><b>Time (24 hrs):</b> {{sessionTime}}</h4></span>
                </div>
                <div class="col-md-4">
                    <span><h4><b>Duration (min):</b> {{session.duration}}</h4></span>
                </div>
            </div>
            {{#if session.trainer_comment}}
            <div class="row">
                <div class="col-md-12">
                    <span><h4><b>Trainer Comment:</b> {{session.trainer_comment}}</h4></span>
                </div>
            </div>
            {{/if}}

            <div class="row">
                <div class="col-md-6">
                    <span><h4><b>Your Comment:</b>{{#if session.trainee_comment}} {{session.trainee_comment}}</h4></span>
                </div>
                {{else}}
                <button class="btn btn-pill btn-primary" data-toggle="modal" data-target="#sessionCommentModal"
                        data-session_id="{{session.session_id}}" onclick="addSessionComment(this)"><i
                        class="fa fa-plus"></i> Add Comment
                </button>
                {{/if}}
            </div>

        </div>


        <div class="panel-body">
            <div class="row">
                <div class="col-md-12">
                    <table class="table" id="table">
                        <thead class="light-background">
                        <tr>
                            <th hidden>Skill ID</th>
                            <th>Criteria</th>
                            <th>Score</th>
                            <th>Trainer Comment</th>
                            <!--<th>Your Comment</th>-->
                        </tr>
                        </thead>
                        <tbody>
                        {{#each essentialCriteriaScores}}
                        <tr class="scoreCategory">
                            <td hidden>{{score_id}}</td>
                            <td>{{criteria_name}}</td>
                            <td><span id="score_span">{{score_value}}</span></td>
                            <td>{{trainer_comment}}</td>
                            <!--<td>{{trainee_comment}}</td>-->
                        </tr>

                        {{/each}}
                        <tr>
                            <td class="light-background"><h2><b>Final Score</b></h2></td>
                            <td class="light-background" colspan="3"><span class="finalScore"><h3><b>{{finalScore}}</b></h3></span>
                            </td>

                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="sessionCommentModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="basicModalLabel">Add Comment for Session</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <form class="form-vertical" method="post" id="sessionCommentForm">
                    <div class="form-body" id="commentForm">
                        <div class="row">
                            <div class="col-md-12">
                                <input type="hidden" name="commentSessionId" id="commentSessionId">
                                <div class="textwrapper"><textarea rows="3" name="sessionComment"
                                                                   form="sessionCommentForm"
                                                                   placeholder="Enter Your Comment Here..."
                                                                   required></textarea></div>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="modal-footer">

                    <button type="submit" onclick="submitSessionForm()" class="btn btn-pill btn-success">Submit
                        Comment
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
`;


const extraScoreTableTemplate = `
<div class="container-fluid">
<div class="panel">
<div class="panel-head">
<h4>Extra Criteria Details</h4>
</div>
<div class="panel-body">
 <div class="row">
                <div class="col-md-12">
                    <table class="table" id="table">
                        <thead class="light-background">
                        <tr>
                            <th hidden>Skill ID</th>
                            <th>Criteria</th>
                            <th>Value</th>
                            <th>Trainer Comment</th>
                            <!--<th>Your Comment</th>-->
                        </tr>
                        </thead>
                        <tbody>
                        {{#each extraCriteriaScores}}
                            <tr class="scoreCategory">
                                <td hidden>{{score_id}}</td>
                                <td>{{criteria_name}}</td>
                                <td><span id="score_span">{{score_value}}</span></td>
                                <td>{{trainer_comment}}</td>
                                <!--<td>{{trainee_comment}}</td>-->
                            </tr>
                        
                        {{/each}}
                        </tbody>
                    </table>
                </div>
            </div>
</div>
</div>
</div>
   
`;


window.onload = function (e) {
    $('#table tbody tr td span').each(function () {
        let text = $(this).text();
        if (text === 'Pass') {
            $(this).addClass('badge badge-success badge-md badge-pill  btn-block');
        } else if (text === 'Fail') {
            $(this).addClass('badge badge-danger badge-md badge-pill  btn-block');
        }
    });
}


function addScoreComment(btn) {

    var score_id = $(btn).attr('data-score_id');
    var criteria_name = $(btn).attr('data-criteria-name');
    console.log("Score ID : " + score_id);
    console.log("Criteria : " + criteria_name);
    event.cancelBubble = true;
    $("#scoreCommentModal").modal('show');
    $('#titleModal').text('Add Comment For ' + criteria_name);
    $('#commentScoreId').val(score_id);
}

function submitForm() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
    });
    console.log("on submit");
    //e.preventDefault();
    $.ajax({
        url: '/add-score-comment',
        type: 'post',
        xhrFields: {
            withCredentials: true
        },
        data: $('#scoreCommentForm').serialize(),
        success: function () {
            location.reload();
            $("#scoreCommentModal").modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    });
}

function addSessionComment(btn) {

    var session_id = $(btn).attr('data-session_id');
    console.log("Session ID : " + session_id);
    event.cancelBubble = true;
    $("#sessionCommentModal").modal('show');
    $('#basicModalLabel').text('Add Comment for Session ' + session_id);
    $('#commentSessionId').val(session_id);
}

function submitSessionForm() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
    });
    console.log("on submit");
    //e.preventDefault();
    $.ajax({
        url: '/add-session-comment',
        type: 'post',
        xhrFields: {
            withCredentials: true
        },
        data: $('#sessionCommentForm').serialize(),
        success: function () {
            $("#sessionCommentModal").modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            getScoreBasedOnSessionID();
        }
    });


}


async function getSkillOnCourseSelection() {
    let course_dropdown = document.getElementById('course_drop');
    let course_id = course_dropdown.options[course_dropdown.selectedIndex].value;
    //console.log(course_id);

    let dataSkills = await fetch(`users/api/course/${course_id}/skills/sessions`, {credentials: 'include'});
    let skills = await dataSkills.json();
    //console.log(skills);
    let options = "<option disabled selected value></option>";
    for (let i = 0; i < skills.length; i++) {
        options += "<option value='" + skills[i].skill_id + "'>" + skills[i].skill_name + "</option>";
    }
    console.log(options);
    let skill_dropdown = document.getElementById('skills_drop');
    console.log(skill_dropdown);
    skill_dropdown.innerHTML = options;
}

async function getSessionsOnSkillSelection() {
    let skill_dropdown = document.getElementById('skills_drop');
    let skill_id = skill_dropdown.options[skill_dropdown.selectedIndex].value;
    //console.log(course_id);

    let dataSessions = await fetch(`users/api/${skill_id}/sessions`, {credentials: 'include'});
    let sessions = await dataSessions.json();
    let options = "<option disabled selected value></option>";

    for (let i = 0; i < sessions.length; i++) {
        let splitDate = sessions[i].createdAt.split('T');
        let sessionDate = splitDate[0];
        let splitTime = splitDate[1].split('.');
        let sessionTime = splitTime[0];
        options += "<option value='" + sessions[i].session_id + "'>" + sessionDate + " on " + sessionTime + "</option>";
    }
    console.log(options);
    let session_dropdown = document.getElementById('sessions_drop');
    session_dropdown.innerHTML = options;
}

async function getScoreBasedOnSessionID() {
    let session_dropdown = document.getElementById('sessions_drop');
    let session_id = session_dropdown.options[session_dropdown.selectedIndex].value;
    console.log(session_id);
    //get session info based on session ID
    let dataSession = await fetch(`users/api/sessions/${session_id}`, {credentials: 'include'});
    let sessionArray = await dataSession.json();
    let session = sessionArray[0];
    console.log(session);
    let dataScore = await fetch(`users/api/${session_id}/score`, {credentials: 'include'});
    let scores = await dataScore.json();
    console.log(scores);
    let essentialCriteriaScores = [];
    let extraCriteriaScores = [];
    for (let i = 0; i < scores.length; i++) {
        if (scores[i].score_value === -1) {
            scores[i].score_value = "Pass";
            essentialCriteriaScores.push(scores[i]);
        } else if (scores[i].score_value === -2) {
            scores[i].score_value = "Fail"
            essentialCriteriaScores.push(scores[i]);
        } else {
            extraCriteriaScores.push(scores[i]);
        }
    }


    console.log(session);
    let splitDate = session.createdAt.split('T');
    let sessionDate = splitDate[0];
    console.log(sessionDate);

    let splitTime = splitDate[1].split('.');
    let sessionTime = splitTime[0];
    console.log(sessionTime);

    //let course_dropdown = document.getElementById('course_drop');
    let course_name = $("#course_drop option:selected").text();
    let skill_name = $("#skills_drop option:selected").text();
    //console.log(course_name);

    let finalScore = "";
    if (session.final_score === -2) {
        finalScore = "Fail";
    } else if (session.final_score === -1) {
        finalScore = "Pass";
    }

    let compliedTemplate = Handlebars.compile(scoreTableTemplate);
    let generatedHTMLContent = compliedTemplate({
        essentialCriteriaScores,
        session,
        finalScore,
        sessionDate,
        sessionTime,
        course_name,
        skill_name
    });
    $('#score-table').html(generatedHTMLContent);

    let extraCompliedTemplate = Handlebars.compile(extraScoreTableTemplate);
    let extraGeneratedHTMLContent = extraCompliedTemplate({extraCriteriaScores});
    $('#extra-score-table').html(extraGeneratedHTMLContent);

    $('#table tbody tr td span').each(function () {
        let text = $(this).text();
        if (text === 'Pass') {
            $(this).addClass('badge badge-success badge-md badge-pill  btn-block');
        } else if (text === 'Fail') {
            $(this).addClass('badge badge-danger badge-md badge-pill  btn-block');
        }
    });

}
