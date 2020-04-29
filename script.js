const add = document.querySelector('.issue-button');
const form1 = document.querySelector('.add-issue');
const issues = document.getElementById('activeIssues');
let desc, assign, severity;

function issue() {
    this.desc = desc;
    this.severity = severity;
    this.assign = assign;
    this.id = chance.guid();
    this.status = "open";
} 

function createtemplate(issue) {
    return(`
        <div class="issue">
            <span>Issue Id: ${issue.id}</span>
            <span class="badge bg-info">${issue.status}</span>
            <h4>${issue.desc}</h4>
            <p><i class="far fa-clock"></i>  ${issue.severity}  <i class="fas fa-user"></i><span>  ${issue.assign}</span></p>
            <button class="btn bg-warning" onclick="closeIssue('${issue.id}')">Close</button>
            <button class="btn bg-danger" onclick="deleteIssue('${issue.id}')">Delete</button>
        </div>
    `);
}

function fetchIssues() {
    activeIssue = JSON.parse(localStorage.getItem('issues')) || [];
    let issuetemplate = "";
    activeIssue.forEach(issue => issuetemplate += createtemplate(issue));
    issues.innerHTML = issuetemplate;
}

function closeIssue(id) {
    activeIssue = JSON.parse(localStorage.getItem('issues'));
    const i = activeIssue.find(issue => issue.id == id);
    const ind = activeIssue.indexOf(i);
    activeIssue[ind].status = "close";
    localStorage.setItem('issues', JSON.stringify(activeIssue));
    fetchIssues();
}

function deleteIssue(id) {
    activeIssue = JSON.parse(localStorage.getItem('issues'));
    const i = activeIssue.find(issue => issue.id == id);
    const ind = activeIssue.indexOf(i);
    activeIssue.splice(ind, 1);
    localStorage.setItem('issues', JSON.stringify(activeIssue));
    fetchIssues();
}

add.addEventListener('click', e => {
    e.preventDefault();
    desc = form1.desc.value.trim();
    severity = form1.severity.value;
    assign = form1.assign.value.trim();
    if(desc == "" || assign == "")
        return;
    activeIssue = JSON.parse(localStorage.getItem('issues')) || [];
    activeIssue.push(new issue());
    localStorage.setItem('issues', JSON.stringify(activeIssue));
    fetchIssues();
});