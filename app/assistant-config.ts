export let workflowId = "wf_68ee779f364081909c07b081c300369f0558624bf784741f"; // vul hier je workflow ID in (wf_xxx)

if (workflowId === "") {
  workflowId = process.env.OPENAI_WORKFLOW_ID ?? "";
}
