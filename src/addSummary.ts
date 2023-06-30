
const core = require('@actions/core');
const github = require('@actions/github');
const { context } = require('@actions/github')
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
const octokit = github.getOctokit(GITHUB_TOKEN);
 
const { pull_request } = context.payload;

/**
 * Add to job summary
 */
export default async function addSummary(summary: string): Promise<void> {
  core.summary.addRaw(summary)
  await core.summary.write()

await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: summary
  });
}
