const studentSessionTableTemplate = `<div class="container-fluid">
    <div class="panel">
        <form id="trainee-form" class="form-vertical" method="post" action="/trainee-session-report" target="_blank">
            <input type="hidden" name="sessionIdForm" id="sessionIdForm">
         </form>

        <div class="panel-body">
            <div class="row">
                <div class="col-md-12">
                    <table class="table" id="table">
                        <thead class="light-background">
                        <tr>
                            <th hidden>Session ID</th>
                            <th>Trainee Name</th>
                            <th>Course Name</th>
                            <th>Skill Name</th>
                            <th>Session Type</th>
                            <th>Session Duration (min)</th>
                            <th>Final Score</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Trainer Name</th>
                            <th>Trainer Comment</th>
                            <!--<th>Your Comment</th>-->
                        </tr>
                        </thead>
                        
                        <tbody>
                        {{#each sessions}}
                        <tr class="coursesCategory" onclick="redirectToDetailedSession(this)">
                            <td id="sessionId" hidden>{{session_id}}</td>
                            <td>{{trainee_firstname}} {{trainee_lastname}}</td>
                            <td>{{course_name}} ({{semester}} {{year}})</td>
                            <td>{{skill_name}}</td>
                            <td>{{type}}</td>
                            <td>{{duration}}</td>
                            <td><span id="score_span">{{final_score}}</span></td>
                            <td>{{sessionDate}}</td>
                            <td>{{sessionTime}}</td>
                            <td>{{trainer_firstname}} {{trainer_lastname}}</td>
                            {{#if trainer_comment}}
                                <td>{{trainer_comment}} </td>
                             {{else}}
                                
                                  <td>{{#ifUserIsTrainer ../../trainer_role '1'}}<button class="btn btn-pill btn-primary" data-toggle="modal" data-target="#sessionCommentModal" data-session_id="{{session_id}}" onclick="addSessionComment(this)"><i class="fa fa-plus"></i> Add Comment {{/ifUserIsTrainer}}</button></td>
                                
                             {{/if}}
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
<div class="modal fade" id="sessionCommentModal">
     <div class="modal-dialog">
       <div class="modal-content">
          <div class="modal-header">
             <h4 class="modal-title" id="basicModalLabel">Add Comment for Session</h4>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          </div>
          <div class="modal-body">
              <form class="form-vertical" method="post" id="sessionCommentForm">
                <div class="form-body" id="commentForm">
                    <div class="row">
                        <div class="col-md-12">
                          <input type="hidden" name="commentSessionId" id="commentSessionId">
                          <div class="textwrapper"><textarea rows="3" name="sessionComment" form="sessionCommentForm" placeholder="Enter Your Comment Here..." required></textarea></div>
                        </div>
                    </div>
                   </div>
            </form>
              <div class="modal-footer">
                  <button type="button"  class="btn btn-pill btn-danger close" data-dismiss="modal">Cancel</button>
                  <button type="submit" onclick="submitForm()" class="btn btn-pill btn-success">Submit Comment</button>
               </div>
       </div>
     </div>
</div>
`;

function addSessionComment(btn) {

    var session_id = $(btn).attr('data-session_id');
    console.log("Session ID : " + session_id);
    event.cancelBubble = true;
    $("#sessionCommentModal").modal('show');
    $('#basicModalLabel').text('Add Comment for Session ' + session_id);
    $('#commentSessionId').val(session_id);
}

function submitForm() {
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
            $("#filterButton").click();
        }
    });


}

async function getSkillOnCourseSelection() {
    let course_dropdown = document.getElementById('course_drop_trainer');
    let course_id = course_dropdown.options[course_dropdown.selectedIndex].value;
    //console.log(course_id);
    let options = '';
    if (course_id === 'All') {
        options = "<option selected value='All'>All</option>";
    } else {
        let dataSkills = await fetch(`users/api/course/${course_id}/skills/sessions`, {credentials: 'include'});
        let skills = await dataSkills.json();
        //console.log(skills);
        options = "<option selected value='All'>All</option>";

        for (let i = 0; i < skills.length; i++) {
            options += "<option value='" + skills[i].skill_id + "'>" + skills[i].skill_name + "</option>";
        }
        //console.log(options);

    }

    let skill_dropdown = document.getElementById('skills_drop_trainer');
    //console.log(skill_dropdown);
    skill_dropdown.innerHTML = options;
}

async function getSessionsOnSelection() {
    let course_dropdown = document.getElementById('course_drop_trainer');
    let course_id = course_dropdown.options[course_dropdown.selectedIndex].value;
    //console.log(course_id);

    let skill_dropdown = document.getElementById('skills_drop_trainer');
    let skill_id = skill_dropdown.options[skill_dropdown.selectedIndex].value;

    let trainee_dropdown = document.getElementById('trainee_drop_trainer');
    let trainee_id = trainee_dropdown.options[trainee_dropdown.selectedIndex].value;
    //console.log(course_id);

    let trainer_dropdown = document.getElementById('trainer_drop_trainer');
    let trainer_id;
    let path = '';
    console.log(trainer_dropdown);
    if (trainer_dropdown === null) {

        path = `users/api/sessions/${course_id}/${skill_id}/${trainee_id}`


    } else {
        trainer_id = trainer_dropdown.options[trainer_dropdown.selectedIndex].value;
        console.log(trainer_id);
        path = `users/api/sessions/${trainer_id}/${course_id}/${skill_id}/${trainee_id}`
    }

    let dataSessions = await fetch(path, {credentials: 'include'});
    let sessions = await dataSessions.json();

    // let options = "<option disabled selected value></option>";
    //
    for (let i = 0; i < sessions.length; i++) {
        let splitDate = sessions[i].createdAt.split('T');
        sessions[i]["sessionDate"] = splitDate[0];
        let splitTime = splitDate[1].split('.');
        sessions[i]["sessionTime"] = splitTime[0];

        if (sessions[i].final_score === -1) {
            sessions[i].final_score = "Pass"
        } else if (sessions[i].final_score === -2) {
            sessions[i].final_score = "Fail"
        }

        //options += "<option value='" + sessions[i].session_id + "'>" + sessionDate + " on " + sessionTime + "</option>";
    }

    let course_name = $("#course_drop_trainer option:selected").text();
    let skill_name = $("#skills_drop_trainer option:selected").text();
    Handlebars.registerHelper('ifUserIsTrainer', function (userS, userT, options) {
        if (userS === userT) {
            console.log(typeof userS);
            console.log(typeof userT);
            console.log(userS + "===" + userT)
            return options.fn(this);
        } else {
            console.log(typeof userS);
            console.log(typeof userT);
            console.log(userS + "!==" + userT)
            return options.inverse(this);
        }

    });

    let trainer_role = $('#trainer_role_hidden').text();
    console.log("TRAINER ROLE---- " + trainer_role);

    let compliedTemplate = Handlebars.compile(studentSessionTableTemplate);
    let generatedHTMLContent = compliedTemplate({
        sessions,
        course_name,
        skill_name,
        trainer_role
    });
    $('#students-session-table').html(generatedHTMLContent);

    $('#table tbody tr td span').each(function () {
        let text = $(this).text();
        if (text === 'Pass') {
            $(this).addClass('badge badge-success badge-md badge-pill  btn-block');
        } else if (text === 'Fail') {
            $(this).addClass('badge badge-danger badge-md badge-pill  btn-block');
        }
    });

    $('#groupByCourse').prop("checked", true);
    drawChart("groupByCourse");

}

async function redirectToDetailedSession(row) {
    //console.log(row);
    let session_id = $(row).find('#sessionId').text();
    //console.log(session_id);
    let url = "http://localhost:8000/trainee-report/session/" + session_id;

    window.open(url, '_blank',);
}

async function drawChart(filter) {

    let course_dropdown = document.getElementById('course_drop_trainer');
    let course_id = course_dropdown.options[course_dropdown.selectedIndex].value;
    //console.log(course_id);

    let skill_dropdown = document.getElementById('skills_drop_trainer');
    let skill_id = skill_dropdown.options[skill_dropdown.selectedIndex].value;

    let trainee_dropdown = document.getElementById('trainee_drop_trainer');
    let trainee_id = trainee_dropdown.options[trainee_dropdown.selectedIndex].value;
    //console.log(course_id);

    let trainer_dropdown = document.getElementById('trainer_drop_trainer');
    let trainer_id;
    let path = '';
    console.log(trainer_dropdown);
    if (trainer_dropdown === null) {

        path = `users/api/sessions/${course_id}/${skill_id}/${trainee_id}`


    } else {
        trainer_id = trainer_dropdown.options[trainer_dropdown.selectedIndex].value;
        console.log(trainer_id);
        path = `users/api/sessions/${trainer_id}/${course_id}/${skill_id}/${trainee_id}`
    }

    let dataSessions = await fetch(path, {credentials: 'include'});
    let sessions = await dataSessions.json();

    for (let i = 0; i < sessions.length; i++) {
        let splitDate = sessions[i].createdAt.split('T');
        sessions[i]["sessionDate"] = splitDate[0];
        let splitTime = splitDate[1].split('.');
        sessions[i]["sessionTime"] = splitTime[0];

        if (sessions[i].final_score === -1) {
            sessions[i].final_score = "Pass"
        } else if (sessions[i].final_score === -2) {
            sessions[i].final_score = "Fail"
        }
    }

    console.log("--FILTER--- " + filter);

    let mainLabels = [];
    let countPass = [];
    let countFail = [];

    if (filter === 'groupByCourse') {
        mainLabels = [...new Set(sessions.map(item => item.course_name + ' (' + item.semester + ' ' + item.year + ')'))];

        for (let i = 0; i < mainLabels.length; i++) {
            let itemPassCount = 0;
            let itemFailCount = 0;
            for (let j = 0; j < sessions.length; j++) {
                let name = sessions[j].course_name + ' (' + sessions[j].semester + ' ' + sessions[j].year + ')';
                if (mainLabels[i] === name && sessions[j].final_score === 'Pass') {
                    itemPassCount++;
                } else if (mainLabels[i] === name && sessions[j].final_score === 'Fail') {
                    itemFailCount++;
                }
            }

            countPass.push((itemPassCount / sessions.length) * 100);
            countFail.push((itemFailCount / sessions.length) * 100);
            //countFail.push(itemFailCount/sessions.length);
        }

    } else if (filter === 'groupBySkill') {

        mainLabels = [...new Set(sessions.map(item => item.skill_name))];

        for (let i = 0; i < mainLabels.length; i++) {
            let itemPassCount = 0;
            let itemFailCount = 0;
            for (let j = 0; j < sessions.length; j++) {
                //let name = sessions[j].course_name + ' (' + sessions[j].semester + ' ' + sessions[j].year + ')';
                if (mainLabels[i] === sessions[j].skill_name && sessions[j].final_score === 'Pass') {
                    itemPassCount++;
                } else if (mainLabels[i] === sessions[j].skill_name && sessions[j].final_score === 'Fail') {
                    itemFailCount++;
                }
            }

            countPass.push((itemPassCount / sessions.length) * 100);
            countFail.push((itemFailCount / sessions.length) * 100);
        }

    } else if (filter === 'groupByTrainee') {
        mainLabels = [...new Set(sessions.map(item => item.trainee_firstname + ' ' + item.trainee_lastname))];

        for (let i = 0; i < mainLabels.length; i++) {
            let itemPassCount = 0;
            let itemFailCount = 0;
            for (let j = 0; j < sessions.length; j++) {
                let name = sessions[j].trainee_firstname + ' ' + sessions[j].trainee_lastname;
                console.log(mainLabels[i]);
                console.log(name);
                if (mainLabels[i] === name && sessions[j].final_score === 'Pass') {
                    itemPassCount++;
                } else if (mainLabels[i] === name && sessions[j].final_score === 'Fail') {
                    itemFailCount++;
                }
            }

            countPass.push((itemPassCount / sessions.length) * 100);
            countFail.push((itemFailCount / sessions.length) * 100);
        }
    } else if (filter === 'groupByTrainer') {
        mainLabels = [...new Set(sessions.map(item => item.trainer_firstname + ' ' + item.trainer_lastname))];

        for (let i = 0; i < mainLabels.length; i++) {
            let itemPassCount = 0;
            let itemFailCount = 0;
            for (let j = 0; j < sessions.length; j++) {
                let name = sessions[j].trainer_firstname + ' ' + sessions[j].trainer_lastname;
                console.log(mainLabels[i]);
                console.log(name);
                if (mainLabels[i] === name && sessions[j].final_score === 'Pass') {
                    itemPassCount++;
                } else if (mainLabels[i] === name && sessions[j].final_score === 'Fail') {
                    itemFailCount++;
                }
            }

            countPass.push((itemPassCount / sessions.length) * 100);
            countFail.push((itemFailCount / sessions.length) * 100);
        }
    }

    console.log("MAIN GENERAL LABELS\n");
    console.log(mainLabels);

    console.log(sessions);
    $('#noSessions').html("Total Number of Sessions: " + sessions.length);

    $('#chartPanel').show();
    var ctx = document.getElementById('chartArea').getContext("2d");
    if (window.bar != undefined)
        window.bar.destroy();
    window.bar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: mainLabels,
            datasets: [
                {
                    label: 'Pass %',
                    data: countPass,
                    backgroundColor: 'rgba(40,167,69, 0.5)',
                    borderColor: 'rgba(40,167,69, 0.8)',
                    borderWidth: 1
                },
                {
                    label: 'Fail %',
                    data: countFail,
                    backgroundColor: 'rgba(220,53,69,0.5)',
                    borderColor: 'rgba(220,53,69,0.8)',
                    borderWidth: 1
                }],
        },
        options: {
            scales: {
                xAxes: [{stacked: true}],
                yAxes: [{stacked: true}]
            }
        }
    });


}